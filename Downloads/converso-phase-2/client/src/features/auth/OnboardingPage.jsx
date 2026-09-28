import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Target } from 'lucide-react';
import Container from '../../components/layout/Container.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { cn } from '../../lib/utils.js';
import { api } from '../../lib/api.js';
import { useAuth } from './AuthContext.jsx';

const options = [
  {
    role: 'seeker',
    icon: Target,
    title: "I'm here to practice",
    description: 'Book a real person and rehearse your interview, pitch or difficult conversation.',
    to: '/dashboard',
  },
  {
    role: 'partner',
    icon: Briefcase,
    title: 'I want to become a Practice Partner',
    description: 'Set your hours and price, and help people prepare for the moment that matters.',
    to: '/partner/dashboard',
  },
];

export default function OnboardingPage() {
  const { appUser, refreshAppUser } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);
  const [error, setError] = useState(null);

  // A returning user who already picked a role skips straight past this page.
  useEffect(() => {
    if (appUser?.roles?.length) {
      navigate(appUser.roles.includes('seeker') ? '/dashboard' : '/partner/dashboard', {
        replace: true,
      });
    }
  }, [appUser, navigate]);

  async function choose(option) {
    setError(null);
    setPending(option.role);
    try {
      await api.post('/users/me/roles', { role: option.role });
      await refreshAppUser();
      navigate(option.to, { replace: true });
    } catch (err) {
      setError(err.message);
      setPending(null);
    }
  }

  return (
    <Container className="py-16 sm:py-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {appUser?.name ? `Welcome, ${appUser.name.split(' ')[0]}.` : 'Welcome to Converso.'}
        </h1>
        <p className="mt-3 text-lg text-muted">What brings you here today?</p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
        {options.map((option, index) => {
          const Icon = option.icon;
          const isPending = pending === option.role;

          return (
            <Reveal key={option.role} delay={index * 80}>
              <button
                type="button"
                onClick={() => choose(option)}
                disabled={pending !== null}
                className={cn(
                  'group flex h-full w-full flex-col rounded-card border border-line bg-white p-6 text-left shadow-card',
                  'transition duration-200 ease-out hover:border-brand/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60',
                )}
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {option.title}
                </h2>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                  {option.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  {isPending ? 'Setting up…' : 'Continue'}
                  {!isPending && (
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="mt-6 text-center text-sm text-red-600">
          {error}
        </p>
      )}
    </Container>
  );
}
