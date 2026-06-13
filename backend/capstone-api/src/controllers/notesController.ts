// ── M3: Notes Controllers ──────────────────────────────────────────────────────
// TODO (Milestone 3): Implement CRUD handlers for notes
//
// listNotes:   GET  /api/notes       → 200 + { notes } (user's notes, newest first)
// createNote:  POST /api/notes       → validate { title, body }; 201 + { note }
// getNote:     GET  /api/notes/:id   → 200 + { note }; 403 if not owner; 404 if missing
// updateNote:  PATCH /api/notes/:id  → validate partial { title?, body? }; 200 + { note }; 403/404
// deleteNote:  DELETE /api/notes/:id → 204; 403 if not owner; 404 if missing
//
// Ownership check: note.userId !== req.user!.userId → 403 Forbidden
// (Return 403, not 404 — don't leak that the resource exists for another user)

import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as notesService from '../services/notesService';

const CreateNoteSchema = z.object({
  title: z.string().min(1).max(255),
  body: z.string(),
});

const UpdateNoteSchema = CreateNoteSchema.partial();

export async function listNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function getNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function updateNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function deleteNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}
