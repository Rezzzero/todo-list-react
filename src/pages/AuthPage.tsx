import { AuthForm } from "../features/Auth/AuthCore/ui/AuthForm";

export const AuthPage: React.FC = () => {
  const currentUrl = window.location.pathname;
  return <AuthForm url={currentUrl} />;
};
