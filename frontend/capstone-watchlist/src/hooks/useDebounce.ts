import { useState, useEffect } from "react";

// React VALUE-debounce: returns `value`, but only after it has stopped changing
// for `delay` ms. (Different from the JS function-debounce — this debounces state.)
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // cancel the pending timer if value changes first
  }, [value, delay]);

  return debounced;
}
