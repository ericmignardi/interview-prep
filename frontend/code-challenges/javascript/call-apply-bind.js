// ─────────────────────────────────────────────────────────────────────────────
// Challenge 6 — call / apply / bind  (+ implement your own bind)
//
// call / apply / bind all control what `this` is when a function runs:
//   - fn.call(thisArg, a, b)   → runs NOW, args passed individually
//   - fn.apply(thisArg, [a,b]) → runs NOW, args passed as an ARRAY  (Apply = Array)
//   - fn.bind(thisArg)         → returns a NEW function with `this` locked; call later
//
// Run it:  node call-apply-bind.js
// ─────────────────────────────────────────────────────────────────────────────

const person = { name: "Eric" };

function greet(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

// ── Part 1 — warm-up: the built-ins (these are PROVIDED, just observe) ────────
console.log(greet.call(person, "Hi", "!")); // "Hi, I'm Eric!"
console.log(greet.apply(person, ["Hey", "."])); // "Hey, I'm Eric."
const boundBuiltin = greet.bind(person);
console.log(boundBuiltin("Yo", "?")); // "Yo, I'm Eric?"  (bind returns a fn, called later)

// ── Part 2 — YOUR TASK: implement myBind(fn, context) ────────────────────────
// Return a NEW function that, when called with any args, runs `fn` with
// `this` set to `context` and forwards those args.
//
// Hints:
//   - bind doesn't call fn now — it RETURNS a function (closure!).
//   - inside that returned function, use fn.apply(context, args) to run fn
//     with the right `this`. Forward args with a rest param (...args).
function myBind(fn, context) {
  return function myFunc(...args) {
    return fn.apply(context, args);
  };
}

// ── tests ────────────────────────────────────────────────────────────────────
const myBoundGreet = myBind(greet, person);
console.log("--- myBind ---");
console.log(myBoundGreet("Hello", "!")); // expected: "Hello, I'm Eric!"
console.log(myBoundGreet("Hey there", "...")); // expected: "Hey there, I'm Eric..."

// proves `this` is locked to `person` even when called as a bare function:
const detached = myBoundGreet;
console.log(detached("Sup", "?")); // expected: "Sup, I'm Eric?"  (not undefined)
