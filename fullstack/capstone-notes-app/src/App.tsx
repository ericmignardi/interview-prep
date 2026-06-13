// ── M1: App routing ────────────────────────────────────────────────────────────
// Routes are wired up. The pages are stubs — implement them milestone by milestone.
//
// M2: Wrap with <AuthProvider> once you've built AuthContext
// M4: Wrap protected routes with <AuthGuard> once you've built it

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
      <Route path="*" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
}
