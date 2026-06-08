# Frontend Code Challenges

Hands-on coding practice. Each challenge has its own runnable `.js` (or `.ts`) file with the prompt
in a comment header, sample data, a function stub, and test cases with expected outputs.

**Workflow:**
1. Open the challenge file, read the prompt at the top.
2. Implement the stub yourself — don't peek at the study-bank solutions unless truly stuck.
3. Run it: `node <file>.js` and check your output against the expected values in the tests.
4. Tell Claude when you're done (or stuck) for a review + a stretch variant.

> Convention: challenge files live here as `interview-prep/frontend/code-challenges/<name>.js`.
> (Backend challenges will live under `interview-prep/backend/code-challenges/` when we get there.)

---

## Challenges

| # | File | Focus | Status |
|---|---|---|---|
| 1 | [cart-total.js](cart-total.js) | `reduce` + `map` (cartTotal, applyDiscount, groupByName) | ✅ done 2026-06-04 |
| 2 | [closures.js](closures.js) | closures / private state (createCounter, once) | ✅ done 2026-06-04 |
| 3 | [debounce.js](debounce.js) | closures + timers + arg forwarding + `this` preservation | ✅ passes (copied + dissected; `this` stretch done) |
| 3b | [debounce-manual.js](debounce-manual.js) | debounce rebuilt FROM MEMORY (retention test) | ✅ done 2026-06-05 — passed cold, core pattern stuck |
| 4 | [throttle.js](throttle.js) | closures + timers (throttle; pairs with debounce) | ✅ done 2026-06-05 — one fix (empty timer body → reset flag) |
| 5 | [async-timing.js](async-timing.js) | async/await: `sleep`, sequential vs parallel (time = sum vs slowest) | ✅ done 2026-06-05 — saw ~923ms vs ~307ms live |
| 6 | [call-apply-bind.js](call-apply-bind.js) | `this` control + implement your own `bind` | ✅ done 2026-06-05 — correct first try (closure + apply + rest) on a brand-new topic |
| 7 | [memoize.js](memoize.js) | capstone: closures + cache-by-input + purity | ✅ done 2026-06-06 — fixed missing-return + truthiness→`in` check; ties the week together |

### TypeScript challenges
> Verify with `npx tsc --noEmit` from the `interview-prep/` folder (strict mode). No output = pass.

| # | File | Focus | Status |
|---|---|---|---|
| TS1 | [ts-basics.ts](ts-basics.ts) | annotations, union literals, narrowing, interface, tuple | ✅ done 2026-06-06 — clean (tsc exit 0), all 5 correct incl. tuple; extracted `Role` to a named type |
| TS2 | [ts-generics.ts](ts-generics.ts) | generics: `<T>`, multiple params, constraints (`extends`) | ✅ done 2026-06-06 — clean first try; identity/lastItem/pair(2 params)/getId(constrained) all correct |
| TS3 | [ts-utility-types.ts](ts-utility-types.ts) | `Partial`/`Pick`/`Omit`/`Record` (+ `Omit` for NewUser) | ✅ done 2026-06-06 — 5/5 first try; learned interface-merging footgun live (files need `export {}` to be modules) |
| TS4 | [ts-discriminated-unions.ts](ts-discriminated-unions.ts) | discriminated union + narrowing + `never` exhaustiveness | ✅ done 2026-06-06 — clean first try incl. the `never` exhaustiveness guard |
| TS5 | [ts-react.tsx](ts-react.tsx) | typing React: props, `useState`, event handlers | ✅ done 2026-06-06 — clean; props/optional, `useState<number>`, `React.ChangeEvent`, `useState<User\|null>` |
| TS6 | [ts-combined.ts](ts-combined.ts) | generics+keyof+constraint+indexed access, Partial, discriminated-union reducer | ✅ done 2026-06-06 — types perfect first try; logic bugs (state++ / decrement +→-) caught by reading, NOT tsc → "types ≠ logic" lesson |

---

### Challenge 1 — Cart total
**File:** [cart-total.js](cart-total.js) · **Focus:** `reduce`

Write `cartTotal(cart)` that returns the total cost of everything in the cart — each item's
`price × qty`, all summed together.

```js
const cart = [
  { name: 'Strings', price: 12, qty: 2 },
  { name: 'Picks',   price: 5,  qty: 3 },
  { name: 'Capo',    price: 20, qty: 1 },
];

cartTotal(cart); // 59   → (12×2) + (5×3) + (20×1)
cartTotal([]);   // 0    → empty cart (this is why the reduce initial value matters)
```

**Requirements:**
- Use `reduce`.
- Give `reduce` a proper initial value.
- Bonus (TS): what's the type of `cart`, and the return type?

**Stretch (after it works):**
- `applyDiscount(cart, pct)` → return a **new** cart with each price reduced by `pct`% (use `map`).
- `groupByName(cart)` → return an object keyed by item name (use `reduce` into an object).
