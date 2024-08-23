export interface Task {
  id: string;
  task_name: string;
  status: string | null;
  notes: string | "";
  list_id: string;
  created_at: string;
}

export interface TaskProps {
  list: TaskList;
}

export interface TaskList {
  id: string;
  name: string;
}

export interface TasksContextType {
  tasksList: TaskList[];
  tasks: { [key: string]: Task[] };
  setTasks: React.Dispatch<React.SetStateAction<{ [key: string]: Task[] }>>;
  addTaskList: (taskText: string) => void;
  deleteTaskList: (listId: string) => void;
  fetchTasksList: () => void;
  fetchTasks: (listId: string) => void;
  addTask: (taskName: string, listId: string) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  clearTasksList: () => void;
  updateTaskListName: (listId: string, newName: string) => void;
}
