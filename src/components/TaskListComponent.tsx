import { TableComponent } from "./TableComponent";
import { useEffect, useState } from "react";
import { Task, TaskProps } from "../types/TaskTypes";
import { useTasks } from "../contexts/task/useTasks";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

export const TaskListComponent = ({ list }: TaskProps) => {
  const {
    tasks,
    deleteTaskList,
    fetchTasks,
    addTask,
    updateTask,
    updateTaskListName,
    deleteTask,
  } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(list.name);

  useEffect(() => {
    fetchTasks(list.id);
  }, [list.id, fetchTasks]);

  const handleAddTask = (taskName: string) => {
    addTask(taskName, list.id);
  };

  const handleUpdateTask = (taskId: string, updatedTask: Partial<Task>) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteList = () => {
    deleteTaskList(list.id);
  };

  const handleSaveListName = async () => {
    updateTaskListName(list.id, newListName);
    setIsEditing(false);
  };

  const tasksForCurrentList = tasks[list.id] || [];

  return (
    <>
      <div className="flex items-center mb-4">
        {isEditing ? (
          <div className="flex items-center mr-4 space-x-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="text-3xl text-[#678FC3] border-b border-blue-300 bg-transparent"
            />
            <CheckIcon
              onClick={handleSaveListName}
              style={{ color: "green", fontSize: "40px", cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className="flex items-center mr-4">
            <h1 className="text-3xl text-[#678FC3] mr-4">{list.name}</h1>
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
      <div className="flex w-full mb-[40px]">
        <div className="w-full">
          <TableComponent
            onAddTask={handleAddTask}
            tasks={tasksForCurrentList}
            onUpdateTask={handleUpdateTask}
            deleteTask={deleteTask}
            listId={list.id}
          />
        </div>
      </div>
    </>
  );
};
