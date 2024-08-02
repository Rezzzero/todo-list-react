import { useState } from "react";
import { TaskComponent } from "./TaskComponent";

type TaskProps = {
  list: {
    id: number;
    name: string;
  };
};

type Task = {
  id: number;
  name: string;
  owner: string;
  status: string;
  notes: string;
};

export const TaskListComponent: React.FC<TaskProps> = ({ list }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");

  const addTask = (taskText: string) => {
    const newTask = {
      id: Date.now(),
      name: taskText,
      owner: "owner",
      status: "status",
      notes: "notes",
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskName.trim() !== "") {
      addTask(taskName);
    }
  };

  console.log(taskName);
  return (
    <>
      <h1 className="text-3xl text-blue-300">{list.name}</h1>
      <div className="flex w-full h-[50px] bg-gray-200">
        <div className="w-full h-[30px]">
          {tasks.map((task) => (
            <TaskComponent task={task} key={task.id} />
          ))}
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="+ Добавить задачу"
            className="w-[200px] h-[25px] pl-2"
          ></input>
        </div>
      </div>
    </>
  );
};
