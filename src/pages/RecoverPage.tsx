import { useState } from "react";
import supabase from "../shared/api/supabaseClient";

export const RecoverPage = () => {
  const [email, setEmail] = useState("");
  const [recoverStatus, setRecoverStatus] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setRecoverStatus(true);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto h-[220px] justify-center items-center text-center bg-[#3D3D43] text-white p-4">
      <h1 className="text-3xl">Восстановление пароля</h1>
      <div className="w-[500px]">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
          className="w-full bg-gray-500 text-white p-2 border border-gray-300 rounded-md mb-2"
        />
        {recoverStatus ? (
          <p className="text-green-500">Письмо отправлено</p>
        ) : null}
        <button
          className="bg-[#5864A3] h-10 w-[240px] text-lg rounded-md"
          onClick={handleSubmit}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};
