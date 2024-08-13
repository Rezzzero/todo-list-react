import React from "react";

type InputComponentProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  type?: string;
  required?: boolean;
};

export const InputComponent = ({
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  required = false,
}: InputComponentProps) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};
