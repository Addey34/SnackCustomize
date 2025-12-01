import { createContext } from 'react';

export interface AuthContextType {
  token: string | null;
  role: 'admin' | 'user' | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});
