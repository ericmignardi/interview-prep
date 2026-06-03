# 03 — React & Hooks

The core of a junior React interview. Aim to explain *why* React behaves a certain way, not
just recite API names. Real examples reference your `dropzone` and `tono` code.

---

## Rendering & reconciliation

> **Q:** What causes a component to re-render?
> **A:** Three things: (1) its **state** changes (`useState`/`useReducer` setter), (2) its
> **props** change, or (3) its **parent re-renders** (children re-render by default unless memoized).
> Context value changes also re-render consumers.
> **🪤 Junior trap:** Thinking a component only re-renders when *its own* state/props change. A
> parent re-render cascades to children even if their props are identical (unless `React.memo`).

> **Q:** What is the virtual DOM / reconciliation?
> **A:** React builds a lightweight in-memory tree of elements each render, diffs it against the
> previous tree, and applies the minimal real-DOM updates. This is "reconciliation." It's why you
> describe *what* the UI should look like and let React figure out the *how*.

> **Q:** Why do lists need a `key`?
> **A:** Keys give each list item a stable identity across renders so React can match old and new
> items instead of re-creating them. Without stable keys, React may reuse the wrong DOM node,
> losing input state or causing subtle bugs.
> **🪤 Junior trap:** Using the array **index** as the key when the list can reorder, insert, or
> delete. Use a stable unique id (e.g. your DB `id`). Index keys are only safe for static lists.

---

## State

> **Q:** Controlled vs uncontrolled components?
> **A:** A **controlled** input's value lives in React state (`value={x} onChange=...`) — React is
> the single source of truth. An **uncontrolled** input keeps its own DOM state, read via a ref.
> Your `fanimal`/`tono` forms use react-hook-form, which leans uncontrolled (refs) for performance
> then validates with Zod. Controlled is more explicit; uncontrolled re-renders less.

> **Q:** Is `setState` synchronous? What is batching?
> **A:** No — state updates are **asynchronous and batched**. React groups multiple `setState`
> calls in the same event and re-renders once. So reading state right after setting it gives the
> old value within that render.
> ```jsx
> setCount(count + 1);
> setCount(count + 1); // both read the same stale `count` → only +1 total
> setCount(c => c + 1);
> setCount(c => c + 1); // updater form → +2 (each gets latest)
> ```
> **🪤 Junior trap:** Not using the **functional updater** `setX(prev => ...)` when the new value
> depends on the old one.

> **Q:** Why must state updates be immutable?
> **A:** React decides whether to re-render by comparing references (`Object.is`). If you mutate an
> object/array in place, the reference is unchanged, so React may skip the render. Always create a
> new object/array: `setItems([...items, newItem])`, `setUser({...user, name})`.

---

## `useEffect`

> **Q:** What is `useEffect` for and how does the dependency array work?
> **A:** It runs side effects *after* render — data fetching, subscriptions, manually touching the
> DOM, timers. The deps array controls *when* it re-runs:
> - `[]` → run once after mount.
> - `[a, b]` → run after mount and whenever `a` or `b` change.
> - omitted → run after **every** render.
> Return a **cleanup function** to undo the effect (unsubscribe, clear timer) before the next run
> and on unmount. *(Your `dropzone` socket.io connection is a textbook case: connect in the effect,
> `socket.disconnect()` in cleanup.)*
> **🪤 Junior trap:** Missing dependencies (causes stale values), or putting an object/array/function
> in deps that's recreated every render (causes infinite loops). Also: doing in an effect what could
> be derived during render — not everything needs an effect.

> **Q:** What's a stale closure in `useEffect`?
> **A:** An effect captures the values from the render it was created in. If you reference state in
> a `setInterval` set up with `[]` deps, it keeps seeing the **initial** value forever. Fixes:
> include the value in deps, or use the functional updater / a ref.

> **Q:** When does cleanup run?
> **A:** Before the effect re-runs (deps changed) and when the component unmounts. In React 18+
> Strict Mode (dev only) effects run mount→cleanup→mount once to surface missing cleanup — that's
> why you sometimes see double effects in development.

---

## Memoization: `useMemo`, `useCallback`, `React.memo`

> **Q:** `useMemo` vs `useCallback`?
> **A:** `useMemo(fn, deps)` caches a **computed value**; `useCallback(fn, deps)` caches a **function
> reference**. `useCallback(fn, d)` is just `useMemo(() => fn, d)`. Both recompute only when deps
> change.
> **Q:** When should you NOT use them?
> **A:** Most of the time. They add complexity and their own cost. Reach for them when: (1) an
> expensive calculation runs every render, or (2) you pass a value/function to a `React.memo`'d child
> or a hook deps array and need a **stable reference** to avoid breaking memoization or re-triggering
> effects. Premature memoization everywhere is an anti-pattern.
> **🪤 Junior trap:** Claiming `useMemo`/`useCallback` "make the app faster" by default. They can make
> it *slower* if misapplied. The honest answer is "referential stability + skip expensive work."

---

## `useRef`

> **Q:** What's `useRef` for?
> **A:** Two uses: (1) a reference to a DOM node (`<input ref={inputRef} />`), and (2) a mutable
> value that **persists across renders without causing a re-render** (e.g. a timer id, previous
> value, "has mounted" flag). Mutating `ref.current` doesn't trigger a render.

---

## Custom hooks

> **Q:** What is a custom hook and why write one?
> **A:** A function starting with `use` that calls other hooks to **extract and reuse stateful
> logic** across components — e.g. `useFetch`, `useLocalStorage`, `useDebounce`. It shares logic,
> not UI. *(You build `useFetch`/`useLocalStorage` in [05](05-coding-challenges.md).)*
> **Rules of hooks:** only call hooks at the **top level** (not in loops/conditions/nested functions)
> and only from React functions/other hooks. This is so React can match each hook call to its slot
> by call order across renders.

---

## Context

> **Q:** What problem does Context solve, and what's the cost?
> **A:** It avoids "prop drilling" — passing props through many intermediate layers — by providing a
> value to a subtree any descendant can read via `useContext`. *(Your `dropzone`
> `context/AuthContextProvider.tsx` is exactly this: auth state available app-wide.)*
> **Cost:** every consumer re-renders when the context **value** changes. Don't put rapidly-changing
> values in one giant context; split contexts or memoize the value to limit re-renders.
> **🪤 Junior trap:** Treating Context as a full state-management library. It's a transport
> mechanism, not a store — it doesn't optimize re-renders for you.

---

## Lifting state, composition

> **Q:** What does "lifting state up" mean?
> **A:** When two siblings need the same state, move it to their nearest common parent and pass it
> down as props (plus a setter callback). The parent becomes the single source of truth.

---

## Error boundaries & Suspense

> **Q:** What's an error boundary? *(You have one: `dropzone/.../components/ErrorBoundary.tsx`.)*
> **A:** A component that catches render-time errors in its child tree and shows a fallback UI
> instead of crashing the whole app. Currently must be a class component (`componentDidCatch` /
> `getDerivedStateFromError`). It does **not** catch errors in event handlers or async code — handle
> those with try/catch.

> **Q:** What is Suspense?
> **A:** Lets a component "wait" for something (lazy-loaded code, data) and show a fallback in the
> meantime: `<Suspense fallback={<Spinner/>}>`. Pairs with `React.lazy` for code-splitting.

---

## React Server Components / App Router *(relevant to tono & cpq)*

> **Q:** Server vs client components in Next.js App Router?
> **A:** Components are **server components by default** — they render on the server, can fetch data
> directly, ship no JS to the browser, and can't use state/effects/event handlers. Add `'use client'`
> at the top to make a component interactive (state, effects, `onClick`). Keep client components small
> and at the leaves; do data work on the server. *(In `tono`, your route handlers + server components
> do the data/auth work, client components handle the interactive form.)*
> **🪤 Junior trap:** Putting `'use client'` at the top of everything, losing the benefit. Or trying
> to use `useState` in a server component.

---

### Drill prompts to practice in chat
- "Mock drill: React" — expect re-render reasoning, `useEffect` deps, and "spot the bug" questions.
- Be ready to debug a stale-closure interval and explain why index-as-key breaks a reorderable list.
