import type { Show } from "../types/types";
import { Link } from "react-router-dom";

// A presentational card for one show. Wrapped in a Link to its detail page.
export function ShowCard({ show }: { show: Show }) {
  return (
    <Link
      to={`/show/${show.id}`}
      className="block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md"
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
