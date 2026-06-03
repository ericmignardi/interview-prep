# 02 — HTTP, REST & API Design

The single most-tested backend area for juniors. You should rattle these off.

---

## HTTP methods

> **Q:** What are the main HTTP methods and when do you use each?
> **A:**
> - **GET** — read; no body; safe & idempotent; cacheable.
> - **POST** — create / trigger an action; **not** idempotent (two POSTs = two resources).
> - **PUT** — replace a resource fully; idempotent.
> - **PATCH** — partial update; (often) idempotent.
> - **DELETE** — remove; idempotent.
> *(dropzone: `POST /api/auth/register`, `POST /api/upload`, `GET /api/share/:id`.)*

> **Q:** What does "idempotent" mean and why does it matter?
> **A:** Making the same request N times has the same effect as making it once. GET/PUT/DELETE are
> idempotent; POST isn't. It matters for **safe retries** — a network blip can make a client retry,
> and idempotent endpoints won't double-charge / double-create.
> **🪤 Junior trap:** Calling GET "idempotent because it doesn't change data" — it's both *safe*
> (no change) and idempotent. PUT changes data but is still idempotent. Don't conflate the two.

---

## Status codes

> **Q:** Walk through the status code families and common ones.
> **A:**
> - **2xx success:** 200 OK, 201 Created (with new resource), 204 No Content.
> - **3xx redirect:** 301/302, 304 Not Modified (caching).
> - **4xx client error:** 400 Bad Request (validation), 401 Unauthorized (not authenticated),
>   403 Forbidden (authenticated but not allowed), 404 Not Found, 409 Conflict, 429 Too Many Requests.
> - **5xx server error:** 500 Internal Server Error, 502/503.
> **🪤 Junior trap:** Confusing **401 vs 403**. 401 = "I don't know who you are" (no/invalid creds);
> 403 = "I know who you are, you're not allowed." *(dropzone returns 401 for a missing/invalid token
> in `authMiddleware.ts`; `tono` returns 403 for a Pro-only feature on a free account.)* Also: using
> 200 for everything and signaling errors in the body — use the right status.

> **Q:** What status do you return when creating a resource vs failing validation?
> **A:** **201** with the created resource on success; **400** with the validation errors on bad
> input. *(tono's `POST /api/tones` returns 201 on success, 400 for missing fields, 422-style issues
> via Zod's `error.issues`.)*

---

## REST conventions

> **Q:** How would you design REST endpoints for a "files" resource?
> **A:** Noun-based, plural, hierarchical:
> ```
> GET    /api/files          list
> POST   /api/files          create/upload
> GET    /api/files/:id      read one
> PATCH  /api/files/:id      update
> DELETE /api/files/:id      delete
> GET    /api/files/:id/shares   sub-resource
> ```
> Use query params for filtering/pagination (`?page=2&limit=20`), not new endpoints.
> **🪤 Junior trap:** Verb-based RPC-style routes like `POST /api/getFiles` or
> `POST /api/deleteFile`. REST uses nouns + HTTP methods.

> **Q:** How do you paginate a list endpoint?
> **A:** Offset/limit (`?page&limit`, `skip = (page-1)*limit`) is simplest — *(exactly what tono's
> `GET /api/tones` does, returning `{ total, totalPages, hasNextPage }`)*. Cursor-based pagination
> scales better for large/changing datasets but is more complex. Know offset for juniors, mention
> cursor as the "at scale" answer.

---

## Headers, content types, CORS

> **Q:** What's CORS and why does it bite people?
> **A:** Browsers enforce the **same-origin policy**; cross-origin requests need the server to opt in
> via `Access-Control-Allow-Origin` (and friends). It's a **browser** mechanism — server-to-server
> calls aren't affected. With **cookies**, you must set `credentials: true` on both the client fetch
> *and* the server CORS config, and the allowed origin can't be `*`. *(dropzone configures
> `cors({ origin: [FRONTEND_URL], credentials: true })` in `index.ts` precisely because its JWT lives
> in a cookie.)*
> **🪤 Junior trap:** "Fixing" CORS with `origin: *` while also sending cookies — browsers reject
> that combination. Or thinking CORS is a server-to-server restriction.

> **Q:** What is `Content-Type` and why does the server care?
> **A:** It tells the server how to parse the body — `application/json` vs
> `multipart/form-data` (file uploads) vs `application/x-www-form-urlencoded`. Express needs the
> matching parser (`express.json()` for JSON; multer for multipart). *(tono's tone route reads
> `multipart/form-data` because it accepts an audio file alongside fields.)*

---

## API robustness

> **Q:** How do you handle errors consistently across an API?
> **A:** A single error shape and a central handler. *(dropzone funnels through `errorHandler.ts`
> mounted last; tono uses an `APIError` class + `handleAPIError` with a `requestId` so logs are
> structured and internal details never leak to the client in production.)* Return the right status,
> a safe message, and log the detail server-side.

> **Q:** What's rate limiting and why add it?
> **A:** Caps requests per client/time-window to prevent abuse and protect resources.
> *(dropzone uses `express-rate-limit`; tono uses Upstash sliding-window limiters with per-purpose
> prefixes.)* Return **429** when exceeded.

---

### Drill prompts
- "Backend mock drill: http" — expect status-code scenarios, idempotency, and "design these endpoints."
- Be ready to give the right status code for: created, bad input, not logged in, logged-in-but-forbidden,
  not found, too many requests.
