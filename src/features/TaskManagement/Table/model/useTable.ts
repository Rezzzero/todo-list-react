import { useState } from "react";

interface UseTableProps {
  onAddTask: (taskName: string) => void;
  listId: string;
  deleteTask: (taskId: string, listId: string) => void;
}

export const useTable = ({ onAddTask, listId, deleteTask }: UseTableProps) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const addTask = (taskName: string) => {
    onAddTask(taskName);
    setNewTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskName.trim() !== "") {
      addTask(newTaskName);
    }
  };

  const handleCheckboxChange = (taskId: string) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((taskId) => {
      deleteTask(taskId, listId);
    });
    setSelectedTasks(new Set());
  };

  return {
    newTaskName,
    setNewTaskName,
    selectedTasks,
    setSelectedTasks,
    addTask,
    handleKeyDown,
    handleCheckboxChange,
    handleDeleteSelected,
  };
};
