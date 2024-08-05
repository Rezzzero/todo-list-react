import React from "react";

type InputComponentProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  type?: string;
  required?: boolean;
};

export const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  required = false,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};
