// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R13 — DebouncedSearch  ⭐ most-asked junior take-home pattern
//
// Build a search input that debounces the query, fetches results, and handles
// every UI state. This is the pattern junior interviewers ask for most often.
//
// Requirements:
// 1. Controlled <input aria-label="Search"> for the query string.
// 2. Debounce: wait 400 ms after the user stops typing BEFORE fetching.
//    (clearTimeout + setTimeout in useEffect cleanup)
// 3. Fetch from `/api/search?q={query}` — response JSON is string[].
//    — use AbortController to cancel the previous request when query changes
//    — check res.ok; throw an Error if false (fetch does NOT throw on 4xx/5xx)
//    — if the AbortError fires, do NOT set error state
// 4. Four UI states:
//    — loading  → <p data-testid="loading">Loading…</p>
//    — error    → <p data-testid="error">Something went wrong</p>
//    — empty    → <p data-testid="empty">No results</p>  (query set, 0 results)
//    — results  → <ul> with <li key={r}>{r}</li> for each result
// 5. When query is empty: clear results and do NOT fetch.
//
// The full useEffect cleanup should do TWO things:
//   clearTimeout(id)        ← cancels the debounce timer
//   controller.abort()      ← cancels the in-flight fetch
//
// Run tests: npx vitest run DebouncedSearch
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  // TODO: loading, error, results state

  useEffect(() => {
    if (!query) {
      // TODO: clear results and return early (no fetch)
      return;
    }

    const controller = new AbortController();

    // TODO: debounce — setTimeout → fetch → update state
    // cleanup: clearTimeout + controller.abort()
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
        placeholder="Search…"
      />
      {/* TODO: loading / error / empty / results */}
    </div>
  );
}
