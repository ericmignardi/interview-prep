// ── M3: NotesPage ─────────────────────────────────────────────────────────────
// TODO (Milestone 3): Implement the notes list page
//
// 1. On mount: GET /api/notes → list of notes
// 2. Show loading / error / empty states
// 3. Render a <NoteCard> for each note
// 4. Include a <CreateNoteForm> to add new notes
// 5. Logout button: POST /api/auth/logout → setUser(null) → navigate('/login')
//
// M4: Wrap this whole page in <AuthGuard> (or wrap the route in App.tsx)

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: fetch notes
  }, []);

  if (loading) return <p>Loading notes…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Notes</h1>
      {/* TODO: CreateNoteForm + list of NoteCards */}
      {notes.length === 0 && <p>No notes yet. Create your first one!</p>}
    </div>
  );
}
