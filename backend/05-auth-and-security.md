# 05 — Auth & Security

The highest-signal backend topic for juniors — interviewers want to know you won't ship something
insecure. Your dropzone auth (bcrypt + JWT-in-httpOnly-cookie) is a solid, real example to anchor to.

---

## Password storage

> **Q:** How do you store passwords?
> **A:** **Never plaintext, never plain encryption.** Hash them with a slow, salted, adaptive hash —
> bcrypt, scrypt, or argon2. *(dropzone: `bcryptjs.hash(password, 10)` on register, `bcryptjs.compare`
> on login — `authService.ts`.)* The salt (built into bcrypt's output) defeats rainbow tables; the
> cost factor (10) makes brute force expensive.

> **Q:** Hashing vs encryption — what's the difference?
> **A:** **Encryption is reversible** with a key (used when you need the original back). **Hashing is
> one-way** — you can't recover the input, only verify a candidate by hashing it and comparing. Passwords
> must be **hashed**, because you never need to read them back, only check them.
> **🪤 Junior trap:** Saying you'd "encrypt" passwords. That implies a key that, if leaked, exposes
> every password. Hash them.

> **Q:** What's the cost factor / work factor?
> **A:** A tunable that sets how slow the hash is (bcrypt's `10` = 2^10 rounds). Higher = more
> resistant to brute force but slower to verify. You raise it over time as hardware gets faster.

---

## Sessions vs tokens

> **Q:** Session-based auth vs JWT — tradeoffs?
> **A:**
> - **Sessions:** server stores session state; client holds an opaque session id (usually in a cookie).
>   Easy to revoke (delete server-side), but needs a session store and is stateful.
> - **JWT:** a signed, self-contained token the server *verifies* without storing state — scales
>   horizontally easily. But it's **hard to revoke before expiry**, so you keep lifetimes short and/or
>   add a refresh-token + denylist scheme. *(dropzone signs a JWT with `userId`, 7-day expiry.)*
> **🪤 Junior trap:** Claiming JWTs are "more secure." They're more *stateless/scalable*; revocation
> is the classic weakness. Know the tradeoff, not a winner.

> **Q:** Where do you store the token on the client, and why?
> **A:** Two options:
> - **httpOnly cookie** — JS can't read it, which blocks token theft via **XSS**. But cookies are sent
>   automatically, so you must defend **CSRF** (SameSite attribute, CORS allowlist, CSRF tokens).
> - **localStorage** — simple, immune to CSRF, but **readable by any XSS**, so a script injection
>   steals the token.
> *(dropzone chose the **httpOnly cookie** path — `authMiddleware` reads `req.cookies.token` — and
> pairs it with an explicit CORS origin allowlist + `credentials: true`, which is the right combo.)*
> **🪤 Junior trap:** Not knowing the XSS-vs-CSRF tradeoff. This is THE question for cookie/token auth.

---

## The OWASP-flavored basics

> **Q:** What is XSS and how do you prevent it?
> **A:** Cross-Site Scripting — an attacker injects script that runs in another user's browser
> (e.g. unsanitized user content rendered as HTML). Prevent by escaping/encoding output (React escapes
> by default — danger is `dangerouslySetInnerHTML`), validating input, a Content-Security-Policy, and
> keeping auth tokens in httpOnly cookies so a script can't read them.

> **Q:** What is CSRF and how do you prevent it?
> **A:** Cross-Site Request Forgery — a malicious site tricks a logged-in user's browser into sending
> an authenticated request (cookies ride along automatically). Prevent with the **SameSite** cookie
> attribute (`Lax`/`Strict`), CSRF tokens, and checking origin. Only relevant when auth is **cookie**-
> based (token-in-header auth isn't auto-sent, so it's CSRF-immune).

> **Q:** What is SQL injection and how do you prevent it?
> **A:** Injecting SQL via unsanitized input to read/alter the DB. Prevent with **parameterized
> queries / an ORM** (Prisma parameterizes by default) — never concatenate user input into SQL.

> **Q:** A few other quick wins?
> **A:** Validate & sanitize all input (Zod), rate-limit auth/expensive endpoints (dropzone:
> `express-rate-limit`; tono: Upstash), don't leak internal errors to clients (central error handler),
> use HTTPS, keep secrets in env vars, principle of least privilege on DB credentials.

---

## Authorization vs authentication

> **Q:** Difference between authentication and authorization?
> **A:** **Authentication** = *who are you* (verifying identity — login). **Authorization** = *what
> are you allowed to do* (permissions/roles). Reflected in status codes: **401** = not authenticated,
> **403** = authenticated but not authorized. *(tono: a free user is authenticated (knows who they are)
> but gets 403 for the Pro-only audio feature.)*

---

### Drill prompts
- "Backend mock drill: auth" — expect hashing-vs-encryption, JWT-vs-session, cookie-vs-localStorage,
  and "explain CSRF/XSS" questions. This is your highest-yield backend drill.
- Be ready to defend dropzone's httpOnly-cookie choice on the XSS/CSRF axis.
