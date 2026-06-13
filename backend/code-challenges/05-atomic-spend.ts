// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 05 — Atomic Credit Spend (the tono pattern)
//
// Write `POST /api/credits/spend` that atomically:
//   1. Checks the authenticated user has remaining credits (used < limit)
//   2. Decrements their used count by 1
//   3. Returns 200 { ok: true } on success
//   4. Returns 403 { message: 'No remaining credits' } if exhausted
//
// WHY a transaction?
// Without one, two concurrent requests can both pass the "used < limit" check
// before either has written its increment — both succeed and the user overspends.
// A Prisma transaction serialises the read + write so only one can win.
//
// Requirements:
// - Use prisma.$transaction(async (tx) => { ... })
// - Inside the transaction: findUnique to read, then update to increment
// - Throw an error (with a status hint) inside the transaction if exhausted —
//   the transaction rolls back automatically when you throw
// - req.user is available (assume auth middleware ran)
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import type { PrismaClientLike } from './_prisma';

declare const prisma: PrismaClientLike;

// A simple typed error to carry the HTTP status through the catch block
class HttpError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function spendCredit(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // TODO: implement
  // const userId = req.user!.userId;
  // try {
  //   await prisma.$transaction(async (tx) => {
  //     const u = await tx.user.findUnique({ where: { id: userId }, select: { used: true, limit: true } });
  //     if (!u || u.used! >= u.limit!) throw new HttpError(403, 'No remaining credits');
  //     await tx.user.update({ where: { id: userId }, data: { used: u.used! + 1 } });
  //   });
  //   res.status(200).json({ ok: true });
  // } catch (err) {
  //   if (err instanceof HttpError) return res.status(err.status).json({ message: err.message });
  //   next(err);
  // }
}
