import { useState } from 'react';
import { ArrowRight, ChevronDown, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/src/components/ui/FadeIn';

type ColorTier = 'sales' | 'ops' | 'hr';

const TIER: Record<ColorTier, { accent: string; accentDark: string; wash: string; glow: string; dot: string }> = {
  sales: {
    accent: '#7B2332',
    accentDark: '#5E1A26',
    wash: 'rgba(123,35,50,0.03)',
    glow: '0 8px 32px rgba(123,35,50,0.16)',
    dot: '#7B2332',
  },
  ops: {
    accent: '#1A1A1A',
    accentDark: '#000000',
    wash: 'rgba(0,0,0,0.03)',
    glow: '0 8px 32px rgba(0,0,0,0.16)',
    dot: '#1A1A1A',
  },
  hr: {
    accent: '#6B7280',
    accentDark: '#4B5563',
    wash: 'rgba(107,114,128,0.03)',
    glow: '0 8px 32px rgba(107,114,128,0.16)',
    dot: '#6B7280',
  },
};

interface Session {
  dateFull: string;
  dateShort: string;
  topic: string;
  category: string;
  tier: ColorTier;
  hook: string;
  description: string;
  outcomes: string[];
  audience: string;
}

const sessions: Session[] = [
  {
    dateFull: 'May 9, Saturday',
    dateShort: 'May 9',
    topic: 'Upselling & Cross-selling',
    category: 'Customer Success',
    tier: 'sales',
    hook: 'Your best customers want to buy more. Most businesses just forget to ask.',
    description: 'You\'re chasing new logos while your existing customers quietly wait for the next thing you can do for them. This session is about spotting the right moment, making the right offer, and turning one sale into many without feeling salesy.',
    outcomes: [
      'How to spot which customers are ready for more',
      'A natural way to introduce cross-sells (no hard pitches)',
      'The numbers that tell you if expansion revenue is healthy',
    ],
    audience: 'MDs/CEOs with 50+ active customers',
  },
  {
    dateFull: 'May 16, Saturday',
    dateShort: 'May 16',
    topic: 'PAT and TAT',
    category: 'Operations',
    tier: 'ops',
    hook: 'Everyone says "move faster." Nobody asks which slowdowns actually cost money.',
    description: 'Not all delays are equal. Some don\'t matter. Some are silently eating your margins. This session helps you tell the difference and fix the ones that matter, without hiring more people.',
    outcomes: [
      'A simple way to find your most expensive bottlenecks',
      'Industry benchmarks so you know what "fast" actually looks like',
      'Practical fixes that cut turnaround by 20 to 40%',
    ],
    audience: 'MDs/CEOs running operations-heavy businesses',
  },
  {
    dateFull: 'May 23, Saturday',
    dateShort: 'May 23',
    topic: 'Lead Gen & Sales Conversion',
    category: 'Marketing & Sales',
    tier: 'sales',
    hook: 'Your pipeline is full. Your conversions are flat. That\'s not a sales problem.',
    description: 'More leads won\'t help if the wrong people are walking in. This session looks at why most lead gen produces volume without revenue, and how to fix the top of your funnel so your sales team has something worth closing.',
    outcomes: [
      'A lead scoring approach that actually predicts who\'ll buy',
      'How to pick channels based on real CAC-to-LTV math',
      'The 3 things quietly killing your conversion rate',
    ],
    audience: 'MDs/CEOs spending on marketing but not seeing it in revenue',
  },
  {
    dateFull: 'May 30, Saturday',
    dateShort: 'May 30',
    topic: 'Quality & NPS/CSAT',
    category: 'Retention',
    tier: 'ops',
    hook: 'Your NPS is 70. Your customers are still leaving. Now what?',
    description: 'Satisfaction scores feel good but they\'re backward-looking. By the time the number drops, the damage is done. This session is about the signals that come before churn, and building quality into how you deliver, not just how you measure.',
    outcomes: [
      'Why satisfied customers still leave, and what to watch instead',
      'A quality checklist built into your delivery process',
      'Early signals that flag churn 90 days before it happens',
    ],
    audience: 'MDs/CEOs seeing retention below 80% or NPS flatlining',
  },
  {
    dateFull: 'Jun 6, Saturday',
    dateShort: 'Jun 6',
    topic: 'Hiring a KPI Owner',
    category: 'HR',
    tier: 'hr',
    hook: 'You\'re hiring for roles. You should be hiring for numbers.',
    description: 'The person you need next isn\'t defined by a job title. They\'re defined by the metric they\'ll own. This session is about finding, interviewing, and onboarding someone who takes a number from where it is to where it needs to be.',
    outcomes: [
      'A job description built around KPI ownership, not tasks',
      'Interview questions that reveal who actually owns outcomes',
      'The 90-day structure that separates a great hire from a bad one',
    ],
    audience: 'MDs/CEOs making their next 3 to 5 critical hires',
  },
  {
    dateFull: 'Jun 13, Saturday',
    dateShort: 'Jun 13',
    topic: 'Finance, Process Re-engineering for Growth',
    category: 'Finance',
    tier: 'hr',
    hook: 'Your P&L tells you where the money went. Not where the growth got stuck.',
    description: 'Finance in most growing companies reports the past. It rarely shapes the future. This session is about rewiring your financial processes so they work as growth levers: pricing, cash flow timing, and the cost decisions that unlock your next stage.',
    outcomes: [
      'A financial process audit built for growth-stage companies',
      'Pricing and margin levers most MDs/CEOs don\'t see',
      'Cash flow moves that free up money for reinvestment',
    ],
    audience: 'MDs/CEOs past ₹10Cr who feel the complexity growing',
  },
];

const SessionCard = ({ session }: { session: Session }) => {
  const [expanded, setExpanded] = useState(false);
  const t = TIER[session.tier];

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = t.glow; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Colored date patch */}
      <div
        className="px-6 py-3.5 flex items-center justify-between"
        style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accentDark})` }}
      >
        <span className="text-[13px] font-mono font-bold text-white tracking-wide">
          {session.dateFull}
        </span>
        <span className="text-[13px] font-mono font-bold text-white/80 uppercase tracking-[0.1em]">
          19:00 HRS IST
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl md:text-[22px] font-black text-[#1A1A1A] leading-tight mb-3">
          {session.topic}
        </h3>

        <p className="text-sm leading-relaxed text-[#555] mb-4">
          {session.hook}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.12em]" style={{ color: t.accent }}>
            {session.category}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#999]">
              {expanded ? 'Less' : 'Details'}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-[#999]"
            >
              <ChevronDown size={13} />
            </motion.span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-3 border-t" style={{ borderColor: `${t.accent}15` }}>
              <p className="text-[13px] leading-relaxed text-[#4A4A4A] mb-5">
                {session.description}
              </p>

              <div className="mb-5">
                <div className="text-[9px] font-mono font-black uppercase tracking-[0.25em] mb-2.5" style={{ color: t.accent }}>
                  You'll walk away with
                </div>
                <ul className="space-y-2">
                  {session.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-[12.5px] text-[#3A3A3A] leading-snug">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.dot }} />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-[#8A8A8A] mb-5">
                <span className="font-semibold text-[#5A5A5A]">Best for:</span>{' '}
                {session.audience}
              </div>

              <a
                href={`mailto:tarun@deepthought.education?subject=Sciensation%20—%20${encodeURIComponent(session.topic)}%20(${encodeURIComponent(session.dateFull)})`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: t.accent }}
                onClick={(e) => e.stopPropagation()}
              >
                Apply for this session
                <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Cta = () => {
  const [startIdx, setStartIdx] = useState(0);
  const total = sessions.length;

  const visible = [
    sessions[startIdx],
    sessions[(startIdx + 1) % total],
    sessions[(startIdx + 2) % total],
  ];

  const visibleSet = new Set([startIdx, (startIdx + 1) % total, (startIdx + 2) % total]);

  return (
    <section
      id="cta"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,51,204,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        <FadeIn>
          <div className="text-center mb-14">
            <div className="eyebrow text-[#0033CC] mb-4">Upcoming</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-[#1A1A1A]">
              Six Saturdays.<br />
              <span className="text-[#0033CC]">Six KPIs.</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div>
            <motion.div
              key={startIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {visible.map((s) => (
                <SessionCard key={s.dateShort} session={s} />
              ))}
            </motion.div>

            {/* Carousel date selector */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {sessions.map((s, i) => {
                const isSelected = i === startIdx;
                const isVisible = visibleSet.has(i);
                const t = TIER[s.tier];
                return (
                  <button
                    key={s.dateShort}
                    onClick={() => setStartIdx(i)}
                    className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                      isSelected ? 'scale-110 z-10' : ''
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: t.accent,
                            color: '#fff',
                            boxShadow: `0 4px 20px ${t.accent}40`,
                          }
                        : isVisible
                          ? {
                              backgroundColor: t.accent + '18',
                              color: t.accent,
                              border: `1.5px solid ${t.accent}40`,
                            }
                          : {
                              backgroundColor: '#fff',
                              color: '#aaa',
                              border: '1px solid #E8E4E0',
                            }
                    }
                    onMouseEnter={(e) => {
                      if (!isSelected && !isVisible) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#bbb';
                        (e.currentTarget as HTMLElement).style.color = '#666';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isVisible) {
                        (e.currentTarget as HTMLElement).style.borderColor = '#E8E4E0';
                        (e.currentTarget as HTMLElement).style.color = '#aaa';
                      }
                    }}
                  >
                    {s.dateShort}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="text-center mt-14">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['5 to 8 MDs/CEOs', 'Cross-industry', '60 minutes', 'Socratic method'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-[#0033CC]/[0.04] border border-[#0033CC]/[0.08] text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0033CC]/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="mailto:tarun@deepthought.education?subject=Sciensation%20—%20Apply%20for%20a%20Seat"
              className="btn-yellow gap-3 !px-10 !py-4 !text-[11px] inline-flex justify-center"
            >
              <span>Apply for a Seat</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="mt-8 pt-6 border-t border-[#E8E4E0] flex flex-wrap justify-center items-center gap-6">
              <a
                href="mailto:tarun@deepthought.education"
                className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#0033CC] transition-colors"
              >
                <Mail size={14} />
                <span>tarun@deepthought.education</span>
              </a>
              <a
                href="tel:+917207001400"
                className="flex items-center gap-2 text-sm text-[#8A8A8A] hover:text-[#0033CC] transition-colors"
              >
                <Phone size={14} />
                <span>+91 7207001400</span>
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={360}>
          <p className="text-center text-xs text-[#8A8A8A] mt-14 font-medium">
            Sciensation is a DeepThought offering, powered by PDGMS — the Scientific Execution AI Platform.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
