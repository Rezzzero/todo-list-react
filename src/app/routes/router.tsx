import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import App from "../App";
import { AuthPage } from "../../pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <AuthPage /> },
      { path: "/login", element: <AuthPage /> },
    ],
  },
]);
