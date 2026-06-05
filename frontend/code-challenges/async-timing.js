// ─────────────────────────────────────────────────────────────────────────────
// Challenge 5 — async timing: sleep + sequential vs parallel
//
// Goal: FEEL the difference between sequential and parallel awaits by timing them.
//
// PART 1 — write `sleep(ms)`: a function that returns a Promise which resolves
//          after `ms` milliseconds. (This is how you "await a delay".)
//
// PART 2 — write `runSequential()` and `runParallel()` that both fetch the same
//          three independent things and return [user, posts, comments].
//            - runSequential: await them ONE AFTER ANOTHER.
//            - runParallel:   fire them ALL AT ONCE with Promise.all.
//          Then run it and compare the timings printed at the bottom.
//
// Run it:  node async-timing.js
// ─────────────────────────────────────────────────────────────────────────────

// PART 1 — implement this.
// Hint: a Promise that resolves after a delay →
//   return new Promise((resolve) => setTimeout(resolve, ms));
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── provided: three simulated "fetches", each takes 300ms ────────────────────
// (These rely on your sleep() working.)
const fetchUser = async () => {
  await sleep(300);
  return "user";
};
const fetchPosts = async () => {
  await sleep(300);
  return "posts";
};
const fetchComments = async () => {
  await sleep(300);
  return "comments";
};

// PART 2a — await each one after another. Return [user, posts, comments].
async function runSequential() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();
  return [user, posts, comments];
}

// PART 2b — fire all three at once with Promise.all. Return [user, posts, comments].
async function runParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments(),
  ]);

  return [user, posts, comments];
}

// ── timing harness (provided) ────────────────────────────────────────────────
async function main() {
  let start = Date.now();
  const seq = await runSequential();
  console.log("sequential result:", seq, "took ~", Date.now() - start, "ms"); // expect ~900ms

  start = Date.now();
  const par = await runParallel();
  console.log("parallel result:  ", par, "took ~", Date.now() - start, "ms"); // expect ~300ms

  console.log("done");
}
main();
