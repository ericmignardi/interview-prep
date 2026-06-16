// ─────────────────────────────────────────────────────────────────────────────
// React Challenge R20 — PaginatedList
//
// Fetch a paginated list. Load page 1 on mount, then append subsequent pages
// when the user clicks "Load more". Common take-home pattern.
//
// API: GET /api/items?page={n}
//   Response: { items: string[]; hasMore: boolean }
//
// Requirements:
// 1. Fetch page 1 on mount — append results to the list
// 2. <ul> with <li> for each item (accumulate across pages)
// 3. <p data-testid="loading">Loading…</p> while any fetch is in flight
// 4. <button data-testid="load-more">Load more</button>
//    — only rendered when hasMore is true
//    — clicking fetches the next page and appends items
// 5. When hasMore is false, the button disappears
//
// Hint: track `page` (current page number) and `hasMore` in state.
//       Use a single fetch function called on mount and on button click.
//
// Run tests: npx vitest run PaginatedList
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

interface ApiResponse {
  items: string[];
  hasMore: boolean;
}

export default function PaginatedList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function fetchPage(pageNum: number) {
    // TODO: fetch /api/items?page={pageNum}
    // TODO: setLoading(true) before, setLoading(false) after
    // TODO: append new items to existing list (don't replace)
    // TODO: update hasMore from response
  }

  useEffect(() => {
    // TODO: fetch page 1 on mount
  }, []);

  function loadMore() {
    // TODO: increment page and fetch next page
  }

  return (
    <div>
      {loading && <p data-testid="loading">Loading…</p>}
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      {hasMore && !loading && (
        <button data-testid="load-more" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
