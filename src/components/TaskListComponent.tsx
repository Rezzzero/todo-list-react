import { TableComponent } from "./TableComponent";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Task, TaskProps } from "../types/TaskTypes";
import { useTasks } from "../contexts/task/useTasks";
import DeleteIcon from "@mui/icons-material/Delete";

export const TaskListComponent = ({ list }: TaskProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { deleteTaskList } = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("list_id", list.id)
        .order("created_at", { ascending: true });

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

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task:", error);
    } else {
      console.log("Task updated:", data[0]);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? data[0] : task))
      );
    }
  };

  const handleDeleteList = () => {
    deleteTaskList(list.id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-blue-300">{list.name}</h1>
        <button
          onClick={handleDeleteList}
          className="bg-red-600 text-white p-2 rounded-md"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex w-full mb-[40px]">
        <div className="w-full">
          <TableComponent
            onAddTask={addTask}
            tasks={tasks}
            onUpdateTask={updateTask}
          />
        </div>
      </div>
    </>
  );
};
