// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 8 — useLocalStorage  (you architect this one)
//
// Build:  useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void]
//
// Behavior:
//   - works like useState, but PERSISTS the value to localStorage under `key`
//   - on first render: if `key` already exists in localStorage, use that stored
//     value; otherwise fall back to `initialValue`
//   - calling the setter updates the React state AND writes to localStorage
//   - values are stored as JSON, so it must work for strings, numbers, AND objects
//
// Constraints:
//   - generic over T
//   - returns a [value, setValue] tuple (same shape as useState)
//
// No structural hints this time — you've got every piece (useState, JSON,
// localStorage, generics). Think about WHERE the read-from-storage should happen
// so it only runs on the first render, not every render.
//
// Run the tests:  npx vitest run useLocalStorage
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // Gap 1 — LAZY INITIALIZER: runs once, on the first render. Read from storage
  // if present (parse the JSON), otherwise fall back to initialValue.
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  // Gap 2 — WRAPPED SETTER: update state AND persist to localStorage.
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}
