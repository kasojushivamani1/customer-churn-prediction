import { cn } from '../../lib/utils.js';
import Container from './Container.jsx';

// One spacing prop instead of ad-hoc padding overrides, so section rhythm stays consistent.
const spacings = {
  default: 'py-16 sm:py-24',
  bottom: 'pb-16 sm:pb-24',
};

export default function Section({ id, spacing = 'default', className, children }) {
  return (
    <section id={id} className={cn(spacings[spacing], className)}>
      <Container>{children}</Container>
    </section>
  );
}
