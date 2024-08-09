import { useContext } from "react";
import { UserContextProps, userContext } from "./UserContext";

export const useUser = (): UserContextProps => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
