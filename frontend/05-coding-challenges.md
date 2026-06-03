# 05 — Coding Challenges

Laddered from warm-up to typical junior live-coding tasks. **Attempt each one before opening
the solution.** In chat, say "Coding challenge" and I'll hand you one, watch you solve it, then
review correctness, edge cases, typing, and idiom + give a stretch variant.

Solutions are in collapsed `<details>` blocks at the bottom — no peeking until you've tried.

---

## Tier 1 — JS/TS warm-ups (5–10 min each)

**1.1 `groupBy`** — Write `groupBy(arr, keyFn)` that returns an object grouping items by the key
returned from `keyFn`. Type it generically.
`groupBy([6.1, 4.2, 6.3], Math.floor)` → `{ 4: [4.2], 6: [6.1, 6.3] }`

**1.2 `debounce`** — Write `debounce(fn, delay)` returning a debounced version that only calls
`fn` after `delay` ms of no further calls. Preserve `this` and arguments.

**1.3 `flatten`** — Flatten an arbitrarily nested array of numbers one level, then (stretch) fully.
`flatten([1, [2, [3, [4]]]])` → `[1, 2, 3, 4]`

**1.4 Predict the output** — explain *why*:
```js
for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }
for (let j = 0; j < 3; j++) { setTimeout(() => console.log(j), 0); }
```

---

## Tier 2 — React components (15–25 min each)

**2.1 Counter** — A counter with +/− buttons and a "add 3" button that increments by 3 in one
click. (Tests the functional state updater.)

**2.2 Controlled form** — A name + email form: controlled inputs, a submit handler that
`preventDefault`s, basic "required" validation showing an inline error, and disables submit while
"submitting." Type all the events.

**2.3 Debounced search** — An input that, 400 ms after the user stops typing, fetches
`https://api.example.com/search?q=…` and renders results. Handle **loading**, **error**, and
**empty** states, and **cancel/ignore stale responses** when a newer query supersedes an older one.
(This is the single most common junior take-home pattern.)

**2.4 Filterable list** — Given an array of items, render them with a text filter and a
"sort A–Z / Z–A" toggle. Use proper `key`s. Derive the filtered+sorted list during render (no
unnecessary state/effect).

---

## Tier 3 — Custom hooks & a11y (25+ min)

**3.1 `useLocalStorage`** — `const [value, setValue] = useLocalStorage('key', initial)` that reads
from `localStorage` on init and writes on change. Handle JSON parse errors and SSR (no `window`).

**3.2 `useFetch`** — `const { data, loading, error } = useFetch<T>(url)` that fetches on mount and
when `url` changes, with cleanup to ignore the response if the component unmounted or `url` changed
(no setting state after unmount).

**3.3 Accessible modal** — A `<Modal open onClose>` that renders children, closes on `Escape` and
backdrop click, locks focus inside while open, and restores focus to the trigger on close. Mark it
up with `role="dialog" aria-modal="true"`.

---

<details>
<summary><b>Solutions — Tier 1</b> (try first!)</summary>

```ts
// 1.1 groupBy
function groupBy<T, K extends PropertyKey>(arr: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
```

```ts
// 1.2 debounce
function debounce<A extends unknown[]>(fn: (...args: A) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: A) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

```ts
// 1.3 flatten (one level)
const flattenOne = <T,>(arr: (T | T[])[]): T[] => arr.flat();
// fully recursive
function flattenDeep(arr: any[]): any[] {
  return arr.reduce((acc, x) => acc.concat(Array.isArray(x) ? flattenDeep(x) : x), []);
}
// or simply: arr.flat(Infinity)
```

```
// 1.4 output: 3 3 3 then 0 1 2
// var is function-scoped: all three timeouts close over the SAME i, which is 3 by the time
// they run. let is block-scoped: each iteration gets a fresh binding of j → 0,1,2.
```

</details>

<details>
<summary><b>Solutions — Tier 2</b></summary>

```tsx
// 2.1 Counter
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c - 1)}>−</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => { setCount((c) => c + 1); setCount((c) => c + 1); setCount((c) => c + 1); }}>
        +3
      </button>
    </div>
  );
}
```

```tsx
// 2.2 Controlled form
type FormState = { name: string; email: string };

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email) return setError('All fields are required');
    setError(null);
    setSubmitting(true);
    try { await fakeSubmit(form); } finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      {error && <p role="alert">{error}</p>}
      <button disabled={submitting}>{submitting ? 'Sending…' : 'Submit'}</button>
    </form>
  );
}
```

```tsx
// 2.3 Debounced search (the key bit is ignoring stale responses)
function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!q) { setResults([]); return; }
    const controller = new AbortController();
    const id = setTimeout(async () => {
      setLoading(true); setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        setResults(await res.json());
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => { clearTimeout(id); controller.abort(); }; // cancels stale work
  }, [q]);

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      {loading && <p>Loading…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && q && results.length === 0 && <p>No results</p>}
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </div>
  );
}
```

```tsx
// 2.4 Filterable list — derive during render, no extra state
function FilterableList({ items }: { items: { id: string; name: string }[] }) {
  const [query, setQuery] = useState('');
  const [asc, setAsc] = useState(true);

  const visible = items
    .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setAsc((v) => !v)}>{asc ? 'A→Z' : 'Z→A'}</button>
      <ul>{visible.map((i) => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  );
}
```

</details>

<details>
<summary><b>Solutions — Tier 3</b></summary>

```tsx
// 3.1 useLocalStorage
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial; // SSR guard
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  }, [key, value]);

  return [value, setValue] as const;
}
```

```tsx
// 3.2 useFetch — ignore stale/unmounted responses
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true); setError(null);
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((d) => { if (active) setData(d as T); })
      .catch((e) => { if (active) setError(e as Error); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; }; // prevents setState after unmount / url change
  }, [url]);

  return { data, loading, error };
}
```

```tsx
// 3.3 Accessible modal (core mechanics)
function Modal({ open, onClose, children }: {
  open: boolean; onClose: () => void; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocus.current = document.activeElement as HTMLElement;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prevFocus.current?.focus(); // restore focus to trigger
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
// Note: full focus-trapping (Tab cycling within the dialog) is the stretch goal — talk through it.
```

</details>

---

### What reviewers grade in live coding
1. **Does it work?** Get to a running solution before optimizing.
2. **Edge cases** — empty input, loading/error states, stale responses, null/undefined.
3. **Readability** — clear names, small functions, no premature cleverness.
4. **React correctness** — keys, immutable updates, effect cleanup, functional updaters.
5. **Communication** — narrate your thinking. Silence reads as being stuck.
