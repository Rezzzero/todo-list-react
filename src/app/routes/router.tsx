import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import App from "../App";
import { AuthPage } from "../../pages/AuthPage";
import { RecoverPage } from "../../pages/RecoverPage";
import { UpdatePasswordPage } from "../../pages/UpdatePasswordPage";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/register", element: <AuthPage /> },
        { path: "/login", element: <AuthPage /> },
        { path: "/recover", element: <RecoverPage /> },
        { path: "/update-password", element: <UpdatePasswordPage /> },
      ],
    },
  ]);
