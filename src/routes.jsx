import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import BooksPage from "./pages/Books";
import DonatePage from "./pages/Donate";
import NotFoundPage from "./pages/NotFound";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/livros", element: <BooksPage /> },
        { path: "/livros/:title", element: <SearchPage /> },
        { path: "/doar", element: <DonatePage /> },
        { path: "/cadastro", element: <SignUpPage /> },
        { path: "/login", element: <SignInPage /> },
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
