import { useState } from "react";
import { AuthFormValues } from "../../AuthTypes";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import supabase from "../../../../shared/api/supabaseClient";

export const useAuth = ({ url }: { url: string }) => {
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
      }
      if (isSignUp) {
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

  return {
    isSignIn,
    isSignUp,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    signInError,
    signUpSuccess,
  };
};
