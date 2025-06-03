import type { QueryObserverResult } from "@tanstack/react-query";

export interface Me {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  rating?: number;
  created?: string;
  phoneNumber?: string;
  numberOfRides?: number;
  smoking?: boolean;
  pets?: boolean;
  music?: boolean;
  talking?: boolean;
}
export interface UserContextType {
  me: Me | null;
  login(jwt: string): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated: boolean | null;
  refetch(): Promise<QueryObserverResult<any, Error>>;
}
