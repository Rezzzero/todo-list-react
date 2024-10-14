import GoogleIcon from "@mui/icons-material/Google";
import { FaDiscord } from "react-icons/fa";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuthBySocial } from "../model/useAuthBySocial";

export const AuthBySocialForm = () => {
  const { handleSocialSignIn } = useAuthBySocial();
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
