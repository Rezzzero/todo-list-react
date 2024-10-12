import React, { createContext } from "react";
import { UserData } from "../types/UserTypes";

export interface UserContextProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

export const userContext = createContext<UserContextProps | undefined>(
  undefined
);
