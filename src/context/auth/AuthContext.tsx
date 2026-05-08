import type { User } from '@/types/user';
import { createContext, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
