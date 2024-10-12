import { useState } from "react";
import supabase from "../shared/api/supabaseClient";

export const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState(false);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      setStatus(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto h-[250px] justify-center items-center text-center bg-[#3D3D43] text-white p-4">
      <h1 className="text-3xl">Введите почту и новый пароль</h1>
      <div className="flex flex-col items-center gap-3 w-[500px]">
        <input
          type="password"
          name="password"
          value={newPassword}
          onChange={handleChangePassword}
          placeholder="New password"
          required
          className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md mb-2"
        />
        {status ? <p className="text-green-500">Пароль обновлен</p> : null}
        <button
          onClick={handleSubmit}
          className="bg-[#5864A3] h-10 w-[240px] text-lg rounded-md"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};
