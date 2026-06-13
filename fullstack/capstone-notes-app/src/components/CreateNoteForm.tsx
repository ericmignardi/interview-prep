// ── M3: CreateNoteForm ────────────────────────────────────────────────────────
// TODO (Milestone 3): Form to create a new note
//
// Props: { onCreated: (note: Note) => void }
// 1. Controlled inputs: title + body
// 2. On submit: POST /api/notes { title, body }
// 3. On success: call onCreated(newNote) so the parent list updates immediately
//    (optimistic or post-fetch — your choice)
// 4. Clear the form after success

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

interface Props {
  onCreated: (note: Note) => void;
}

export default function CreateNoteForm({ onCreated }: Props) {
  // TODO: implement
  return (
    <form>
      <input placeholder="Title" />
      <textarea placeholder="Write something…" />
      <button type="submit">Add note</button>
    </form>
  );
}
