// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 6 — Combine it all  (strict, NO `any`)
//
// Three tasks, each blending multiple concepts you've learned. Add the types.
// Verify:  npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────

// 1. getProperty — type-safe property access.
//    Generic over T (the object) AND K (a key of T). Returns the value at that key,
//    with the correct type. Combines: generics + constraint + keyof + indexed access.
//    Signature target: <T, K extends keyof T>(obj: T, key: K): T[K]
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 2. updateEntity — merge partial changes into an entity and return the updated one.
//    Generic over T; `changes` should be a Partial<T>. Returns T.
//    Combines: generics + utility type (Partial).
function updateEntity<T>(entity: T, changes: Partial<T>): T {
  return { ...entity, ...changes };
}

// 3. reducer — a discriminated-union reducer over a numeric state.
//    Handle each action by its `type` tag; add a `never` exhaustiveness check in default.
//    Combines: discriminated union + narrowing + never.
type Action =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  // switch on action.type; increment/decrement by action.by; reset → 0
  // default → exhaustiveness check
  switch (action.type) {
    case "increment":
      return state + action.by;
    case "decrement":
      return state - action.by;
    case "reset":
      return 0;
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}

// ── usage — should type-check once everything is typed ───────────────────────
const u = { id: 1, name: "Eric", isAdmin: true };
const id = getProperty(u, "id"); // id: number
const name = getProperty(u, "name"); // name: string

const updated = updateEntity(u, { name: "Bob" }); // still { id; name; isAdmin }

reducer(0, { type: "increment", by: 5 }); // 5
reducer(10, { type: "reset" }); // 0

// ── OPTIONAL: uncomment — each should be a COMPILE ERROR once typed correctly.
// getProperty(u, 'xyz');                  // ❌ 'xyz' is not a key of u
// updateEntity(u, { name: 42 });          // ❌ name must be a string
// reducer(0, { type: 'multiply', by: 2 }); // ❌ not a valid action

export {};
