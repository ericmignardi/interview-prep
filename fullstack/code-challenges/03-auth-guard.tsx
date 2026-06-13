// ─────────────────────────────────────────────────────────────────────────────
// Full-Stack Challenge FS3 — Auth Guard / Protected Route
//
// A common full-stack pattern: a component that checks auth state and either
// renders protected content OR redirects to login. This mirrors how React Router's
// <PrivateRoute> works and how tono/dropzone gate their pages.
//
// Build two things:
//
// 1. useAuth() hook — simulates reading auth state from a context or API call
//    - returns { user: User | null; loading: boolean }
//    - on mount: fetch /api/auth/me
//      → if 200: { user: parsed JSON, loading: false }
//      → if 401: { user: null, loading: false }
//      → while pending: { user: null, loading: true }
//
// 2. <AuthGuard children onRedirect> component
//    Props: { children: React.ReactNode; onRedirect: () => void }
//    - while loading: <p data-testid="loading">Checking auth…</p>
//    - if user is null (unauthenticated): call onRedirect(); return null
//    - if user exists: render {children}
//
// Full-stack lesson: the server side is GET /api/auth/me (backend capstone M2).
// The client side trusts the httpOnly cookie to be sent automatically by the browser.
// The UI never stores the token — it relies on the server validating the cookie.
//
// Run tests: npx vitest run 03-auth-guard
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

// ── useAuth hook ──────────────────────────────────────────────────────────────
export function useAuth(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch /api/auth/me
    // on 200: setUser(data); setLoading(false)
    // on 401 or error: setUser(null); setLoading(false)
    setLoading(false); // remove this placeholder
  }, []);

  return { user, loading };
}

// ── AuthGuard component ───────────────────────────────────────────────────────
interface AuthGuardProps {
  children: React.ReactNode;
  onRedirect: () => void;
}

export function AuthGuard({ children, onRedirect }: AuthGuardProps) {
  const { user, loading } = useAuth();

  // TODO: loading state
  // TODO: if !user → call onRedirect() + return null
  // TODO: render children

  return <div>{children}</div>; // replace this
}
