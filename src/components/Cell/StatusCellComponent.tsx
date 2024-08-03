import React, { useState } from "react";

interface StatusCellComponentProps {
  initialValue: string;
  onSave: (newValue: string) => void;
}

export const StatusCellComponent: React.FC<StatusCellComponentProps> = ({
  initialValue,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const statuses = ["Done", "Working on it", "Stuck", "Not started"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(value);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return isEditing ? (
    <select value={value} onChange={handleChange} onBlur={handleBlur} autoFocus>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  ) : (
    <span onClick={handleClick}>{value}</span>
  );
};
