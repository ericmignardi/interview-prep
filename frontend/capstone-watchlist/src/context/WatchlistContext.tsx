import type React from "react";
import { createContext, useReducer, useEffect } from "react";
import type { Show, WatchlistContextValue } from "../types/types";

type Action = { type: "add"; show: Show } | { type: "remove"; id: number };

const STORAGE_KEY = "watchlist";

// 1. the reducer
function reducer(state: Show[], action: Action): Show[] {
  switch (action.type) {
    case "add":
      if (state.some((s) => s.id === action.show.id)) return state; // no dupes
      return [...state, action.show];
    case "remove":
      return state.filter((s) => s.id !== action.id);
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

// read the saved watchlist once, for the reducer's lazy initial state.
function init(): Show[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Show[]) : [];
  } catch {
    return [];
  }
}

// the context (undefined default → enables the guard in useWatchlist)
// eslint-disable-next-line react-refresh/only-export-components
export const WatchlistContext = createContext<
  WatchlistContextValue | undefined
>(undefined);

// 2. the provider
export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  // 3rd arg = lazy initializer → read persisted watchlist once (Milestone 6)
  const [watchlist, dispatch] = useReducer(reducer, [], init);

  // persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      /* ignore */
    }
  }, [watchlist]);

  const add = (show: Show) => dispatch({ type: "add", show });
  const remove = (id: number) => dispatch({ type: "remove", id });
  const isInWatchlist = (id: number) => watchlist.some((s) => s.id === id);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, add, remove, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}
