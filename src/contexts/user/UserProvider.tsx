import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import { userContext } from "./UserContext";
import { TestUser } from "../../types/UserTypes";

export const UserProvider: React.FC<{
  children: React.ReactNode;
  value?: TestUser | null;
}> = ({ children, value }) => {
  const [user, setUser] = useState<any>(value ? value : null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    if (!value) fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [value]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
