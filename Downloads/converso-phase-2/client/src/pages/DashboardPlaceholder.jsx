import Container from '../components/layout/Container.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../features/auth/AuthContext.jsx';

/**
 * Confirms the Phase 2 foundation (auth + role) end to end. The real dashboards
 * (bookings, earnings, availability, etc.) are built in Phase 3.
 */
export default function DashboardPlaceholder({ role }) {
  const { appUser, signOutUser } = useAuth();
  const isPartner = role === 'partner';

  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-lg rounded-card border border-line bg-white p-7 text-center shadow-card sm:p-9">
        <Avatar name={appUser?.name || appUser?.email || 'You'} size="xl" className="mx-auto" />
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
          {isPartner ? 'Practice Partner dashboard' : 'Seeker dashboard'}
        </h1>
        <p className="mt-2 text-muted">
          You're signed in as <span className="font-medium text-ink">{appUser?.email}</span>.
        </p>

        {isPartner && (
          <p className="mt-3 text-sm text-muted">
            Verification status: <span className="font-medium text-ink">Not submitted yet</span>
          </p>
        )}

        <p className="mt-6 text-sm text-muted">
          The full {isPartner ? 'Practice Partner' : 'seeker'} dashboard is coming in the next
          phase.
        </p>

        <Button variant="secondary" className="mt-7" onClick={signOutUser}>
          Log out
        </Button>
      </div>
    </Container>
  );
}
