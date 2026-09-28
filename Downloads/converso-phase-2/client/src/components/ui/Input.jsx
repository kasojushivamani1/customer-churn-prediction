import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-xl border border-line-strong bg-white px-3.5 text-[0.9375rem] text-ink',
        'placeholder:text-muted/70 transition-colors duration-150',
        'focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

export default Input;
