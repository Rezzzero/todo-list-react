import { createContext } from "react";
import { TaskList } from "../../types/TaskTypes";

type TasksContextType = {
  tasksList: TaskList[];
  addTaskList: (taskText: string) => void;
  deleteTaskList: (taskId: string) => void;
  fetchTasks: () => void;
  clearTasksList: () => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
