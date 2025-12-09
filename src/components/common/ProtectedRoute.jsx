import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { user, loading, isAuthenticated } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Authentication gerekli ama yok
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authentication gerekli değil ama var (login/register sayfaları için)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}