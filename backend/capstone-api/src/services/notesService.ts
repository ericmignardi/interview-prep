// ── M3: Notes Service ─────────────────────────────────────────────────────────
// TODO (Milestone 3): Implement notes DB queries
//
// All functions accept userId so they can enforce ownership at the query level
// (filter by userId in WHERE) as an extra safety layer beyond the controller check.

import { prisma } from '../lib/prisma';

export async function getNotesByUser(_userId: string) {
  // TODO: prisma.note.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  throw new Error('Not implemented yet');
}

export async function createNote(
  _userId: string,
  _data: { title: string; body: string }
) {
  // TODO: prisma.note.create({ data: { ...data, userId } })
  throw new Error('Not implemented yet');
}

export async function getNoteById(_id: string) {
  // TODO: prisma.note.findUnique({ where: { id } })
  // Return null if not found — controller handles 404/403
  throw new Error('Not implemented yet');
}

export async function updateNote(
  _id: string,
  _data: { title?: string; body?: string }
) {
  // TODO: prisma.note.update({ where: { id }, data })
  throw new Error('Not implemented yet');
}

export async function deleteNote(_id: string) {
  // TODO: prisma.note.delete({ where: { id } })
  throw new Error('Not implemented yet');
}
