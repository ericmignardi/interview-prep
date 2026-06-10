// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 2 — useToggle  (your first custom hook)
//
// A custom hook is a function starting with `use` that calls other hooks to
// package up reusable stateful logic.
//
// Build `useToggle(initial = false)` that returns a TUPLE: [value, toggle]
//   - value: the current boolean
//   - toggle: a function that flips the boolean (false → true → false ...)
//
// Requirements:
//   - default the initial value to false
//   - use useState for the boolean
//   - flip with the FUNCTIONAL UPDATER (v => !v)
//   - wrap `toggle` in useCallback so its reference stays stable across renders
//   - type the return as a tuple: [boolean, () => void]  (use `as const` or annotate)
//
// Run the tests:  npx vitest run useToggle
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useCallback } from "react";

export function useToggle(initial = false): [boolean, () => void] {
  // your code here
  const [value, setValue] = useState<boolean>(initial);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}
