import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

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

const DNACard = ({ pattern }: { pattern: typeof patterns[0] }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full"
      >
        {/* Front face */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] p-6 md:p-7 min-h-[300px] flex flex-col group-hover:border-white/[0.15] group-hover:bg-white/[0.06] transition-all duration-500 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="absolute text-[130px] font-black font-mono leading-none select-none pointer-events-none -top-6 -right-3 text-white/[0.03] group-hover:text-[#FFD700]/[0.06] transition-colors duration-700">
            {String(pattern.num).padStart(2, '0')}
          </span>

          <div className="w-8 h-[2px] bg-white/10 group-hover:bg-[#FFD700]/40 group-hover:w-12 mb-4 transition-all duration-500" />

          <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-3 block text-white/20 group-hover:text-[#FFD700]/50 transition-colors duration-500">
            Pattern {String(pattern.num).padStart(2, '0')}
          </span>

          <h3 className="text-lg font-bold leading-snug mb-3 text-white/90 relative z-10">
            {pattern.name}
          </h3>

          <p className="text-[13px] leading-relaxed text-white/35 group-hover:text-white/50 transition-colors duration-500 relative z-10">
            {pattern.desc}
          </p>

          <div className="mt-auto pt-4 relative z-10">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/15 group-hover:text-[#FFD700]/40 transition-colors duration-500">
              Tap for example →
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-[#0033CC]/[0.08] to-transparent" />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-[#0033CC]/30 p-6 md:p-7 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 100%)',
          }}
        >
          <span className="absolute top-3 right-4 text-[70px] font-black font-mono leading-none text-[#0033CC]/[0.05] select-none pointer-events-none">
            {String(pattern.num).padStart(2, '0')}
          </span>

          <div className="w-8 h-[2px] bg-[#0033CC]/30 mb-4" />

          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0033CC]/60 mb-3">
            {pattern.name}
          </span>

          <div className="flex-1 flex items-start">
            <div className="border-l-[3px] border-[#0033CC]/20 pl-4">
              <p className="text-[14px] text-[#1A1A1A]/80 leading-relaxed italic">
                "{pattern.example}"
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#8A8A8A]/60">
              Heard at a Saturday session
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#0033CC]/40">
              ← Flip back
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ThinkingModes = () => {
  const [startIdx, setStartIdx] = useState(0);
  const total = patterns.length;

  const visible = [
    patterns[startIdx],
    patterns[(startIdx + 1) % total],
    patterns[(startIdx + 2) % total],
  ];

  const visibleSet = new Set([startIdx, (startIdx + 1) % total, (startIdx + 2) % total]);

  return (
    <section
      id="thinking-modes"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000A1F 0%, #001233 30%, #001A4D 60%, #001233 100%)',
        color: '#FAF8F5',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-[#0033CC]/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-[#FFD700]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 lg:mb-20">
          <FadeIn>
            <div className="eyebrow text-[#FFD700] mb-4">Inside the Room</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.85] text-white">
              How we<br />
              <span className="text-[#FFD700]">think together.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="lg:pb-2">
              <p className="text-base text-white/40 font-medium leading-relaxed mb-4 max-w-md">
                Every Saturday session runs on these 12 patterns. They're how a room of MDs/CEOs from different industries cracks the same KPI problem from angles no one sees alone.
              </p>
              <p className="text-sm text-white/25 leading-relaxed max-w-md">
                Tap any card to see what this looks like in a real session.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <div>
            <motion.div
              key={startIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {visible.map((p) => (
                <DNACard key={p.num} pattern={p} />
              ))}
            </motion.div>

            {/* 12-dot carousel selector */}
            <div className="flex justify-center items-center gap-1.5 mt-10">
              {patterns.map((p, i) => {
                const isSelected = i === startIdx;
                const isVisible = visibleSet.has(i);
                return (
                  <button
                    key={p.num}
                    onClick={() => setStartIdx(i)}
                    className={`w-9 h-9 rounded-lg text-[11px] font-mono font-bold transition-all duration-300 ${
                      isSelected ? 'scale-110 z-10' : ''
                    }`}
                    style={
                      isSelected
                        ? {
                            backgroundColor: '#FFD700',
                            color: '#1A1A1A',
                            boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
                          }
                        : isVisible
                          ? {
                              backgroundColor: 'rgba(255,215,0,0.10)',
                              color: '#FFD700',
                              border: '1.5px solid rgba(255,215,0,0.20)',
                            }
                          : {
                              backgroundColor: 'rgba(255,255,255,0.04)',
                              color: 'rgba(255,255,255,0.25)',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }
                    }
                    onMouseEnter={(e) => {
                      if (!isSelected && !isVisible) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isVisible) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)';
                      }
                    }}
                  >
                    {String(p.num).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="relative max-w-2xl mx-auto my-14 lg:my-16">
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

        <FadeIn delay={500}>
          <div className="text-center mt-16">
            <p className="text-sm text-white/30 mb-6 max-w-lg mx-auto">
              You don't study these patterns. You use them — live, on your own KPI, with founders who think differently than you do.
            </p>
            <a href="#cta" className="btn-yellow gap-3 !px-10 !py-4 !text-[11px] inline-flex justify-center">
              <span>Join a Saturday Session</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={600}>
          <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
