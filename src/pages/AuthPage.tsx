import { AuthComponent } from "../features/Auth/AuthComponent";

export const AuthPage: React.FC = () => {
  const currentUrl = window.location.pathname;
  return <AuthComponent url={currentUrl} />;
};
