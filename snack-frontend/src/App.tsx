import { Route, Routes } from 'react-router-dom';
import CenteredLayout from './layouts/CenteredLayout';
import MainLayout from './layouts/MainLayout';
import { Error } from './pages/Error';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';

export default function App() {
  return (
    <Routes>
      {/* Routes Publics */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <CenteredLayout>
              <Login />
            </CenteredLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <CenteredLayout>
              <Register />
            </CenteredLayout>
          </PublicRoute>
        }
      />
      {/* Routes Privées */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <CenteredLayout>
              <Profile />
            </CenteredLayout>
          </ProtectedRoute>
        }
      />
      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <CenteredLayout>
            <Error />
          </CenteredLayout>
        }
      />
    </Routes>
  );
}
