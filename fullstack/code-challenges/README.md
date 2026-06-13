# Full-Stack Code Challenges

Challenges that sit at the seam between frontend and backend — the patterns that appear
most in full-stack junior interviews and take-homes.

## Running tests

```bash
# From the repo root:
npx vitest run fullstack/code-challenges/<Name>

# Watch mode:
npx vitest fullstack/code-challenges/<Name>
```

---

## Challenges

| # | File | Topic | Status |
|---|---|---|---|
| FS1 | [01-loading-states.tsx](01-loading-states.tsx) | All four UI states (loading/error/empty/data) + abort | scratch |
| FS2 | [02-optimistic-update.tsx](02-optimistic-update.tsx) | Optimistic increment + rollback on failure | scratch |
| FS3 | [03-auth-guard.tsx](03-auth-guard.tsx) | useAuth hook + AuthGuard (protected route pattern) | scratch |

---

## What these test

**FS1** — The most common gap: developers build the happy path and ship a spinner-less,
error-less UI. This forces every state, plus cancellation of stale fetches.

**FS2** — Optimistic UI is a senior signal in a junior interview. Shows you understand
the async nature of the client-server boundary and can handle failure gracefully.

**FS3** — Auth guards are in every production app. Tests whether you understand the
cookie-based session model and where auth state lives client-side.
