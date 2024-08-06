import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TaskListComponent } from "../components/TaskListComponent";

type TaskList = {
  id: number;
  name: string;
};

export const HomePage = () => {
  const [tasksList, setTasksList] = useState<TaskList[]>([]);

  const addTask = (taskText: string) => {
    const newTaskList = { id: Date.now(), name: taskText };
    setTasksList([...tasksList, newTaskList]);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <button
          onClick={() => addTask("Добавить список задач")}
          className="bg-blue-600 h-10 w-[240px] text-white text-lg rounded-md"
        >
          <AddIcon /> Добавить список задач
        </button>
        {tasksList.map((list) => (
          <TaskListComponent key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};
