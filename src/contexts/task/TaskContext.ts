import { createContext } from "react";
import { TaskList } from "../../types/TaskTypes";

type TasksContextType = {
  tasksList: TaskList[];
  addTaskList: (taskText: string) => void;
  fetchTasks: () => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
