// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 9 — Stopwatch  (useRef)
//
// `useRef` gives you a mutable box (`ref.current`) that:
//   - persists across renders (like state)
//   - but changing it does NOT cause a re-render (unlike state)
// Perfect for holding things like a timer id that you set in one handler and
// clear in another.
//
// Build a Stopwatch:
//   - displays the text:  Time: {seconds}   starting at  Time: 0
//   - "Start" button → begins counting up by 1 every 1000ms
//   - "Stop"  button → stops counting (but keeps the current time)
//   - "Reset" button → stops and sets the time back to 0
//
// Hints:
//   - seconds → useState; the interval id → useRef (you need to clear it in Stop)
//   - to increment: setSeconds(s => s + 1)   ← functional updater (no stale closure!)
//   - Start:  intervalRef.current = setInterval(...)
//   - Stop / Reset:  if (intervalRef.current) clearInterval(intervalRef.current)
//   - ref type: useRef<ReturnType<typeof setInterval> | null>(null)
//
// Why a ref (not state) for the interval id? The id is just a handle you need to
// clear later — you never render it — so you don't want setting it to re-render.
//
// Run the tests:  npx vitest run Stopwatch
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from "react";

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    if (intervalRef.current) return; // already running — don't start a 2nd interval
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1); // functional updater → no stale closure
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // mark as stopped
    }
  };

  const handleReset = () => {
    handleStop();
    setSeconds(0);
  };

  return (
    <div>
      <p>Time: {seconds}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
