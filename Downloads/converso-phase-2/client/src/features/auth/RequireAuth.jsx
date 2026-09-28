import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner.jsx';
import { useAuth } from './AuthContext.jsx';

/** Layout route: renders its children only for a signed-in Firebase user. */
export default function RequireAuth() {
  const { firebaseUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
