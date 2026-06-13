# Backend Capstone — Notes REST API

Build a small but production-shaped REST API from scratch. The stack mirrors dropzone:
**Express + TypeScript + Zod + Prisma (SQLite) + JWT-in-cookie auth**.

---

## What you're building

A personal notes app API with full auth:
- Register / login / logout
- Create, read, update, delete notes (protected — only the owner's notes)

This covers every concept in the backend track in one cohesive project.

---

## Milestones

### M1 — Project setup & "hello world"
- [x] package.json, tsconfig.json, nodemon/ts-node-dev
- [x] Minimal Express app (`src/index.ts`) — GET /health → 200 { ok: true }
- [x] Prisma init with SQLite, define schema, run first migration

### M2 — Auth endpoints
- [ ] `POST /api/auth/register` — validate body (Zod), hash password (bcryptjs),
       create user, sign JWT, set httpOnly cookie, return 201 + user
- [ ] `POST /api/auth/login`    — find user, compare hash, sign JWT, set cookie, 200 + user
- [ ] `POST /api/auth/logout`   — clear cookie, 200
- [ ] `GET  /api/auth/me`       — protected (authMiddleware), return current user

### M3 — Notes CRUD
- [ ] `GET    /api/notes`        — list the authenticated user's notes (newest first)
- [ ] `POST   /api/notes`        — create a note { title, body }; validate with Zod
- [ ] `GET    /api/notes/:id`    — fetch one note (403 if not owner)
- [ ] `PATCH  /api/notes/:id`    — update title/body (403 if not owner)
- [ ] `DELETE /api/notes/:id`    — delete (403 if not owner)

### M4 — Hardening
- [ ] Central error handler (4-arg)
- [ ] Rate limit on auth endpoints (express-rate-limit)
- [ ] CORS config
- [ ] Helmet for security headers

---

## Running the project

```bash
cd backend/capstone-api
npm install
npx prisma migrate dev --name init
npm run dev
```

Test with curl or a tool like Insomnia / Thunder Client:

```bash
# Health check
curl http://localhost:3001/health

# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","password":"secret123"}' \
  -c cookies.txt

# List notes (uses the cookie)
curl http://localhost:3001/api/notes -b cookies.txt
```

---

## Project structure

```
src/
  index.ts              ← Express app setup + mount routes
  middleware/
    auth.ts             ← JWT cookie auth middleware
    errorHandler.ts     ← central 4-arg error handler
  routes/
    auth.ts             ← /api/auth/* router
    notes.ts            ← /api/notes/* router
  controllers/
    authController.ts   ← register/login/logout/me handlers
    notesController.ts  ← CRUD handlers
  services/
    authService.ts      ← DB + bcrypt + JWT logic
    notesService.ts     ← DB logic (Prisma queries)
  lib/
    prisma.ts           ← Prisma client singleton
  types/
    express.d.ts        ← augment Request with user
prisma/
  schema.prisma
.env.example
```
