import { useState } from "react";

interface EditableCellComponentProps {
  value: string | "";
  onSave: (newValue: string) => void;
}

export const EditableCellComponent: React.FC<EditableCellComponentProps> = ({
  value,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    if (inputValue.trim() !== value) {
      onSave(inputValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-1 border border-gray-300"
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className="cursor-pointer">
          {value}
        </span>
      )}
    </>
  );
};
