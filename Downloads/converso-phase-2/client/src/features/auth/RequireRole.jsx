import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner.jsx';
import { useAuth } from './AuthContext.jsx';

/**
 * Layout route: renders its children only for a synced account that holds `role`.
 * Send an account with no role yet to onboarding; send one with a different role home.
 */
export default function RequireRole({ role }) {
  const { appUser, loading } = useAuth();

  if (loading || !appUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!appUser.roles.includes(role)) {
    return <Navigate to={appUser.roles.length ? '/' : '/onboarding'} replace />;
  }

  return <Outlet />;
}
