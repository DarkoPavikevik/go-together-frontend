export interface Me {
  id: number;
  username: string;
  email: string;
}
export interface UserContextType {
  me: Me | null;
  login(jwt: string): Promise<void>;
  logout(): Promise<void>;
  isAuthenticated: boolean | null;
}
