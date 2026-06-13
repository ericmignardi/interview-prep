// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 02 — Validated POST Handler
//
// Write a `POST /api/users` route handler that:
// 1. Validates the request body with Zod: { email: string (email), name: string (min 1, max 100) }
// 2. On invalid input → 400 + { message: 'Validation failed', issues: parsed.error.issues }
// 3. On valid input → call the (provided) `createUser` service, return 201 + { user }
// 4. Pass any service errors to `next(err)` for the central error handler
//
// Key patterns to use:
//   - z.object({ ... }).safeParse(req.body)   ← never throws, returns { success, data, error }
//   - return res.status(400).json(...)         ← always `return` after responding so execution stops
//   - next(err)                                ← hands errors to the central handler; don't res.send after
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Provided service — assume it's imported from a services layer
declare function createUser(data: { email: string; name: string }): Promise<{
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}>;

// TODO: define the Zod schema
const CreateUserSchema = z.object({
  // email: ...
  // name: ...
});

export async function createUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODO: implement
  // 1. safeParse req.body against CreateUserSchema
  // 2. if (!parsed.success) → return res.status(400).json(...)
  // 3. try { const user = await createUser(parsed.data); return res.status(201).json({ user }); }
  // 4. catch (err) { next(err); }
}
