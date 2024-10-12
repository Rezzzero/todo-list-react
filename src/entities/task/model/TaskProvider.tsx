import { useState, useEffect, ReactNode, useCallback } from "react";
import supabase from "../../../shared/api/supabaseClient";
import { Task, TaskList } from "../types/TaskTypes";
import { useUser } from "../../user/model/useUser";
import { TasksContext } from "./TaskContext";

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasksList, setTasksList] = useState<TaskList[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const user = useUser();

  const fetchTasksList = useCallback(async () => {
    const { data, error } = await supabase
      .from("tasks_list")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching task lists:", error.message);
    } else {
      setTasksList(data || []);
    }
  }, []);

  const fetchTasks = useCallback(async (listId: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("list_id", listId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [listId]: data || [],
      }));
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchTasksList();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks_list",
        },
        (payload) => {
          const newTask = payload.new as TaskList;
          const oldTask = payload.old as TaskList;

          switch (payload.eventType) {
            case "INSERT":
              setTasksList((prevTasks) => [...prevTasks, newTask]);
              break;
            case "UPDATE":
              setTasksList((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === newTask.id ? newTask : task
                )
              );
              break;
            case "DELETE":
              setTasksList((prevTasks) =>
                prevTasks.filter((task) => task.id !== oldTask.id)
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchTasksList]);

  useEffect(() => {
    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        async (payload) => {
          const newTask = payload.new as Task;
          const oldTask = payload.old as Task;

          switch (payload.eventType) {
            case "INSERT":
              setTasks((prevTasks) => ({
                ...prevTasks,
                [newTask.list_id]: [
                  ...(prevTasks[newTask.list_id] || []),
                  newTask,
                ],
              }));
              break;
            case "UPDATE":
              setTasks((prevTasks) => ({
                ...prevTasks,
                [newTask.list_id]: prevTasks[newTask.list_id].map((task) =>
                  task.id === newTask.id ? newTask : task
                ),
              }));
              break;
            case "DELETE":
              setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };

                Object.keys(prevTasks).forEach((listKey) => {
                  updatedTasks[listKey] = updatedTasks[listKey].filter(
                    (task) => task.id !== oldTask.id
                  );
                });

                return updatedTasks;
              });
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTaskList = async (taskText: string) => {
    const { error } = await supabase
      .from("tasks_list")
      .insert([{ name: taskText }])
      .single();

    if (error) console.error("Error adding task list:", error.message);
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

      fetchTasksList();
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (taskName: string, listId: string) => {
    const { error } = await supabase
      .from("tasks")
      .insert([{ task_name: taskName, list_id: listId }])
      .select();

    if (error) console.error("Error adding task:", error.message);
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      const updatedTaskData = data[0] as Task;
      setTasks((prevTasks) => ({
        ...prevTasks,
        [updatedTaskData.list_id]: prevTasks[updatedTaskData.list_id].map(
          (task) => (task.id === taskId ? updatedTaskData : task)
        ),
      }));
    }
  };

  const deleteTask = async (taskId: string, listId: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);

    if (error) console.error("Error deleting task:", error.message);
    fetchTasks(listId);
  };

  const updateTaskListName = async (listId: string, newName: string) => {
    const { error } = await supabase
      .from("tasks_list")
      .update({ name: newName })
      .eq("id", listId)
      .select();

    if (error) {
      console.error("Error updating list name:", error.message);
    } else {
      fetchTasksList();
    }
  };

  const clearTasksList = () => {
    setTasksList([]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasksList,
        tasks,
        setTasks,
        addTaskList,
        deleteTaskList,
        fetchTasksList,
        fetchTasks,
        addTask,
        updateTask,
        clearTasksList,
        updateTaskListName,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
