import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleDashboardPath } from '@/config/roleConfig';

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getRoleDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
