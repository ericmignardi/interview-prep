import type { Show } from "../types/types";

// A presentational card for one show. (Tailwind classes are placeholders — tweak
// them once your Tailwind setup is done; they won't error if Tailwind isn't ready.)
export function ShowCard({ show }: { show: Show }) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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
    </article>
  );
}
