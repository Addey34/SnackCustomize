import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken) as {
        exp: number;
        role: 'admin' | 'user';
      };
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        logout();
        navigate('/login');
        return;
      }
      setToken(storedToken);
      setRole(decodedToken.role);
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    const decodedToken = jwtDecode(newToken) as {
      role: 'admin' | 'user';
      exp: number;
    };
    setToken(newToken);
    setRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
