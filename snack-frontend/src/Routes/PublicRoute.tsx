import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;
