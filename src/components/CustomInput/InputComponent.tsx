import { FieldError, UseFormRegister } from "react-hook-form";

type InputComponentProps = {
  type?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
};

export const InputComponent = ({
  name,
  type,
  placeholder,
  register,
  error,
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
        placeholder={placeholder}
        {...register?.(name, { required })}
        className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
};
