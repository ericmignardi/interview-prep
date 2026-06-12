import { useState } from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { ShowCard } from "../components/ShowCard";

type SortBy = "name" | "rating";

export const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // DERIVED — filter then sort. (.filter returns a new array, so .sort on it
  // doesn't mutate the watchlist state.)
  const visible = watchlist
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : (b.rating.average ?? 0) - (a.rating.average ?? 0),
    );

  if (watchlist.length === 0) {
    return (
      <p className="text-gray-500">
        Your watchlist is empty — search for shows and tap 🤍 to add them.
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">My Watchlist</h1>

      <div className="mb-4 flex gap-3">
        <input
          aria-label="Filter watchlist"
          placeholder="Filter..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md border border-gray-300/60 px-2 py-1 focus:outline-none"
        />
        <select
          aria-label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="rounded-md border border-gray-300/60 px-2 py-1"
        >
          <option value="name">Sort: Name (A–Z)</option>
          <option value="rating">Sort: Rating (high→low)</option>
        </select>
      </div>

      {visible.length === 0 && <p className="text-gray-500">No matches.</p>}

      <div className="grid grid-cols-3 items-start gap-4">
        {visible.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};
