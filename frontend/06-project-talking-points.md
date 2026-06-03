# 06 — Project Talking Points

"Tell me about a project you're proud of" is where you can shine — your `tono` architecture
is genuinely above junior level. For each project: a **30-second pitch**, an **architecture
summary**, **decision/tradeoff stories**, and **likely follow-ups**.

**How to deliver:** lead with the pitch, then let them pull. Don't data-dump. When they ask
"why," reach for a tradeoff story. Always be honest about what you'd do differently — seniors
respect that more than false certainty.

---

## ⭐ tono — flagship (lead with this one)

**30-sec pitch:**
> "tono is a SaaS that generates guitar amp/tone settings from a description of the sound you
> want, optionally analyzing an uploaded audio clip. It's Next.js 16 App Router with React 19
> and TypeScript, Clerk for auth, Prisma/Postgres for data, Stripe for subscription billing,
> Google Gemini for the AI, and Upstash Redis for rate limiting and caching. The interesting
> part for me was making the credit-metered generation endpoint correct under concurrency and
> resilient to failures in the external services."

**Architecture summary:** Route groups split a public marketing site from the authed dashboard;
Clerk middleware (named `proxy.ts` here) gates routes. The core endpoint is `POST /api/tones`
(`app/api/tones/route.ts`). Tiers (free=5, pro=50) are derived from live Stripe subscription
status, not stored as an enum.

### Decision/tradeoff stories (pick 2–3)

1. **Atomic credit reservation under concurrency.** "Users have a monthly generation limit. If I
   just checked the count then decremented after, two concurrent requests could both pass the
   check and overspend. So I reserve the credit inside a `prisma.$transaction` — re-read the count
   and increment atomically *before* calling the AI. If generation later fails I accept the small
   cost of a refund path rather than risk overspend." *(`app/api/tones/route.ts:120`.)*

2. **Guarding against missed webhooks.** "Stripe tells us about downgrades via webhooks, but webhooks
   can be missed. If I trusted the stored `generationsLimit` column, a user whose `subscription.deleted`
   event never arrived would keep the Pro limit forever. So I derive the *effective* limit from current
   subscription state at request time, not from the possibly-stale DB column." *(route.ts:109–117.)*

3. **Webhook idempotency with a deliberate retry quirk.** "The Stripe webhook handler uses a
   `WebhookEvent` table for idempotency, but it only skips events marked `processed=true`. If a prior
   delivery crashed mid-handler, `processed` stays false, so Stripe's redelivery is allowed to retry
   instead of being silently dropped. Skipping on mere existence would lose failed-event retries."

4. **Best-effort AI, never a hard failure.** "Audio analysis is wrapped so that if Gemini fails we
   log it and continue with text-only generation rather than failing the whole request. And the tone
   service always returns a result — on AI failure it falls back to default amp settings with an
   explanatory note. The UX principle: a degraded result beats an error page." *(route.ts:96–103.)*

5. **Layered defense + structured errors.** "Every handler generates a `requestId`, logs structured
   JSON, and funnels through a single `APIError` + `handleAPIError` helper so we never leak internal
   errors to the client. Rate limiting is centralized in `lib/rateLimit.ts` with per-purpose prefixes."

### Likely follow-ups (and crisp answers)
- *"How do you reset monthly credits without a cron?"* — Lazy "check-on-use": `resetCreditsIfNewPeriod`
  runs on each request and resets if we've crossed into a new billing period.
- *"Why validate env vars on module load?"* — `lib/config.ts` throws at boot if a required var is
  missing, so the app fails fast at deploy rather than at request time.
- *"How do you test this?"* — Jest + Testing Library for units/components, Playwright for e2e.
- *"What would you do differently?"* — e.g. add a credit **refund** on generation failure, move audio
  analysis to a background job, add observability/metrics. (Have one honest answer ready.)

---

## dropzone — full-stack real-time file sharing

**30-sec pitch:**
> "dropzone is a real-time file-sharing app — drag-drop upload, share via link, with live updates.
> React + Vite + TypeScript on the front end with react-router and socket.io; an Express 5 + Prisma
> + Postgres API on the back with JWT auth, bcrypt password hashing, multer + Cloudinary for uploads,
> and socket.io for the live channel. It's documented with Swagger."

**Architecture summary:** SPA with client-side routing; an auth context provider (`context/
AuthContextProvider.tsx`) holds session state app-wide; a class-based `ErrorBoundary` catches render
errors; the socket connection is opened in an effect and torn down in cleanup.

### Decision/tradeoff stories
1. **Auth with JWT + bcrypt.** "Passwords are hashed with bcrypt; login issues a JWT. I can talk
   through where the token lives (cookie vs storage) and the XSS/CSRF tradeoffs."
2. **Real-time via websockets.** "I used socket.io rather than polling for live updates. The client
   connects in a `useEffect` and disconnects in the cleanup so I don't leak connections on unmount."
3. **Auth context to avoid prop drilling.** "Session state is in React Context so any route can read
   the user without threading props through the tree."

### Likely follow-ups
- *"Where do you store the JWT and why?"* — Know the cookie (httpOnly, CSRF) vs localStorage (XSS)
  tradeoff; pick a side and justify it.
- *"What happens to the socket on logout / unmount?"* — Cleanup disconnects it.
- *"How do you handle large uploads / validation?"* — multer limits + server-side validation;
  Cloudinary offloads storage.

---

## fanimal — React SPA with validated forms

**30-sec pitch:**
> "A React + Vite + TypeScript SPA with react-router, using react-hook-form with Zod resolvers for
> typed, validated forms, and axios for the API layer."

**Talk to:** why react-hook-form (uncontrolled inputs → fewer re-renders) + Zod (one schema → runtime
validation *and* the inferred TS type, so they can't drift). Good place to discuss controlled vs
uncontrolled forms in practice.

---

## expert-cpq-solutions-template — range piece

**30-sec pitch:**
> "A configure-price-quote tool: Next.js 16, with a 3D product configurator using react-three-fiber/
> Three.js, Zustand for client state, PDF quote generation with react-pdf, Excel export, and
> transactional email via Resend."

**Talk to:** why Zustand over Context here (a real store with selective subscriptions, less re-render
churn than a big context); the challenge of integrating an imperative 3D library (Three.js) into
React's declarative model.

---

## portfolio — lean SPA
Vite + React + Tailwind + `motion` animations. Brief — mention it as your personal site and a place
you keep CSS/animation skills sharp.

---

## Behavioral framing (folded in here)

Have **2–3 stories** ready, drawn from above. Use **STAR** (Situation, Task, Action, Result):
- **"A hard bug you fixed"** → the concurrency/overspend risk in tono, and the transaction fix.
- **"A time you were stuck"** → integrating an external service that fails unpredictably (Gemini), and
  deciding on graceful degradation instead of hard failures.
- **"Something you'd do differently"** → credit refund on failure / background jobs / more tests.
- **"Why this role / why frontend"** → your own honest answer; practice saying it out loud once.

**Golden rule:** never bad-mouth the tech or claim something is "perfect." Show you can reason about
tradeoffs and you know where the bodies are buried in your own code.

---

### Drill prompt
"Project deep-dive: tono" — I'll play interviewer and push on your decisions until you can defend
each one in plain language without notes.
