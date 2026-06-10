// ─────────────────────────────────────────────────────────────────────────────
// TS Challenge 2 — Generics  (strict mode, NO `any`)
//
// Make each function GENERIC so types flow from input to output. The bodies are
// already written — you only add the type parameters (<T>, etc.) and annotations.
//
// Verify:  npx tsc --noEmit   (from interview-prep/. No output = pass.)
// ─────────────────────────────────────────────────────────────────────────────

// 1. identity — returns its argument unchanged. Same type in = same type out.
//    Add <T>: param is T, return is T.
function identity<T>(value: T): T {
  return value;
}

// 2. lastItem — return the last element of an array, or undefined if empty.
//    Generic over the element type. Return should be T | undefined.
function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// 3. pair — take two values of POSSIBLY DIFFERENT types, return them as a tuple.
//    Needs TWO type params (e.g. <T, U>). Return type: [T, U].
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

// 4. CONSTRAINED generic — getId accepts anything that has a numeric `id`,
//    and returns that id. Use <T extends { id: number }>.
function getId<T extends { id: number }>(item: T) {
  return item.id;
}

// ── usage — these demonstrate the types flowing through (should all be fine) ──
const n = identity(42); // n: number
const s = identity("hi"); // s: string
n.toFixed(2); // ✅ only valid if identity preserved `number`
s.toUpperCase(); // ✅ only valid if identity preserved `string`

const lastNum = lastItem([1, 2, 3]); // number | undefined
const p = pair("age", 30); // [string, number]
const [label, count] = p; // label: string, count: number

getId({ id: 5, name: "Eric" }); // ✅ has a numeric id

// ── OPTIONAL: uncomment each — once typed correctly, each should be a COMPILE ERROR.
// getId({ name: 'no id here' });        // ❌ no `id` property
// const wrong: string = identity(42);   // ❌ number is not assignable to string

export {}; // makes this file a module (isolates its scope from other challenge files)
