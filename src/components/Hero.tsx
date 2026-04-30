import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, Users, Target, Compass } from 'lucide-react';

/* ── Hero GIF — live Socratic Dialogue footage ── */
const HeroGif = () => (
  <div className="relative w-full max-w-[560px] mx-auto">
    <div className="rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/40">
      <img
        src="/hero_bg.gif"
        alt="Socratic Dialogue in progress — participants from Unique Biotech, Escape Velocity, and DeepThought"
        className="w-full h-auto object-cover"
      />
      {/* Bottom gradient overlay with label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-white/70">
          Socratic Dialogue — Live Session
        </p>
      </div>
    </div>
  </div>
);

const roomCards = [
  {
    id: 'people',
    icon: Users,
    tag: 'The People',
    hook: 'Founders growing at 25–30% CAGR — the science way.',
    detail: 'They run experiments. They scale what\'s validated. They think deep and execute hard. They\'re growing at 25–30% CAGR — not because they got lucky, but because they do business the science way.',
    punchline: 'You\'re not the only chess player.',
  },
  {
    id: 'method',
    icon: Target,
    tag: 'The Method',
    hook: 'One KPI. Socratic questions. Wrong answers welcome.',
    detail: 'At Sciensation, founders who think like this sit together. One revenue KPI on the table. A Socratic method where interesting wrong answers score higher than correct ones. The question you walked in with isn\'t the question you leave with.',
  },
  {
    id: 'boundaries',
    icon: Compass,
    tag: 'Why Boundaries Matter',
    hook: 'Toyota learned from supermarkets. Nobel Prizes cross disciplines.',
    detail: 'Toyota\'s production system came from studying American supermarkets. The concept of niche came from biology. Prof Venky Ramakrishnan — a biologist with a PhD in physics — won the Nobel Prize in chemistry. The best thinking crosses boundaries. So does this room.',
    footnote: 'Politicians, cricketers, professors, filmmakers, CTOs, complexity scientists',
  },
];

export const Hero = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 overflow-hidden py-20"
      style={{
        background: 'linear-gradient(180deg, #000A1F 0%, #001233 40%, #001A4D 70%, #001233 100%)',
        color: '#FAF8F5',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-[#0033CC]/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-[#FFD700]/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ZONE 1 — Headline + GIF Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

        {/* Left: editorial text stack */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-[#FFD700]/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] font-mono text-[#FFD700]/70">
              Since 2011
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[52px] sm:text-[68px] xl:text-[96px] font-black tracking-[-0.04em] leading-[0.88] uppercase text-white"
          >
            There are<br />
            more people<br />
            <span className="text-[#FFD700]">like you.</span>
          </motion.h1>

          {/* Declaration — gold border accent */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 pl-5 border-l-[3px] border-[#FFD700]/60"
          >
            <p className="text-lg md:text-xl font-bold text-white/90 tracking-tight leading-snug">
              The Scientific Roundtable<br className="hidden sm:block" /> for business growth.
            </p>
          </motion.div>

          {/* Credential strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-6"
          >
            {[
              { num: '200+', label: 'dialogues' },
              { num: '6', label: 'countries' },
              { num: '15', label: 'years' },
            ].map((stat, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-[#FFD700] tracking-tight">{stat.num}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: GIF Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <HeroGif />
        </motion.div>
      </div>

      {/* ZONE 2 — The triptych */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-7xl mx-auto w-full mt-14 lg:mt-20"
      >
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {roomCards.map((card) => {
            const isOpen = openCard === card.id;
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                layout
                className={`group rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#0A0A0A] border-[#FFD700]/25 shadow-xl shadow-black/30'
                    : 'bg-white/[0.04] border-white/[0.08] hover:border-[#FFD700]/15 hover:bg-white/[0.06]'
                }`}
              >
                <button
                  onClick={() => setOpenCard(isOpen ? null : card.id)}
                  className="w-full text-left p-6 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#FFD700] text-[#0A0A0A]'
                        : 'bg-white/[0.06] text-white/40 group-hover:text-white/60'
                    }`}>
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-black uppercase tracking-[0.25em] text-[#FFD700] font-mono mb-2">
                        {card.tag}
                      </div>
                      <p className={`text-[13px] font-semibold leading-relaxed ${
                        isOpen ? 'text-white/90' : 'text-white/70'
                      }`}>
                        {card.hook}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-400 ${
                      isOpen ? 'border-[#FFD700] bg-[#FFD700] text-[#0A0A0A] rotate-180' : 'border-white/15 text-white/30'
                    }`}>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-20">
                        <div className="pl-4 border-l-2 border-[#FFD700]/30">
                          <p className="text-sm text-white/80 leading-relaxed">{card.detail}</p>
                        </div>
                        {card.punchline && (
                          <p className="text-sm font-bold text-white mt-4 pl-4">{card.punchline}</p>
                        )}
                        {card.footnote && (
                          <p className="text-[10px] text-white/50 font-mono mt-4 pl-4 font-bold uppercase tracking-wider">
                            {card.footnote}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#cta" className="btn-yellow gap-3 !px-12 !py-4 !text-[11px]">
            <span>Apply for a Seat</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#format"
            className="inline-block border-2 border-white/20 text-white/70 rounded-lg px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] font-mono hover:border-white/40 hover:text-white transition-all"
          >
            How it works
          </a>
        </div>
      </motion.div>
    </section>
  );
};
