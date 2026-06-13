// ── M2: AuthContext ────────────────────────────────────────────────────────────
// TODO (Milestone 2): Implement auth context
//
// 1. Define User type: { id: string; name: string; email: string }
// 2. Create context with { user: User | null; setUser: ... ; loading: boolean }
// 3. AuthProvider:
//    - on mount: GET /api/auth/me to hydrate user (loading = true until resolved)
//    - exposes user + setUser to the whole app
// 4. useAuth() hook — throw if used outside AuthProvider
//
// Then in src/main.tsx, wrap <App> with <AuthProvider>

import { createContext, useContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  setUser: (u: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // TODO: state + /api/auth/me fetch on mount
  return <AuthContext.Provider value={{ user: null, setUser: () => {}, loading: false }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
