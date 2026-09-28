import { cn } from '../../lib/utils.js';

const variants = {
  primary:
    'bg-brand text-white shadow-cta hover:bg-brand-deep hover:shadow-cta-hover focus-visible:outline-brand',
  secondary:
    'border border-line-strong bg-white text-ink shadow-sm hover:border-ink/40 hover:shadow-md focus-visible:outline-brand',
  soft: 'bg-brand-tint text-brand-deep hover:bg-brand hover:text-white focus-visible:outline-brand',
  spotlight:
    'bg-spot text-ink shadow-[0_10px_24px_-10px_rgb(255_191_63/0.7)] hover:bg-[#ffb21a] focus-visible:outline-white',
  ghost: 'text-ink hover:bg-ink/5 focus-visible:outline-brand',
};

const sizes = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base sm:h-[3.25rem] sm:px-7',
};

/**
 * Polymorphic button. Render as a router link or anchor with the `as` prop:
 *   <Button as={Link} to="/login">Log in</Button>
 *   <Button as="a" href="#scenarios">Browse scenarios</Button>
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const typeProp = Component === 'button' ? { type: 'button' } : {};

  return (
    <Component
      className={cn(
        'inline-flex select-none items-center justify-center gap-2 rounded-xl font-semibold',
        'transition duration-200 ease-out motion-safe:active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...typeProp}
      {...props}
    />
  );
}
