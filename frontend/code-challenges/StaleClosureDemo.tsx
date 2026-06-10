// Demonstration: the stale-closure trap, proven by tests.
// Both buttons call setCount THREE times in one handler. The only difference is
// stale (count + 1) vs functional updater (prev => prev + 1).
import { useState } from 'react';

export function StaleClosureDemo() {
  const [count, setCount] = useState(0);

  // STALE: all three calls read the SAME `count` from this render's closure snapshot.
  const staleAdd3 = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  // FUNCTIONAL: each call gets the latest pending value from React (`prev`).
  const funcAdd3 = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={staleAdd3}>stale +3</button>
      <button onClick={funcAdd3}>func +3</button>
    </div>
  );
}
