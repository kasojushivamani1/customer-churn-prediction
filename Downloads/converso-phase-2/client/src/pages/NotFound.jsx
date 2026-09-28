import { Link } from 'react-router-dom';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <Container className="py-28 text-center sm:py-36">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        This page doesn't exist
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Button as={Link} to="/" className="mt-8">
        Back to home
      </Button>
    </Container>
  );
}
