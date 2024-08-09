import { createContext } from "react";

type TaskList = {
  id: string;
  name: string;
};

type TasksContextType = {
  tasksList: TaskList[];
  addTaskList: (taskText: string) => void;
  fetchTasks: () => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
