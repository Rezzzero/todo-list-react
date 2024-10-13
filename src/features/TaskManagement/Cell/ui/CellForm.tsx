import { useTableCell } from "../model/useTableCell";

interface CellFormProps {
  value: string;
  onSave: (newValue: string) => void;
  status?: boolean;
}

export const CellForm = ({ value, onSave, status }: CellFormProps) => {
  const {
    isEditing,
    inputValue,
    handleChange,
    handleBlur,
    handleClick,
    handleKeyDown,
    statuses,
  } = useTableCell({ value, onSave });

  return isEditing ? (
    status ? (
      <select
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        className="bg-gray-600 p-1 border border-gray-300"
      >
        {statuses.map((status) => (
          <option
            key={status}
            value={status}
            className="w-full bg-gray-600 p-1 border border-gray-300"
          >
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
        className="w-full bg-gray-600 p-1 border border-gray-300"
        autoFocus
      />
    )
  ) : (
    <span onClick={handleClick} className="cursor-pointer">
      {value}
    </span>
  );
};
