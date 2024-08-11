import React, { useState } from "react";

interface EditableCellComponentProps {
  value: string;
  onSave: (newValue: string) => void;
  status?: boolean;
}

export const EditableCellComponent: React.FC<EditableCellComponentProps> = ({
  value,
  onSave,
  status = false,
}) => {
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

  return isEditing ? (
    status ? (
      <select
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    ) : (
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full p-1 border border-gray-300"
        autoFocus
      />
    )
  ) : (
    <span onClick={handleClick} className="cursor-pointer">
      {value}
    </span>
  );
};
