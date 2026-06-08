// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 1 — Type these correctly (strict mode, NO `any`)
//
// Add the right types so this file type-checks with ZERO errors.
// Strict mode is on, so untyped parameters will error ("implicitly has an 'any'
// type") — that's your cue for where types are missing.
//
// Verify:  npx tsc --noEmit
// (run from the interview-prep/ folder. No output = success.)
// ─────────────────────────────────────────────────────────────────────────────

// 1. Type the parameter and the return type.
function double(n: number): number {
  return n * 2;
}

// 2. `role` should only ever be 'admin' | 'editor' | 'viewer'.
//    Type it as a union of string literals so anything else is a compile error.

type Role = "admin" | "editor" | "viewer";

function canDelete(role: Role) {
  return role === "admin";
}

// 3. Narrowing: `id` can be a string OR a number. Always return a string.
//    Type the parameter (union) and the return type.
function formatId(id: string | number): string {
  if (typeof id === "number") return String(id);
  return id;
}

// 4. Describe this object's shape with an `interface` (or `type`) called `User`,
//    then annotate `user` with it.

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

const user: User = {
  name: "Eric",
  age: 30,
  isAdmin: true,
};

// 5. This should return a TUPLE: [string, number]. Add the return type
//    (annotate it so TS treats it as a tuple, not string|number[]).
function getEntry(): [string, number] {
  return ["count", 5];
}

// ── usage (these should all type-check once you've typed things correctly) ────
double(10);
canDelete("admin");
formatId(42);
formatId("abc");
const [key, value] = getEntry(); // key: string, value: number

// ── OPTIONAL: uncomment each — once typed correctly, each should be a COMPILE ERROR.
// canDelete('hacker');   // not a valid role
// double('not a number'); // not a number
// const u: User = { name: 'X' }; // missing age/isAdmin

export {}; // makes this file a module (isolates its scope from other challenge files)
