import { Star } from 'lucide-react';

export default function Rating({ value, count }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-sm"
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5 from ${count} reviews`}
    >
      <Star className="size-4 fill-spot text-spot" aria-hidden="true" />
      <span className="font-semibold">{value.toFixed(1)}</span>
      <span className="text-muted">({count})</span>
    </span>
  );
}
