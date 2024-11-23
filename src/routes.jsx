import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import BooksPage from "./pages/Books";
import RegisterPage from "./pages/Register";
import NotFoundPage from "./pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/livros", element: <BooksPage /> },
        { path: "/livros/:title", element: <SearchPage /> },
        { path: "/doar", element: <RegisterPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_startTransition: true,
    },
  },
);
