import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import Button from './Buttons/Button';

export default function Header() {
  const { token, logout } = useAuth();
  const { title, logo } = useSettings();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <span className="font-bold text-2xl">{title}</span>
        </div>
      </Link>
      {token ? (
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Button className="bg-blue-500 hover:bg-blue-600">Profile</Button>
          </Link>
          <Button className="bg-red-500 hover:bg-red-600" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-600">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-green-500 hover:bg-green-600">
              Register
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
