import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ── 4A: Roundtable — real session footage ── */
const RoundtableVisual = () => (
  <div className="relative w-full max-w-[480px] mx-auto">
    <div className="rounded-2xl overflow-hidden border border-[#E8E4E0] shadow-lg">
      <img
        src="/images/sd/roundtable-candid.gif"
        alt="Founders mid-conversation at a Sciensation roundtable"
        loading="lazy"
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl">
      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-white/70">
        Hack Your MVP — Live Roundtable
      </p>
    </div>
  </div>
);

/* ── 4B: Socratic Dialogue — real jury footage ── */
const DialogueVisual = () => (
  <div className="relative w-full max-w-[480px] mx-auto">
    <div className="rounded-2xl overflow-hidden border border-[#E8E4E0] shadow-lg">
      <img
        src="/images/sd/judges-panel.gif"
        alt="Judges evaluating at a Sciensation Socratic Dialogue"
        loading="lazy"
        className="w-full h-auto object-cover"
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent rounded-b-2xl">
      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-white/70">
        Darwin Day Socratic Dialogue — Jury in Session
      </p>
    </div>
  </div>
);

/* ── 4C: Contrarian Scoring — the Purple Cow moment ── */
const ContrarianCallout = () => (
  <FadeIn>
    <div className="max-w-3xl mx-auto mt-20 text-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 mb-6">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#FFD700]">The Scoring Rule</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* Correct answer — muted */}
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#E8E4E0]/40 border border-[#E8E4E0] w-full sm:w-auto">
          <div className="text-left flex-1 sm:flex-initial">
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#8A8A8A] mb-0.5">Correct answer</div>
            <div className="text-xs text-[#8A8A8A]">Expected. Safe. Known.</div>
          </div>
          <div className="flex gap-1 text-xl shrink-0">
            <span className="text-[#FFD700]">&#9733;</span>
            <span className="text-[#FFD700]">&#9733;</span>
            <span className="text-[#D8D4D0]">&#9734;</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden sm:block text-[#0033CC]/20 text-xl font-light">vs</div>

        {/* Interesting wrong answer — hero treatment */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#FFD700]/[0.08] border-2 border-[#FFD700]/40 shadow-lg shadow-[#FFD700]/[0.06] w-full sm:w-auto"
        >
          <div className="text-left flex-1 sm:flex-initial">
            <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-0.5">Interesting wrong answer</div>
            <div className="text-xs font-semibold text-[#4A4A4A]">Surprising. Structural. New.</div>
          </div>
          <div className="flex gap-1 text-xl shrink-0">
            <span className="text-[#FFD700]">&#9733;</span>
            <span className="text-[#FFD700]">&#9733;</span>
            <span className="text-[#FFD700]">&#9733;</span>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-[#8A8A8A] mt-5 font-medium">
        Interesting wrong answers score higher than correct ones.
      </p>
    </div>
  </FadeIn>
);

export const Format = () => {
  const [active, setActive] = useState<'roundtable' | 'dialogue'>('roundtable');

  return (
    <section id="format" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-[#0033CC]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="eyebrow text-[#0033CC]/60 mb-4 justify-center flex items-center">Two Formats</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
              Choose your <span className="text-[#0033CC]">format.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Two cards side by side */}
        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* ── Roundtable Card ── */}
            <motion.div
              onClick={() => setActive('roundtable')}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                active === 'roundtable'
                  ? 'border-2 border-[#0033CC]/20 shadow-2xl shadow-[#0033CC]/[0.06] ring-1 ring-[#0033CC]/10'
                  : 'border-2 border-[#E8E4E0] hover:border-[#0033CC]/10 hover:shadow-lg'
              }`}
            >
              {/* Visual zone — generous height */}
              <div className={`bg-gradient-to-b from-white to-[#F5F3F0] p-6 pt-8 transition-opacity duration-500 ${
                active === 'roundtable' ? 'opacity-100' : 'opacity-70'
              }`}>
                <RoundtableVisual />
              </div>

              {/* Content zone */}
              <div className="bg-white p-6 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-[#0033CC]/40">Format A</span>
                  {active === 'roundtable' && (
                    <motion.div layoutId="format-dot" className="w-1.5 h-1.5 rounded-full bg-[#0033CC]" />
                  )}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A] mb-2">Roundtable</h3>
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                  5–8 founders across industries. One KPI from the grid. Moderated by DeepThought.
                </p>

                <AnimatePresence>
                  {active === 'roundtable' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-[#0033CC]/15 mb-4 mt-2">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                          Work the structural question underneath the KPI. A textile exporter, a pharma manufacturer, and a SaaS founder working the same retention question see three different structures underneath the same problem. The insight about your business is the byproduct of engaging with the question.
                        </p>
                      </div>
                      <div className="inline-block px-3 py-1.5 rounded-md bg-[#0033CC]/[0.05]">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0033CC]/60">
                          Fortnightly · 8 KPIs rotate over 16 weeks
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── Socratic Dialogue Card ── */}
            <motion.div
              onClick={() => setActive('dialogue')}
              className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                active === 'dialogue'
                  ? 'border-2 border-[#0033CC]/20 shadow-2xl shadow-[#0033CC]/[0.06] ring-1 ring-[#0033CC]/10'
                  : 'border-2 border-[#E8E4E0] hover:border-[#0033CC]/10 hover:shadow-lg'
              }`}
            >
              {/* Visual zone */}
              <div className={`bg-gradient-to-b from-white to-[#F5F3F0] p-6 pt-8 transition-opacity duration-500 ${
                active === 'dialogue' ? 'opacity-100' : 'opacity-70'
              }`}>
                <DialogueVisual />
              </div>

              {/* Content zone */}
              <div className="bg-white p-6 pt-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.25em] text-[#0033CC]/40">Format B</span>
                  {active === 'dialogue' && (
                    <motion.div layoutId="format-dot" className="w-1.5 h-1.5 rounded-full bg-[#0033CC]" />
                  )}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A] mb-2">Socratic Dialogue</h3>
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
                  DT Fellows work through a real business problem using Scientific Execution. 3–5 founders judge.
                </p>

                <AnimatePresence>
                  {active === 'dialogue' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-[#0033CC]/15 mb-4 mt-2">
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                          Evaluate their thinking — rigor, eloquence, robustness, elegance. Interesting wrong answers score higher than correct ones. Score how they decompose the problem, whether they challenge assumptions, whether their synthesis holds under pressure.
                        </p>
                      </div>
                      <div className="inline-block px-3 py-1.5 rounded-md bg-[#0033CC]/[0.05]">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0033CC]/60">
                          Fortnightly · Alternates with Roundtables
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* ── Contrarian Scoring — standalone hero callout ── */}
        <ContrarianCallout />

        {/* CTA */}
        <FadeIn delay={200}>
          <div className="text-center mt-14">
            <a href="#cta" className="btn-yellow gap-3 !px-12 !py-4 !text-[11px]">
              <span>Apply for a Seat</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
