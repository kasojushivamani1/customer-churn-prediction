import { BadgeCheck } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export default function VerifiedBadge({ className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-verified-tint px-2.5 py-1 text-xs font-semibold text-verified ring-1 ring-verified/15',
        className,
      )}
    >
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      Verified
    </span>
  );
}
