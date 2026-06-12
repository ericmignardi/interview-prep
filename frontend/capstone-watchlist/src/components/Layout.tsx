import type React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useWatchlist } from "../hooks/useWatchlist";

// App shell: a nav bar + a themed wrapper around the routed page.
export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <nav className="flex items-center justify-between border-b border-gray-200/40 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold">
            📺 ShowFinder
          </Link>
          <Link to="/" className="text-sm hover:underline">
            Search
          </Link>
          <Link to="/watchlist" className="text-sm hover:underline">
            Watchlist ({watchlist.length})
          </Link>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-md border border-gray-300/50 px-3 py-1 text-sm"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>

      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
