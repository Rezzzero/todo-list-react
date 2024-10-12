import { createContext } from "react";
import { TasksContextType } from "../types/TaskTypes";

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
