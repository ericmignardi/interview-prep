// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R11 — useMemo
//
// A component receives a list of numbers and has an unrelated "Dark Mode" toggle.
// The even-number sum computation must NOT re-run when the toggle flips —
// only when `items` actually changes. That is the whole point of useMemo.
//
// Requirements:
// 1. State: dark mode boolean (default false)
// 2. Wrap the even-number sum in useMemo (deps: [items])
//    — inside the memo callback, increment a computeCount ref before returning
// 3. Render <p data-testid="sum">{sum}</p>
// 4. Render <p data-testid="compute-count">{computeCount}</p>
// 5. Render <button>Toggle Dark Mode</button> that flips dark mode
// 6. Apply className="dark" to <div data-testid="container"> when dark mode is on
//
// After implementing: toggle dark mode several times and confirm compute-count
// stays at 1. That proves useMemo is doing its job.
//
// Run tests: npx vitest run MemoDemo
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useRef, useState } from 'react';

interface Props {
  items: number[];
}

export default function MemoDemo({ items }: Props) {
  // TODO: dark mode state

  // TODO: computeCount ref (starts at 0)

  // TODO: useMemo — filter even numbers, sum them; increment computeCount ref inside
  const sum = 0; // replace this line

  return (
    <div data-testid="container">
      {/* TODO: toggle button */}
      <p data-testid="sum">{sum}</p>
      {/* TODO: compute-count paragraph */}
    </div>
  );
}
