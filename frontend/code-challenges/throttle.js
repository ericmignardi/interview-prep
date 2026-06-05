// ─────────────────────────────────────────────────────────────────────────────
// Challenge 4 — throttle  (the sibling of debounce)
//
// Write `throttle(fn, limit)` that returns a NEW function. When called repeatedly,
// `fn` runs at most ONCE per `limit` milliseconds — it fires immediately on the
// first call, then ignores further calls until `limit` ms have passed, then is
// allowed to fire again.
//
// Contrast with debounce:
//   - DEBOUNCE waits for calls to STOP, then fires once (good: search-as-you-type).
//   - THROTTLE fires at a steady max rate DURING continuous calls (good: scroll,
//     resize, mousemove — you want updates regularly, not just at the end).
//
// Requirements:
//   - Use a closure to remember whether you're currently "cooling down".
//   - First call fires immediately.
//   - Calls during the cooldown window are ignored (dropped).
//   - After `limit` ms, the next call is allowed again.
//
// Hint: close over a boolean/timestamp tracking the cooldown. One common approach:
//   a `inCooldown` flag — if not in cooldown, run fn, set the flag, and use
//   setTimeout to clear the flag after `limit` ms.
//
// Run it:  node throttle.js
// ─────────────────────────────────────────────────────────────────────────────

function throttle(fn, limit) {
  let inCooldown = false;
  return function (...args) {
    if (!inCooldown) {
      fn(...args);
      inCooldown = true;
      setTimeout(() => {
        inCooldown = false;
      }, limit);
    }
  };
}

// ── test harness ─────────────────────────────────────────────────────────────
// Fire 5 rapid calls within the cooldown window → only the FIRST should run.
// Then fire again AFTER the window → it runs again. Expected total runs: 2.

let runCount = 0;
const onScroll = throttle((label) => {
  runCount++;
  console.log(`  ran with: "${label}"`);
}, 100);

console.log("rapid burst: A B C D E (within 100ms window)...");
onScroll("A"); // should run immediately
onScroll("B"); // ignored (cooldown)
onScroll("C"); // ignored
onScroll("D"); // ignored
onScroll("E"); // ignored

setTimeout(() => {
  console.log(`runCount after burst: ${runCount}`); // expected: 1  (only "A" ran)

  console.log('after cooldown, firing again: "F"...');
  onScroll("F"); // window has passed → should run

  setTimeout(() => {
    console.log(`runCount total: ${runCount}`); // expected: 2
    console.log("done");
  }, 150);
}, 150);
