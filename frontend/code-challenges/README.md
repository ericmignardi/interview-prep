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
| 3 | [debounce.js](debounce.js) | closures + timers + arg forwarding + `this` preservation | ✅ passes (copied + dissected; `this` stretch done; rebuild from scratch to confirm) |

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
