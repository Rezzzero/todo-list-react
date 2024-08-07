import { TableComponent } from "./TableComponent";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  task_name: string;
  status: string | null;
  notes: string | null;
  list_id: string;
  created_at: string;
};

type TaskProps = {
  list: {
    id: string;
    name: string;
  };
};

export const TaskListComponent: React.FC<TaskProps> = ({ list }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("list_id", list.id);

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data || []);
      }
    };

    fetchTasks();
  }, [list.id]);

  const addTask = async (taskName: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ task_name: taskName, list_id: list.id }])
      .select();

    if (error) {
      console.error("Error adding task:", error);
    } else {
      console.log("Task added:", data[0]);
      setTasks((prevTasks) => [...prevTasks, data[0] as Task]);
    }
  };
  return (
    <>
      <h1 className="text-3xl text-blue-300">{list.name}</h1>
      <div className="flex w-full mb-[40px]">
        <div className="w-full">
          <TableComponent onAddTask={addTask} tasks={tasks} />
        </div>
      </div>
    </>
  );
};
