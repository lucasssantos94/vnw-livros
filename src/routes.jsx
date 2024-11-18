import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import BooksPage from "./pages/Books";
import RegisterPage from "./pages/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/livros" element={<BooksPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/pesquisa/query" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
