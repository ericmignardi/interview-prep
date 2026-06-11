# Capstone — Show Search & Watchlist

A small but complete React app that exercises the **entire** junior React surface, assembled from the
hooks/patterns already built in `interview-prep/`. Build it in slices — each milestone runnable.

## Run it
```bash
npm run dev      # start the dev server, open the printed localhost URL
npm run build    # type-check + production build
```

## The app
Search TV shows → see results → click one for a detail page → add/remove from a watchlist that
**persists** across refreshes → filter the watchlist → toggle light/dark theme.

## API — TVmaze (no key needed)
- Search: `https://api.tvmaze.com/search/shows?q=batman` → array of `{ score, show }`
- One show: `https://api.tvmaze.com/shows/:id`
- Each `show` has: `id`, `name`, `genres`, `summary` (HTML string), `image?.medium`, `rating?.average`

## Milestones (build in order — each one runs)
1. **Scaffold UI** — a search input + a static/hard-coded results grid (cards). Lists + keys.
2. **Wire the API** — type a query → fetch → render real results. Handle loading / error / empty.
3. **Debounce** — only fetch after typing stops (reuse the `useDebounce` pattern).
4. **Routing** — `react-router`: click a card → detail page at `/show/:id` (fetch that show).
5. **Watchlist** — add/remove (a `useReducer` or Context). Show an "in watchlist" badge on cards.
6. **Persist** — save the watchlist with the `useLocalStorage` pattern (survives refresh).
7. **Filter/sort** the watchlist — derived state (no separate stored list).
8. **Theme** — light/dark toggle via a `ThemeContext` (reuse the pattern built earlier).
9. **Polish** — empty states, loading skeletons, a little Tailwind.

## Coverage map (this is why it's a capstone)
| Feature | React concept | Already built in interview-prep |
|---|---|---|
| search box | controlled input, `useState` | — |
| wait-to-search | `useDebounce` | ✅ |
| fetch results | data fetching, loading/error | `useFetch` ✅ |
| results grid | lists + keys, conditional render | ProductList ✅ |
| detail page | routing | new |
| watchlist | `useReducer` / Context | CounterReducer ✅ |
| persistence | `useLocalStorage` | ✅ |
| filter/sort | derived state | ProductList ✅ |
| theme toggle | Context | ThemeContext ✅ |

## Notes
- Build with Claude milestone-by-milestone; keep each slice small and working.
- `summary` from TVmaze is an HTML string — render carefully (strip tags or use a safe approach).
- Consider extracting reusable hooks (`useDebounce`, `useFetch`, `useLocalStorage`) into a `src/hooks/` folder.
