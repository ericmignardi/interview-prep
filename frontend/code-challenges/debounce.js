// ─────────────────────────────────────────────────────────────────────────────
// Challenge 3 — debounce
//
// Write `debounce(fn, delay)` that returns a NEW function. When you call that
// returned function repeatedly, `fn` should only actually run AFTER `delay`
// milliseconds have passed with NO new calls. Each new call resets the timer.
//
// Real-world use: a search box that only fires the API call once the user STOPS
// typing, instead of on every keystroke.
//
// Requirements:
//   - Use a closure to remember the pending timer between calls.
//   - On each call: cancel the previous pending run, then schedule a new one.
//   - Pass the latest arguments through to fn (so the last call's args win).
//
// Hints:
//   - `setTimeout(cb, delay)` returns a timer id; `clearTimeout(id)` cancels it.
//   - Close over a `timerId` variable. Each call: clearTimeout(timerId), then
//     timerId = setTimeout(...).
//   - To forward arguments, use a rest param: (...args) => ... then fn(...args).
//
// Run it:  node debounce.js
// ─────────────────────────────────────────────────────────────────────────────

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    const context = this; // capture the call-site `this` (e.g. `user`) right now
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args); // call fn with that `this` + forward the args array
    }, delay);
  };
}

// ── test harness ─────────────────────────────────────────────────────────────
// Fires a rapid burst of 3 calls, then a separate call after a quiet gap.
// A correct debounce runs fn ONCE for the burst (with the LAST args), then once
// more for the later call → 2 total runs.

let runCount = 0;
const logIt = debounce((label) => {
  runCount++;
  console.log(`  fn ran with: "${label}"`);
}, 100);

console.log("firing burst: a, b, c (rapidly)...");
logIt("a");
logIt("b");
logIt("c"); // only THIS one should actually run, ~100ms later

setTimeout(() => {
  console.log(`runCount after burst: ${runCount}`); // expected: 1  (only "c" ran)

  console.log('firing a separate call: "d"...');
  logIt("d");

  setTimeout(() => {
    console.log(`runCount total: ${runCount}`); // expected: 2
    console.log("done with basic tests");
    runThisTest(); // ← stretch test runs after the basic ones finish
  }, 200);
}, 200);

// ─────────────────────────────────────────────────────────────────────────────
// STRETCH — preserve `this`
//
// Right now, debounce uses arrow functions, so it loses the calling object's
// `this`. Make debounce work when used as an OBJECT METHOD, so that inside `fn`,
// `this` refers to the object it was called on.
//
// Your task: modify the debounce function above so the test below prints the
// user's name instead of undefined. (Hint: this is where the arrow-vs-regular
// `this` lesson comes back — and `fn.apply(thisValue, args)` lets you call fn
// with a chosen `this`.)
// ─────────────────────────────────────────────────────────────────────────────

function runThisTest() {
  console.log("--- this-preservation stretch ---");

  const user = {
    name: "Eric",
    // a debounced METHOD. Note: must be a regular function so it HAS its own `this`.
    greet: debounce(function () {
      console.log(`  hi, I'm ${this.name}`); // expected: "hi, I'm Eric"  (NOT undefined)
    }, 50),
  };

  user.greet();
}
