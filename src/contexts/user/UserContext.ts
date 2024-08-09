import React, { createContext } from "react";

export interface UserContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const userContext = createContext<UserContextProps | undefined>(
  undefined
);
