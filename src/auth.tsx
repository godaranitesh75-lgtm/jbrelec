import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import api from './api.ts';

export type UserRole = 'ADMIN' | 'STAFF' | 'DELIVERY_BOY' | 'CUSTOMER';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jbr_token');
    const userData = localStorage.getItem('jbr_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem('jbr_user');
        localStorage.removeItem('jbr_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { token, user: loggedUser } = response.data;
    localStorage.setItem('jbr_token', token);
    localStorage.setItem('jbr_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem('jbr_token');
    localStorage.removeItem('jbr_user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

