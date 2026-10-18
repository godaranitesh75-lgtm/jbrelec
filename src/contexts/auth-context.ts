import { createContext } from 'react';

export type UserRole = 'ADMIN' | 'STAFF' | 'DELIVERY_BOY' | 'CUSTOMER';

interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
