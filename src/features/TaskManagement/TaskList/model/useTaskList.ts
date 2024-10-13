import { useEffect, useState } from "react";
import { useTasks } from "../../../../entities/task/model/useTasks";
import { Task, TaskProps } from "../../../../entities/task/types/TaskTypes";

export const useTaskList = ({ list }: TaskProps) => {
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

  return {
    tasksForCurrentList,
    isEditing,
    newListName,
    setNewListName,
    setIsEditing,
    handleAddTask,
    handleUpdateTask,
    handleDeleteList,
    handleSaveListName,
    deleteTask,
  };
};
