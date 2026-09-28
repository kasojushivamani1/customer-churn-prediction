import { cn } from '../../lib/utils.js';

/** Two overlapping voices. The wordmark inherits its color from the parent. */
export default function Logo({ className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="20" cy="16" r="9" fill="#ffbf3f" />
        <circle cx="12" cy="16" r="9" fill="#2f45e8" stroke="#f6f7fb" strokeWidth="1.5" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">Converso</span>
    </span>
  );
}
