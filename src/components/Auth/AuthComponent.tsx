import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { InputComponent } from "../CustomInput/InputComponent";

type AuthComponentProps = {
  url: string;
};

export const AuthComponent: React.FC<AuthComponentProps> = ({ url }) => {
  const isSignIn = url.includes("/login");
  const isSignUp = url.includes("/register");
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setAuthData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isSignIn) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authData.email,
          password: authData.password,
        });
        if (error) throw error;
        navigate("/");
      } else if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: authData.email,
          password: authData.password,
          options: {
            data: {
              username: authData.username,
              avatar:
                "https://i.pinimg.com/736x/0a/bf/33/0abf33085bcf7d2f4697a348931f679d.jpg",
            },
          },
        });

        if (error) throw error;
        alert("Check your email for the login link!");
      }
    } catch (error) {
      console.error("Auth error:", (error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Google sign in error:", error.message);
    if (data) navigate("/");
  };

  return (
    <div className="bg-[#696969] w-[330px] h-[360px] mx-auto text-white rounded-xl">
      <div className="bg-[#8D8D9C] w-[30px] h-[30px] mx-auto rounded-xl flex items-center justify-center">
        <GoogleIcon onClick={handleGoogleSignIn} />
      </div>
      <h1 className="text-3xl text-center my-4">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h1>
      <form onSubmit={handleSubmit}>
        {isSignUp ? (
          <>
            <div>
              <InputComponent
                type="email"
                name="email"
                placeholder="Enter an email"
                value={authData.email}
                onChange={handleChange}
                required
              />
              <InputComponent
                type="text"
                name="username"
                placeholder="Enter a username"
                value={authData.username}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <div>
            <InputComponent
              type="email"
              name="email"
              placeholder="Enter an email"
              value={authData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <InputComponent
          type="password"
          name="password"
          placeholder="Enter a password"
          value={authData.password}
          onChange={handleChange}
          required
        />
        {isSignIn ? (
          <>
            <Link to="/register" className="text-blue-500">
              Don't have an account?
            </Link>
            <button type="submit">Sign In</button>
          </>
        ) : (
          <button type="submit">Sign Up</button>
        )}
      </form>
    </div>
  );
};
