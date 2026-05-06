import { AuthContext } from '@/context/auth/AuthContext';
import type { User } from '@/types/user';
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const onLogin = async (data: User) => {
    setUser(data);
  };
  const onLogout = () => {
    setUser(null);
    navigate('/');
  };
  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>{children}</AuthContext.Provider>
  );
};
