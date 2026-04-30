import { ArrowRight, Mail, Phone } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

const upcomingSessions = [
  { date: 'May 9',   topic: 'Upselling & Cross-selling',                   category: 'Customer Success' },
  { date: 'May 16',  topic: 'PAT and TAT',                                 category: 'Operations' },
  { date: 'May 23',  topic: 'Lead Gen & Sales Conversion',                 category: 'Marketing & Sales' },
  { date: 'May 30',  topic: 'Quality & NPS/CSAT',                          category: 'Retention' },
  { date: 'June 6',  topic: 'Hiring a KPI Owner',                          category: 'HR' },
  { date: 'June 13', topic: 'Finance, Process Re-engineering for Growth',   category: 'Finance' },
] as const;

export const Cta = () => {
  return (
    <section
      id="cta"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,51,204,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Eyebrow + headline ── */}
        <FadeIn>
          <div className="text-center mb-14">
            <div className="eyebrow text-[#0033CC] mb-4">Upcoming</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-[#1A1A1A]">
              Six Saturdays.<br />
              <span className="text-[#0033CC]">Six KPIs.</span>
            </h2>
          </div>
        </FadeIn>

        {/* ── Session grid — 6 cards ── */}
        <FadeIn delay={120}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-14">
            {upcomingSessions.map((s, i) => (
              <div
                key={s.date}
                className={`relative rounded-2xl border-2 bg-white p-5 md:p-6 overflow-hidden transition-shadow hover:shadow-[0_8px_40px_rgba(0,51,204,0.08)] ${
                  i === 0
                    ? 'border-[#0033CC]/30 shadow-[0_4px_30px_rgba(0,51,204,0.10)]'
                    : 'border-[#E8E4E0]'
                }`}
              >
                {/* "Next" badge on first card */}
                {i === 0 && (
                  <span className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD700]" />
                    </span>
                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#0033CC]">
                      Next
                    </span>
                  </span>
                )}

                {/* Date */}
                <div className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-[#8A8A8A] mb-3">
                  Saturday, {s.date}
                </div>

                {/* Topic */}
                <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] leading-snug mb-3">
                  {s.topic}
                </h3>

                {/* Category tag */}
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#0033CC]/[0.04] border border-[#0033CC]/[0.08] text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-[#0033CC]/60">
                  {s.category}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── Details strip + CTA ── */}
        <FadeIn delay={240}>
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['5–8 founders', 'Cross-industry', '90 minutes', 'Socratic method'].map((tag) => (
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

            {/* Contact */}
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

        {/* ── Tagline ── */}
        <FadeIn delay={360}>
          <p className="text-center text-xs text-[#8A8A8A] mt-14 font-medium">
            Sciensation is a DeepThought offering, powered by PDGMS — the Scientific Execution AI Platform.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
