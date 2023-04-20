import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const User = useAuth();
  if (!User || !User.user) {
    return <Navigate to="/login" />;
  }
  //   return <Navigate to="/login" />;
  return <>{children}</>;
};
