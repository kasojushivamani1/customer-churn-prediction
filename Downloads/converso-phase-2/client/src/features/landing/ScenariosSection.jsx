import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Section from '../../components/layout/Section.jsx';
import SectionHeading from '../../components/layout/SectionHeading.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { cn } from '../../lib/utils.js';
import { featuredScenario, scenarios, socialScenario } from './data.js';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

/** Small circular affordance that tells people the whole card is a link. */
function ArrowBadge({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn('grid size-9 shrink-0 place-items-center rounded-full transition duration-200', className)}
    >
      <ArrowUpRight className="size-4 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
    </span>
  );
}

function FeaturedScenarioCard({ scenario }) {
  const Icon = scenario.icon;

  return (
    <Reveal className="flex md:col-span-2 lg:col-span-6 lg:row-span-3">
      <Link
        to={`/scenarios/${scenario.slug}`}
        className={cn(
          'group relative isolate flex min-w-0 flex-1 flex-col overflow-hidden rounded-card bg-brand p-7 text-white shadow-featured sm:p-10',
          'transition duration-200 ease-out motion-safe:hover:-translate-y-1',
          focusRing,
        )}
      >
        {/* Concentric rings: quiet texture that echoes a conversation rippling outward */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full border border-white/10"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 -z-10 size-44 rounded-full border border-white/10"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-72 rounded-full bg-white/5"
        />

        <div className="flex items-start justify-between">
          <span className="grid size-12 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <ArrowBadge className="bg-white/15 text-white ring-1 ring-white/20 group-hover:bg-white group-hover:text-brand-deep" />
        </div>

        <h3 className="mt-8 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {scenario.title}
        </h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-white/85">{scenario.description}</p>

        <div className="mt-8 space-y-2.5">
          <p className="text-sm font-medium text-white/85">Questions you might hear</p>
          {scenario.sampleQuestions.map((question) => (
            <p
              key={question}
              className="max-w-md rounded-2xl rounded-tl-md bg-white/12 px-4 py-3 text-[0.9375rem] leading-snug ring-1 ring-white/10"
            >
              {question}
            </p>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <p className="text-sm text-white/85">Practice with {scenario.partnerTypes}.</p>
          <span className="mt-4 inline-flex h-11 items-center rounded-xl bg-white px-5 text-[0.9375rem] font-semibold text-brand-deep transition-colors duration-200 group-hover:bg-spot-tint">
            Find an interviewer
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function ScenarioCard({ scenario, index }) {
  const Icon = scenario.icon;

  return (
    <Reveal
      delay={Math.min(index, 3) * 70}
      className={cn('flex', scenario.wide ? 'md:col-span-2 lg:col-span-6' : 'lg:col-span-3')}
    >
      <Link
        to={`/scenarios/${scenario.slug}`}
        className={cn(
          'group flex min-w-0 flex-1 flex-col rounded-card border border-line bg-white p-6',
          'transition duration-200 ease-out hover:border-brand/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1',
          focusRing,
        )}
      >
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-tint text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <ArrowBadge className="border border-line text-muted group-hover:border-brand group-hover:bg-brand group-hover:text-white" />
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{scenario.title}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{scenario.description}</p>

        <div className="mt-auto pt-6">
          <p className="border-t border-dashed border-line-strong pt-4 text-sm">
            <span className="text-muted">Practice with </span>
            <span className="font-medium">{scenario.partnerTypes}</span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ScenariosSection() {
  return (
    <Section id="scenarios">
      <Reveal>
        <SectionHeading
          title="Choose the conversation you're preparing for"
          description="Every scenario is matched with people who do this work for real, so the pushback you get is the pushback you'll face."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <FeaturedScenarioCard scenario={featuredScenario} />
        {scenarios.map((scenario, index) => (
          <ScenarioCard key={scenario.slug} scenario={scenario} index={index} />
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="text-[0.9375rem] text-muted">
          Also available:{' '}
          <Link
            to={`/scenarios/${socialScenario.slug}`}
            className="font-medium text-ink underline underline-offset-4 transition-colors hover:text-brand"
          >
            {socialScenario.title}
          </Link>{' '}
          with {socialScenario.partnerTypes}.
        </p>
      </Reveal>
    </Section>
  );
}
