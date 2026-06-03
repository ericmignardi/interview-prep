# Backend Track — Node / Express / TypeScript

Backend prep for junior/full-stack JS roles, built around your **dropzone** Express API
(layered routes → controllers → services, JWT-in-cookie auth, Prisma/Postgres, socket.io,
Cloudinary uploads, Swagger docs).

> Start a session in chat: *"Backend mock drill"*, *"Backend coding challenge"*, or
> *"Backend deep-dive: dropzone"*. Claude grades you and updates [progress.md](progress.md).

---

## Session menu

| Say this | What happens |
|---|---|
| **"Backend mock drill"** (optionally name a topic) | 8–12 Q&A one at a time, graded ✅/⚠️/❌ with corrections + follow-ups. |
| **"Backend coding challenge"** | Build an endpoint / middleware / query. Claude reviews correctness, security, error handling. |
| **"Backend deep-dive: dropzone"** | Claude role-plays an interviewer probing your API's design decisions. |
| **"Quiz me: backend"** | Rapid-fire flashcards. |

---

## Study banks

1. [01 — Node & Async Runtime](01-node-and-async.md) — event loop in Node, async, streams, modules, env
2. [02 — HTTP, REST & API Design](02-http-rest-api-design.md) — methods, status codes, idempotency, REST conventions
3. [03 — Express & Middleware](03-express-and-middleware.md) — the middleware chain, routing, error handling, validation
4. [04 — Databases, SQL & Prisma](04-databases-prisma-sql.md) — relations, indexes, transactions, N+1, migrations
5. [05 — Auth & Security](05-auth-and-security.md) — JWT vs sessions, bcrypt, cookies, CORS, OWASP, rate limiting
6. [06 — Coding Challenges](06-coding-challenges.md) — endpoints, middleware, validation; solutions collapsed
7. [07 — Project Talking Points](07-project-talking-points.md) — dropzone API + tono backend, story by story
8. [progress.md](progress.md) — your backend scorecard

Same Q&A format as the frontend track: **Q** / **A** / **🪤 Junior trap**.

---

## What junior backend interviews test
1. **HTTP & REST literacy** — methods, status codes, idempotency, designing a sane endpoint.
2. **Express request lifecycle** — middleware order, error handling, validation, auth gating.
3. **Data layer** — basic SQL, relations, a transaction, avoiding N+1, what an index does.
4. **Auth & security** — hashing vs encryption, JWT vs sessions, where the token lives, common
   vulnerabilities (SQL injection, XSS, CSRF) and the mitigations.
5. **"Walk me through your API"** — your dropzone layering and auth flow are great material.

You don't need distributed-systems depth for a junior role. Be correct and security-aware on the
basics, and able to reason about your own API's tradeoffs.
