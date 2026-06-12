import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Show } from "../types/types";

export const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchShow = async () => {
      if (isActive) {
        setLoading(true);
        setError(null);
      }
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        // /shows/:id returns a single Show directly (no { score, show } wrapper).
        const data: Show = await response.json();
        if (isActive) setShow(data);
      } catch (err) {
        if (isActive)
          setError(err instanceof Error ? err.message : "Unable to fetch show");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchShow();

    return () => {
      isActive = false;
    };
  }, [id]);

  return (
    <div className="min-h-screen p-4">
      <Link to="/" className="text-blue-600 underline">
        ← Back to search
      </Link>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4">{error}</p>}

      {!loading && !error && show && (
        <article className="mt-4 flex gap-6">
          {show.image && (
            <img
              src={show.image.original || show.image.medium}
              alt={show.name}
              className="w-48 rounded-md"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{show.name}</h1>
            <p className="text-sm text-gray-500">
              {show.genres.join(", ") || "No genres"}
            </p>
            {show.rating.average != null && (
              <p className="mt-1">⭐ {show.rating.average}</p>
            )}
            {show.summary && (
              // TVmaze `summary` is an HTML string from a trusted API.
              <div
                className="mt-3 max-w-prose"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            )}
          </div>
        </article>
      )}
    </div>
  );
};
