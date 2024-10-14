import { useNavigate } from "react-router-dom";
import { Provider } from "../../AuthTypes";
import supabase from "../../../../shared/api/supabaseClient";

export const useAuthBySocial = () => {
  const navigate = useNavigate();

  const handleSocialSignIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) console.error("Social sign in error:", error.message);
    if (data) navigate("/");
  };

  return {
    handleSocialSignIn,
  };
};
