import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from './AuthCard.jsx';
import GoogleButton from './GoogleButton.jsx';
import { useAuth } from './AuthContext.jsx';
import Button from '../../components/ui/Button.jsx';
import Field from '../../components/ui/Field.jsx';
import Input from '../../components/ui/Input.jsx';
import { getAuthErrorMessage } from '../../lib/firebaseErrors.js';

export default function SignupPage() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signUpWithEmail(name, email, password);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    try {
      await signInWithGoogle();
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Practice a real conversation, or become a Practice Partner."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <GoogleButton onClick={handleGoogle} label="Sign up with Google" />

      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" aria-hidden="true" /> or
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="Full name" htmlFor="name">
          <Input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs leading-relaxed text-muted">
        By continuing, you agree to practice honestly and treat your Practice Partner with respect.
      </p>
    </AuthCard>
  );
}
