import type { UserType } from "../types";

import { createContext, useCallback, useContext, useState } from "react";

import { useEffectOnce } from "usehooks-ts";

import { fetchUser } from "../api";
import { removeAccessToken, setAccessToken } from "../utils";

interface AuthContextValue {
  user: UserType | null;
  isAuthorized: boolean;
  isReady: boolean;
  setAuthorized: (user: UserType, token: string) => void;
  setUnauthorized: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);
export const useAuth = () => useContext(AuthContext);

export interface UserProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const setAuthorized = useCallback((user: UserType, token: string) => {
    setUser(user);
    setAccessToken(token);
    setIsAuthorized(true);
  }, []);

  const setUnauthorized = useCallback(() => {
    setUser(null);
    setIsAuthorized(false);
    removeAccessToken();
  }, []);

  useEffectOnce(() => {
    fetchUser()
      .then((user) => {
        setUser(user);
        setIsAuthorized(true);
      })
      .finally(() => setIsReady(true));
  });

  return (
    <AuthContext.Provider value={{ user, isReady, isAuthorized, setAuthorized, setUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
