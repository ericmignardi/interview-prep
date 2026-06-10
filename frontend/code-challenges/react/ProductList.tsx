// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 6 — ProductList  (lists + keys + DERIVED state)
//
// Build a filterable list:
//   - render PRODUCTS as a list (<ul><li>...). Each <li> needs a stable `key`.
//   - a text input (aria-label="Filter") that filters the list by name,
//     case-insensitive, as you type
//   - if nothing matches, render the text:  No products found
//
// KEY LESSON — derived state:
//   Do NOT store the filtered list in its own useState. Keep ONE piece of state
//   (the query string) and DERIVE the visible list during render by filtering.
//   Storing derived data in state leads to bugs where it gets out of sync.
//
// Hints:
//   - const [query, setQuery] = useState('')
//   - const visible = PRODUCTS.filter(p =>
//       p.name.toLowerCase().includes(query.toLowerCase()))
//   - <li key={p.id}>{p.name}</li>
//   - {visible.length === 0 && <p>No products found</p>}
//
// Run the tests:  npx vitest run ProductList
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Stratocaster" },
  { id: 2, name: "Telecaster" },
  { id: 3, name: "Les Paul" },
  { id: 4, name: "SG" },
];

export function ProductList() {
  // your code here
  const [query, setQuery] = useState<string>("");

  const visible = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      {/* Search */}
      <input
        aria-label="Filter"
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* List */}
      {visible.length === 0 && <p>No products found</p>}

      <ul>
        {visible.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
