// ── M4: AuthGuard ─────────────────────────────────────────────────────────────
// TODO (Milestone 4): Redirect unauthenticated users to /login
//
// 1. Read { user, loading } from useAuth()
// 2. While loading → show a spinner / "Checking…" message
// 3. If !user → <Navigate to="/login" replace />
// 4. Otherwise → render {children}

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking auth…</p>; // TODO: replace with a real spinner

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
