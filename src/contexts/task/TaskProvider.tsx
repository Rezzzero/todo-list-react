import { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useUser } from "../user/useUser";
import { TasksContext } from "./TaskContext";
import { TaskList } from "../../types/TaskTypes";

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasksList, setTasksList] = useState<TaskList[]>([]);
  const { user } = useUser();

  const fetchTasks = async () => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("tasks_list")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error.message);
      } else {
        setTasksList(data || []);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addTaskList = async (taskText: string) => {
    const { data, error } = await supabase
      .from("tasks_list")
      .insert([{ name: taskText }])
      .single();

    if (error) {
      console.error("Error adding task list:", error.message);
    } else {
      setTasksList((prevTasks) => [...prevTasks, data]);
      fetchTasks();
    }
  };

  const deleteTaskList = async (listId: string) => {
    try {
      const { error: deleteTasksError } = await supabase
        .from("tasks")
        .delete()
        .eq("list_id", listId);

      if (deleteTasksError) {
        throw new Error(`Error deleting tasks: ${deleteTasksError.message}`);
      }

      const { error: deleteListError } = await supabase
        .from("tasks_list")
        .delete()
        .eq("id", listId);

      if (deleteListError) {
        throw new Error(`Error deleting task list: ${deleteListError.message}`);
      }

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasksList, addTaskList, deleteTaskList, fetchTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};
