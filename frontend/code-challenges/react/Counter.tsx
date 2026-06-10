// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 1 — Counter  (your first build-and-run React challenge)
//
// Build a Counter component that:
//   - displays the current count as the text:  Count: {count}
//   - has a button labeled "+1" that increments the count
//   - has a button labeled "-1" that decrements the count
//   - has a button labeled "Reset" that sets the count back to 0
//   - uses the FUNCTIONAL UPDATER form of setState — setCount(c => c + 1)
//
// Run the tests:  npx vitest run Counter
// (watch mode while you work:  npx vitest Counter )
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState<number>(0);

  // your code here
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
