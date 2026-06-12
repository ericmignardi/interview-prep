import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </WatchlistProvider>
    </BrowserRouter>
  </StrictMode>,
);
