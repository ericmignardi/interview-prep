import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  listNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController';

export const notesRouter = Router();

// All notes routes are protected
notesRouter.use(authMiddleware);

// GET    /api/notes
notesRouter.get('/', listNotes);

// POST   /api/notes
notesRouter.post('/', createNote);

// GET    /api/notes/:id
notesRouter.get('/:id', getNote);

// PATCH  /api/notes/:id
notesRouter.patch('/:id', updateNote);

// DELETE /api/notes/:id
notesRouter.delete('/:id', deleteNote);
