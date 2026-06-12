import { Routes, Route } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { ShowDetail } from "./pages/ShowDetail";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/show/:id" element={<ShowDetail />} />
    </Routes>
  );
};
