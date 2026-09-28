import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from './Container.jsx';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';
import Logo from '../shared/Logo.jsx';
import { useAuth } from '../../features/auth/AuthContext.jsx';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { useScrolled } from '../../hooks/useScrolled.js';
import { cn } from '../../lib/utils.js';

const sectionLinks = [
  { label: 'Scenarios', id: 'scenarios' },
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Practice Partners', id: 'partners' },
];

// Stable references so the scroll observer is only rebuilt when the route changes.
const sectionIds = sectionLinks.map((link) => link.id);
const noSections = [];

const linkBase =
  'rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-brand';
const linkIdle = 'text-muted hover:bg-ink/5 hover:text-ink';
const linkCurrent = 'bg-brand-tint text-brand-deep';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const activeId = useActiveSection(pathname === '/' ? sectionIds : noSections);
  const { firebaseUser, appUser, signOutUser } = useAuth();
  const close = () => setOpen(false);

  const dashboardPath = appUser?.roles?.includes('partner')
    ? '/partner/dashboard'
    : appUser?.roles?.includes('seeker')
      ? '/dashboard'
      : '/onboarding';
  const displayName = (appUser?.name || appUser?.email || 'You').split(' ')[0];

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const partnerLinkClass = ({ isActive }) => cn(linkBase, isActive ? linkCurrent : linkIdle);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled || open
          ? 'border-line/80 bg-paper/80 shadow-nav backdrop-blur-lg'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <Link to="/" onClick={close} aria-label="Converso home" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              aria-current={activeId === link.id ? 'location' : undefined}
              className={cn(linkBase, activeId === link.id ? linkCurrent : linkIdle)}
            >
              {link.label}
            </a>
          ))}
          <NavLink to="/become-a-partner" className={partnerLinkClass}>
            Become a partner
          </NavLink>
        </nav>

        {firebaseUser ? (
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to={dashboardPath}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors duration-150 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <Avatar name={appUser?.name || appUser?.email || 'You'} size="md" />
              <span className="text-sm font-medium">{displayName}</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOutUser}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Button as={Link} to="/login" variant="ghost" size="sm">
              Log in
            </Button>
            <Button as={Link} to="/signup" size="sm">
              Sign up
            </Button>
          </div>
        )}

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-brand md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="menu-in border-t border-line bg-paper/95 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {sectionLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={close}
                className={cn(linkBase, 'py-3 text-base', linkIdle)}
              >
                {link.label}
              </a>
            ))}
            <NavLink
              to="/become-a-partner"
              onClick={close}
              className={({ isActive }) =>
                cn(linkBase, 'py-3 text-base', isActive ? linkCurrent : linkIdle)
              }
            >
              Become a partner
            </NavLink>
            {firebaseUser ? (
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-4">
                <Link
                  to={dashboardPath}
                  onClick={close}
                  className="flex items-center gap-2 rounded-full py-1 pr-3"
                >
                  <Avatar name={appUser?.name || appUser?.email || 'You'} size="md" />
                  <span className="text-sm font-medium">{displayName}</span>
                </Link>
                <Button
                  variant="secondary"
                  onClick={() => {
                    close();
                    signOutUser();
                  }}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button as={Link} to="/login" variant="secondary" onClick={close}>
                  Log in
                </Button>
                <Button as={Link} to="/signup" onClick={close}>
                  Sign up
                </Button>
              </div>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}
