import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { TaskListComponent } from "./components/TaskListComponent";

type TaskList = {
  id: number;
  name: string;
};

function App() {
  const [tasksList, setTasksList] = useState<TaskList[]>([]);

  const addTask = (taskText: string) => {
    const newTaskList = { id: Date.now(), name: taskText };
    setTasksList([...tasksList, newTaskList]);
  };

  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-3xl text-blue-500">Менеджер задач</h1>
      <AddIcon
        onClick={() => addTask("Список задач")}
        style={{ cursor: "pointer" }}
      />
      {tasksList.map((list) => (
        <TaskListComponent key={list.id} list={list} />
      ))}
    </div>
  );
}

export default App;
