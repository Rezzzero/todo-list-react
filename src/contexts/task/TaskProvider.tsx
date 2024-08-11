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
  const [updateList, setUpdateList] = useState(false);

  const fetchTasks = async () => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("tasks_list")
        .select("*")
        .eq("user_id", user.id);

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
  }, [user, updateList]);

  const addTaskList = async (taskText: string) => {
    if (user && user.id) {
      const { data, error } = await supabase
        .from("tasks_list")
        .insert([{ name: taskText, user_id: user.id }])
        .single();

      if (error) {
        console.error("Error adding task list:", error.message);
      } else {
        setTasksList((prevTasks) => [...prevTasks, data]);
        setUpdateList(true);
      }
    } else {
      console.error("User is null or user.id is missing");
    }
  };

  return (
    <TasksContext.Provider value={{ tasksList, addTaskList, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
