// ── M4: Central Error Handler ─────────────────────────────────────────────────
// TODO (Milestone 4): Implement the central 4-arg Express error handler
//
// 1. console.error(err) — log the full error server-side
// 2. res.status(500).json({ message: 'Internal server error' }) — safe client message
//
// This must be mounted LAST in src/index.ts (it already is).
// Express identifies it as an error handler by the 4-arg signature.

import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // TODO
  console.error(err); // placeholder — keep this, add the res.status(500) below
  res.status(500).json({ message: 'Internal server error' });
}
