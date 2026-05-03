import { type ReactNode } from 'react';
import { useAuth } from '@/context/auth/AuthContext';
import { Navigate, useLocation } from 'react-router';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const data = useAuth();
  const location = useLocation();
  if (!data?.user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};
