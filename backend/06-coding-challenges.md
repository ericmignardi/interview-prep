# 06 — Backend Coding Challenges

Small, realistic backend tasks. **Attempt before opening the solution.** In chat, say
"Backend coding challenge" and I'll hand you one, watch you build it, then review correctness,
security, status codes, and error handling.

---

## Tier 1 — fundamentals (10–15 min)

**1.1 Auth middleware** — Write Express middleware that reads a JWT from an httpOnly cookie,
verifies it, attaches `req.user`, and responds 401 if missing/invalid. Type `req.user`.

**1.2 Validated POST** — A `POST /api/users` handler that validates `{ email, name }` with Zod,
returns 400 + issues on bad input, 201 + the created user on success. Assume a `createUser` service.

**1.3 Async error handling** — Given a handler that `await`s a DB call which can throw, make sure the
error reaches a central error handler and the client gets a safe message + correct status (not a stack trace).

---

## Tier 2 — design + logic (20–30 min)

**2.1 Paginated list endpoint** — `GET /api/files?page=&limit=` returning `{ data, page, limit, total,
totalPages, hasNextPage }`. Run the list + count concurrently. Validate/clamp `limit`.

**2.2 Idempotent-ish action with a transaction** — A `POST /api/credits/spend` that, atomically,
checks a user has remaining credits and decrements by one — safe under concurrent requests. Return 403
if exhausted. (This is the tono pattern — rebuild it from scratch.)

**2.3 Rate-limited route** — Add a per-user rate limit to a route (10 req/min); return 429 when exceeded.
Talk through where the counter lives (in-memory vs Redis) and why memory breaks across instances.

---

## Tier 3 — talk-through (no code required, explain the design)

**3.1** Design the endpoints + data model for a "share a file via expiring link" feature (dropzone's
actual domain). What tables, what routes, how does expiry work, what status codes?

**3.2** A user reports "sometimes my upload succeeds but I get an error." Walk through how you'd debug
it across the stack (logs, request id, where the failure could be: client, multer, Cloudinary, DB).

---

<details>
<summary><b>Solutions — Tier 1</b> (try first!)</summary>

```ts
// 1.1 Auth middleware (mirrors dropzone authMiddleware.ts)
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// augment Express's Request type (see src/types/express/index.d.ts pattern)
// declare global { namespace Express { interface Request { user?: { userId: string } } } }

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized - token required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
```

```ts
// 1.2 Validated POST
import { z } from 'zod';

const CreateUser = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).max(100),
});

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
  const parsed = CreateUser.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Validation failed', issues: parsed.error.issues });
  }
  try {
    const user = await createUser(parsed.data); // service
    return res.status(201).json({ user });
  } catch (err) {
    next(err); // hand to central error handler
  }
}
```

```ts
// 1.3 Async error handling
// In Express 5, a rejected promise auto-forwards to the error handler.
// In Express 4, wrap it:
const asyncHandler = (fn: RequestHandler): RequestHandler =>
  (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// error handler (4 args → Express treats it as the error middleware), mounted LAST:
function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err); // log full detail server-side
  res.status(500).json({ message: 'Internal server error' }); // safe client message
}
```

</details>

<details>
<summary><b>Solutions — Tier 2</b></summary>

```ts
// 2.1 Paginated list
const Query = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export async function listFiles(req: Request, res: Response, next: NextFunction) {
  const parsed = Query.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ issues: parsed.error.issues });
  const { page, limit } = parsed.data;

  try {
    const [data, total] = await Promise.all([          // concurrent, not sequential
      prisma.file.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.file.count(),
    ]);
    const totalPages = Math.ceil(total / limit);
    res.json({ data, page, limit, total, totalPages, hasNextPage: page < totalPages });
  } catch (err) { next(err); }
}
```

```ts
// 2.2 Atomic spend (the tono pattern)
export async function spendCredit(req: Request, res: Response, next: NextFunction) {
  const userId = req.user!.userId;
  try {
    await prisma.$transaction(async (tx) => {
      const u = await tx.user.findUnique({ where: { id: userId }, select: { used: true, limit: true } });
      if (!u || u.used >= u.limit) {
        throw new HttpError(403, 'No remaining credits');
      }
      await tx.user.update({ where: { id: userId }, data: { used: { increment: 1 } } });
    });
    res.status(200).json({ ok: true });
  } catch (err) { next(err); }
}
// The check + increment inside one transaction prevents two concurrent requests
// from both passing the check and overspending.
```

```ts
// 2.3 Rate limit — note: in-memory counters don't work across multiple instances
// (each process has its own map). Use a shared store (Redis) in production.
import rateLimit from 'express-rate-limit';
const spendLimiter = rateLimit({
  windowMs: 60_000, max: 10,
  keyGenerator: (req) => req.user?.userId ?? req.ip,
  handler: (_req, res) => res.status(429).json({ message: 'Too many requests' }),
});
// app.use('/api/credits/spend', spendLimiter);
```

</details>

---

### What reviewers grade
1. **Correct status codes** (201/400/401/403/429/500 in the right places).
2. **Validation before logic**, and **never trusting client input**.
3. **Error handling** — central handler, safe client messages, full logs server-side, `return` after responding.
4. **Concurrency awareness** — transactions for check-then-write, `Promise.all` for independent calls.
5. **Security reflexes** — hashed passwords, parameterized queries, auth on protected routes.
