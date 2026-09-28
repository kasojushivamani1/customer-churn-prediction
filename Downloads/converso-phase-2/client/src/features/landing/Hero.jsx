import { Link } from 'react-router-dom';
import Container from '../../components/layout/Container.jsx';
import Button from '../../components/ui/Button.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import JourneyRail from './JourneyRail.jsx';
import SessionPreview from './SessionPreview.jsx';
import { heroPoints } from './data.js';

// Stagger the hero entrance by setting a CSS variable the .rise class reads.
const delay = (ms) => ({ '--delay': `${ms}ms` });

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-14 lg:pt-16">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="dot-grid absolute inset-x-0 top-0 -z-10 h-[40rem]" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1.5 pl-3 pr-4 text-sm font-medium shadow-sm backdrop-blur"
              style={delay(0)}
            >
              <span className="size-2 rounded-full bg-verified ring-4 ring-verified/15" />
              Live video practice with real people
            </p>

            <h1
              className="rise mt-6 font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.5rem]"
              style={delay(70)}
            >
              Practice the conversation before the real moment.
            </h1>

            <p
              className="rise mt-6 max-w-[36rem] text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
              style={delay(150)}
            >
              Book a live video session with someone who has sat on the other side of the table: a
              recruiter, a founder, a professor, a sales lead. Rehearse it, get honest written
              feedback, then walk in ready.
            </p>

            <div className="rise mt-9 flex flex-wrap gap-3" style={delay(230)}>
              <Button as="a" href="#scenarios" size="lg">
                Browse scenarios
              </Button>
              <Button as={Link} to="/become-a-partner" variant="secondary" size="lg">
                Become a Practice Partner
              </Button>
            </div>

            <ul
              className="rise mt-10 grid max-w-xl gap-x-6 gap-y-3.5 text-[0.9375rem] sm:grid-cols-2"
              style={delay(310)}
            >
              {heroPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand shadow-sm">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rise lg:col-span-5" style={delay(200)}>
            <SessionPreview />
          </div>
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <JourneyRail />
        </Reveal>
      </Container>
    </section>
  );
}
