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
      <h1 className="text-3xl text-blue-500">Менеджер задач</h1>
      <div className="space-y-4">
        <AddIcon
          onClick={() => addTask("Список задач")}
          style={{ cursor: "pointer" }}
        />
        {tasksList.map((list) => (
          <TaskListComponent key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};
