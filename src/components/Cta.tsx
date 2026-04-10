import { ArrowRight, Mail, Phone } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ── Dynamic KPI rotation (from copy spec) ── */
const KPIs = [
  'Lead Generation',
  'Conversion',
  'Upselling',
  'Cross-selling',
  'Retention',
  'TAT',
  'Margins',
  'Compliance',
] as const;

function getNextSaturday() {
  const today = new Date();
  const day = today.getDay();
  const daysUntil = day === 6 ? 0 : 6 - day;
  const next = new Date(today);
  next.setDate(today.getDate() + daysUntil);
  return next;
}

function getSessionKPI(saturday: Date) {
  const epoch = new Date('2026-04-11');
  const weeksDiff = Math.round(
    (saturday.getTime() - epoch.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  const index = ((weeksDiff % 8) + 8) % 8;
  return KPIs[index];
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const nextSaturday = getNextSaturday();
const sessionKPI = getSessionKPI(nextSaturday);
const sessionDate = formatDate(nextSaturday);

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

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Eyebrow + headline ── */}
        <FadeIn>
          <div className="text-center mb-14">
            <div className="eyebrow text-[#0033CC] mb-4">Apply</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-[#1A1A1A]">
              One KPI.<br />
              <span className="text-[#0033CC]">One session.</span>
            </h2>
          </div>
        </FadeIn>

        {/* ── 6A: Live Session Card ── */}
        <FadeIn delay={120}>
          <div className="relative max-w-xl mx-auto">

            {/* The card */}
            <div className="relative rounded-3xl border-2 border-[#E8E4E0] bg-white p-10 md:p-12 shadow-[0_8px_60px_rgba(0,51,204,0.06)] overflow-hidden">

              {/* Faint watermark number */}
              <span className="absolute -top-6 -right-4 text-[200px] font-black font-mono leading-none text-[#0033CC]/[0.02] select-none pointer-events-none">
                S
              </span>

              {/* "Next session" label */}
              <div className="text-[10px] font-mono font-black uppercase tracking-[0.35em] text-[#8A8A8A] mb-6">
                Next session
              </div>

              {/* KPI — the live indicator */}
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD700]" />
                </span>
                <span className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight">
                  {sessionKPI}
                </span>
              </div>

              {/* Date */}
              <p className="text-base md:text-lg text-[#4A4A4A] font-medium mb-8">
                {sessionDate}
              </p>

              {/* Details strip */}
              <div className="flex flex-wrap gap-3 mb-10">
                {['5–8 founders', 'Cross-industry', '90 minutes', 'Socratic method'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-[#0033CC]/[0.04] border border-[#0033CC]/[0.08] text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#0033CC]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA button — the only yellow button on the page */}
              <a
                href="mailto:tarun@deepthought.education?subject=Sciensation%20—%20Apply%20for%20a%20Seat"
                className="btn-yellow gap-3 !px-10 !py-4 !text-[11px] w-full sm:w-auto justify-center"
              >
                <span>Apply for a Seat</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Contact */}
              <div className="mt-8 pt-6 border-t border-[#E8E4E0] flex flex-wrap items-center gap-6">
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

            {/* Card shadow / depth layer */}
            <div className="absolute inset-x-4 -bottom-3 h-12 rounded-3xl bg-[#0033CC]/[0.04] blur-xl -z-10" />
          </div>
        </FadeIn>

        {/* ── Tagline ── */}
        <FadeIn delay={300}>
          <p className="text-center text-xs text-[#8A8A8A] mt-14 font-medium">
            Sciensation is a DeepThought offering, powered by PDGMS — the Scientific Execution AI Platform.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
