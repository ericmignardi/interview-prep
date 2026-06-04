# Progress Scorecard

Claude updates this after each session. Grades: ✅ solid · ⚠️ shaky, re-drill · ❌ gap, study first.

**Last updated:** 2026-06-04 (JS mock #2)

---

## Topic coverage

| Topic | Bank | Last drilled | Grade | Notes |
|---|---|---|---|---|
| JavaScript fundamentals | [01](01-javascript-fundamentals.md) | 2026-06-04 | ✅ | Re-test closed all 3 open gaps: `typeof null`→`"object"` ✅, arrow vs regular `this` ✅ (lived it in debounce), shallow vs deep copy ✅ (concept correct, minor wording). Still re-test occasionally: event-loop queue names (macro vs micro). |
| TypeScript | [02](02-typescript.md) | 2026-06-03 | ✅ | `interface` vs `type` solid; `any` vs `unknown` mechanism **now nailed** (was ⚠️) — big improvement |
| React & hooks | [03](03-react-and-hooks.md) | 2026-06-03 | ✅ | Infinite-loop effect bug solved cleanly w/ full causal chain; learned `React.memo`/shallow-compare/`useCallback` |
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
