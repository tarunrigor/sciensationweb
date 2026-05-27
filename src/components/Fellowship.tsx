import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Zap, Brain, TrendingUp, Layers, Target, Users, Briefcase, Rocket, Crown, Building2, LineChart, Lightbulb, DollarSign, Code, BarChart3, ClipboardList, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const LENSES = [
  {
    icon: Code,
    label: 'Tech',
    color: '#0033CC',
    bg: '#E4ECF9',
    summary: 'What can be built? How does data flow? What are the real constraints?',
    detail: 'You learn to read architecture the way a pilot reads instruments. Not one dial at a time, but the full panel at once.',
    failure: 'A pure engineer builds a beautiful system that nobody uses because they didn\'t see the organizational resistance.',
  },
  {
    icon: Brain,
    label: 'Psychology',
    color: '#7B1E3A',
    bg: '#F2E4E9',
    summary: 'Why are people behaving this way? What organizational pattern is producing this?',
    detail: 'You learn to see the invisible structures that shape human action inside companies. Why the floor manager resists. Why the sales team ignores the CRM.',
    failure: 'A pure consultant writes a brilliant strategy deck that never gets implemented because they can\'t build anything.',
  },
  {
    icon: TrendingUp,
    label: 'Business',
    color: '#2D6A4F',
    bg: '#E8F5E9',
    summary: 'What moves the P&L? Where is ₹1 Cr hiding in a broken process?',
    detail: 'You learn to read a P&L the way an engineer reads a codebase. Looking for where the leverage is, not just what the numbers say.',
    failure: 'A pure manager coordinates execution on the wrong problem because they can\'t see the system underneath.',
  },
];

const CAPABILITIES = [
  {
    icon: Layers,
    title: 'Systems Design',
    emphasis: 'Hardest to master',
    desc: 'Diagnose organizational problems. See why quality issues are actually a culture problem wearing an operations mask. Design interventions that fix the generating structure, not just the symptom.',
    color: '#7B1E3A',
  },
  {
    icon: DollarSign,
    title: 'Commercial Strategy',
    emphasis: 'P&L fluency',
    desc: 'Read P&Ls and balance sheets fluently. Model EBITDA impact. Discover use cases that move business outcomes. Interventions that show up as ₹ on the client\'s bottom line.',
    color: '#2D6A4F',
  },
  {
    icon: ClipboardList,
    title: 'Program Management',
    emphasis: 'Stakeholder mastery',
    desc: 'Work Breakdown Structure. Pre-mortem. Risk mapping. Cross-functional delivery under uncertainty. Coordinating MDs, direct reports, middle management, and floor operators.',
    color: '#0033CC',
  },
  {
    icon: Wrench,
    title: 'FDE / Platform Engineering',
    emphasis: 'Most learnable',
    desc: 'Build, deploy, and customize PDGMS into client environments. Data pipelines. AIP use case implementation. Analytics automation. The technical execution layer.',
    color: '#C8952E',
  },
];

interface Stage {
  stage: string;
  title: string;
  desc: string;
  pillar: string;
  pay: string;
  billed?: string;
  color: string;
}

const INCUBATION_STAGES: Stage[] = [
  { stage: '1', title: 'FDE Fellow (Internal)', desc: 'Cross-functional micro-lead inside DT. All four capabilities at basic literacy.', pillar: 'Foundation', pay: '₹2k–8k/mo + ₹5k L&D', color: '#8A8A8A' },
  { stage: '2', title: 'FDE Fellow (Client)', desc: 'Client-site execution under supervision. You start questioning how things work, seeing what\'s broken, pushing back.', pillar: 'All Active', pay: '₹10–20k/mo', color: '#4A4A4A' },
];

const CAREER_STAGES: Stage[] = [
  { stage: '3', title: 'Engagement Lead', desc: 'Independent tech execution at client. Lead V3 team. Bridge strategy to FDE deployment.', pillar: 'Tech dominant', pay: '₹6–10 LPA', billed: '₹12–20 LPA', color: '#0033CC' },
  { stage: '3.5', title: 'Senior Engagement Lead', desc: 'Multi-engagement lead, specialist in a PDGMS module/sector, or internal practice lead.', pillar: 'Tech + PM', pay: '₹10–14 LPA', billed: '₹20–28 LPA', color: '#1A56DB' },
  { stage: '4', title: 'Technical Program Manager', desc: 'Coordinate engagement execution. Manage Stage 3 FDEs and Fellows. Own delivery across stakeholders.', pillar: 'PM dominant', pay: '₹12–18 LPA', billed: '₹25–35 LPA', color: '#2D6A4F' },
  { stage: '5', title: 'Engagement Manager', desc: 'Own DT account end-to-end. Drive EBITDA outcomes with the MD. Help client make the right decisions.', pillar: 'Commercial dominant', pay: '₹18–30 LPA', billed: '₹40–60 LPA', color: '#C8952E' },
  { stage: '6', title: 'Program Director', desc: 'Design intervention architecture across sector/geography/module. Mentor EMs. All four at mastery.', pillar: 'Systems Design', pay: '₹30–50 LPA', billed: '₹60–100 LPA', color: '#7B1E3A' },
];

const ALL_STAGES = [...INCUBATION_STAGES, ...CAREER_STAGES];

interface Exit {
  icon: typeof Briefcase;
  title: string;
  where: string;
  unlocks: string;
  comp: string;
  leads: string;
  why: string;
}

const EXIT_DOORS: Exit[] = [
  { icon: Rocket, title: 'Forward Deployed Engineer', where: 'AI startups, global and Indian', unlocks: 'Stage 3+', comp: '₹15–50 LPA + equity', leads: 'Founder · Product Lead · VP Customer Success', why: 'The DT Fellowship IS FDE training. Platform deployment, use case discovery, customer-facing execution. You\'ve done all of this by Stage 3.' },
  { icon: ClipboardList, title: 'Technical Program Manager', where: 'Top-tier tech companies', unlocks: 'Stage 4+', comp: '₹20–30 LPA', leads: 'Senior TPM · Director of Engineering · VP Ops', why: 'DT Fellows at Stage 4 have PM mastery PLUS commercial foundation PLUS technical depth. That triple stack differentiates.' },
  { icon: Lightbulb, title: 'Product Manager', where: 'AI or tech-enabled companies', unlocks: 'Stage 3+', comp: '₹12–30 LPA', leads: 'VP Product · CPO · Founder', why: 'DT\'s three-lens training maps directly to what a PM does daily. The commercial and human-behavior dimensions most PM candidates lack.' },
  { icon: LineChart, title: 'RevOps Lead', where: 'B2B companies globally', unlocks: 'Stage 3+', comp: '₹12–25 LPA', leads: 'VP Revenue Ops · CRO · COO', why: 'Systems design + commercial strategy + FDE + PM. That\'s RevOps. DT trains you for it without ever calling it that.' },
  { icon: Building2, title: 'Digital Transformation Lead', where: 'Founder-led companies ₹500–2000 Cr', unlocks: 'Stage 3+', comp: '₹18–50 LPA', leads: 'CDO · CTO · COO · Board Advisory', why: 'The closest external role to what you do at DT. Founder-direct decisions. Fast iteration. No buffer layers.' },
  { icon: Briefcase, title: 'Consulting, Digital Practice', where: 'Top-tier consulting firms, digital practices', unlocks: 'Stage 3.5+', comp: '₹18–45 LPA', leads: 'Partner · Sector Head · Founder', why: 'Digital practices at top consulting firms value multi-stack candidates. DT Fellows bring the triple stack most analysts don\'t develop until 3-4 years in.' },
  { icon: BarChart3, title: 'PE Operating Teams', where: 'Leading PE funds, India and global', unlocks: 'Stage 5+', comp: '₹35–60 LPA', leads: 'Operating Partner · Fund Principal · Founder', why: 'Systems design + commercial strategy at scale. You\'ve done it at individual MSMEs. PE operating teams do it across a portfolio.' },
  { icon: Zap, title: 'Founder', where: 'Your own venture', unlocks: 'Stage 4+', comp: '₹0 to ₹unlimited', leads: 'Wherever you take it', why: 'DT is structurally founder-school. Four capabilities. Years of founder-altitude exposure. You\'ve watched MDs make decisions from inside the room.' },
  { icon: Crown, title: 'CXO Track', where: 'Mid-to-large companies', unlocks: 'Stage 5+', comp: '₹50 LPA – ₹1 Cr+', leads: 'Board membership · Category leadership', why: 'By Stage 5–6, you have all four capabilities at depth, you\'ve sat with founders for years, you\'ve designed systems that run businesses.' },
  { icon: Users, title: 'Stay at DT → Partner', where: 'DT Growth Teams', unlocks: 'Stage 5+', comp: '₹30–50 LPA+', leads: 'EM → Director → Partner', why: 'No translation required. The brand you\'re building IS the credential. You\'re building the thing you\'re credentialed by.' },
];

const ENTRY_POINTS = [
  { label: '2nd Year College', stage: 'Stage 1', mode: 'Part-time, evenings + Saturdays', path: 'Stage 1 → Stage 2 → Stage 3 full-time post-grad', incubation: '18 months by graduation', highlight: true },
  { label: 'Final Year College', stage: 'Stage 1 or 2', mode: 'Part-time', path: 'Stage 1/2 → Stage 3 post-graduation', incubation: 'Less runway, but differentiated by graduation', highlight: false },
  { label: 'Post-College Fresher', stage: '24-month track', mode: 'Full-time', path: 'Grade C → B → A → Stage 3', incubation: '24 months to Stage 3-ready', highlight: false },
  { label: '1 Year Work-Ex', stage: 'Stage 2 or 3', mode: 'Full-time', path: 'Stage 2 Fellowship or direct Stage 3', incubation: 'DT assesses what you can do, not tenure', highlight: false },
  { label: '2 Years Work-Ex', stage: 'Stage 3', mode: 'Full-time', path: 'Engagement Lead or Systems Designer', incubation: 'Calendar years ≠ capability years', highlight: false },
  { label: '4 Years Work-Ex', stage: 'Stage 4–5', mode: 'Full-time', path: 'TPM if PM+tech · EM if commercial+PM', incubation: 'Placed where capability actually is', highlight: false },
];

const TRAJECTORIES = [
  { name: 'Shagun', path: 'Part-time → Full-time → EM (College) → EM (Biotech Client)', outcome: 'Manages a DT account end-to-end. Sits with the MD of a biotech company. Drives EBITDA outcomes.', tag: 'Engagement Manager' },
  { name: 'Purva', path: 'Fellow → Product Manager at client company', outcome: 'Proves the PM exit archetype works. DT\'s triple stack maps directly to what a PM does every day.', tag: 'Product Manager' },
  { name: 'Mohit', path: 'Dev (Stage 3) → TPM (Stage 4) at client company', outcome: 'The pillar-progression operating live. Tech-dominant → PM-dominant, exactly as the framework predicts.', tag: 'Technical PM' },
];

const IDENTITY_ITEMS = [
  { title: 'You operate at consulting-grade intensity.', desc: 'The same quality of thinking top consulting firms demand, you deliver, but with the advantage of building real systems, not just recommending them. Strategy AND execution in the same person.', check: '"This month I delivered [specific output] that moved [specific client metric]. The intervention is live and producing results."' },
  { title: 'You work at founder altitude.', desc: 'Founder-direct conversations. EBITDA-level decisions. Systems-level exposure. At 20, you\'re in rooms where business strategy gets made, because MSMEs need this profile at the table.', check: '"This month I had [X] direct conversations with the MD where [specific decision] was shaped by my analysis."' },
  { title: 'Your profile fills a structural gap.', desc: 'Engineering + commercial fluency + systems thinking + MSME-native operation. CXOs who\'ve done transformation work recognize this profile instantly, because they\'ve tried to hire it and couldn\'t find it.', check: '"When I described my work to [CXO/founder], they recognized the profile because they\'ve been looking for exactly this combination."' },
  { title: 'You understand code faster because you know WHY it exists.', desc: 'Business context IS the shortcut to architectural thinking. You reach systems-level architectural thinking faster because you have the map that pure-tech paths don\'t provide.', check: '"This month I designed [specific architecture] because I understood what the business needed, not just what the spec said."' },
  { title: 'Your path stacks capabilities. It doesn\'t replace them.', desc: 'Stage 3 masters tech. Stage 4 adds PM on top. Stage 5 adds commercial. Stage 6 adds systems design. Nothing atrophies because each stage keeps prior capabilities active.', check: null },
];

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function LensCard({ lens, index }: { lens: typeof LENSES[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = lens.icon;
  return (
    <FadeIn delay={index * 120}>
      <button
        onClick={() => setOpen(!open)}
        className="card-lift w-full text-left rounded-2xl border border-[#E8E4E0] bg-white p-6 cursor-pointer transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: lens.bg }}>
            <Icon className="w-5 h-5" style={{ color: lens.color }} />
          </div>
          <ChevronDown className={`w-5 h-5 text-[#8A8A8A] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
        <p className="eyebrow mb-1.5" style={{ color: lens.color }}>{lens.label} Lens</p>
        <p className="text-base font-bold text-[#1A1A1A] leading-snug">{lens.summary}</p>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3 pt-3">{lens.detail}</p>
              <div className="rounded-lg p-3" style={{ backgroundColor: lens.bg + '80' }}>
                <p className="text-xs italic" style={{ color: lens.color }}>Without it: {lens.failure}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </FadeIn>
  );
}

function CapabilityCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const Icon = cap.icon;
  return (
    <FadeIn delay={index * 100}>
      <div className="card-lift rounded-2xl border border-[#E8E4E0] bg-white p-6 h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: cap.color + '15' }}>
            <Icon className="w-4 h-4" style={{ color: cap.color }} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest font-mono" style={{ color: cap.color }}>{cap.emphasis}</span>
        </div>
        <h3 className="text-base font-black text-[#1A1A1A] mb-2">{cap.title}</h3>
        <p className="text-xs text-[#4A4A4A] leading-relaxed">{cap.desc}</p>
      </div>
    </FadeIn>
  );
}

function IdentityRow({ item, index }: { item: (typeof IDENTITY_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 80}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left rounded-xl border border-white/10 bg-white/[0.04] p-5 cursor-pointer transition-all hover:bg-white/[0.06]"
      >
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-bold text-white">{item.title}</h4>
          <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-xs text-white/50 leading-relaxed mt-3">{item.desc}</p>
              {item.check && (
                <div className="mt-3 rounded-lg bg-[#FFD700]/[0.06] border border-[#FFD700]/10 px-4 py-2">
                  <p className="text-[10px] text-[#FFD700]/70 font-mono leading-relaxed">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD700]/40 mr-2">Monthly check:</span>
                    {item.check}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export function Fellowship() {
  const [activeTab, setActiveTab] = useState<'why' | 'how' | 'where'>('why');
  const [activeWeekTab, setActiveWeekTab] = useState<'weekday' | 'saturday'>('weekday');
  const [exitIdx, setExitIdx] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [showLeapfrog, setShowLeapfrog] = useState(false);
  const [showParallel, setShowParallel] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    const y = (tabBarRef.current?.offsetTop ?? 0) - 64;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A]">
      <Navbar />

      {/* ──────────────── COMPACT HERO ──────────────── */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-14 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(0,51,204,0.15) 0%, transparent 70%)' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow text-[#FFD700]/70 mb-4">DT FDE Fellowship</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.08] mb-3 tracking-tight">
            What You're Joining. <span className="text-[#FFD700]">What You Become.</span>
          </h1>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Read this before you decide. Read this again after you've been here 6 months.
          </p>
        </div>
      </section>

      {/* ──────────────── STICKY TAB BAR ──────────────── */}
      <div ref={tabBarRef} className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E8E4E0] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex">
          {([
            { key: 'why' as const, label: 'The Why' },
            { key: 'how' as const, label: 'The How' },
            { key: 'where' as const, label: 'The Where' },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`flex-1 py-3.5 text-center text-[11px] font-black uppercase tracking-widest font-mono transition-all border-b-2 cursor-pointer ${
                activeTab === tab.key
                  ? 'border-[#0033CC] text-[#0033CC]'
                  : 'border-transparent text-[#8A8A8A] hover:text-[#4A4A4A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ──────────────── TAB CONTENT ──────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* ════════════════ TAB 1: THE WHY ════════════════ */}
          {activeTab === 'why' && (
            <>
              {/* ── THE GAP ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">The Gap in India's Economy</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-6">
                      India has <span className="text-[#0033CC]">63 million</span> MSMEs.<br className="hidden md:block" />
                      No institution produces the person they need.
                    </h2>
                  </FadeIn>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                      { inst: 'IITs', produce: 'Engineers who build systems', miss: 'can\'t read a P&L' },
                      { inst: 'IIMs', produce: 'Managers who read a P&L', miss: 'can\'t build systems' },
                      { inst: 'IT Services', produce: 'Executors who follow specs', miss: 'written by someone else' },
                      { inst: 'Consulting', produce: 'Strategists who design brilliantly', miss: 'nobody implements' },
                    ].map((item, i) => (
                      <FadeIn key={item.inst} delay={i * 80}>
                        <div className="rounded-xl border border-[#E8E4E0] bg-white p-4">
                          <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">{item.inst}</span>
                          <p className="text-xs text-[#1A1A1A] mt-1.5 font-semibold">{item.produce}</p>
                          <p className="text-xs text-[#C8952E] font-bold mt-0.5">{item.miss}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  <FadeIn delay={350}>
                    <div className="rounded-2xl bg-gradient-to-r from-[#0033CC] to-[#001A4D] p-6 md:p-8 text-white">
                      <p className="text-lg md:text-xl font-black text-[#FFD700] mb-2">
                        That person does not come out of any existing pipeline.
                      </p>
                      <p className="text-sm text-white/60">DT builds that person. That's the Fellowship.</p>
                    </div>
                  </FadeIn>
                </div>
              </section>

              {/* ── WHO YOU BECOME ── */}
              <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000A1F] to-[#001A4D] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '28px 48px, 28px 48px',
                  backgroundPosition: '0 0, 14px 24px',
                }} />
                <div className="relative max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#FFD700]/70 mb-4">The DT Fellow Identity</p>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-8">
                      Who you <span className="text-[#FFD700]">become</span>
                    </h2>
                  </FadeIn>
                  <div className="space-y-3">
                    {IDENTITY_ITEMS.map((item, i) => (
                      <IdentityRow key={i} item={item} index={i} />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ════════════════ TAB 2: THE HOW ════════════════ */}
          {activeTab === 'how' && (
            <>
              {/* ── THREE LENSES ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">How You Learn to See</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-8">
                      Three lenses. <span className="text-[#0033CC]">Held simultaneously.</span>
                    </h2>
                  </FadeIn>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {LENSES.map((lens, i) => <LensCard key={lens.label} lens={lens} index={i} />)}
                  </div>
                </div>
              </section>

              {/* ── FOUR CAPABILITIES ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">What Emerges</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-8">
                      Four capabilities that compound
                    </h2>
                  </FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CAPABILITIES.map((cap, i) => <CapabilityCard key={cap.title} cap={cap} index={i} />)}
                  </div>
                  <FadeIn delay={400}>
                    <p className="text-xs text-[#8A8A8A] mt-6 text-center">
                      By Stage 3: functional across all four. By Stage 6: mastery. <span className="font-bold text-[#0033CC]">Consistently supply-constrained.</span>
                    </p>
                  </FadeIn>
                </div>
              </section>

              {/* ── YOUR WEEK ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">Your Week</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-6">
                      What a week looks like
                    </h2>
                  </FadeIn>

                  <FadeIn delay={100}>
                    <div className="flex gap-3 mb-6">
                      {(['weekday', 'saturday'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveWeekTab(tab)}
                          className={`text-[10px] font-black uppercase tracking-widest font-mono px-5 py-2.5 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                            activeWeekTab === tab
                              ? 'bg-[#0033CC] border-[#0033CC] text-white'
                              : 'bg-transparent border-[#E8E4E0] text-[#8A8A8A] hover:border-[#0033CC]/30 hover:text-[#0033CC]'
                          }`}
                        >
                          {tab === 'weekday' ? 'Weekdays 5–9pm' : 'Saturdays'}
                        </button>
                      ))}
                    </div>
                  </FadeIn>

                  <AnimatePresence mode="wait">
                    {activeWeekTab === 'weekday' ? (
                      <motion.div key="weekday" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="rounded-2xl border border-[#E8E4E0] bg-white p-6">
                          <p className="text-xs font-bold text-[#0033CC] uppercase tracking-wider font-mono mb-3">Client Engagement · ₹100-500 Cr Manufacturer</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { text: 'Finding where ₹80L is trapped in a 45-day cycle that should be 22 days', icon: '📊' },
                              { text: 'Deploying PDGMS modules that make performance management diagnostic', icon: '⚙️' },
                              { text: 'The MD asks you: "what should we do about this?"', icon: '💬' },
                              { text: 'Driving adoption with floor managers who\'ve done things the same way for 15 years', icon: '🔄' },
                            ].map((item, i) => (
                              <div key={i} className="flex gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4E0]">
                                <span className="text-lg shrink-0">{item.icon}</span>
                                <p className="text-xs text-[#4A4A4A] leading-relaxed">{item.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="saturday" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="space-y-3">
                          {[
                            { title: 'LDI: Leadership Development Initiative', desc: 'Professional identity architecture. How you see yourself, carry yourself in a room with a CEO.', color: '#7B1E3A', icon: Crown },
                            { title: 'Socratic Dialogue', desc: 'Hold a position. Defend under questioning. Revise when evidence demands it, not pressure.', color: '#0033CC', icon: Brain },
                            { title: 'PM Hands-On (AI-Native)', desc: 'Your actual current project. WBS, pre-mortem, risk mapping. Not a case study — your project.', color: '#2D6A4F', icon: Target },
                          ].map((session) => {
                            const Icon = session.icon;
                            return (
                              <div key={session.title} className="rounded-xl border border-[#E8E4E0] bg-white p-5 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: session.color + '12' }}>
                                  <Icon className="w-4 h-4" style={{ color: session.color }} />
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-[#1A1A1A] mb-1">{session.title}</h4>
                                  <p className="text-xs text-[#4A4A4A] leading-relaxed">{session.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* ── CAREER SPINE ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">Career Architecture</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-8">
                      Stages 1 to 6
                    </h2>
                  </FadeIn>

                  {/* Horizontal stepper */}
                  <FadeIn delay={100}>
                    <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
                      {ALL_STAGES.map((s, i) => (
                        <div key={s.stage} className="flex items-center shrink-0">
                          <button
                            onClick={() => setActiveStage(i)}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black font-mono shrink-0 transition-all cursor-pointer border-2"
                            style={{
                              backgroundColor: i === activeStage ? s.color : 'transparent',
                              borderColor: s.color,
                              color: i === activeStage ? 'white' : s.color,
                            }}
                          >
                            {s.stage}
                          </button>
                          {i < ALL_STAGES.length - 1 && (
                            <div className="w-6 md:w-10 h-px bg-[#E8E4E0] mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  <FadeIn delay={150}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeStage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        {(() => {
                          const stage = ALL_STAGES[activeStage];
                          return (
                            <div className="rounded-xl border border-[#E8E4E0] bg-[#FAF8F5] p-6">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: stage.color + '15', color: stage.color }}>
                                  {activeStage < 2 ? 'Incubation' : 'Career'}
                                </span>
                                <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: stage.color + '15', color: stage.color }}>
                                  {stage.pillar}
                                </span>
                              </div>
                              <h4 className="text-lg font-black text-[#1A1A1A] mb-2">{stage.title}</h4>
                              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{stage.desc}</p>
                              <div className="flex flex-wrap gap-4 text-xs font-mono">
                                <span className="text-[#2D6A4F] font-bold">DT pays {stage.pay}</span>
                                {stage.billed && <span className="text-[#8A8A8A]">Client billed {stage.billed}</span>}
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                  </FadeIn>

                  {/* Expandable extras */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={() => setShowLeapfrog(!showLeapfrog)}
                      className="w-full text-left rounded-xl border border-dashed border-[#FFD700]/40 bg-[#FFF9E6] p-4 cursor-pointer transition-all hover:border-[#FFD700]/60"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#C8952E]">The Leapfrog</span>
                          <span className="text-xs text-[#C8952E]/60">Skip Stage 3 entirely</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#C8952E]/50 transition-transform duration-300 ${showLeapfrog ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {showLeapfrog && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="text-xs text-[#4A4A4A] leading-relaxed mt-3 mb-3">
                              Exceptional Stage 2 Fellows can skip Stage 3 entirely and go directly to Stage 4. Published criteria, meritocratic, not manager-discretion.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {['PM mastery', 'Commercial acumen', 'Stakeholder management', 'Tech sufficiency', 'Opening exists'].map((c) => (
                                <span key={c} className="text-[10px] font-bold font-mono uppercase tracking-wider bg-[#C8952E]/10 text-[#C8952E] px-2.5 py-1 rounded-full">{c}</span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>

                    <button
                      onClick={() => setShowParallel(!showParallel)}
                      className="w-full text-left rounded-xl border border-[#E8E4E0] bg-[#FAF8F5] p-4 cursor-pointer transition-all hover:border-[#7B1E3A]/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code className="w-4 h-4 text-[#7B1E3A]" />
                          <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#7B1E3A]">Parallel Track: Systems Designer</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#8A8A8A] transition-transform duration-300 ${showParallel ? 'rotate-180' : ''}`} />
                      </div>
                      <AnimatePresence>
                        {showParallel && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <p className="text-xs text-[#4A4A4A] mt-3 mb-4">Not everyone wants to manage people. The IC-depth track for architecture, data pipelines, and system design.</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {[
                                { level: 'Systems Designer', pay: '₹15–25 LPA', entry: '1–2 yr' },
                                { level: 'Senior', pay: '₹25–40 LPA', entry: '4–6 yr' },
                                { level: 'Principal', pay: '₹40–70 LPA', entry: '8+ yr' },
                                { level: 'Distinguished', pay: '₹70 LPA+', entry: '10+ yr' },
                              ].map((l) => (
                                <div key={l.level} className="rounded-lg border border-[#E8E4E0] bg-white p-3 text-center">
                                  <p className="text-[10px] font-black text-[#7B1E3A]">{l.level}</p>
                                  <p className="text-xs font-bold text-[#1A1A1A]">{l.pay}</p>
                                  <p className="text-[10px] text-[#8A8A8A] font-mono">{l.entry}</p>
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-[#8A8A8A] mt-3">Cross-track mobility is open. Life changes. Preferences evolve. The system accommodates that.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ════════════════ TAB 3: THE WHERE ════════════════ */}
          {activeTab === 'where' && (
            <>
              {/* ── ENTRY POINTS ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
                <div className="max-w-5xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">Entry Points</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-8">
                      Where you enter
                    </h2>
                  </FadeIn>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {ENTRY_POINTS.map((ep, i) => (
                      <FadeIn key={ep.label} delay={i * 60}>
                        <div className={`rounded-xl border p-4 h-full ${ep.highlight ? 'border-[#0033CC]/30 bg-[#E4ECF9]/40' : 'border-[#E8E4E0] bg-white'}`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${ep.highlight ? 'text-[#0033CC]' : 'text-[#8A8A8A]'}`}>{ep.label}</span>
                          <p className="text-base font-black text-[#1A1A1A] mt-1">{ep.stage}</p>
                          <p className="text-[10px] text-[#8A8A8A] font-mono">{ep.mode}</p>
                          <p className="text-xs text-[#0033CC] font-semibold mt-2">{ep.incubation}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  <FadeIn delay={400}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-[#E8E4E0] bg-white p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#0033CC]">Axis 1: Pillar Development</span>
                        <p className="text-xs text-[#4A4A4A] mt-2">Which capabilities have you built? <span className="font-bold text-[#1A1A1A]">This determines your stage.</span></p>
                      </div>
                      <div className="rounded-xl border border-[#E8E4E0] bg-white p-4">
                        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#7B1E3A]">Axis 2: Operating Mode</span>
                        <p className="text-xs text-[#4A4A4A] mt-2">Builder mindset vs. compliance mindset. <span className="font-bold text-[#1A1A1A]">Determines if you'll thrive.</span></p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn delay={450}>
                    <p className="text-xs text-center text-[#4A4A4A] mt-4">
                      <span className="font-bold text-[#1A1A1A]">Lower pillars + builder mindset = land lower, accelerate faster.</span>
                    </p>
                  </FadeIn>
                </div>
              </section>

              {/* ── EXIT DOORS CAROUSEL ── */}
              <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000A1F] to-[#001A4D] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                <div className="relative max-w-4xl mx-auto">
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <FadeIn>
                        <p className="eyebrow text-[#FFD700]/70 mb-4">Exit Doors</p>
                        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                          10 doors. <span className="text-[#FFD700]">All real.</span>
                        </h2>
                      </FadeIn>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-white/40">{exitIdx + 1} / {EXIT_DOORS.length}</span>
                      <button
                        onClick={() => setExitIdx(i => Math.max(0, i - 1))}
                        disabled={exitIdx === 0}
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExitIdx(i => Math.min(EXIT_DOORS.length - 1, i + 1))}
                        disabled={exitIdx === EXIT_DOORS.length - 1}
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={exitIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                      {(() => {
                        const exit = EXIT_DOORS[exitIdx];
                        const Icon = exit.icon;
                        return (
                          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8">
                            <div className="flex items-start gap-4 mb-5">
                              <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                                <Icon className="w-6 h-6 text-[#FFD700]" />
                              </div>
                              <div>
                                <h3 className="text-xl font-black text-white">{exit.title}</h3>
                                <p className="text-sm text-white/40 mt-1">{exit.where}</p>
                              </div>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed mb-5">{exit.why}</p>
                            <div className="flex flex-wrap gap-3 mb-4">
                              <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#FFD700]/80 bg-[#FFD700]/10 px-2.5 py-1 rounded-full">{exit.unlocks}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#2D6A4F] bg-[#2D6A4F]/15 px-2.5 py-1 rounded-full">{exit.comp}</span>
                            </div>
                            <p className="text-xs text-white/30 font-mono">Leads to → <span className="text-white/50">{exit.leads}</span></p>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-center gap-1.5 mt-6">
                    {EXIT_DOORS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setExitIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === exitIdx ? 'bg-[#FFD700] scale-125' : 'bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {['Founder-led companies', 'AI startups', 'PE/VC ops teams', 'Digital consulting'].map(w => (
                      <span key={w} className="text-[10px] font-bold font-mono text-white/40 bg-white/[0.05] px-3 py-1.5 rounded-full">{w}</span>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── REAL TRAJECTORIES ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
                <div className="max-w-4xl mx-auto">
                  <FadeIn>
                    <p className="eyebrow text-[#0033CC] mb-4">Proof</p>
                    <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-6">
                      Real trajectories
                    </h2>
                  </FadeIn>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TRAJECTORIES.map((t, i) => (
                      <FadeIn key={t.name} delay={i * 100}>
                        <div className="rounded-xl border border-[#E8E4E0] bg-white p-5 h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0033CC] to-[#001A4D] flex items-center justify-center shrink-0">
                              <span className="text-lg font-black text-white">{t.name[0]}</span>
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-[#1A1A1A]">{t.name}</h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#0033CC]">{t.tag}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-[#8A8A8A] font-mono mb-2">{t.path}</p>
                          <p className="text-xs text-[#4A4A4A] leading-relaxed">{t.outcome}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── HONEST SIGNAL ── */}
              <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-3xl mx-auto">
                  <FadeIn>
                    <div className="rounded-2xl border-2 border-[#FFD700]/20 bg-[#FFF9E6] p-8 text-center">
                      <p className="eyebrow text-[#C8952E] mb-3">The Honest Signal</p>
                      <p className="text-base font-black text-[#1A1A1A] leading-snug mb-3">
                        That's either exciting or terrifying. Know which one you are before you join.
                      </p>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">
                        Most Fellows exit at Stage 3–4, absorbed by clients — solid careers with capabilities most professionals take a decade longer to develop. DT is young. "Ex-DT Fellow" doesn't yet carry the way a top-firm tag does. You'd be building that brand. <span className="font-bold text-[#1A1A1A]">You're buying early.</span>
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </section>
            </>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ──────────────── PERSISTENT CTA ──────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block rounded-2xl bg-gradient-to-r from-[#0033CC] to-[#001A4D] px-10 py-8">
              <p className="text-white/60 text-sm mb-2">The Fellowship gives you the exposure, the capabilities, and the altitude.</p>
              <p className="text-white text-lg font-black mb-2">The identity shift is yours to make.</p>
              <p className="text-[#FFD700] text-sm font-bold">Nobody can manifest it for you. But nobody can stop you either.</p>
            </div>
          </FadeIn>
          <div className="mt-8">
            <a href="/" className="btn-blue-outline inline-flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sciensation</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
