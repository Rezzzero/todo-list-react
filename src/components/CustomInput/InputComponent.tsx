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
  const id = `input-${name}`;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="block mb-1 text-white">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        id={id}
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
