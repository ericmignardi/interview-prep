import type React from "react";
import { createContext } from "react";
import type { Theme, ThemeContextType } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

// This file exports both the context and its provider; the context export
// trips react-refresh's HMR rule (no runtime impact), so allow it here.
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // persisted: theme survives refresh (Milestone 6)
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
