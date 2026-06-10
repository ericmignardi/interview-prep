# Progress Scorecard

Claude updates this after each session. Grades: ✅ solid · ⚠️ shaky, re-drill · ❌ gap, study first.

**Last updated:** 2026-06-04 (JS mock #2)

---

## Topic coverage

| Topic | Bank | Last drilled | Grade | Notes |
|---|---|---|---|---|
| JavaScript fundamentals | [01](01-javascript-fundamentals.md) | 2026-06-06 | ✅ **COVERED** | Full curriculum cemented across days 1–4 (fundamentals, closures, `this`, call/apply/bind, async/await, OOP/prototypes/classes, Map/Set, coercion, pure fns, recursion, currying, JSON, modules) + 7 coding challenges. Graduation quiz 22/24. **Fragile re-test items** (slipped under speed though known): `.find` returns element/`undefined` (NOT boolean — that's `.some`); `.splice` mutates / `.slice` copies. |
| TypeScript | [02](02-typescript.md) | 2026-06-06 | ✅ **COVERED** | Full TS curriculum in ~1 day (well ahead of 2-day est). Diagnostic strong (above-junior — writes real TS). Covered: annotations/inference, any/unknown/never/void, unions/literals, narrowing/type guards, tuples, generics(+constraints), utility types (Partial/Pick/Omit/Record), discriminated unions+`never` exhaustiveness, `as const`/`keyof`/`typeof`, typing React (props/events/`useState<T\|null>`). **6 clean coding challenges** (TS1–TS6). Graduation quiz 22/23. Meta-lesson landed: green `tsc` ≠ correct logic. **Weak spot: React event types** — improved 0/1→5/6 in a drill; `KeyboardEvent<HTMLInputElement>` (event-kind vs element slot) + `ChangeEventHandler` variant to re-test. The 4 core: `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`, `MouseEvent<HTMLButtonElement>`, `KeyboardEvent<HTMLInputElement>`. |
| React & hooks | [03](03-react-and-hooks.md) | 2026-06-07 | ✅ **strong** | React phase begun. Diagnostic above-junior. **8 build-and-run challenges** (Vitest+RTL): Counter, useToggle, ContactForm, CounterReducer, useFetch, ProductList, useDebounce, useLocalStorage — all green. Solid: re-render model + closure-snapshot (proved stale-closure live), functional updater, controlled inputs, useReducer, derived state, custom hooks, useEffect cleanup, useDebounce. Learned: lazy initializer `useState(()=>...)`, `&&`/`?:`/`??` in JSX (+ `0 &&` gotcha), wrapped setter. **Recurring tell: "pass vs CALL a function"** (onClick/dispatch/setTimeout). **To review:** React Query (name-drop for data fetching), the `useFetch` res.ok gotcha. |
| CSS / HTML / a11y | [04](04-css-html-a11y.md) | 2026-06-03 | ✅ | Centering (flex) correct in both Tailwind + raw CSS; learn the axis-flip-on-column follow-up |
| Coding challenges | [05](05-coding-challenges.md) | 2026-06-04 | ✅ | Ch1 (cart-total): reduce/map/groupByName ✅. Ch2 (closures): `createCounter` + `once` ✅ both built from scratch w/ light coaching. **Bug family identified: read-vs-assign, compute-vs-mutate, track-vs-branch — now spotting them.** |
| Project deep-dive: tono | [06](06-project-talking-points.md) | 2026-06-04 | ✅ | Strong pitch (problem→solution→stack). Walked the FULL /api/tones pipeline in order w/ correct statuses (401→429→404→400→403; used 403 correctly!). Knew the credit txn but needed coaching on *why* (race condition / isolation). Graceful-degradation instinct right; coached the downside (silent degradation of a PAID feature → signal it). |
| Project deep-dive: dropzone | [06](06-project-talking-points.md) | — | — | not started |

---

## Recurring weak spots
_(Claude fills this in as patterns emerge.)_

- **Array-method mechanics (NEW, high priority).** `map`/`reduce` not yet solid: invented `.compare`;
  wrong `reduce` signature (used one param, no accumulator, no return, no initial value). Action:
  do the Tier-1 coding warm-ups (`groupBy`, `flatten`, sum-with-reduce) by hand. `map`=transform→new
  array; `filter`=subset; `reduce`=fold to one value via accumulator; `forEach`=side effects→`undefined`.
- **A few specific JS gotchas to re-test:** `typeof null === "object"` (the bug); arrow functions take
  `this` lexically (don't rebind on method call) — said arrow object-method = "Eric", actually
  `undefined`; shallow copy = new top level but **shared nested refs** (conflated with reference assignment).
- **Terminology precision** (recurring). Concept is right, the *word* is wrong: "encrypt" passwords
  (→ **hash**), `forEach` "returns a value" (→ `undefined`), 403 = rate limit (→ **403 forbidden /
  429 rate limit**), `setTimeout` "microtask" (→ **macrotask**). Drill the exact term, not just the idea.
- **End-to-end completeness.** Tends to describe the middle (the part he wrote) and skip the bookends —
  client-side start (loading state, fetch) and finish (render success/error, revalidate), plus
  cross-cutting backend steps (rate limit, transaction, persistence). Practice narrating the *whole* round trip.
- ~~Precision of mechanism~~ — **markedly improved.** `any`/`unknown` and the infinite-loop effect were
  answered at full mechanism level this session. Keep it up.
- ~~Re-render model~~ — improving; learned `React.memo` + shallow compare + `useCallback` this session.

---

## Recommended next session
1. **Tier-1 coding warm-ups** ([05](05-coding-challenges.md)) — `groupBy`, `flatten`, and a
   sum-with-`reduce`, BY HAND. Highest priority: array-method mechanics is the clearest current gap.
2. **Backend mock drill: auth** ([../backend/05](../backend/05-auth-and-security.md)) — lock in
   hash-vs-encrypt, 401/403/429, JWT-vs-session.
3. **Full-stack deep-dive: tono** — re-do the end-to-end walkthrough hitting all layers incl. the
   credit-reservation transaction.

---

## Session log
_(append-only; newest at top)_

- **2026-06-07 (cont.) — React Mechanics #1 (Ticker) + the closure/render model.** Built Ticker
  (auto-incrementing interval) — used functional updater AND explained the stale-closure trap correctly
  (effect runs once → interval callback frozen on render #0's count). Did a FULL breakdown of why naive
  `setCount(count+1)` sticks at 1 + the 3 fixes (functional updater / ref / deps). He's at the "can do it
  but feels slippery" stage on closures+rerenders+lifecycle — NORMAL pre-mastery; reassured + gave the
  4-sentence model (component = a function React re-runs every render; each run = a fresh photo; closures
  remember the photo they were born in; old callbacks see old photos). Going to review useDebounce/useReducer
  videos, back tomorrow for more React.
- **2026-06-07 — Cumulative JS+TS review → REACT PHASE kickoff (big day).** Opened: cumulative JS+TS
  sweep (~flawless; KeyboardEvent finally locked). React diagnostic strong. Set up Vitest+RTL toolchain
  (`npx vitest run <Name>`) and built **8 challenges, all green**: Counter, useToggle, ContactForm,
  CounterReducer, useFetch, ProductList, useDebounce, useLocalStorage (+ StaleClosureDemo proof). Reorganized
  code-challenges into javascript/ typescript/ react/ subfolders. React mock drill (5 Qs, strong; learned
  lazy initializer). Project review: RHF-vs-controlled (uncontrolled→fewer re-renders), state placement
  (colocate→lift→Context→store), data fetching (improve story: extract hook / React Query / stale handling /
  Next server-fetch), component breakdown. **Recurring tell: pass-vs-CALL a function. To review: React Query
  concept; `&&` `0` JSX gotcha.** Next: useRef, useMemo, Context, React.memo in practice → more builds.
- **2026-06-06 — End-of-day mixed JS+TS quiz (15 Qs).** 14/15. Fragile JS items now SOLID unprompted
  (`.find`→element/undefined ✅, `.splice` mutates ✅). TS all solid (unknown/never, Partial/Omit, DU narrow,
  keyof, as const, z.infer schema→type, ChangeEvent). **Only persistent miss: `KeyboardEvent`** — said
  "KeyEvent" for the 3rd time. Gave hook (events named after the DEVICE: Keyboard/Mouse/Focus/Change; no
  "Key" device). RE-TEST `KeyboardEvent<HTMLInputElement>` FIRST THING next session. Done for the day.
- **2026-06-06 — TS GRADUATION + advanced (same day). 🎓 TS marked COVERED.** After Day-1 challenges,
  watched a 1hr TS video (review), then: discriminated unions challenge (TS4, clean incl. `never`),
  taught `as const`/`keyof`/`typeof` (verbal checks ✅), typing-React challenge (TS5 — props/`useState`/
  `ChangeEvent`/`useState<User\|null>`, clean; installed @types/react + JSX in tsconfig), TS graduation
  quiz 22/23 (only miss: event type — said `InputEventHandler` → it's `ChangeEvent`). Focused event-types
  drill: 5/6 (missed `KeyboardEvent<HTMLInputElement>` — swapped event-kind/element slots; `...Handler`
  variant). Capstone TS6 combined challenge (getProperty generic+keyof+constraint+T[K], updateEntity+Partial,
  discriminated-union reducer): types perfect first try, but reducer LOGIC bugs (state++ → state+by; decrement
  +→-) that tsc could NOT catch → drove home "types guarantee shapes not logic." Wants project-review quizzing
  next (TS-flavored), NOT React until tomorrow.
- **2026-06-06 — TS DAY 1 (same day as JS graduation).** Diagnostic: foundation strong (annotations/
  inference, any/unknown re-cemented, unions+literals, narrowing). Sharpened never-vs-void; NEW: tuples.
  Then 3 coding challenges ALL clean (tsc strict): TS1 basics (annotations/union-literal/narrowing/
  interface/tuple — extracted `Role` to named type), TS2 generics (identity/lastItem/`pair<T,U>`/constrained
  `getId<T extends {id}>` — first try), TS3 utility types (`Partial`/`Omit`/`Pick`/`Record` — 5/5 first try).
  Bonus live lesson: interface declaration-merging footgun (bare .ts files share global scope → added
  `export {}` to make them modules). Moving fast — well ahead of 2-day TS estimate. **Schedule agreed:**
  TS ~2 days total (1 more), React ~4–5 days (priority — the role), HTML/CSS ~2 days; interleave 5-min
  rapid quizzes to keep JS/TS warm. **Next TS session:** typing React (props/events/hooks), discriminated
  unions, `as const`, `keyof`/`typeof`, type assertions → then TS done.
- **2026-06-06 — JS GRADUATION (day 4). 🎓 JS marked COVERED.** Re-test of fresh batch 4/4 (coercion
  `'5'+3`→`'53'` NOW retained, Object.freeze shallow, pure fns, recursion) ✅. Built **`memoize`** capstone
  (closures+cache-by-input+purity) — fixed the recurring missing-`return` (4th time → reflex now) + switched
  truthiness to `in` presence check. Mop-up drill: currying ✅ (def right, learned partial-application use),
  JSON.parse/stringify ✅✅ (own-code examples), ES modules named vs default ✅. Graduation rapid quiz 22/24:
  two SLIPS on array-method details he'd previously gotten right (under speed): `.find` returns element/
  `undefined` not boolean (said "false"); `.splice` mutates not `.slice` (reversed). **TOP re-test queue for
  TS phase: `.find` return value + `slice`/`splice` mutation** (fragile, not unknown). JS coding challenges
  1–7 all done. Moving to TypeScript.
- **2026-06-05 — Fresh JS drill (6 Qs, NEW material).** First exposure to several topics: type-coercion
  `+` trap (`'5'+3`→`'53'` not 8 — MISSED, now taught), destructuring + rest (values ✅, learned rest
  collects leftovers + object/nested/default forms), `Object.freeze` (NEW — immutable but SHALLOW), recursion
  (def ✅, learned base case + recursive case), pure functions (NEW — deterministic + no side effects),
  memoization (had gist, sharpened to "cache BY INPUT", needs purity, closure+object cache). **New re-test
  queue:** `+` coercion trap, `Object.freeze` is shallow, recursion base case, pure-function 2 properties,
  memoize = cache-by-input. Teed up a `memoize` coding challenge (closures+cache+purity — he has all pieces).
- **2026-06-05 — Rapid quiz, full-curriculum (22 Qs).** Essentially 22/22 — clean sweep across JS
  fundamentals, async, prototypes/classes, Map/Set, call/apply/bind, TS, React, CSS. **`any`/`unknown`
  soft spot from prior drill → now CORRECT** (re-cemented & retained). Only micro-refinements: `forEach`
  returns `undefined` (said "void"); `await` one-word = "pauses" (said "hands off control"). Retention
  across the whole curriculum is now excellent — week-1 ❌ topics all automatic.
- **2026-06-05 — Cumulative drill (15 Qs) + Challenge 6 (call/apply/bind).** Cumulative sweep across all
  4 areas: JS 10/10 strong; React re-render causes + useEffect infinite loop ✅✅ (both were ⚠️ day 1);
  `interface`/`type` ✅✅; CSS centering ✅✅; ONLY soft spot `any`/`unknown` (drifted to use-cases, lost the
  "checking off vs on + forced narrowing" mechanism — re-cemented). Big retention proof: `.find`, seq-vs-parallel,
  `await`, `0||/??`, all previously wrong/shaky → now correct. Then Challenge 6: implemented `myBind` CORRECTLY
  FIRST TRY on a brand-new topic (closure returns fn that `apply`s with locked `this` + rest args) — recombined
  closures+apply+rest from the week. Going to watch call/apply/bind videos now. Next: prototypes → classes → Map/Set.
- **2026-06-05 — Coding Challenge 5 (async-timing.js).** Built `sleep(ms)` (`new Promise(resolve =>
  setTimeout(resolve, ms))` — first attempt shadowed `resolve` w/ empty body → never resolved/hangs; fixed)
  + `runSequential`/`runParallel`, then TIMED them: saw ~923ms (sum) vs ~307ms (slowest) live. This directly
  closed the Q4 sequential-vs-parallel gap from the async drill — he'd had it backwards; now proven by his own
  code. Recurring bug: missing `return` in BOTH run fns (compute-but-don't-return). Reflex to build: "did I
  actually return it?" Async/await much firmer now.
- **2026-06-05 — Fresh drill: async/await (4 Qs, day 3).** Q1 `async` returns a promise ✅ ("you get a
  Promise, not 5"). Q2 what `await` does ⚠️ — had event-loop pieces (microtask, non-blocking) but fuzzy on
  the core: `await` *pauses/suspends* the async fn and resumes the **continuation** with the unwrapped value.
  Q3 error handling: try/catch around await ✅; `.then().catch()` contrast ⚠️ (muddled — used `new Promise`
  ctor + `await` inside `.then`). Q4 sequential vs parallel ❌→taught: called A "synchronous", and concluded
  B (Promise.all) was worse — MISSED that A is sequential (time = SUM) and B is concurrent (time = slowest),
  so B is the right choice for independent calls; conflated perf with fail-fast error handling. **Re-test:
  sequential-vs-parallel await (sum vs max), and `await` = pause/resume continuation.**
- **2026-06-05 — Coding: debounce-from-memory + throttle (day 3).** Rebuilt `debounce` cold from memory
  → passed first run (retention confirmed; the copied pattern stuck). Built `throttle` from scratch: full
  structure correct first try (closure flag, immediate first call, ignore-during-cooldown); one bug — left
  the `setTimeout` body EMPTY so `inCooldown` never reset (track-vs-act bug family again, mirror of `once`).
  Fixed with `inCooldown = false` in the timer. Cemented debounce-vs-throttle pair (last-call/cancel-reschedule
  vs first-call/run-then-cooldown; elevator analogy). Next: fresh async/await drill.
- **2026-06-05 — JS mock drill (8 Qs, day 3 AM).** Both stubborn re-tests CLOSED: event-loop queue
  names ✅✅ (setTimeout=macro, Promise.then=micro, micro drains first — gold-standard phrasing,
  unprompted; had failed twice prior — videos + reps worked) and `Promise.all` vs `allSettled` ✅.
  Fresh material strong: `.slice` vs `.splice` ✅ (+ React immutability tie-in), higher-order functions
  ✅ (connected to his own map/debounce), optional chaining `?.` ✅ (+ TypeError vs ReferenceError),
  Object.keys/values/entries ✅, try/catch/finally ✅ (loading-state use case). Only miss: `.find` vs
  `.filter` ⚠️ — thought `.find` returns a boolean (it returns the element/`undefined`; boolean = `.some`).
- **2026-06-04 — JS drill + quiz + tono deep-dive.** Drill: hoisting/TDZ ✅ (after coaching — had var/let
  backwards first, recapped correctly); rest vs spread ✅; `Promise.all` vs `allSettled` ⚠️ (knew concurrency,
  missed fail-fast + didn't know allSettled); event-loop queue NAMES still ❌ (knew priority AM, but inverted
  micro/macro mapping again — micro=Promise/priority, macro=setTimeout). Quiz 10/12 (missed `0 ||/?? 'x'`
  values and `NaN===NaN`→false). Deep-dive tono: see topic row — strong. Reviewed truthy/falsy, `!!`, `||` vs
  `??` ("falls back" = use the default), at user's request.
- **2026-06-04 — Gap re-test (3 Qs) + debounce `this` stretch.** Re-test of JS mock #2 gaps: `typeof
  null` ✅, arrow vs regular `this` ✅, shallow vs deep copy ✅ (all previously ⚠️/❌ — now closed).
  debounce `this`-preservation stretch: did edit 1 (arrow→regular fn) himself; I made edit 2 (capture
  `const context = this` + `fn.apply(context, args)`) and explained placement ("capture early, use late").
  Still to do: rebuild debounce from scratch; debounce-vs-throttle.
- **2026-06-04 — Coding Challenge 3 (debounce.js).** Copied the provided solution then dissected it
  line-by-line (closure-held `timerId`, clearTimeout-then-reschedule, rest/spread arg forwarding) +
  execution trace. Passes. NOT yet written from scratch — **re-test by rebuilding blank later** to
  confirm retention.
- **2026-06-04 — Coding Challenge 2 (closures.js).** Built `createCounter` (private state + independent
  instances) and `once` (flag + cached result + guard) from scratch with light coaching. Bugs hit, all
  same family: duplicate `const` redeclare (syntax); `count + 1` compute-not-mutate; `count++` vs
  `++count` (post/pre-increment → printed 0,1,2); and `once` ran `fn` every call because `hasRun` flag
  was set but never used to **branch** (`if (!hasRun)`). Each fixed quickly once named. Closures (private
  state) concept solid; the recurring theme is *acting on* state (assign/mutate/branch), not just touching it.
- **2026-06-04 — Coding Challenge 1 (cart-total.js).** `cartTotal` (reduce→number) ✅ first try, clean
  signature/accumulator/initial-value — full turnaround from the broken reduce in JS mock #2 an hour
  earlier. `applyDiscount` (map): structure/immutability perfect, only bug was flat-subtraction vs
  percentage (`×(1-pct/100)`). `groupByName` (reduce→object) ✅ with coaching — needed the two concepts
  (computed `acc[curr.name]` key + assign-then-`return acc`, not `+`). reduce/map mechanics solidifying fast.
- **2026-06-04 — JS mock #2 (8 Qs).** event-loop order ✅ (but called `setTimeout` a microtask →
  macrotask); `typeof null` ❌ (→`"object"`); `==`/`===` rule ✅; **var/let loop ✅ RETAINED** (failed in
  trial, now explained correctly — big win); arrow-vs-regular `this` ❌ (arrow method ≠ object's `this`);
  shallow/deep copy ⚠️ (conflated shallow copy w/ reference assignment); null vs undefined ✅;
  **map/reduce ❌** (no `.compare`; broken reduce signature). **Trend: retention working (var/let stuck);
  new clear gap = array-method mechanics → assigned coding warm-ups.**

- **2026-06-03 — Mixed mock #1 (9 Qs).** React.memo/shallow ❌→taught; `interface` vs `type` ✅;
  `map`/`forEach` ⚠️ (`forEach` returns `undefined`); centering ✅; infinite-loop effect ✅✅ (clean);
  401/403 ⚠️ (swapped 403↔429); password storage ⚠️ ("encrypt"→hash); `any`/`unknown` ✅✅ (stuck from
  re-test!); tono end-to-end ⚠️ (missing bookends + key steps). **Trend: clearly sharper than trial;
  mechanism precision up; new pattern = terminology word-choice + end-to-end completeness.**
- **2026-06-03 — Trial mixed mock (4 Qs).** Closure def ✅; `var` loop output ❌ (`3 3 3`);
  re-render causes ⚠️ (2/3 + a misconception); `any` vs `unknown` ⚠️ (use-case yes, mechanism no).
  Pattern: good instincts, needs mechanism-level precision. Project depth (Zod/`unknown`) ahead of recall.
- _2026-06-03 — program scaffolded._
