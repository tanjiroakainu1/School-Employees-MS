import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleDashboardPath } from '@/config/roleConfig';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== allowedRole) {
    return <Navigate to={getRoleDashboardPath(user!.role)} replace />;
  }

  return <>{children}</>;
}
