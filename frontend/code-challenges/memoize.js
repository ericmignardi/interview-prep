// ─────────────────────────────────────────────────────────────────────────────
// Challenge 7 — memoize  (the capstone: closures + cache + purity)
//
// Write `memoize(fn)` that returns a new function which CACHES results by input.
// The first time it's called with a given argument, it runs `fn` and stores the
// result. Every later call with the SAME argument returns the cached result
// WITHOUT running `fn` again.
//
// (Only safe on PURE functions — same input always gives the same output, so the
//  cached value is always valid.)
//
// Requirements:
//   - Use a closure to hold the cache (an object or a Map) that persists across calls.
//   - Key the cache by the argument.
//   - On a cache hit, return the stored value and DO NOT call fn.
//   - Assume fn takes a single argument (keep it simple).
//
// Hints:
//   - if the arg is already a key in the cache → return cache[arg]
//   - otherwise → compute fn(arg), store it in cache, return it
//
// Run it:  node memoize.js
// ─────────────────────────────────────────────────────────────────────────────

function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (arg in cache) return cache[arg];
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

// ── test harness ─────────────────────────────────────────────────────────────
// `slowSquare` logs each time it actually RUNS, so we can prove the cache works.

let computeCount = 0;
function slowSquare(n) {
  computeCount++; // counts real computations
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // expected: 25  (computes — first time)
console.log(fastSquare(5)); // expected: 25  (CACHED — should NOT recompute)
console.log(fastSquare(5)); // expected: 25  (cached)
console.log(fastSquare(9)); // expected: 81  (computes — new input)
console.log(fastSquare(9)); // expected: 81  (cached)

console.log("times slowSquare actually ran:", computeCount); // expected: 2  (only 5 and 9)
