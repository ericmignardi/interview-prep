import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SearchPage } from "./pages/SearchPage";
import { ShowDetail } from "./pages/ShowDetail";
import { WatchlistPage } from "./pages/WatchlistPage";

// App = router, wrapped in the Layout shell (nav + theme).
export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </Layout>
  );
};
