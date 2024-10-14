import { useState } from "react";
import supabase from "../../../../shared/api/supabaseClient";

export const useUpdatePass = () => {
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

  return {
    newPassword,
    status,
    handleChangePassword,
    handleSubmit,
  };
};
