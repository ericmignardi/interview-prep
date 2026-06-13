// ── M3: NoteDetailPage ────────────────────────────────────────────────────────
// TODO (Milestone 3): View + edit + delete a single note
//
// 1. Read :id from useParams()
// 2. On mount: GET /api/notes/:id → { note }
// 3. Inline edit: toggle between display mode and edit form (title + body)
//    - PATCH /api/notes/:id on save
// 4. Delete button: DELETE /api/notes/:id → navigate('/notes')
// 5. Show loading / error / 404 states

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // TODO: fetch note by id
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div>
      {editing ? (
        <div>
          {/* TODO: edit form (title + body) with save + cancel */}
        </div>
      ) : (
        <div>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          {/* TODO: edit + delete buttons */}
        </div>
      )}
    </div>
  );
}
