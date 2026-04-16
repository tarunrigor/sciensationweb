import { useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ── 12 DNA patterns ── */
const patterns: { num: number; name: string; desc: string; example: string }[] = [
  {
    num: 1,
    name: 'First Principles Decomposition',
    desc: 'Strip the problem to its structural core',
    example: "A pharma founder's 'distribution problem' was actually a product-market fit problem. Once decomposed to first principles, the channel wasn't the bottleneck — the offer was.",
  },
  {
    num: 2,
    name: 'Socratic Cascading',
    desc: 'Layered questions that force depth, not breadth',
    example: "'Why is your retention dropping?' → 'Why does that segment churn?' → 'Why does onboarding fail there?' → 'Why is that step manual?' Four layers deep, the real question emerged.",
  },
  {
    num: 3,
    name: 'Cross-Domain Analogy',
    desc: 'Transfer insight from one industry to another',
    example: "A textile exporter's inventory model was restructured using concepts from hospital triage — prioritizing SKUs by margin velocity, not just volume.",
  },
  {
    num: 4,
    name: 'Domain Boundary Crossing',
    desc: 'Force the thinking out of its familiar grooves',
    example: "A SaaS founder's churn problem was reframed through the lens of institutional economics — the issue wasn't product, it was switching costs and lock-in design.",
  },
  {
    num: 5,
    name: 'Structural Thinking',
    desc: 'See the mechanism, not the symptom',
    example: "Three founders reported 'hiring problems.' Structural analysis revealed three different root causes: one had a pipeline problem, one had a filtering problem, one had a retention problem.",
  },
  {
    num: 6,
    name: 'Contrarian Scoring',
    desc: 'Interesting wrong answers score higher than correct ones',
    example: "A fellow argued that cutting a profitable product line would accelerate growth. Wrong on P&L. Right on strategic focus. Scored highest in the session.",
  },
  {
    num: 7,
    name: 'Forced Synthesis',
    desc: 'Integrate across domains into something new',
    example: "A logistics founder and a fintech founder discovered their customer onboarding friction had identical structural patterns — the synthesis produced a shared framework neither had alone.",
  },
  {
    num: 8,
    name: 'Scale Shifting',
    desc: 'See the same pattern at deal level, department level, company level',
    example: "The same bottleneck pattern appeared at deal level (one stuck proposal), department level (sales-ops handoff), and company level (strategy-execution gap). Three scales, one structural issue.",
  },
  {
    num: 9,
    name: 'Ethical-Utilitarian Tension',
    desc: "Hold what's right and what works simultaneously",
    example: "A family business founder faced a choice: optimize margins by cutting a legacy product line, or keep it because 200 families depended on it. The session held both frames without collapsing to either.",
  },
  {
    num: 10,
    name: 'Production Orientation',
    desc: 'Thinking terminates in building, not understanding',
    example: "The session ended not with an insight but with a decision: 'I'm killing that product line on Monday.' Thinking that terminates in building.",
  },
  {
    num: 11,
    name: 'Historical Continuity',
    desc: 'See the business as a point in a structural evolution',
    example: "A manufacturing founder's 'new' problem — scaling beyond ₹50Cr — was mapped to the same structural transition Toyota faced in 1955. The playbook already existed.",
  },
  {
    num: 12,
    name: 'Assumption Challenge',
    desc: "Surface the belief you didn't know you held",
    example: "A founder was certain their bottleneck was sales capacity. One question — 'What happens when you double sales calls?' — revealed the real constraint was delivery capacity, not pipeline.",
  },
];

/* ── Flippable DNA card — periodic table aesthetic ── */
const DNACard = ({ pattern, index, featured = false }: { pattern: typeof patterns[0]; index: number; featured?: boolean }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <FadeIn delay={index * 60}>
      <div
        className={`relative cursor-pointer group ${featured ? 'sm:col-span-2 sm:row-span-2' : ''}`}
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-full"
        >
          {/* ── Front face ── */}
          <div
            className={`relative rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500
              ${featured
                ? 'border-2 border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/[0.08] via-white/[0.03] to-transparent p-8 min-h-[320px]'
                : 'border border-white/[0.06] bg-white/[0.025] p-5 min-h-[200px] group-hover:border-white/[0.15] group-hover:bg-white/[0.05]'
              }
              group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]
            `}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Giant watermark number */}
            <span className={`absolute font-black font-mono leading-none select-none pointer-events-none
              ${featured
                ? 'text-[180px] -top-8 -right-4 text-[#FFD700]/[0.07]'
                : 'text-[100px] -top-4 -right-2 text-white/[0.03] group-hover:text-[#FFD700]/[0.06] transition-colors duration-700'
              }
            `}>
              {String(pattern.num).padStart(2, '0')}
            </span>

            {/* Top accent line */}
            <div className={`w-8 h-[2px] mb-4 transition-all duration-500
              ${featured ? 'bg-[#FFD700]/60 w-12' : 'bg-white/10 group-hover:bg-[#FFD700]/40 group-hover:w-12'}
            `} />

            {/* Element number — like a periodic table */}
            <span className={`text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-3 block
              ${featured ? 'text-[#FFD700]/80' : 'text-white/20 group-hover:text-[#FFD700]/50 transition-colors duration-500'}
            `}>
              Pattern {String(pattern.num).padStart(2, '0')}
            </span>

            <h3 className={`font-bold leading-snug mb-3 relative z-10
              ${featured ? 'text-xl text-[#FFD700]' : 'text-[14px] text-white/90'}
            `}>
              {pattern.name}
            </h3>

            <p className={`leading-relaxed relative z-10
              ${featured ? 'text-sm text-white/50 max-w-md' : 'text-[11px] text-white/30 group-hover:text-white/45 transition-colors duration-500'}
            `}>
              {pattern.desc}
            </p>

            {/* Featured card: contrarian scoring visual */}
            {featured && (
              <div className="mt-auto pt-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="text-xs text-white/60 font-mono">"Correct answer"</span>
                    <span className="text-[#FFD700] text-sm tracking-wider">★★☆</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#FFD700] font-mono font-bold">"Interesting wrong answer"</span>
                    <span className="text-[#FFD700] text-sm tracking-wider">★★★</span>
                  </div>
                </div>
              </div>
            )}

            <div className={`mt-auto pt-3 relative z-10 ${featured ? 'hidden' : ''}`}>
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/15 group-hover:text-[#FFD700]/40 transition-colors duration-500">
                Tap for example →
              </span>
            </div>

            {/* Bottom glow on hover */}
            <div className={`absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700
              ${featured
                ? 'bg-gradient-to-t from-[#FFD700]/[0.06] to-transparent'
                : 'bg-gradient-to-t from-[#0033CC]/[0.08] to-transparent'
              }
            `} />
          </div>

          {/* ── Back face — editorial quote style ── */}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden flex flex-col
              ${featured
                ? 'border-2 border-[#FFD700]/20 p-8'
                : 'border border-[#0033CC]/30 p-5'
              }
            `}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 100%)',
            }}
          >
            {/* Number accent */}
            <span className="absolute top-3 right-4 text-[60px] font-black font-mono leading-none text-[#0033CC]/[0.05] select-none pointer-events-none">
              {String(pattern.num).padStart(2, '0')}
            </span>

            <div className="w-8 h-[2px] bg-[#0033CC]/30 mb-4" />

            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0033CC]/60 mb-3">
              {pattern.name}
            </span>

            {/* Quote-style example */}
            <div className="flex-1 flex items-start">
              <div className="border-l-[3px] border-[#0033CC]/20 pl-4">
                <p className={`text-[#1A1A1A]/80 leading-relaxed italic ${featured ? 'text-[15px]' : 'text-[12px]'}`}>
                  "{pattern.example}"
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8A8A]/60">
                From a past session
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#0033CC]/40">
                ← Flip back
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
};

export const ThinkingModes = () => {
  // Pattern 6 (Contrarian Scoring) is the featured "Purple Cow"
  const featured = patterns[5];
  const topRow = patterns.slice(0, 5);  // 1–5
  const bottomRow = patterns.slice(6);   // 7–12

  return (
    <section
      id="thinking-modes"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000A1F 0%, #001233 30%, #001A4D 60%, #001233 100%)',
        color: '#FAF8F5',
      }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Multiple ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#0033CC]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-[#FFD700]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header: split layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 lg:mb-20">
          <FadeIn>
            <div className="eyebrow text-[#FFD700] mb-4">Methodology</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-white">
              12 thinking<br />
              <span className="text-[#FFD700]">patterns.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="lg:pb-2">
              <p className="text-base text-white/40 font-medium leading-relaxed mb-4 max-w-md">
                Extracted from 200+ Socratic Dialogues over 15 years. Every session uses them. Every KPI is worked through them.
              </p>
              <p className="text-sm text-white/25 leading-relaxed max-w-md">
                The abstraction serves the P&L. Click any card to see a real example from a past session.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── The Grid: featured card + 5 top + 6 bottom ── */}

        {/* Row 1: Pattern 1–5 (small) + Pattern 6 featured (large, spans 2 rows on right) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-3 lg:gap-4 mb-3 lg:mb-4">

          {/* Left block: patterns 1–5 in a 2+3 subgrid */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4 content-start">
            {topRow.map((p, i) => (
              <DNACard key={p.num} pattern={p} index={i} />
            ))}
          </div>

          {/* Right block: featured pattern 6 */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-5">
            <DNACard pattern={featured} index={5} featured />
          </div>
        </div>

        {/* ── Session moment — breaks the abstract card wall ── */}
        <FadeIn delay={400}>
          <div className="relative max-w-2xl mx-auto my-10 lg:my-14">
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/30">
              <img
                src="/images/sd/extrapolate-speaker.gif"
                alt="Speaker mid-thought at Extrapolate — Future of Education"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[9px] font-mono font-bold uppercase tracking-[0.15em] text-white/70">
                  Extrapolate — Future of Education · Live Session
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Row 2: Patterns 7–12 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {bottomRow.map((p, i) => (
            <DNACard key={p.num} pattern={p} index={i + 7} />
          ))}
        </div>

        {/* ── Attribution strip ── */}
        <FadeIn delay={800}>
          <div className="mt-20 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-white/25 leading-relaxed max-w-lg">
              Moderated by DeepThought — an operator whose PDGMS AIP is helping companies grow at 25–30% CAGR across 32+ implementations.
            </p>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/15">
              200+ dialogues · 6 countries · 15 years
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
