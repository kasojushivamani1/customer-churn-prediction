import {
  Briefcase,
  CalendarClock,
  Flag,
  Handshake,
  MessageCircleHeart,
  MessageSquareText,
  MessagesSquare,
  Presentation,
  Rocket,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  Video,
  Wallet,
} from 'lucide-react';

/**
 * Landing-page content lives here so copy and sample data can change without touching
 * layout code. Scenarios move to the API (seeded `scenarios` collection) in Phase 4.
 */

export const featuredScenario = {
  slug: 'job-interview',
  title: 'Job interview',
  description:
    'Sit across from someone who has run hundreds of real interviews, and find out how your answers land before a panel does.',
  partnerTypes: 'recruiters, hiring managers and interview panel leads',
  sampleQuestions: [
    'Tell me about a time you disagreed with your manager.',
    'Walk me through the project you are proudest of. What would you change?',
  ],
  icon: Briefcase,
};

export const scenarios = [
  {
    slug: 'manager-conversation',
    title: 'Manager conversation',
    description: 'Ask for a raise, push back on scope, or give hard feedback upward.',
    partnerTypes: 'people managers and HR leads',
    icon: MessagesSquare,
  },
  {
    slug: 'startup-pitch',
    title: 'Startup pitch',
    description: 'Get questioned like an investor would before the room that matters.',
    partnerTypes: 'founders and angel investors',
    icon: Rocket,
  },
  {
    slug: 'faculty-presentation',
    title: 'Faculty presentation',
    description: 'Rehearse a thesis review, class talk or committee Q&A.',
    partnerTypes: 'professors and research supervisors',
    icon: Presentation,
  },
  {
    slug: 'sales-pitch',
    title: 'Sales pitch',
    description: 'Pitch to a buyer who has heard every objection.',
    partnerTypes: 'sales leaders and account executives',
    icon: Handshake,
  },
  {
    slug: 'networking',
    title: 'Networking',
    description:
      'Practice the opener, the follow-up and the ask, with someone senior who will tell you what felt natural and what felt forced.',
    partnerTypes: 'senior professionals and community builders',
    icon: Users,
    wide: true,
  },
];

// Deliberately low-emphasis: available, but not a headline scenario.
export const socialScenario = {
  slug: 'social-and-dating',
  title: 'social and dating conversations',
  partnerTypes: 'communication coaches',
  icon: MessageCircleHeart,
};

// The whole journey at a glance (hero rail). The final stop is the goal, not a product step.
export const journeyStops = [
  { icon: Target, label: 'Choose a scenario' },
  { icon: UserCheck, label: 'Find a real Practice Partner' },
  { icon: CalendarClock, label: 'Pick a time' },
  { icon: Video, label: 'Practice live' },
  { icon: MessageSquareText, label: 'Get feedback' },
  { icon: Flag, label: 'Walk into the real moment', final: true },
];

// The same journey in detail (How it works section).
export const steps = [
  {
    title: 'Choose a scenario',
    description:
      'Pick the conversation you are preparing for: an interview, a pitch, a difficult talk with your manager.',
  },
  {
    title: 'Find a real Practice Partner',
    description:
      'Compare experience, price and reviews. Our team checks every Practice Partner by hand before they are listed.',
  },
  {
    title: 'Pick a time',
    description:
      'Partners set their own weekly hours, so every slot you see is genuinely open. Pay securely by UPI, card or netbanking.',
  },
  {
    title: 'Practice live',
    description:
      'Meet on video at the booked time and run the conversation as if it were the real thing.',
  },
  {
    title: 'Get feedback',
    description:
      'Receive written feedback from your partner, then rate the session to help the next person choose.',
  },
];

// Illustrative profiles for the landing page only. Real partners arrive in Phase 4.
export const samplePartners = [
  {
    id: 'sample-meera-iyer',
    name: 'Meera Iyer',
    title: 'Talent Acquisition Lead',
    city: 'Bengaluru',
    bio: 'Ten years hiring for product and engineering teams. I run interviews the way they really go, including the awkward silences.',
    scenarios: ['Job interview', 'Manager conversation'],
    rating: 4.9,
    reviewCount: 41,
    sessions: 120,
    pricePaise: 120000,
    durationMin: 45,
    slots: ['Thu, 6:30 PM', 'Fri, 8:00 AM', 'Sat, 11:00 AM'],
  },
  {
    id: 'sample-arjun-rao',
    name: 'Arjun Rao',
    title: 'Founder and CEO, SaaS startup',
    city: 'Hyderabad',
    bio: 'Raised two rounds. I will ask the questions investors ask, and stop you the moment the story wobbles.',
    scenarios: ['Startup pitch', 'Networking'],
    rating: 4.8,
    reviewCount: 27,
    sessions: 64,
    pricePaise: 180000,
    durationMin: 45,
    slots: ['Fri, 8:00 PM', 'Sat, 10:00 AM', 'Sun, 6:00 PM'],
  },
  {
    id: 'sample-kavita-menon',
    name: 'Dr. Kavita Menon',
    title: 'Associate Professor',
    city: 'Chennai',
    bio: 'Supervised over thirty theses and sat on many panels. Good for presentations, defences and committee questions.',
    scenarios: ['Faculty presentation', 'Job interview'],
    rating: 4.9,
    reviewCount: 18,
    sessions: 39,
    pricePaise: 90000,
    durationMin: 60,
    slots: ['Sat, 11:00 AM', 'Sun, 4:00 PM', 'Mon, 7:00 PM'],
  },
];

export const heroPoints = [
  { icon: Users, text: 'Real people, not chatbots' },
  { icon: ShieldCheck, text: 'Every partner verified by hand' },
  { icon: MessageSquareText, text: 'Written feedback after every session' },
  { icon: Wallet, text: 'Pay only for the session you book' },
];

export const partnerBenefits = [
  {
    icon: CalendarClock,
    title: 'Set your own hours',
    description: 'Add the days and times you are free. Seekers can only book those slots.',
  },
  {
    icon: Wallet,
    title: 'Choose your price',
    description: 'Set your per-session price in rupees. Converso keeps a service fee on each booking.',
  },
  {
    icon: ShieldCheck,
    title: 'Get verified',
    description: 'Our team reviews your background by hand before your profile goes live.',
  },
];
