import React, { useState } from "react";

interface EditableCellComponentProps {
  initialValue: string;
  onSave: (newValue: string) => void;
}

export const EditableCellComponent: React.FC<EditableCellComponentProps> = ({
  initialValue,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(value);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span
      onClick={() => setIsEditing(true)}
      onMouseEnter={() => setIsEditing(true)}
      style={{ cursor: "pointer" }}
    >
      {value || "Add Notes..."}
    </span>
  );
};
