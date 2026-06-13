// ── M3: NoteCard ──────────────────────────────────────────────────────────────
// TODO (Milestone 3): A card linking to a note's detail page
//
// Props: { id: string; title: string; createdAt: string }
// Renders a clickable card that navigates to /notes/:id on click.

import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  createdAt: string;
}

export default function NoteCard({ id, title, createdAt }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/notes/${id}`)}
      style={{ cursor: 'pointer' }}
    >
      <h2>{title}</h2>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
}
