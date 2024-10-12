import { AuthInputProps } from "./AuthTypes";

export const AuthInput = ({
  name,
  type,
  placeholder,
  register,
  error,
}: AuthInputProps) => {
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
        {...register(name, { required: true })}
        className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
};
