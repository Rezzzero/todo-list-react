import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

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
    <div>
      <>
        <h1>Auth with social</h1>
        <GoogleIcon onClick={handleGoogleSignIn} />
      </>
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit}>
        {isSignUp ? (
          <>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={authData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={authData.username}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={authData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={authData.password}
            onChange={handleChange}
            required
          />
        </div>
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
