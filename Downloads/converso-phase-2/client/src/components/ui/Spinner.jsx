import { cn } from '../../lib/utils.js';

export default function Spinner({ className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block size-5 animate-spin rounded-full border-2 border-current border-t-transparent text-brand',
        className,
      )}
    />
  );
}
