function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

// ── test harness (don't edit your debounce above) ────────────────────────────
// Burst of 3 rapid calls should collapse to ONE run (with the LAST args),
// then a separate call after a quiet gap runs once more → 2 total.

let runCount = 0;
const run = debounce((label) => {
  runCount++;
  console.log(`  ran with: "${label}"`);
}, 100);

console.log("burst: A, B, C ...");
run("A");
run("B");
run("C"); // only this should run, ~100ms later

setTimeout(() => {
  console.log(`runCount after burst: ${runCount}`); // expected: 1  (only "C")
  console.log('separate call: "D" ...');
  run("D");
  setTimeout(() => {
    console.log(`runCount total: ${runCount}`); // expected: 2
    console.log("done");
  }, 200);
}, 200);
