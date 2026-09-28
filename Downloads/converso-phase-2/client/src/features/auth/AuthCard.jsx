import { Link } from 'react-router-dom';
import Logo from '../../components/shared/Logo.jsx';

/** Centered card shell shared by the login and signup pages. */
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-4.25rem-1px)] items-center justify-center overflow-hidden px-5 py-16">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      <div className="w-full max-w-md">
        <Link to="/" aria-label="Converso home" className="mb-8 flex justify-center">
          <Logo />
        </Link>

        <div className="rounded-card border border-line bg-white p-7 shadow-card sm:p-9">
          <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[0.9375rem] text-muted">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </div>

        {footer && <p className="mt-6 text-center text-[0.9375rem] text-muted">{footer}</p>}
      </div>
    </div>
  );
}
