import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HomePage from "@pages/Home";
import SearchPage from "@pages/Search";
import BooksPage from "@pages/Books";
import DonatePage from "@pages/Donate";
import NotFoundPage from "@pages/NotFound";
import SignUpPage from "@pages/SignUp";
import SignInPage from "@pages/SignIn";
import PrivateRoute from "./PrivateRoute";
import DonationsPage from "@pages/Donations";
import Profile from "@pages/Profile";
import RecoveryPassword from "../pages/RecoveryPassWord";
import ResetPassword from "../pages/ResetPassword";

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
        { path: "/recuperar-senha", element: <RecoveryPassword /> },
        { path: "/redefinir-senha", element: <ResetPassword /> },

        {
          path: "/doacoes",
          element: (
            <PrivateRoute>
              <DonationsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/perfil",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
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
