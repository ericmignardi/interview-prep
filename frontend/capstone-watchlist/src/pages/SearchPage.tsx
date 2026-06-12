import { useEffect, useState } from "react";
import { ShowCard } from "../components/ShowCard";
import type { SearchResult, Show } from "../types/types";
import { useDebounce } from "../hooks/useDebounce";

export const SearchPage = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    let isActive = true;

    const handleSearch = async () => {
      // Empty query → no search; clear results and bail.
      if (!debouncedQuery.trim()) {
        if (isActive) {
          setResults([]);
          setError(null);
        }
        return;
      }

      if (isActive) {
        setLoading(true);
        setError(null);
      }

      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(debouncedQuery)}`,
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // search returns SearchResult[] = [{ score, show }, ...] → map to Show[]
        const data: SearchResult[] = await response.json();
        if (isActive) setResults(data.map((r) => r.show));
      } catch (err) {
        if (isActive)
          setError(
            err instanceof Error ? err.message : "Unable to fetch shows",
          );
      } finally {
        if (isActive) setLoading(false);
      }
    };

    handleSearch();

    return () => {
      isActive = false; // ignore a stale/in-flight response if query changes
    };
  }, [debouncedQuery]);

  return (
    <div>
      <input
        className="mb-4 w-full max-w-sm rounded-md border border-gray-300/60 px-2 py-1 focus:outline-none"
        aria-label="Search shows"
        placeholder="Search shows..."
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Status + results */}
      {loading && <p>Loading shows...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && query.trim() && results.length === 0 && (
        <p className="text-gray-500">No shows found</p>
      )}
      {!loading && !query.trim() && (
        <p className="text-gray-500">Search for a show to get started.</p>
      )}

      <div className="grid grid-cols-3 items-start gap-4">
        {results.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};
