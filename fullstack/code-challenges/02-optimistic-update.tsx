// ─────────────────────────────────────────────────────────────────────────────
// Full-Stack Challenge FS2 — Optimistic Update with Rollback
//
// Optimistic UI: update the local state immediately (before the server confirms),
// then roll back if the server request fails. This makes the app feel instant.
//
// Build a <LikeButton noteId={string} initialLikes={number}> component that:
//
// 1. Shows a "♥ {count} likes" button
// 2. On click:
//    a. Immediately increment the displayed count (optimistic update)
//    b. Call PATCH /api/notes/{noteId}/like (no body needed)
//    c. If the request FAILS → roll back to the previous count + show an error
//    d. Disable the button while the request is in flight (prevent double-click)
// 3. Display <p data-testid="error"> when rolled back (clear it on next click)
//
// Full-stack lesson: the server endpoint would be a Prisma increment inside a
// transaction. The client side (this component) doesn't need to wait for the
// server — it trusts it will succeed, and has a recovery path if it doesn't.
//
// Run tests: npx vitest run 02-optimistic-update
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';

interface Props {
  noteId: string;
  initialLikes: number;
}

export default function LikeButton({ noteId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  // TODO: loading + error state

  async function handleLike() {
    // TODO:
    // 1. Set loading, clear error
    // 2. const prev = likes; setLikes(l => l + 1)  ← optimistic
    // 3. try { await fetch(..., { method: 'PATCH' }); check res.ok }
    // 4. catch/non-ok: setLikes(prev); setError('Failed to like — try again')
    // 5. finally: setLoading(false)
  }

  return (
    <div>
      <button onClick={handleLike} /* TODO: disabled while loading */>
        ♥ {likes} likes
      </button>
      {/* TODO: error message */}
    </div>
  );
}
