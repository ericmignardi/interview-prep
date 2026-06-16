# Frontend Code Challenges

Hands-on coding practice, organized by track. Each challenge file has the prompt in a comment
header, a stub to implement, and tests/expected outputs.

```
code-challenges/
  javascript/   # plain JS — run with: node <file>.js
  typescript/   # TS — type-check with: npx tsc --noEmit  (no output = pass)
  react/        # React + tests — run with: npx vitest run <Name>
  css-html/     # open in browser — visual verification
```

**Workflow:** open a challenge → read the prompt → implement the stub yourself → run it (see commands
above) → tell Claude when done/stuck for a review + stretch variant.

---

## JavaScript — `javascript/`
> Run: `node javascript/<file>.js`

| # | File | Focus | Status |
|---|---|---|---|
| 1 | [cart-total.js](javascript/cart-total.js) | `reduce` + `map` (cartTotal, applyDiscount, groupByName) | ✅ 2026-06-04 |
| 2 | [closures.js](javascript/closures.js) | closures / private state (createCounter, once) | ✅ 2026-06-04 |
| 3 | [debounce.js](javascript/debounce.js) | closures + timers + arg forwarding + `this` preservation | ✅ (copied + dissected; `this` stretch) |
| 3b | [debounce-manual.js](javascript/debounce-manual.js) | debounce rebuilt FROM MEMORY (retention) | ✅ 2026-06-05 — passed cold |
| 4 | [throttle.js](javascript/throttle.js) | closures + timers (throttle; pairs w/ debounce) | ✅ 2026-06-05 |
| 4b | [throttle-manual.js](javascript/throttle-manual.js) | throttle from memory | scratch |
| 5 | [async-timing.js](javascript/async-timing.js) | async/await: `sleep`, sequential vs parallel | ✅ 2026-06-05 — saw ~923ms vs ~307ms |
| 6 | [call-apply-bind.js](javascript/call-apply-bind.js) | `this` control + implement your own `bind` | ✅ 2026-06-05 — first try |
| 6b | [call-apply-bind-manual.js](javascript/call-apply-bind-manual.js) | bind from memory | scratch |
| 7 | [memoize.js](javascript/memoize.js) | capstone: closures + cache-by-input + purity | ✅ 2026-06-06 |

## TypeScript — `typescript/`
> Verify: `npx tsc --noEmit` from the `interview-prep/` folder (strict mode). No output = pass.

| # | File | Focus | Status |
|---|---|---|---|
| TS1 | [ts-basics.ts](typescript/ts-basics.ts) | annotations, union literals, narrowing, interface, tuple | ✅ 2026-06-06 — all 5 |
| TS2 | [ts-generics.ts](typescript/ts-generics.ts) | generics: `<T>`, multiple params, constraints (`extends`) | ✅ 2026-06-06 — first try |
| TS3 | [ts-utility-types.ts](typescript/ts-utility-types.ts) | `Partial`/`Pick`/`Omit`/`Record` | ✅ 2026-06-06 — 5/5 |
| TS4 | [ts-discriminated-unions.ts](typescript/ts-discriminated-unions.ts) | discriminated union + narrowing + `never` exhaustiveness | ✅ 2026-06-06 |
| TS5 | [ts-react.tsx](typescript/ts-react.tsx) | typing React: props, `useState`, event handlers | ✅ 2026-06-06 |
| TS6 | [ts-combined.ts](typescript/ts-combined.ts) | generics+keyof+constraint+indexed access, Partial, DU reducer | ✅ 2026-06-06 — "types ≠ logic" lesson |

## React — `react/`
> Build the component/hook, then run its tests: `npx vitest run <Name>` (watch: `npx vitest <Name>`).
> Type-check too with `npx tsc --noEmit`.

| # | File | Focus | Status |
|---|---|---|---|
| R1 | [Counter.tsx](react/Counter.tsx) | useState + functional updater, events, rendering | ✅ 2026-06-07 — 5/5 |
| R2 | [useToggle.ts](react/useToggle.ts) | custom hook + useState + useCallback + typed tuple | ✅ 2026-06-07 — 4/4 |
| R3 | [ContactForm.tsx](react/ContactForm.tsx) | controlled inputs + validation + submit | ✅ 2026-06-07 — 5/5 |
| R4 | [CounterReducer.tsx](react/CounterReducer.tsx) | `useReducer` + discriminated-union actions + dispatch | ✅ 2026-06-07 — 5/5 |
| R5 | [useFetch.ts](react/useFetch.ts) | data-fetching hook: loading/error/data + cleanup + generics | ✅ 2026-06-07 — 3/3 green; learned `res.ok` check (fetch doesn't reject on HTTP errors), `active` guards, no re-throw |
| R6 | [ProductList.tsx](react/ProductList.tsx) | lists + keys + DERIVED state (don't store filtered list) | ✅ 2026-06-07 — 5/5 green; derived `visible` list (no separate state), stable keys, empty state |
| R7 | [useDebounce.ts](react/useDebounce.ts) | debounce a VALUE via useEffect cleanup (cancel-and-reschedule) + generics | ✅ 2026-06-07 — 3/3 green first try; same pattern as JS debounce (cleanup = clearTimeout) |
| R8 | [useLocalStorage.ts](react/useLocalStorage.ts) | persisted state: lazy init from storage + sync on set + generics | ✅ 2026-06-07 — 5/5 green w/ coaching; gaps were lazy-initializer (read once) + wrapped setter (persist on set) |
| R9 | [Stopwatch.tsx](react/Stopwatch.tsx) | `useRef` (mutable persistent box) — interval id in a ref; start/stop/reset | ✅ 2026-06-08 — 4/4 (finished w/ help); ref persists id across renders w/o re-render; guard + null-on-stop |
| R10 | [ThemeContext.tsx](react/ThemeContext.tsx) | Context: provider + `useContext` + custom consumer hook (guard) | ✅ 2026-06-08 — 3/3 (fixed w/ help); key lesson: `undefined` default is what makes the no-provider guard work |
| M1 | [Ticker.tsx](react/Ticker.tsx) | MECHANICS: stale-closure interval (effect runs once → fix it) | ✅ 2026-06-07 — 3/3; used functional updater + explained the trap correctly |
| — | [StaleClosureDemo.tsx](react/StaleClosureDemo.tsx) | proof of the stale-closure trap (reference) | ✅ demo |
| R11 | [MemoDemo.tsx](react/MemoDemo.tsx) | `useMemo` — cache expensive computation; prove it skips on unrelated re-renders | ✅ |
| R12 | [MemoizedList.tsx](react/MemoizedList.tsx) | `React.memo` + `useCallback` — why memo alone isn't enough without stable refs | ✅ |
| R13 | [DebouncedSearch.tsx](react/DebouncedSearch.tsx) | ⭐ debounced fetch + AbortController + all 4 UI states — most-asked junior take-home | ✅ |
| R14 | [FilterableList.tsx](react/FilterableList.tsx) | filter + sort during render — no separate state for derived data | ✅ |
| R15 | [AccessibleModal.tsx](react/AccessibleModal.tsx) | a11y modal — Escape key, backdrop click, focus management, ARIA | scratch |
| R16 | [LiftState.tsx](react/LiftState.tsx) | lifting state — two siblings sharing state via common parent | scratch |
| R17 | [CartReducer.tsx](react/CartReducer.tsx) | `useReducer` — shopping cart with ADD/REMOVE/CLEAR + derived total | scratch |
| R18 | [useForm.ts](react/useForm.ts) | custom hook — form values, validation, touched state, handleSubmit | scratch |
| R19 | [ContextCart.tsx](react/ContextCart.tsx) | `useContext` + `useReducer` — shared cart state without prop drilling | scratch |
| R20 | [PaginatedList.tsx](react/PaginatedList.tsx) | pagination — fetch page 1 on mount, Load More appends next pages | scratch |
| R21 | [ErrorBoundaryWrapper.tsx](react/ErrorBoundaryWrapper.tsx) | Error Boundary class component — `getDerivedStateFromError` + `componentDidCatch` | scratch |

## CSS / HTML — `css-html/`
> Open in browser to verify. No automated tests — visual + manual a11y check.

| # | File | Focus | Status |
|---|---|---|---|
| 1 | [01-flexbox-centering.html](css-html/01-flexbox-centering.html) | Center a card with flexbox (horizontal + vertical) | scratch |
| 2 | [02-responsive-card-grid.html](css-html/02-responsive-card-grid.html) | CSS Grid: 1→2→3 column responsive layout | scratch |
| 3 | [03-sticky-navbar.html](css-html/03-sticky-navbar.html) | Sticky nav: logo left, links right, position sticky | scratch |
| 4 | [04-semantic-form.html](css-html/04-semantic-form.html) | Accessible form: labels, fieldset, focus styles, error states | scratch |
| 5 | [05-css-variables-theming.html](css-html/05-css-variables-theming.html) | CSS custom properties + JS-driven light/dark toggle | scratch |
