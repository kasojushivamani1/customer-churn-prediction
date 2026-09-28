import { cn } from '../../lib/utils.js';

export default function SectionHeading({ title, description, className }) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-pretty text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
