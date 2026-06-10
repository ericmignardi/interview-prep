// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 7 — useDebounce  (debounce, the React way)
//
// In plain JS you debounced a FUNCTION. In React, you usually debounce a VALUE:
// useDebounce(value, delay) returns a copy of `value` that only updates after
// `delay` ms have passed with no changes. (Great for search inputs: debounce the
// query, then fetch/filter on the debounced value.)
//
// Build a GENERIC hook: useDebounce<T>(value: T, delay: number): T
//   - returns the latest `value`, but only after it has stopped changing for `delay` ms
//
// Hints — it's the cancel-and-reschedule pattern, using useEffect cleanup:
//   - const [debounced, setDebounced] = useState(value)
//   - useEffect(() => {
//       const id = setTimeout(() => setDebounced(value), delay);
//       return () => clearTimeout(id);   // ← clears the PREVIOUS timer on each change
//     }, [value, delay]);
//   - return debounced
//
// Why it works: every time `value` changes, the effect re-runs. Its cleanup clears
// the previous timer (so it never fires), then a new timer is set. Only when `value`
// stops changing for `delay` ms does a timer survive and update `debounced`.
//
// Run the tests:  npx vitest run useDebounce
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // your code here
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
