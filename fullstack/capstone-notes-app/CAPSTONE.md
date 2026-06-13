# Full-Stack Capstone — Notes App (React SPA)

The frontend half of the full-stack capstone. This React SPA connects to the
**backend capstone** (`backend/capstone-api`) which you build first.

Stack: **Vite + React + TypeScript** (same as capstone-watchlist, but with auth
and a real API instead of a mock).

---

## What you're building

A personal notes app with login-gated access:
- Sign up / sign in / sign out
- View your notes list
- Create, edit, delete notes
- All API calls to the backend capstone

---

## Milestones

### M1 — Project setup
- [x] Vite + React + TS scaffold
- [x] Base routing (react-router-dom): `/login`, `/notes`, `/notes/:id`
- [x] API utility (`src/lib/api.ts`) for typed fetch calls

### M2 — Auth UI
- [ ] `AuthContext` — holds `{ user, setUser }` app-wide
- [ ] `LoginPage` — email + password form → POST /api/auth/login → redirect to /notes
- [ ] `RegisterPage` — email + name + password → POST /api/auth/register
- [ ] Auto-check session on load (GET /api/auth/me) and populate AuthContext
- [ ] Logout button → POST /api/auth/logout → clear context → redirect /login

### M3 — Notes UI
- [ ] `NotesPage` — protected; fetches + lists all notes (title + createdAt)
- [ ] `NoteDetailPage` — view a single note; edit inline; delete button
- [ ] `CreateNoteForm` — title + body; POST → optimistically add to list
- [ ] Loading / error / empty states everywhere

### M4 — Polish
- [ ] `AuthGuard` component — redirect to /login if not authenticated
- [ ] Error boundary wrapping the app
- [ ] Correct form validation (Zod or manual)

---

## Running the project

```bash
# Start the backend first (in one terminal):
cd backend/capstone-api
npm run dev

# Then start the frontend (in another terminal):
cd fullstack/capstone-notes-app
npm install
npm run dev
# → http://localhost:5173
```

---

## Project structure

```
src/
  main.tsx              ← React entry + Router
  App.tsx               ← Route definitions
  lib/
    api.ts              ← typed fetch wrapper (baseURL, credentials: 'include')
  context/
    AuthContext.tsx      ← user + setUser (STUB)
  pages/
    LoginPage.tsx        ← (STUB)
    RegisterPage.tsx     ← (STUB)
    NotesPage.tsx        ← (STUB)
    NoteDetailPage.tsx   ← (STUB)
  components/
    AuthGuard.tsx        ← (STUB)
    NoteCard.tsx         ← (STUB)
    CreateNoteForm.tsx   ← (STUB)
  hooks/
    useNotes.ts          ← (STUB) — fetches + manages notes list
```
