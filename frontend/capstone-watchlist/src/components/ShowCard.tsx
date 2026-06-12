import { Link } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist";
import type { Show } from "../types/types";

// A card for one show. Wrapped in a Link to its detail page, with a
// watchlist toggle button overlaid.
export function ShowCard({ show }: { show: Show }) {
  const { isInWatchlist, add, remove } = useWatchlist();
  const inList = isInWatchlist(show.id);

  // The whole card is a <Link>, so the button must NOT navigate on click.
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inList) remove(show.id);
    else add(show);
  };

  return (
    <Link
      to={`/show/${show.id}`}
      className="relative block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md"
    >
      {show.image ? (
        <img
          src={show.image.medium}
          alt={show.name}
          className="h-64 w-full object-cover"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-gray-400">
          No image
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
        className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-lg shadow"
      >
        {inList ? "❤️" : "🤍"}
      </button>

      <div className="p-3">
        <h3 className="font-semibold">{show.name}</h3>
        <p className="text-sm text-gray-500">
          {show.genres.join(", ") || "No genres"}
        </p>
        {show.rating.average != null && (
          <span className="text-sm">⭐ {show.rating.average}</span>
        )}
      </div>
    </Link>
  );
}
