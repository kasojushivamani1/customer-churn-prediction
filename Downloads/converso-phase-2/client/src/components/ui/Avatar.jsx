import { cn } from '../../lib/utils.js';

const palettes = [
  'bg-brand-tint text-brand-deep',
  'bg-spot-tint text-[#7a4f00]',
  'bg-verified-tint text-verified',
  'bg-[#f0e8ff] text-[#5b31b8]',
];

const sizes = {
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-14 text-lg',
};

function initialsOf(name) {
  return name
    .replace(/^(dr|prof)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/** Initials avatar. Real photos replace this once partners can upload one (Phase 4). */
export default function Avatar({ name, size = 'lg', className }) {
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-full font-display font-semibold',
        palettes[hash % palettes.length],
        sizes[size],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
