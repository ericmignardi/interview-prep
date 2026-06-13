// ─────────────────────────────────────────────────────────────────────────────
// Full-Stack Challenge FS1 — Complete Loading State Lifecycle
//
// The most common junior gap: they implement the happy path but forget the
// loading spinner, error state, and empty state. This challenge forces all four.
//
// Build a <UserProfile userId={string}> component that:
//
// 1. On mount (and when userId changes): fetch `/api/users/{userId}`
//    — response shape: { id: string; name: string; email: string; bio: string }
//    — check res.ok; throw if false
// 2. Show ALL four UI states:
//    — loading  → <p data-testid="loading">Loading profile…</p>
//    — error    → <p data-testid="error">{error.message}</p>
//    — empty    → <p data-testid="empty">User not found</p>  (404 or null data)
//    — data     → <div data-testid="profile">
//                   <h1>{name}</h1>
//                   <p>{email}</p>
//                   <p>{bio}</p>
//                 </div>
// 3. When userId prop changes, reset to loading and re-fetch (no stale data shown)
// 4. Cancel the in-flight fetch if the component unmounts or userId changes
//    (AbortController in useEffect cleanup)
//
// Full-stack lesson: this component is the CLIENT SIDE of the fetch lifecycle.
// The server side (the /api/users/:id endpoint) is backend challenge 01-auth-middleware
// and 02-validated-post — building BOTH and connecting them is what makes it full-stack.
//
// Run tests: npx vitest run 01-loading-states
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface Props {
  userId: string;
}

export default function UserProfile({ userId }: Props) {
  // TODO: data, loading, error state

  useEffect(() => {
    // TODO: fetch + abort + states
  }, [userId]);

  // TODO: render all four states
  return <div />;
}
