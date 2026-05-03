import { useState, type ReactNode } from 'react';
import { AuthContext, type User } from '@/context/auth/AuthContext';
import { useNavigate } from 'react-router';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (data: User) => {
    setUser(data);
    navigate('/secret');
  };
  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
