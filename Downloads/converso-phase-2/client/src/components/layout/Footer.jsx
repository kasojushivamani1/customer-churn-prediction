import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import Logo from '../shared/Logo.jsx';

const columns = [
  {
    title: 'Practice',
    links: [
      { label: 'Scenarios', href: '/#scenarios' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Practice Partners', href: '/#partners' },
    ],
  },
  {
    title: 'Partners',
    links: [{ label: 'Become a Practice Partner', to: '/become-a-partner' }],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      { label: 'Sign up', to: '/signup' },
    ],
  },
];

const linkClass = 'text-[0.9375rem] text-muted transition-colors hover:text-ink';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed text-muted">
              Practice the conversation before the real moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display font-semibold">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className={linkClass}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line py-6 text-sm text-muted">
          © {new Date().getFullYear()} Converso. All prices are in Indian rupees (INR).
        </div>
      </Container>
    </footer>
  );
}
