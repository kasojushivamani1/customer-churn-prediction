import { Briefcase, CalendarClock, Clock, MessageSquareText, Video, Wallet } from 'lucide-react';
import Avatar from '../../components/ui/Avatar.jsx';
import Rating from '../../components/ui/Rating.jsx';
import VerifiedBadge from '../../components/ui/VerifiedBadge.jsx';

const details = [
  { icon: Briefcase, label: 'Scenario', value: 'Job interview' },
  { icon: CalendarClock, label: 'When', value: 'Thu, 6:30 PM IST' },
  { icon: Clock, label: 'Length', value: '45 minutes' },
  { icon: Wallet, label: 'Price', value: '₹1,200' },
];

/** A booked session shown as a ticket, with the written feedback that follows it. */
export default function SessionPreview() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      {/* Soft colored halo that lifts the card off the page */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/10 blur-3xl"
      />

      <article
        aria-label="Example of a booked practice session"
        className="rounded-card border border-line bg-white shadow-ticket"
      >
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <Avatar name="Meera Iyer" size="xl" className="ring-4 ring-white shadow-sm" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold leading-tight tracking-tight">
              Meera Iyer
            </p>
            <p className="mt-0.5 text-sm text-muted">Talent Acquisition Lead</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <VerifiedBadge />
              <Rating value={4.9} count={41} />
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-line-strong" aria-hidden="true" />

        <dl className="grid grid-cols-2 gap-x-5 gap-y-5 p-5 sm:p-6">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-paper text-brand">
                <Icon className="size-[1.125rem]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="mt-0.5 font-semibold leading-snug">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between gap-3 rounded-b-card border-t border-line bg-paper px-5 py-3.5 text-sm sm:px-6">
          <span className="inline-flex items-center gap-2 font-medium">
            <Video className="size-4 text-brand" aria-hidden="true" />
            Live video session
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-verified">
            <span className="size-2 rounded-full bg-verified ring-4 ring-verified/15" />
            Confirmed
          </span>
        </div>
      </article>

      <aside className="mt-4 rounded-2xl border border-spot/50 bg-spot-tint p-4 shadow-card sm:p-5 lg:-ml-12 lg:mr-8">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <MessageSquareText className="size-4" aria-hidden="true" />
          Written feedback from Meera
        </p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed">
          Your opening answer ran long. Lead with the result, then tell the story. The migration
          example was your strongest moment.
        </p>
      </aside>

      <p className="mt-3 text-sm text-muted lg:-ml-12">Illustrative example session.</p>
    </div>
  );
}
