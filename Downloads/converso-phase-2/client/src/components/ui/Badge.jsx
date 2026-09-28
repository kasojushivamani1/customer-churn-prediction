import { cn } from '../../lib/utils.js';

const tones = {
  brand: 'bg-brand-tint text-brand-deep',
  neutral: 'border border-line bg-paper text-ink',
  onBrand: 'bg-white/15 text-white',
};

export default function Badge({ tone = 'brand', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
