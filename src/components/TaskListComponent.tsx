import { TableComponent } from "./TableComponent";
import supabase from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Task, TaskProps } from "../types/TaskTypes";
import { useTasks } from "../contexts/task/useTasks";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

export const TaskListComponent = ({ list }: TaskProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { deleteTaskList } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list.name);

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
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? data[0] : task))
      );
    }
  };

  const handleDeleteList = () => {
    deleteTaskList(list.id);
  };

  const handleSaveListName = async () => {
    const { error } = await supabase
      .from("tasks_list")
      .update({ name: newListName })
      .eq("id", list.id)
      .select();

    if (error) {
      console.error("Error updating list name:", error);
    } else {
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="flex items-center mb-4">
        {isEditing ? (
          <div className="flex items-center mr-4 space-x-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="text-3xl text-blue-300 border-b border-blue-300 bg-transparent"
            />
            <CheckIcon
              onClick={handleSaveListName}
              style={{ color: "green", fontSize: "40px", cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className="flex items-center mr-4">
            <h1 className="text-3xl text-blue-300 mr-4">
              {newListName ? newListName : list.name}
            </h1>
            <EditIcon
              onClick={() => setIsEditing(true)}
              style={{ color: "white", cursor: "pointer" }}
            />
          </div>
        )}
        <button
          onClick={handleDeleteList}
          className="bg-red-600 text-white p-2 rounded-md"
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="flex w-[80%] mb-[40px]">
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
