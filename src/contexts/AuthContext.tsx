import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

type User = {
  user: string;
  login: (data: any) => Promise<any>;
  logout: () => void;
};
export const AuthContext = React.createContext<User | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = React.useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
