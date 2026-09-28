import { cn } from '../../lib/utils.js';
import { journeyStops } from './data.js';

/**
 * The whole product in one glance: five steps, then the real moment. Horizontal on wide
 * screens, vertical on narrow ones. Wrap in <Reveal> so the line draws when it is on screen.
 */
export default function JourneyRail({ className }) {
  const lastIndex = journeyStops.length - 1;

  return (
    <div
      className={cn(
        'rounded-3xl border border-line bg-white/85 p-6 shadow-card backdrop-blur sm:p-8',
        className,
      )}
    >
      <p className="font-display text-lg font-semibold tracking-tight">
        Your path to the real moment
      </p>

      <ol className="mt-7 grid gap-6 lg:grid-cols-6 lg:gap-4">
        {journeyStops.map((stop, index) => {
          const Icon = stop.icon;

          return (
            <li key={stop.label} className="relative flex items-center gap-4 lg:block">
              <span
                className={cn(
                  'relative z-10 grid size-11 shrink-0 place-items-center rounded-full',
                  stop.final
                    ? 'pop-in bg-spot text-ink ring-4 ring-spot-tint'
                    : 'bg-brand-tint text-brand ring-1 ring-brand/15',
                )}
                style={stop.final ? { '--delay': '1900ms' } : undefined}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>

              {index < lastIndex && (
                <>
                  {/* Vertical connector (narrow screens) */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 left-[1.3125rem] top-11 w-0.5 rounded-full bg-line-strong/70 lg:hidden"
                  />
                  {/* Horizontal connector (wide screens), drawn in sequence */}
                  <span
                    aria-hidden="true"
                    className="draw-line absolute -right-4 left-[3.25rem] top-[1.3125rem] hidden h-0.5 rounded-full bg-brand/30 lg:block"
                    style={{ '--delay': `${500 + index * 260}ms` }}
                  />
                </>
              )}

              <p className="text-[0.9375rem] font-semibold leading-snug lg:mt-4 lg:pr-3">
                {stop.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
