// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R14 — FilterableList
//
// Render a filterable, sortable list. The key lesson: derive the visible list
// DURING render — do not store it in a separate state or compute it in an effect.
//
// Props: items: { id: string; name: string }[]
//
// Requirements:
// 1. <input aria-label="Filter"> — filters items by name (case-insensitive)
// 2. <button> toggle — switches sort between A→Z and Z→A
//    - the button label should read "Sort A→Z" when currently sorted A→Z
//      (i.e. show the action that clicking will perform — "switch to Z→A")
//    - default sort: A→Z
// 3. Derive `visible` = filtered by query + sorted by name — computed during render,
//    NOT stored in a useState or computed inside a useEffect
// 4. Render <ul> with <li key={item.id}>{item.name}</li>
// 5. When no items match, render <p data-testid="empty">No matches</p>
//    and no <ul>
//
// Run tests: npx vitest run FilterableList
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';

interface Item {
  id: string;
  name: string;
}

interface Props {
  items: Item[];
}

export default function FilterableList({ items }: Props) {
  const [query, setQuery] = useState('');
  const [asc, setAsc] = useState(true);

  const visible = items
    .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

  return (
    <div>
      <input
        aria-label="Filter"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setAsc(a => !a)}>
        {asc ? 'Sort Z→A' : 'Sort A→Z'}
      </button>
      {visible.length === 0 ? (
        <p data-testid="empty">No matches</p>
      ) : (
        <ul>
          {visible.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      )}
    </div>
  );
}
