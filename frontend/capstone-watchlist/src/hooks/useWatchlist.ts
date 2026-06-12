import { useContext } from "react";
import type { WatchlistContextValue } from "../types/types";
import { WatchlistContext } from "../context/WatchlistContext";

export function useWatchlist(): WatchlistContextValue {
  const ctx = useContext(WatchlistContext);
  if (!ctx)
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  return ctx;
}
