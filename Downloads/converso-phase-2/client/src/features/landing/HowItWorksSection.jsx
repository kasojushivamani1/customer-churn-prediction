import { Users } from 'lucide-react';
import Section from '../../components/layout/Section.jsx';
import SectionHeading from '../../components/layout/SectionHeading.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { steps } from './data.js';

export default function HowItWorksSection() {
  const lastIndex = steps.length - 1;

  return (
    <Section id="how-it-works" className="border-y border-line bg-white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              title="From first click to feedback in five steps"
              description="No back-and-forth to find a time, and no guessing who you'll be talking to."
            />

            <div className="mt-8 flex gap-4 rounded-2xl border border-line bg-paper p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand shadow-sm">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <p className="text-[0.9375rem] leading-relaxed">
                <span className="font-semibold">Every session is with a real person.</span>{' '}
                <span className="text-muted">
                  Practice Partners are professionals you meet live on video, never a chatbot.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={Math.min(index, 2) * 60}
              className="relative pb-5 pl-16 last:pb-0"
            >
              <span className="absolute left-0 top-5 z-10 grid size-11 place-items-center rounded-full bg-brand font-display text-lg font-semibold text-white ring-4 ring-white">
                {index + 1}
              </span>
              {index < lastIndex && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-4 left-[1.3125rem] top-[4.25rem] w-0.5 rounded-full bg-line-strong/70"
                />
              )}
              <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 max-w-lg leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
