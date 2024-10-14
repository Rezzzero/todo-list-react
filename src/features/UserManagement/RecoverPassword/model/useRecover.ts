import { useState } from "react";
import supabase from "../../../../shared/api/supabaseClient";

export const useRecover = () => {
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

  return { email, recoverStatus, handleEmailChange, handleSubmit };
};
