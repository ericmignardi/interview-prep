// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 3 — Utility Types  (strict mode, NO `any`)
//
// Use the right built-in utility type for each task. DERIVE from `User` — don't
// hand-write new shapes. Replace each `TODO_*` placeholder type.
//
// Verify:  npx tsc --noEmit   (from interview-prep/. No output = pass.)
// ─────────────────────────────────────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

type Role = "admin" | "editor" | "viewer";

// 1. `updateUser` takes an id and a set of changes that may include ANY subset of
//    User's fields. Type `changes` so callers can pass only the fields they want.
//    (Hint: optional everything.)
function updateUser(id: number, changes: Partial<User>) {
  // pretend we merge `changes` into the stored user
  return changes;
}

// 2. `PublicUser` = a User WITHOUT the `email` field (safe to send to the client).
type PublicUser = Omit<User, "email">;

// 3. `UserCredentials` = ONLY the `id` and `email` fields of User.
type UserCredentials = Pick<User, "id" | "email">;

// 4. `RolePermissions` = an object mapping each Role to a boolean (can they delete?).
type RolePermissions = Record<Role, boolean>;

// 5. `NewUser` = a User with NO `id` yet (the DB assigns it), all other fields required.
type NewUser = Omit<User, "id">;

// ── usage — should all type-check once your types are right ───────────────────
updateUser(1, { name: "New Name" }); // partial update — only one field
updateUser(1, { name: "X", isAdmin: true }); // multiple fields

const pub: PublicUser = { id: 1, name: "Eric", isAdmin: false }; // no email ✅
const creds: UserCredentials = { id: 1, email: "e@x.com" }; // only id + email ✅

const perms: RolePermissions = { admin: true, editor: true, viewer: false };

const draft: NewUser = { name: "Eric", email: "e@x.com", isAdmin: false }; // no id ✅

// ── OPTIONAL: uncomment — each should be a COMPILE ERROR once typed correctly.
// const bad: PublicUser = { id: 1, name: 'X', email: 'leak@x.com', isAdmin: false }; // email shouldn't exist
// const bad2: NewUser = { id: 5, name: 'X', email: 'e@x.com', isAdmin: false };       // id shouldn't exist
// const bad3: RolePermissions = { admin: true };  // missing editor & viewer

export {}; // makes this file a module (isolates its scope from other challenge files)
