// Shape of a show from the TVmaze API (the fields we actually use).
export type Show = {
  id: number;
  name: string;
  genres: string[];
  summary: string | null; // an HTML string, e.g. "<p>...</p>"
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
};

// The /search/shows endpoint returns an array of these.
export type SearchResult = {
  score: number;
  show: Show;
};
