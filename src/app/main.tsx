import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "../contexts/user/UserProvider";
import "./index.css";
import { router } from "./routes/router";
import { TaskProvider } from "../contexts/task/TaskProvider";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </UserProvider>
);
