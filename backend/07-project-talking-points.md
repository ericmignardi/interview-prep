# 07 — Backend Project Talking Points

Your two backends to talk about: the **dropzone Express API** (classic layered REST + websockets)
and the **tono Next.js backend** (route handlers as the API). Lead with whichever the role leans toward.

---

## ⭐ dropzone API — the "I built a real REST backend" piece

**30-sec pitch:**
> "dropzone's backend is an Express 5 + TypeScript REST API for real-time file sharing. It's layered
> into routes → controllers → services, uses Prisma/Postgres for data, JWT-in-an-httpOnly-cookie for
> auth with bcrypt-hashed passwords, multer + Cloudinary for uploads, socket.io for live updates, and
> it's documented with Swagger. I focused on clean separation of concerns and getting the auth and
> CORS right for cookie-based sessions."

**Architecture summary:** `index.ts` wires the middleware chain (cors → json → cookieParser → routers
→ central errorHandler), creates an `http.Server` and attaches socket.io to share the port. Each
domain (auth, upload, share) has a router, controller, and service.

### Decision/tradeoff stories
1. **Layered architecture.** "I split HTTP handling (controllers) from business logic (services) so
   services are testable in isolation and logic isn't tangled with `req`/`res`. It's more files up
   front, but it scales and reads far better than fat route callbacks."
2. **Auth: httpOnly cookie + JWT + bcrypt.** "Passwords are bcrypt-hashed with cost 10. Login issues a
   7-day JWT stored in an **httpOnly cookie** so client JS can't read it — that blocks token theft via
   XSS. The tradeoff is CSRF exposure, which I mitigate with an explicit CORS origin allowlist and
   `credentials: true` rather than a wildcard." *(`authService.ts`, `authMiddleware.ts`, `index.ts`.)*
3. **Real-time via socket.io.** "File-share events push to clients over websockets instead of polling.
   socket.io shares the HTTP server, with CORS configured to match the cookie-auth origin."
4. **Uploads to Cloudinary, not local disk.** "multer handles the multipart upload; I offload storage
   to Cloudinary so the app server stays stateless and storage scales independently."
5. **Swagger docs.** "I documented the API with OpenAPI/Swagger so the contract is explorable — useful
   when the React frontend is the consumer."

### Likely follow-ups
- *"Why the cookie over localStorage?"* → XSS vs CSRF tradeoff (see [05](05-auth-and-security.md)).
- *"How would you revoke a JWT before it expires?"* → Short lifetimes + a refresh token, or a
  server-side denylist; acknowledge it's JWT's known weakness vs sessions.
- *"How do you handle a huge upload?"* → Stream rather than buffer; size limits in multer; validate type.
- *"What would you improve?"* → Add request validation middleware uniformly, structured logging +
  request ids (like tono), tests, and a refresh-token flow. (Have one honest answer.)

---

## tono backend — the "production-grade serverless API" piece

**30-sec pitch:**
> "tono's backend is Next.js App Router route handlers — effectively a serverless API. The headline
> endpoint, `POST /api/tones`, is credit-metered and integrates Clerk (auth), Prisma, Stripe (billing
> webhooks), Gemini (AI), and Upstash Redis (rate limiting + caching). The hard part was making it
> correct under concurrency and resilient when external services fail."

**Top stories** (full detail in [frontend/06-project-talking-points.md](../frontend/06-project-talking-points.md)):
1. **Atomic credit reservation** in a `prisma.$transaction` to prevent overspend under concurrent
   requests — the check-and-decrement race fix.
2. **Effective-limit guard** deriving the tier from live subscription state, not a possibly-stale DB
   column, in case a Stripe webhook was missed.
3. **Webhook idempotency** keyed on a `WebhookEvent` table that *only* skips `processed=true`, so a
   handler that crashed mid-way still allows Stripe's retry instead of dropping it.
4. **Graceful degradation** — audio analysis is best-effort; the tone service always returns a result,
   falling back to defaults on AI failure rather than erroring the request.
5. **Structured errors + rate limiting** — per-request `requestId`, central `APIError`/`handleAPIError`,
   Upstash sliding-window limiters with per-purpose prefixes.

These are genuinely senior-flavored backend concerns (concurrency, idempotency, failure modes) — being
able to explain them plainly is a strong differentiator for a junior candidate.

---

### Drill prompt
"Backend deep-dive: dropzone" — I'll play interviewer and push on your auth/CORS/layering decisions
until you can defend each one without notes.
