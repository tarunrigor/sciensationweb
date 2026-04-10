import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ── 4A: Roundtable — animated orbital seats around a central KPI ── */
const RoundtableVisual = ({ active }: { active: boolean }) => {
  const industries = ['Textile', 'Pharma', 'SaaS', 'Logistics', 'EdTech', 'FMCG', 'Mfg', 'Finance'];
  const r = 130; // orbit radius

  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto">
      {/* Orbital ring — softly glowing */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="rt-glow" cx="200" cy="200" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0033CC" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0033CC" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="140" fill="url(#rt-glow)" />
        <circle cx="200" cy="200" r={r} fill="none" stroke="#0033CC" strokeWidth="1" strokeOpacity="0.06" strokeDasharray="6 4" />
      </svg>

      {/* Center — KPI hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{ scale: active ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-[#FFD700]/10 border-2 border-[#FFD700]/40 flex flex-col items-center justify-center"
        >
          <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-[#0033CC]/40">KPI</span>
          <span className="text-[11px] font-black text-[#0033CC] tracking-tight">Retention</span>
        </motion.div>
        <div className="mt-2 text-center">
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#FFD700]">DT MODERATES</span>
        </div>
      </div>

      {/* Orbiting seats */}
      {industries.map((ind, i) => {
        const angle = (i / industries.length) * 2 * Math.PI - Math.PI / 2;
        const cx = 50 + (r / 200) * 50 * Math.cos(angle); // percentage positions
        const cy = 50 + (r / 200) * 50 * Math.sin(angle);

        return (
          <motion.div
            key={ind}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${cx}%`, top: `${cy}%` }}
          >
            {/* Seat circle */}
            <motion.div
              animate={active ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E8E4E0] group-hover:border-[#0033CC]/30 group-hover:shadow-lg group-hover:shadow-[#0033CC]/[0.08] transition-all duration-300 flex items-center justify-center">
                <span className="text-[9px] font-black text-[#0033CC]/50 group-hover:text-[#0033CC] transition-colors">
                  {ind.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="text-center mt-1">
                <span className="text-[8px] font-bold text-[#4A4A4A]/60 group-hover:text-[#1A1A1A] transition-colors">
                  {ind}
                </span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connecting threads — SVG lines from each seat to center */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        {industries.map((_, i) => {
          const angle = (i / industries.length) * 2 * Math.PI - Math.PI / 2;
          const x = 200 + r * Math.cos(angle);
          const y = 200 + r * Math.sin(angle);
          return (
            <line key={i} x1={x} y1={y} x2="200" y2="200" stroke="#0033CC" strokeWidth="0.5" opacity="0.06" strokeDasharray="3 5" />
          );
        })}
      </svg>
    </div>
  );
};

/* ── 4B: Socratic Dialogue — dramatic face-off composition ── */
const DialogueVisual = ({ active }: { active: boolean }) => {
  const judges = ['J1', 'J2', 'J3', 'J4'];
  const fellows = ['F1', 'F2', 'F3'];
  const criteria = ['Rigor', 'Eloquence', 'Robustness', 'Elegance'];

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* The arena */}
      <div className="flex items-start justify-between gap-4 mb-6">
        {/* Judges — left side, yellow accented */}
        <div className="flex-1">
          <div className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#FFD700] mb-4 text-center">
            Founders (Judges)
          </div>
          <div className="flex justify-center gap-3">
            {judges.map((j, i) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={active ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                  className="w-11 h-11 rounded-full bg-[#FFD700]/12 border-2 border-[#FFD700]/35 flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#FFD700]/30" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* VS separator */}
        <div className="flex flex-col items-center justify-center pt-8 shrink-0">
          <motion.div
            animate={active ? { scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-8 h-8 rounded-full border border-[#0033CC]/15 flex items-center justify-center"
          >
            <span className="text-[8px] font-black text-[#0033CC]/30">VS</span>
          </motion.div>
        </div>

        {/* Fellows — right side */}
        <div className="flex-1">
          <div className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-[#0033CC]/50 mb-4 text-center">
            DT Fellows
          </div>
          <div className="flex justify-center gap-3">
            {fellows.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={active ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 + i * 0.15 }}
                  className="w-11 h-11 rounded-full bg-[#0033CC]/6 border-2 border-[#0033CC]/15 flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#0033CC]/20" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem card — floating between groups */}
      <motion.div
        animate={active ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto w-48 bg-white rounded-xl border border-[#E8E4E0] shadow-lg shadow-[#0033CC]/[0.04] p-4 text-center mb-6"
      >
        <div className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#8A8A8A] mb-1">Real Business</div>
        <div className="text-sm font-black text-[#0033CC] tracking-tight">PROBLEM</div>
        <div className="text-[8px] text-[#8A8A8A] mt-1">Scientific Execution</div>
      </motion.div>

      {/* Scoring criteria — horizontal strip */}
      <div className="flex justify-center gap-2">
        {criteria.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
            className="px-3 py-1.5 rounded-lg bg-[#0033CC]/[0.04] border border-[#0033CC]/[0.08]"
          >
            <span className="text-[9px] font-bold text-[#0033CC]/50">{c}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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
                <RoundtableVisual active={active === 'roundtable'} />
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
                <DialogueVisual active={active === 'dialogue'} />
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
