import GoogleIcon from "@mui/icons-material/Google";
import { FaDiscord } from "react-icons/fa";
import GitHubIcon from "@mui/icons-material/GitHub";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

type Provider = "google" | "discord" | "github";

export const AuthBySocial = () => {
  const navigate = useNavigate();

  const handleSocialSignIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
    if (error) console.error("Social sign in error:", error.message);
    if (data) navigate("/");
  };

  return (
    <div className="flex justify-center align-center gap-4">
      <div className="bg-[#8D8D9C] w-[30px] h-[30px] rounded-xl flex items-center justify-center">
        <GoogleIcon onClick={() => handleSocialSignIn("google")} />
      </div>
      <div className="bg-[#6c6c96] w-[30px] h-[30px] rounded-xl flex items-center justify-center">
        <FaDiscord onClick={() => handleSocialSignIn("discord")} />
      </div>
      <div className="bg-black w-[30px] h-[30px] rounded-xl flex items-center justify-center">
        <GitHubIcon onClick={() => handleSocialSignIn("github")} />
      </div>
    </div>
  );
};
