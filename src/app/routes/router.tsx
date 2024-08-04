import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import SignupComponent from "../../components/Auth/SignupComponent";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <SignupComponent /> },
    ],
  },
]);
