export type Show = {
  id: number;
  name: string;
  genres: string[];
  summary: string | null; // an HTML string, e.g. "<p>...</p>"
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
};

export type SearchResult = {
  score: number;
  show: Show;
};

export type WatchlistContextValue = {
  watchlist: Show[];
  add: (show: Show) => void;
  remove: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
};

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
