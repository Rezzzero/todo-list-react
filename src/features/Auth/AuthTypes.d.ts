export interface AuthFormValues {
  email: string;
  username: string;
  password: string;
}

export interface AuthInputProps {
  type: string;
  name: "email" | "username" | "password";
  placeholder: string;
  register: UseFormRegister<AuthFormValues>;
  error: FieldError;
}

export type Provider = "google" | "discord" | "github";
