// ── M2: Auth Service ───────────────────────────────────────────────────────────
// TODO (Milestone 2): Implement the auth business logic
//
// registerUser({ email, name, password }):
//   1. Check if email is already taken (findUnique) → throw if so (409)
//   2. Hash the password: await bcrypt.hash(password, 12)
//   3. Create the user in DB
//   4. Sign JWT: jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
//   5. Return { user (without passwordHash), token }
//
// loginUser({ email, password }):
//   1. Find user by email (include passwordHash)
//   2. If not found → throw 401 (don't reveal "email not found" — say "Invalid credentials")
//   3. bcrypt.compare(password, user.passwordHash) → throw 401 if false
//   4. Sign JWT + return { user, token }
//
// getUserById(userId):
//   1. prisma.user.findUnique({ where: { id: userId }, select: { passwordHash: false, ... } })
//   2. Return user (never return passwordHash)

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export async function registerUser(_data: {
  email: string;
  name: string;
  password: string;
}): Promise<{ user: object; token: string }> {
  // TODO
  throw new Error('Not implemented yet');
}

export async function loginUser(_data: {
  email: string;
  password: string;
}): Promise<{ user: object; token: string }> {
  // TODO
  throw new Error('Not implemented yet');
}

export async function getUserById(_userId: string): Promise<object> {
  // TODO
  throw new Error('Not implemented yet');
}
