# Backend Code Challenges

Hands-on coding practice for the backend track. Each challenge is a TypeScript stub
you implement to match the requirements in the file header.

## Setup (do this once before starting the backend track)

```bash
cd backend/code-challenges
npm install
```

## Type-checking

```bash
cd backend/code-challenges
npx tsc --noEmit
```

No output = all types pass. These are not runnable against a real server — they're
designed to practice the patterns and get them to type-check correctly.

---

## Challenges

| # | File | Topic | Status |
|---|---|---|---|
| 1 | [01-auth-middleware.ts](01-auth-middleware.ts) | JWT cookie auth middleware | scratch |
| 2 | [02-validated-post.ts](02-validated-post.ts) | Zod validation + POST handler | scratch |
| 3 | [03-async-error-handling.ts](03-async-error-handling.ts) | asyncHandler wrapper + central error handler | scratch |
| 4 | [04-paginated-list.ts](04-paginated-list.ts) | Pagination + concurrent count query | scratch |
| 5 | [05-atomic-spend.ts](05-atomic-spend.ts) | Prisma transaction (the tono pattern) | scratch |
| 6 | [06-rate-limited-route.ts](06-rate-limited-route.ts) | express-rate-limit per-user | scratch |

---

## Notes

- `_prisma.ts` is a local type mock of the Prisma client — it lets the challenge
  files type-check without a real Prisma schema. The backend capstone uses the real client.
- Solutions are in `backend/06-coding-challenges.md` (collapsed `<details>` blocks).
- In a session say **"Backend coding challenge"** and Claude will hand you one, watch you
  build it, then review correctness, security, and status codes.
