// ─────────────────────────────────────────────────────────────────────────────
// React Challenge 10 — Context  (share state without prop drilling)
//
// Build a theme context with three exports:
//
//   1. ThemeProvider({ children }) — a component that:
//        - holds theme state: 'light' | 'dark' (default 'light')
//        - exposes { theme, toggleTheme } to everything inside it
//        - toggleTheme flips 'light' <-> 'dark'
//
//   2. useTheme() — a custom hook that returns { theme, toggleTheme } from context.
//        - if called OUTSIDE a ThemeProvider, throw:
//          new Error('useTheme must be used within a ThemeProvider')
//
// The React Context API pieces you'll use:
//   - createContext<T>(defaultValue)         → makes the context object
//   - <SomeContext.Provider value={...}>      → provides the value to children
//   - useContext(SomeContext)                 → reads the value (in useTheme)
//
// Hint on the "throw if outside" guard: create the context with a default of
// `undefined`, then in useTheme check for undefined and throw. (That's why the
// custom hook is nicer than calling useContext directly everywhere.)
//
// Run the tests:  npx vitest run ThemeContext
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

// 1. create the context (default undefined → lets useTheme detect "no provider")
// const ThemeContext = ...

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// 2. the provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. the consumer hook
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
