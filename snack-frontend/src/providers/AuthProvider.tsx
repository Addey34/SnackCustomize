import { jwtDecode } from 'jwt-decode'; // Correctement importer `jwt_decode`
import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken) as {
        role: 'admin' | 'user';
      }; // Assurez-vous de décoder correctement
      setRole(decodedToken.role);
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken) as { role: 'admin' | 'user' }; // Assurez-vous de décoder correctement
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
