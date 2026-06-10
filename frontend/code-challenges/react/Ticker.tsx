// ─────────────────────────────────────────────────────────────────────────────
// React Mechanics 1 — Ticker  (the stale-closure trap, live)
//
// Build a component that auto-counts UP once per second:
//   - displays the text:  Seconds: {count}   starting at  Seconds: 0
//   - every 1000ms, count increases by 1 (use setInterval inside useEffect)
//   - clean up the interval on unmount
//
// ⚠️ THE TRAP: the obvious version — setInterval(() => setCount(count + 1), 1000)
//    with [] deps — gets STUCK at 1. Figure out WHY, and fix it so it keeps
//    counting (the tests below advance time by several seconds).
//
// (Minimal hints. The fix is something you already know from your Counter work.
//  Think about what value `count` has inside that interval callback, given the
//  effect only runs once.)
//
// Run the tests:  npx vitest run Ticker
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export function Ticker() {
  // your code here
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      // setCount(count + 1); Frozen snapshot render
      setCount((prev) => prev + 1); // Trigger/schedule re-render that uses latest value
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p>Seconds: {count}</p>
    </div>
  );
}
