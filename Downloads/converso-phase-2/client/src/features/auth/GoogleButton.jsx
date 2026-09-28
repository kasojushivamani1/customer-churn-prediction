import { cn } from '../../lib/utils.js';
import GoogleMark from './GoogleMark.jsx';

export default function GoogleButton({ onClick, label = 'Continue with Google', className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-line-strong bg-white',
        'text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:bg-paper',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
        className,
      )}
    >
      <GoogleMark />
      {label}
    </button>
  );
}
