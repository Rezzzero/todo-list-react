import { Link } from "react-router-dom";
import { AuthBySocialForm } from "../../AuthBySocial/ui/AuthBySocialForm";
import { AuthInput } from "../../AuthInput";
import { useAuth } from "../model/useAuth";

export const AuthForm = ({ url }: { url: string }) => {
  const {
    isSignIn,
    isSignUp,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    signInError,
    signUpSuccess,
  } = useAuth({ url });

  return (
    <div className="min-h-screen bg-gray-800 pt-10">
      <div className="bg-gray-700 w-[330px] max-h-[420px] mx-auto text-white rounded-xl p-4">
        <AuthBySocialForm />
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
                <AuthInput
                  type="email"
                  name="email"
                  placeholder="Enter an email"
                  register={register}
                  error={errors.email}
                />
                <AuthInput
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
              <AuthInput
                type="email"
                name="email"
                placeholder="Enter an email"
                register={register}
                error={errors.email}
              />
            </div>
          )}
          <AuthInput
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
