// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R12 — React.memo + useCallback
//
// Key lesson: React.memo only prevents re-renders if the props it receives are
// STABLE references. If the parent passes a new function object every render
// (even with the same logic), memo's shallow comparison fails and the child
// re-renders anyway. useCallback stabilizes the reference.
//
// Components to build:
//
//   Item (memo'd with React.memo) — props: { text: string; onRemove: (text: string) => void }
//     - renders a <li> containing:
//         - the item text
//         - <button>Remove</button> that calls onRemove(text)
//         - <span data-testid={`renders-${text}`}> showing how many times it has rendered
//           (track with a useRef that you increment on every render)
//
//   MemoizedList (the parent)
//     - state: items string[] — start with ['alpha', 'beta', 'gamma']
//     - state: tick number — a counter to simulate unrelated parent state changes
//     - renders <button>Tick</button> that increments tick (simulates a clock/timer)
//     - wraps onRemove in useCallback so Item does NOT re-render on Tick clicks
//     - renders one <Item> per item
//
// After implementing: click Tick and confirm the render counts do NOT increment.
// Then remove useCallback to see the counts increment — that's the proof.
//
// Run tests: npx vitest run MemoizedList
// ─────────────────────────────────────────────────────────────────────────────
import { memo, useCallback, useRef, useState } from 'react';

interface ItemProps { text: string; onRemove: (text: string) => void; }

const Item = memo(function Item({ text, onRemove }: ItemProps) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <li>
      {text}
      <button onClick={() => onRemove(text)}>Remove</button>
      <span data-testid={`renders-${text}`}>{renderCount.current}</span>
    </li>
  );
});

export default function MemoizedList() {
  const [items, setItems] = useState(['alpha', 'beta', 'gamma']);
  const [tick, setTick] = useState(0);

  const onRemove = useCallback((text: string) => {
    setItems(prev => prev.filter(i => i !== text));
  }, []);

  return (
    <div>
      <button onClick={() => setTick(t => t + 1)}>Tick</button>
      <ul>
        {items.map(item => (
          <Item key={item} text={item} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
}
