"use client";
import { useState, createContext, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";

export type UserInfo = {
  username: string;
  id: string;
};
export const AuthContext = createContext<{
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: UserInfo;
  setUser: (user: UserInfo) => void;
}>({
  authenticated: false,
  setAuthenticated: () => {},
  user: { username: "", id: "" },
  setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>({ username: "", id: "" });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userInfo = localStorage.getItem("user_info");

    if (userInfo) {
      const parsedUser: UserInfo = JSON.parse(userInfo);
      setUser({ username: parsedUser.username, id: parsedUser.id });
      setAuthenticated(true);
    } else if (pathname === "/") {
      router.push("/login");
    }
  }, [pathname]);

  const contextValue = useMemo(
    () => ({
      authenticated,
      setAuthenticated,
      user,
      setUser,
    }),
    [authenticated, setAuthenticated, user, setUser],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
