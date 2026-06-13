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
  // TODO: query state (string, default '')
  // TODO: asc state (boolean, default true → A→Z)

  // TODO: derive visible — filter + sort (no useState/useEffect for this)

  return (
    <div>
      <input
        aria-label="Filter"
        // TODO: value + onChange
      />
      <button
        // TODO: onClick toggle sort
      >
        {/* TODO: button label reflecting current sort */}
      </button>
      {/* TODO: render list or empty state */}
    </div>
  );
}
