// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 04 — Paginated List Endpoint
//
// Write `GET /api/files?page=&limit=` that returns:
//   { data, page, limit, total, totalPages, hasNextPage }
//
// Requirements:
// 1. Parse + validate query params with Zod:
//      page  → coerce to int, positive, default 1
//      limit → coerce to int, positive, max 100, default 20
//    On invalid → 400 + { issues }
// 2. Run the list query and count CONCURRENTLY (Promise.all — not sequentially)
//    This is a key correctness point interviewers listen for.
// 3. Compute: skip = (page - 1) * limit; totalPages = Math.ceil(total / limit)
// 4. Return 200 + the shape above; pass DB errors to next(err)
//
// Use the prisma mock from _prisma.ts for the DB calls.
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import type { PrismaClientLike } from './_prisma';

declare const prisma: PrismaClientLike;

// TODO: define QuerySchema with page + limit
const QuerySchema = z.object({
  // page:  ...
  // limit: ...
});

export async function listFiles(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODO: implement
  // 1. safeParse req.query
  // 2. if invalid → 400
  // 3. const { page, limit } = parsed.data
  // 4. const [data, total] = await Promise.all([prisma.file.findMany(...), prisma.file.count()])
  // 5. res.json({ data, page, limit, total, totalPages, hasNextPage })
}
