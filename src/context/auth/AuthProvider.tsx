import { AuthContext, type User } from '@/context/auth/AuthContext';
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (data: User) => {
    setUser(data);
  };
  const logout = () => {
    setUser(null);
    navigate('/');
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
