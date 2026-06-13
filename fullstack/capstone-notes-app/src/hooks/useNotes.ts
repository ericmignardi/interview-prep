// ── M3: useNotes hook ──────────────────────────────────────────────────────────
// TODO (Milestone 3): Extract notes fetching + mutation logic out of the page
//
// Returns: { notes, loading, error, addNote, removeNote }
//
// addNote(note)    — prepend a new note to the list (after a successful POST)
// removeNote(id)   — filter out a deleted note from the list
//
// This is the "extract hook" refactor pattern: move stateful logic out of
// components into a reusable hook so the page component is clean.

import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: fetch /api/notes
  }, []);

  function addNote(note: Note) {
    // TODO: prepend to notes
  }

  function removeNote(id: string) {
    // TODO: filter out
  }

  return { notes, loading, error, addNote, removeNote };
}
