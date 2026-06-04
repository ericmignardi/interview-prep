// ─────────────────────────────────────────────────────────────────────────────
// Challenge 2 — Closures
//
// A closure = a function that "remembers" variables from the scope where it was
// DEFINED, even after that outer function has returned. That remembered variable
// is effectively PRIVATE — only the inner function can touch it.
//
// Run it:  node closures.js
// ─────────────────────────────────────────────────────────────────────────────

// ── Part 1 — createCounter ───────────────────────────────────────────────────
// Write `createCounter()` that returns a FUNCTION. Each time you call that
// returned function, it increments a private count and returns the new value.
// Two separate counters must NOT share state.
//
//   const next = createCounter();
//   next(); // 1
//   next(); // 2
//   next(); // 3
//
// Hint: declare a `count` variable inside createCounter, then return a function
// that uses it. The returned function "closes over" count.

function createCounter() {
  let count = 0;
  return () => ++count;
}

// ── Part 2 — once ────────────────────────────────────────────────────────────
// Write `once(fn)` that returns a new function which calls `fn` only the FIRST
// time it's invoked. Every later call should skip fn and return that first
// result. (Classic real-world use: "initialize this only once".)
//
// Hint: close over two things — a boolean "has it run yet?" and the cached result.

function once(fn) {
  let hasRun = false;
  let result;

  return () => {
    if (!hasRun) {
      result = fn();
      hasRun = true;
    }

    return result;
  };
}

// ── tests ────────────────────────────────────────────────────────────────────
console.log("--- createCounter ---");
const next = createCounter();
console.log(next()); // expected: 1
console.log(next()); // expected: 2
console.log(next()); // expected: 3

const other = createCounter();
console.log(other()); // expected: 1   ← independent state, not 4
console.log(next()); // expected: 4    ← original counter unaffected by `other`

console.log("--- once ---");
let calls = 0;
const init = once(() => {
  calls++;
  return "initialized";
});
console.log(init()); // expected: "initialized"  (runs fn)
console.log(init()); // expected: "initialized"  (cached, does NOT run fn again)
console.log(init()); // expected: "initialized"
console.log(calls); // expected: 1   ← fn ran exactly once
