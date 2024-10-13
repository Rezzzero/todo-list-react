import { useState } from "react";

export type UseTableCellProps = {
  value: string;
  onSave: (value: string) => void;
};

export const useTableCell = ({ value, onSave }: UseTableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const statuses = ["Done", "Working on it", "Stuck", "Not started"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue.trim() !== value) {
      onSave(inputValue);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    inputValue,
    statuses,
    handleChange,
    handleBlur,
    handleClick,
    handleKeyDown,
  };
};
