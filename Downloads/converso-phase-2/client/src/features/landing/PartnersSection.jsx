import { Link } from 'react-router-dom';
import { CalendarClock, Clock, MapPin } from 'lucide-react';
import Section from '../../components/layout/Section.jsx';
import SectionHeading from '../../components/layout/SectionHeading.jsx';
import Avatar from '../../components/ui/Avatar.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Rating from '../../components/ui/Rating.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import VerifiedBadge from '../../components/ui/VerifiedBadge.jsx';
import { formatINR } from '../../lib/utils.js';
import { samplePartners } from './data.js';

function PartnerCard({ partner }) {
  return (
    <article
      className={[
        'group relative flex flex-1 flex-col rounded-card border border-line bg-white p-6 shadow-card',
        'transition duration-200 ease-out hover:border-brand/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1',
        'focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/10',
      ].join(' ')}
    >
      <div className="flex items-start gap-4">
        <Avatar name={partner.name} size="xl" className="shadow-sm ring-4 ring-white" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm leading-snug text-muted">{partner.title}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
            <MapPin className="size-3.5" aria-hidden="true" />
            {partner.city}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <VerifiedBadge />
        <Rating value={partner.rating} count={partner.reviewCount} />
        <span className="text-sm text-muted">{partner.sessions} sessions</span>
      </div>

      <p className="mt-4 text-[0.9375rem] leading-relaxed">{partner.bio}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {partner.scenarios.map((scenario) => (
          <li key={scenario}>
            <Badge tone="neutral">{scenario}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl bg-paper p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-2xl font-bold leading-none tracking-tight">
                {formatINR(partner.pricePaise)}
              </p>
              <p className="mt-1.5 text-sm text-muted">per session</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-sm font-medium">
              <Clock className="size-4 text-brand" aria-hidden="true" />
              {partner.durationMin} min
            </span>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
            <CalendarClock className="size-4" aria-hidden="true" />
            Next open slots
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {partner.slots.map((slot, index) => (
              <li
                key={slot}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-sm font-medium"
              >
                {index === 0 && (
                  <span className="size-1.5 rounded-full bg-verified" aria-hidden="true" />
                )}
                {slot}
              </li>
            ))}
          </ul>
        </div>

        {/* The after: overlay stretches this link across the whole card, so the card is clickable. */}
        <Button
          as={Link}
          to={`/partners/${partner.id}`}
          variant="soft"
          className="mt-4 w-full after:absolute after:inset-0 after:rounded-card group-hover:bg-brand group-hover:text-white"
        >
          View profile
        </Button>
      </div>
    </article>
  );
}

export default function PartnersSection() {
  return (
    <Section id="partners">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          title="Meet a few Practice Partners"
          description="People who do this work every day. Each one is verified by our team before they are listed."
        />
        <Button as={Link} to="/partners" variant="secondary">
          Browse all partners
        </Button>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {samplePartners.map((partner, index) => (
          <Reveal key={partner.id} delay={index * 80} className="flex">
            <PartnerCard partner={partner} />
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">Sample profiles shown for illustration.</p>
    </Section>
  );
}
