// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 5 — useFetch  (the classic data-fetching custom hook)
//
// Build a GENERIC hook: useFetch<T>(url: string) that returns:
//   { data: T | null, loading: boolean, error: string | null }
//
// Behavior:
//   - on mount (and whenever `url` changes), fetch the url
//   - while in flight: loading = true
//   - on success: data = the parsed JSON, loading = false
//   - on failure (network error OR a non-ok response): error = a message, loading = false
//   - CLEANUP: if the component unmounts or `url` changes before the request
//     finishes, IGNORE the result (don't setState) — use an `active` flag
//
// Hints:
//   - three pieces of state: data (T | null), loading (boolean), error (string | null)
//   - useEffect with [url]; declare `let active = true;` at the top
//   - fetch(url) → if (!res.ok) throw new Error(...) → res.json()
//   - guard every setState with `if (active)`; return () => { active = false; }
//   - this is the same "ignore stale responses" idea from the debounced-search challenge
//
// Run the tests:  npx vitest run useFetch
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const handleFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (active) setData(json);
      } catch (err) {
        if (active) setError((err as Error).message);
      } finally {
        if (active) setLoading(false);
      }
    };

    handleFetch();

    return () => {
      active = false;
    };
  }, [url]);

  return { data, loading, error };
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE — the same logic written with a .then()/.catch()/.finally() chain.
// (Note: with the chain, handleFetch does NOT need to be `async` — no `await`.)
//
//   const handleFetch = () => {
//     setLoading(true);
//     setError(null);
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`); // thrown → goes to .catch
//         return res.json();                                  // returned promise auto-chains
//       })
//       .then((json) => { if (active) setData(json); })
//       .catch((err) => { if (active) setError(err.message); })
//       .finally(() => { if (active) setLoading(false); });
//   };
//
// Both are equivalent. async/await + try/catch/finally is generally preferred today.
// ─────────────────────────────────────────────────────────────────────────────
