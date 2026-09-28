import { Link } from 'react-router-dom';
import Section from '../../components/layout/Section.jsx';
import Button from '../../components/ui/Button.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { partnerBenefits } from './data.js';

export default function PartnerCtaSection() {
  return (
    <Section id="become-a-partner" spacing="bottom">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white shadow-[0_40px_80px_-40px_rgb(24_33_61/0.6)]">
          <div aria-hidden="true" className="panel-glow absolute inset-0 -z-10" />

          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
            <div className="lg:col-span-6">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                Your experience is someone's rehearsal.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
                If you've hired, managed, taught, pitched or sold for a living, you know what a
                strong answer sounds like. Turn that into paid sessions on your own schedule.
              </p>
              <Button
                as={Link}
                to="/become-a-partner"
                variant="spotlight"
                size="lg"
                className="mt-8"
              >
                Become a Practice Partner
              </Button>
              <p className="mt-4 text-sm text-white/70">
                Every application is reviewed by hand before a profile goes live.
              </p>
            </div>

            <ul className="grid gap-4 self-center lg:col-span-6">
              {partnerBenefits.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-spot ring-1 ring-white/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-white/75">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
