import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { InputComponent } from "../CustomInput/InputComponent";
import { AuthBySocial } from "./AuthBySocial";
import { useForm } from "react-hook-form";

type AuthFormValues = {
  email: string;
  username: string;
  password: string;
};

export const AuthComponent = ({ url }: { url: string }) => {
  const isSignIn = url.includes("/login");
  const isSignUp = url.includes("/register");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) {
          setSignInError(true);
          throw error;
        }
        navigate("/");
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              username: data.username,
              avatar:
                "https://i.pinimg.com/736x/0a/bf/33/0abf33085bcf7d2f4697a348931f679d.jpg",
            },
          },
        });

        if (error) throw error;
        if (isSignUp) {
          setSignUpSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Auth error:", (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-10">
      <div className="bg-gray-700 w-[330px] max-h-[420px] mx-auto text-white rounded-xl p-4">
        <AuthBySocial />
        <h1 className="text-3xl text-center my-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {signUpSuccess && isSignUp && (
          <p className="text-green-400 text-center">Sign Up Successful</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {isSignUp ? (
            <>
              <div>
                <InputComponent
                  type="email"
                  name="email"
                  placeholder="Enter an email"
                  register={register}
                  error={errors.email}
                />
                <InputComponent
                  type="text"
                  name="username"
                  placeholder="Enter a username"
                  register={register}
                  error={errors.username}
                />
              </div>
            </>
          ) : (
            <div>
              <InputComponent
                type="email"
                name="email"
                placeholder="Enter an email"
                register={register}
                error={errors.email}
              />
            </div>
          )}
          <InputComponent
            type="password"
            name="password"
            placeholder="Enter a password"
            register={register}
            error={errors.password}
          />
          {isSignIn ? (
            <div className="flex flex-col text-center">
              {signInError && (
                <p className="text-red-400">
                  Вы ввели неправильный пароль или почту
                </p>
              )}
              <Link to="/register" className="text-blue-500">
                Don't have an account?
              </Link>
              <Link to="/recover" className="text-gray-400">
                Forgot Password?
              </Link>
              <button type="submit">Sign In</button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button type="submit">Sign Up</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
