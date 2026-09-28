import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout.jsx';
import LandingPage from '../features/landing/LandingPage.jsx';
import LoginPage from '../features/auth/LoginPage.jsx';
import SignupPage from '../features/auth/SignupPage.jsx';
import OnboardingPage from '../features/auth/OnboardingPage.jsx';
import RequireAuth from '../features/auth/RequireAuth.jsx';
import RequireRole from '../features/auth/RequireRole.jsx';
import DashboardPlaceholder from '../pages/DashboardPlaceholder.jsx';
import ComingSoon from '../pages/ComingSoon.jsx';
import NotFound from '../pages/NotFound.jsx';

// Scenario browsing, partner profiles and the partner marketing page are placeholders
// until Phase 4. Dashboards are placeholders until Phase 3; Phase 2 only proves that
// auth, sync and role-based routing work end to end.
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/scenarios', element: <ComingSoon title="Scenarios" /> },
      { path: '/scenarios/:slug', element: <ComingSoon title="Practice Partners" /> },
      { path: '/partners', element: <ComingSoon title="Practice Partners" /> },
      { path: '/partners/:id', element: <ComingSoon title="Partner profile" /> },
      { path: '/become-a-partner', element: <ComingSoon title="Become a Practice Partner" /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: '/onboarding', element: <OnboardingPage /> },
          {
            element: <RequireRole role="seeker" />,
            children: [{ path: '/dashboard', element: <DashboardPlaceholder role="seeker" /> }],
          },
          {
            element: <RequireRole role="partner" />,
            children: [
              { path: '/partner/dashboard', element: <DashboardPlaceholder role="partner" /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
