import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, type Role } from './AuthContext';

interface AuthGuardProps {
    allowedRoles?: Role[];
}

export default function AuthGuard({ allowedRoles }: AuthGuardProps) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        if (user.role !== 'SYSTEM_ADMIN' && !allowedRoles.includes(user.role)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
}
