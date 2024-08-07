import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import AddIcon from "@mui/icons-material/Add";
import { TaskListComponent } from "../components/TaskListComponent";
import { useUser } from "../contexts/useUser";

type TaskList = {
  id: string;
  name: string;
};

export const HomePage = () => {
  const [tasksList, setTasksList] = useState<TaskList[]>([]);
  const { user } = useUser();

  useEffect(() => {
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

    fetchTasks();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          fetchTasks();
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [user, tasksList]);

  const addTaskList = async (taskText: string) => {
    if (!user || !user.id) {
      console.error("User is null or user.id is missing");
      return;
    }

    const { data, error } = await supabase
      .from("tasks_list")
      .insert([{ name: taskText, user_id: user.id }])
      .single();

    if (error) {
      console.error("Error adding task list:", error.message);
    } else {
      setTasksList((prevTasks) => [...prevTasks, data]);
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <button
          onClick={() => addTaskList("Добавить список задач")}
          className="bg-blue-600 h-10 w-[240px] text-white text-lg rounded-md"
        >
          <AddIcon /> Добавить список задач
        </button>
        {tasksList.length === 0 ? (
          <p>Отсутствуют списки задач</p>
        ) : (
          tasksList.map((list) => {
            if (!list || !list.id) {
              return null;
            }
            return <TaskListComponent key={list.id} list={list} />;
          })
        )}
      </div>
    </div>
  );
};
