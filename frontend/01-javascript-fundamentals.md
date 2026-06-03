# 01 — JavaScript Fundamentals

The bedrock layer. Interviewers use these to check you actually understand the language
under React, not just the framework.

---

## Scope, hoisting, `var` / `let` / `const`

> **Q:** What's the difference between `var`, `let`, and `const`?
> **A:** `var` is function-scoped and hoisted (initialized to `undefined`). `let` and `const`
> are block-scoped and hoisted but **not initialized** — accessing them before declaration
> throws (the "temporal dead zone"). `const` can't be reassigned, but the value it points to
> (e.g. an object's properties) can still mutate.
> **🪤 Junior trap:** Saying `const` makes an object immutable. It only prevents *reassignment
> of the binding*. `const obj = {}; obj.x = 1;` is perfectly legal.

> **Q:** What is hoisting?
> **A:** During the compile phase, declarations are registered before code runs. `function`
> declarations are hoisted whole (callable before their line). `var` declarations are hoisted
> as `undefined`. `let`/`const` are hoisted but stay uninitialized (TDZ) until their line runs.

---

## Closures

> **Q:** What is a closure?
> **A:** A function bundled together with references to its surrounding (lexical) scope. The
> inner function "remembers" variables from where it was *defined*, even after that outer
> function has returned.
> ```js
> function counter() {
>   let count = 0;
>   return () => ++count; // closes over `count`
> }
> const next = counter();
> next(); // 1
> next(); // 2
> ```
> **Why it matters:** Closures power React hooks (`useState` keeps state between renders via
> closures), `debounce`/`throttle`, module privacy, and event handlers.
> **🪤 Junior trap:** The classic `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))`
> printing `3 3 3`. With `var`, all callbacks close over the *same* `i`. Using `let` gives a
> fresh binding per iteration → `0 1 2`.

---

## `this`

> **Q:** How is `this` determined?
> **A:** By **how a function is called**, not where it's defined (for regular functions):
> - Plain call `fn()` → `undefined` in strict mode (or global object otherwise).
> - Method call `obj.fn()` → `obj`.
> - `fn.call(x)` / `fn.apply(x)` / `fn.bind(x)` → explicitly `x`.
> - `new Fn()` → the newly created object.
> - **Arrow functions** don't have their own `this`; they inherit it from the enclosing
>   lexical scope.
> **🪤 Junior trap:** Passing `obj.method` as a callback loses `this`. Arrow functions or
> `.bind` fix it. This is why class component handlers historically needed binding.

---

## Prototypes

> **Q:** How does prototypal inheritance work?
> **A:** Every object has an internal link (`[[Prototype]]`, exposed as `__proto__`) to another
> object. Property lookups walk up this prototype chain until found or `null`. `class` syntax is
> sugar over this — methods live on `Prototype.prototype`, shared by all instances.

---

## Equality

> **Q:** `==` vs `===`?
> **A:** `===` is strict — no type coercion, types must match. `==` coerces types before
> comparing (`0 == ''`, `1 == true`, `null == undefined` are all `true`). **Use `===` by
> default.** The one common, intentional `==` use is `x == null` to catch both `null` and
> `undefined`.
> **🪤 Junior trap:** `NaN === NaN` is `false`. Use `Number.isNaN(x)`. Also `typeof null` is
> `"object"` (a historical bug).

---

## The event loop, microtasks, async

> **Q:** Explain the event loop / why does `setTimeout(fn, 0)` not run immediately?
> **A:** JS is single-threaded. Synchronous code runs to completion on the call stack first.
> Async callbacks wait in queues: the **microtask queue** (Promise `.then`, `queueMicrotask`)
> drains fully after each task and **before** the next macrotask; the **macrotask/task queue**
> (`setTimeout`, events) runs one task per loop tick. So `setTimeout(fn,0)` is deferred until
> the stack clears and microtasks drain.
> ```js
> console.log('A');
> setTimeout(() => console.log('B'));       // macrotask
> Promise.resolve().then(() => console.log('C')); // microtask
> console.log('D');
> // A, D, C, B
> ```
> **🪤 Junior trap:** Thinking `setTimeout(fn, 0)` runs "right away" or that promises run on a
> separate thread.

> **Q:** Promises vs async/await?
> **A:** `async/await` is syntax sugar over promises — `await` pauses the async function until
> the promise settles, letting you write async code that reads top-to-bottom. An `async`
> function always returns a promise. Errors are caught with `try/catch` instead of `.catch`.
> **🪤 Junior trap:** Sequential awaits when you wanted parallelism. To run independent calls
> concurrently use `Promise.all([a(), b()])`, not `await a(); await b();`.

> **Q:** What does `Promise.all` do, and how does it differ from `Promise.allSettled`?
> **A:** `Promise.all` resolves with an array of all results, but **rejects as soon as any one
> rejects**. `Promise.allSettled` always resolves, giving you `{status, value|reason}` for each
> — use it when you want every result regardless of individual failures.

---

## Array & object methods

> **Q:** `map` vs `forEach` vs `filter` vs `reduce`?
> **A:** `map` returns a new transformed array (1:1). `filter` returns a subset. `reduce` folds
> to a single accumulated value. `forEach` returns nothing — use it only for side effects.
> **🪤 Junior trap:** Using `forEach` to build an array (push in a loop) instead of `map`; or
> forgetting these don't mutate the original (except via your own callback side effects).

> **Q:** Shallow vs deep copy?
> **A:** Spread `{...obj}` / `[...arr]` and `Object.assign` copy **one level deep** — nested
> objects are still shared references. For a deep copy use `structuredClone(obj)` (modern) or
> a recursive clone. This matters in React: mutating a nested object inside state won't update
> a shallow-copied version and can cause stale renders.

---

## Destructuring, spread, rest, optional chaining

> **Q:** What do `?.` and `??` do?
> **A:** Optional chaining `a?.b?.c` short-circuits to `undefined` if any link is `null`/
> `undefined` instead of throwing. Nullish coalescing `a ?? b` returns `b` only when `a` is
> `null` or `undefined` — unlike `||`, it does **not** treat `0`, `''`, or `false` as missing.
> **🪤 Junior trap:** Using `||` for defaults when `0` or `''` are valid values
> (`count || 10` turns a real `0` into `10`; `count ?? 10` doesn't).

---

## debounce vs throttle

> **Q:** Difference between debounce and throttle?
> **A:** **Debounce** waits until activity *stops* for N ms, then fires once — good for search
> inputs (wait until the user stops typing). **Throttle** fires at most once per N ms during
> continuous activity — good for scroll/resize handlers. Both are built with closures + timers.
> *(You implement debounce in [05 — Coding Challenges](05-coding-challenges.md).)*

---

## Modules

> **Q:** ES modules vs CommonJS?
> **A:** ESM uses `import`/`export`, is statically analyzable (enables tree-shaking), and is the
> browser + modern standard. CommonJS uses `require`/`module.exports`, is synchronous, and is
> the legacy Node format. Your Vite/Next projects use ESM.

---

### Drill prompts to practice in chat
- "Mock drill: JS" — I'll walk these one at a time with follow-ups.
- Be ready to *predict console output* for event-loop and closure snippets — that's the most
  common live format for this topic.
