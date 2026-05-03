import { createContext, useContext } from 'react';
export interface User {
  id: number;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (user: User, callback: VoidFunction) => Promise<void>;
  logout: (callback: VoidFunction) => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
