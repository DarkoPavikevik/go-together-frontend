/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect } from "react";
import type { UserContextType } from "./types";
import useLocalStorageState from "use-local-storage-state";
import useAuthController from "../../services/auth/useAuthController";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TokenState = {
  INVALID: false,
  EXPIRED: "expired",
};

const UserContext = createContext<UserContextType>({
  me: null,
  isAuthenticated: null,
  login: async () => {},
  logout: async () => {},
  refetch: async () => Promise.reject(new Error("refetch not implemented")),
});

interface UserProviderProps {
  children: React.ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { getUser } = useAuthController();
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken, { removeItem: removeAccessToken }] =
    useLocalStorageState<string | null>("accessToken", {
      defaultValue: null,
    });
  const id = getAuthId(accessToken);
  const { data, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => getUser(Number(id)),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (id && id !== TokenState.INVALID && id !== TokenState.EXPIRED) {
      refetch();
    }
  }, [id]);
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.defaults.baseURL = "http://localhost:8080";
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);
  const login = async (jwt: string): Promise<void> => {
    await setAccessToken(jwt);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    axios.defaults.baseURL = import.meta.env.VITE_REST_ENDPOINT;
  };
  const logout = async () => {
    if (accessToken) {
      removeAccessToken();
      queryClient.clear();
    }
  };

  if (error) {
    logout();
  }
  if (
    (id === TokenState.EXPIRED || id === TokenState.INVALID) &&
    accessToken !== null
  ) {
    logout();
  }

  return (
    <UserContext.Provider
      value={{
        me: data ?? null,
        isAuthenticated: Boolean(data),
        logout,
        login,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = (): UserContextType => useContext(UserContext);
const getAuthId = (
  token: string | null
): string | typeof TokenState.INVALID | typeof TokenState.EXPIRED => {
  if (!token) {
    return TokenState.INVALID;
  }

  try {
    const decoded: any = jwtDecode(token);
    if (Date.now() >= decoded["exp"] * 1000) {
      return TokenState.EXPIRED;
    }
    return decoded.id;
  } catch {
    return TokenState.INVALID;
  }
};
