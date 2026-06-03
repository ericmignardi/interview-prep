# 03 — Auth End-to-End

Auth is the canonical full-stack flow — it touches the UI, the network, the API, and the DB. You've
built it **two ways**: roll-your-own (dropzone: bcrypt + JWT cookie) and a managed provider
(tono: Clerk). Being able to compare them is a strong answer.

> Deep mechanics (hashing, JWT vs session, XSS/CSRF) live in
> [backend/05-auth-and-security.md](../backend/05-auth-and-security.md). This bank is the **end-to-end
> flow** across the stack.

---

## The full flow

> **Q:** Walk me through what happens when a user logs in, end to end. *(dropzone)*
> **A:**
> 1. **UI:** login form (controlled or react-hook-form), POSTs `{ email, password }` to `/api/auth/login`
>    with `credentials: 'include'` so the cookie can be set.
> 2. **API:** `authService.login` looks up the user, `bcrypt.compare`s the password, and on success
>    signs a JWT (`{ userId }`, 7-day expiry).
> 3. **Set credential:** the server sets the JWT in an **httpOnly cookie** on the response.
> 4. **Subsequent requests:** the browser auto-sends the cookie; `authMiddleware` reads
>    `req.cookies.token`, `jwt.verify`s it, attaches `req.user`, else 401.
> 5. **UI reaction:** an auth context provider holds the logged-in state so the app can show the right
>    routes; a 401 from any call bounces the user to login.
> *(Files: `authService.ts`, `authMiddleware.ts`, `context/AuthContextProvider.tsx`.)*

> **Q:** How does a protected request prove who the user is?
> **A:** It carries the credential — the cookie (dropzone) or a session token Clerk manages (tono) —
> and the server verifies it on **every** request. The server never trusts a client-sent user id in
> the body; identity comes from the verified token.
> **🪤 Junior trap:** Sending `userId` from the client and trusting it. Always derive identity from the
> verified session, never from request input. *(tono looks up the user by the Clerk session, not a body
> field.)*

---

## Roll-your-own vs managed provider

> **Q:** dropzone uses your own JWT auth; tono uses Clerk. Compare the tradeoffs.
> **A:**
> - **Roll-your-own (dropzone):** full control, no dependency/cost, and you learn the mechanics. But
>   *you* own every edge: hashing, token lifetime, refresh, reset flows, email verification, and the
>   security risks if you get one wrong.
> - **Managed (Clerk, tono):** handles sign-up/in, sessions, MFA, social login, and security best
>   practices out of the box; you integrate via middleware (`proxy.ts`) and `currentUser()`. Cost is
>   a vendor dependency and less control.
> **The honest junior answer:** "I built my own to understand it, and used Clerk where I wanted to move
> fast and not be responsible for auth security." That shows judgment, not just tool knowledge.

---

## Protecting routes on both sides

> **Q:** How do you protect pages/routes across the stack?
> **A:** Two layers:
> - **Server/API:** middleware gates protected endpoints (dropzone `authMiddleware`; tono's `proxy.ts`
>   defines public routes and `auth.protect()`s the rest). This is the real enforcement.
> - **Client:** route guards / conditional UI hide protected pages and redirect unauthenticated users.
>   This is **UX only** — never security.
> **🪤 Junior trap:** Relying on the client guard for security. Anyone can bypass the UI and hit the
> API directly; the **server** must enforce auth. The client check just improves the experience.

> **Q:** How does the public-vs-private split work in tono?
> **A:** `proxy.ts` (Clerk middleware) holds a public-route matcher — the marketing root and the guest
> generation endpoint are public so a visitor can try one generation; everything else requires a Clerk
> session. Adding a new public route (e.g. a webhook) means adding it to that matcher.

---

## Sessions, expiry, logout

> **Q:** What happens on logout, and how do you expire a session?
> **A:** Clear the credential — delete/expire the cookie (and server session if stateful). With a
> stateless JWT you can't truly revoke before expiry, so you keep lifetimes short and/or maintain a
> refresh token + denylist. *(dropzone's JWT is 7 days; a production hardening would be a short access
> token + refresh.)*

---

### Drill prompts
- "Full-stack mock drill: auth" — expect "walk me through login end to end" and "where is auth actually
  enforced" questions.
- Be ready to compare your roll-your-own (dropzone) vs managed (Clerk) auth with honest tradeoffs.
