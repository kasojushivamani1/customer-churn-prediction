import { cn } from '../../lib/utils.js';

export default function Container({ className, ...props }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)} {...props} />;
}
