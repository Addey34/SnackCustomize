import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminPage = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Bienvenue dans le tableau de bord de l'administrateur</p>
    </div>
  );
};

