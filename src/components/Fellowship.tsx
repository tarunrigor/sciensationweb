import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Zap, Brain, TrendingUp, Layers, Target, Users, Briefcase, Rocket, Crown, Building2, LineChart, GraduationCap, Lightbulb, Eye, DollarSign, Code, BarChart3, ClipboardList, Wrench } from 'lucide-react';
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
        className="card-lift w-full text-left rounded-2xl border border-[#E8E4E0] bg-white p-8 cursor-pointer transition-all"
      >
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: lens.bg }}>
            <Icon className="w-6 h-6" style={{ color: lens.color }} />
          </div>
          <ChevronDown className={`w-5 h-5 text-[#8A8A8A] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
        <p className="eyebrow mb-2" style={{ color: lens.color }}>{lens.label} Lens</p>
        <p className="text-lg font-bold text-[#1A1A1A] mb-3 leading-snug">{lens.summary}</p>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4 pt-2">{lens.detail}</p>
              <div className="rounded-lg p-4" style={{ backgroundColor: lens.bg + '80' }}>
                <p className="text-sm italic" style={{ color: lens.color }}>Without it: {lens.failure}</p>
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
      <div className="card-lift rounded-2xl border border-[#E8E4E0] bg-white p-7 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: cap.color + '15' }}>
            <Icon className="w-5 h-5" style={{ color: cap.color }} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest font-mono" style={{ color: cap.color }}>{cap.emphasis}</span>
        </div>
        <h3 className="text-lg font-black text-[#1A1A1A] mb-3">{cap.title}</h3>
        <p className="text-sm text-[#4A4A4A] leading-relaxed">{cap.desc}</p>
      </div>
    </FadeIn>
  );
}

function StageRow({ s, index }: { s: Stage; index: number }) {
  return (
    <FadeIn delay={index * 80}>
      <div className="flex items-stretch gap-4 md:gap-6 group">
        {/* Timeline spine */}
        <div className="flex flex-col items-center w-12 shrink-0">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black font-mono text-white shrink-0" style={{ borderColor: s.color, backgroundColor: s.color }}>
            {s.stage}
          </div>
          <div className="w-px flex-1 bg-[#E8E4E0] group-last:hidden" />
        </div>
        {/* Card */}
        <div className="card-lift flex-1 rounded-xl border border-[#E8E4E0] bg-white p-5 md:p-6 mb-4">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h4 className="text-base font-black text-[#1A1A1A]">{s.title}</h4>
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: s.color + '15', color: s.color }}>{s.pillar}</span>
          </div>
          <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">{s.desc}</p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <span className="text-[#2D6A4F] font-bold">DT pays {s.pay}</span>
            {s.billed && <span className="text-[#8A8A8A]">Client billed {s.billed}</span>}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ExitCard({ exit, index }: { exit: Exit; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = exit.icon;
  return (
    <FadeIn delay={index * 60}>
      <button
        onClick={() => setOpen(!open)}
        className="card-lift w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 cursor-pointer transition-all hover:border-[#FFD700]/30"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#FFD700]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-black text-white leading-snug">{exit.title}</h4>
            <p className="text-xs text-white/40 mt-1 truncate">{exit.where}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/30 shrink-0 transition-transform duration-300 mt-1 ${open ? 'rotate-180' : ''}`} />
        </div>
        <div className="flex flex-wrap gap-3 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#FFD700]/80 bg-[#FFD700]/10 px-2.5 py-1 rounded-full">{exit.unlocks}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#2D6A4F] bg-[#2D6A4F]/15 px-2.5 py-1 rounded-full">{exit.comp}</span>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/60 leading-relaxed mb-3 pt-1">{exit.why}</p>
              <p className="text-xs text-white/30 font-mono">Leads to → <span className="text-white/50">{exit.leads}</span></p>
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
  const [activeWeekTab, setActiveWeekTab] = useState<'weekday' | 'saturday'>('weekday');

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A]">
      <Navbar />

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative pt-32 pb-28 md:pt-44 md:pb-40 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(0,51,204,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)' }} />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="hero-eyebrow eyebrow text-[#FFD700]/70 mb-6">DT FDE Fellowship</p>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            What You're Joining.<br />
            <span className="text-[#FFD700]">What You Become.</span>
          </h1>
          <p className="hero-sub text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            Read this before you decide. Read this again after you've been here 6 months.
          </p>
          <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
            <a href="#the-gap" className="btn-yellow !py-3 !px-8 gap-2">
              <span>Begin Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a href="#exits" className="btn-blue-outline !border-white/20 !text-white/60 hover:!bg-white/10 hover:!text-white hover:!border-white/40">
              Skip to Exit Doors
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────── THE GAP ──────────────── */}
      <section id="the-gap" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">The Gap in India's Economy</p>
          </FadeIn>
          <FadeIn delay={80}>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-8">
              India has <span className="text-[#0033CC]">63 million</span> MSMEs.<br className="hidden md:block" />
              No institution produces the person they need.
            </h2>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-3xl mb-12">
              The ones between ₹100-500 Cr revenue are at the most critical inflection. Large enough that operational improvements move crores on the P&L, small enough that the founder is still the decision-maker. They need to digitize, systematize, and professionalize, and they need people who can do all three simultaneously.
            </p>
          </FadeIn>

          {/* Failure modes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { inst: 'IITs', produce: 'Engineers who can build systems', miss: 'but can\'t read a P&L' },
              { inst: 'IIMs', produce: 'Managers who can read a P&L', miss: 'but can\'t build systems' },
              { inst: 'IT Services', produce: 'Executors who follow specs', miss: 'written by someone else' },
              { inst: 'Consulting', produce: 'Strategists who design brilliantly', miss: 'that nobody implements' },
            ].map((item, i) => (
              <FadeIn key={item.inst} delay={200 + i * 80}>
                <div className="rounded-xl border border-[#E8E4E0] bg-white p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">{item.inst}</span>
                  <p className="text-sm text-[#1A1A1A] mt-2 font-semibold">{item.produce}</p>
                  <p className="text-sm text-[#C8952E] font-bold mt-1">{item.miss}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500}>
            <div className="rounded-2xl bg-gradient-to-r from-[#0033CC] to-[#001A4D] p-8 md:p-10 text-white">
              <p className="text-lg md:text-xl font-bold leading-relaxed">
                The person who walks into a ₹200 Cr manufacturer, reads their P&L, spots where ₹80L is trapped in a broken process, designs a system intervention that fixes the root cause, deploys it, and drives adoption across the organization.
              </p>
              <p className="text-2xl md:text-3xl font-black mt-4 text-[#FFD700]">
                That person does not come out of any existing pipeline.
              </p>
              <p className="text-base text-white/60 mt-4">DT builds that person. That's the Fellowship.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── WHAT A WEEK LOOKS LIKE ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">Your Week</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              What a week looks like
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mb-10">
              You're still in college. Your degree is intact. Placement season is still yours. And while your evenings build real capability, your weekends build judgment.
            </p>
          </FadeIn>

          {/* Tab buttons */}
          <FadeIn delay={100}>
            <div className="flex gap-3 mb-8">
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
              <motion.div
                key="weekday"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-2xl border border-[#E8E4E0] bg-[#FAF8F5] p-8 md:p-10">
                  <p className="text-sm font-bold text-[#0033CC] uppercase tracking-wider font-mono mb-4">Client Engagement · ₹100-500 Cr Manufacturer</p>
                  <p className="text-base text-[#4A4A4A] mb-6 leading-relaxed">
                    You're embedded in a live client engagement. The MD, the founder, the person who built this company, is your stakeholder. Not a team lead. Not a middle manager. <span className="font-bold text-[#1A1A1A]">The founder.</span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { text: 'Looking at order-to-cash data, finding where ₹80L is trapped in a 45-day cycle that should be 22 days', icon: '📊' },
                      { text: 'Deploying a PDGMS module that makes performance management diagnostic instead of just a scorecard', icon: '⚙️' },
                      { text: 'The MD asks you: "what should we do about this?"', icon: '💬' },
                      { text: 'Pushing adoption with floor managers who\'ve done things the same way for 15 years', icon: '🔄' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border border-[#E8E4E0]">
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="saturday"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-4">
                  {[
                    { title: 'LDI: Leadership Development Initiative', desc: 'Your professional identity gets built here. How you see yourself, describe your work, carry yourself in a room with a CEO. The identity architecture that turns a 20-year-old into someone who belongs in a board meeting.', color: '#7B1E3A', icon: Crown },
                    { title: 'Socratic Dialogue', desc: 'You hold a position. Defend it under questioning. Revise when evidence demands it, not when pressure demands it. You develop the skill of thinking on your feet with precision, on your own live projects, with real stakes.', color: '#0033CC', icon: Brain },
                    { title: 'PM Hands-On (AI-Native)', desc: 'Your actual current project. Work Breakdown Structure, pre-mortem analysis, risk mapping, activity sequencing. Not a case study. Your project. You learn program management by managing your program.', color: '#2D6A4F', icon: Target },
                  ].map((session, i) => {
                    const Icon = session.icon;
                    return (
                      <div key={session.title} className="card-lift rounded-2xl border border-[#E8E4E0] bg-[#FAF8F5] p-7 flex gap-5 items-start">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: session.color + '12' }}>
                          <Icon className="w-5 h-5" style={{ color: session.color }} />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-[#1A1A1A] mb-2">{session.title}</h4>
                          <p className="text-sm text-[#4A4A4A] leading-relaxed">{session.desc}</p>
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

      {/* ──────────────── THREE LENSES ──────────────── */}
      <section className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">How You Learn to See</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              Three lenses. <span className="text-[#0033CC]">Held simultaneously.</span>
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-3xl mb-12">
              Most professionals see the world through one lens. Engineers see systems. Consultants see strategy. Managers see processes. Each reveals something, and each hides everything else. DT trains you to hold all three at once.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {LENSES.map((lens, i) => <LensCard key={lens.label} lens={lens} index={i} />)}
          </div>

          <FadeIn delay={400}>
            <div className="rounded-2xl border border-[#E8E4E0] bg-white p-8">
              <p className="text-sm text-[#8A8A8A] font-mono uppercase tracking-wider mb-3">The DT Fellow Profile</p>
              <p className="text-base md:text-lg text-[#1A1A1A] leading-relaxed font-medium">
                Walks into a 200 Cr manufacturer, reads the P&L, spots a cultural problem showing up as performance variance, designs a PMS intervention that addresses the root cause, deploys it on PDGMS, and drives adoption through the floor managers who resisted every change for 15 years. <span className="font-black text-[#0033CC]">One person. All three lenses.</span>
              </p>
              <p className="text-sm text-[#8A8A8A] mt-4">No institution in India teaches three simultaneously, on live projects, at 20. DT does.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── FOUR CAPABILITIES ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">What Emerges</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              Four capabilities that compound
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-3xl mb-12">
              The Indian economy needs people with all four. Every institution produces one, maybe two. DT develops all four simultaneously.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {CAPABILITIES.map((cap, i) => <CapabilityCard key={cap.title} cap={cap} index={i} />)}
          </div>

          <FadeIn delay={450}>
            <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E4E0] p-6 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#0033CC]/10 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#0033CC]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#1A1A1A] mb-1">The structural rarity</p>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  By Stage 3, you have functional capability across all four. By Stage 6, you have mastery. That combination is what makes this profile valuable to the market, and it's why the roles this profile fills are consistently <span className="font-bold text-[#0033CC]">supply-constrained</span>.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── WHO YOU BECOME ──────────────── */}
      <section className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        {/* Hex grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 48px, 28px 48px',
          backgroundPosition: '0 0, 14px 24px',
        }} />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#FFD700]/70 mb-6">The DT Fellow Identity</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Who you <span className="text-[#FFD700]">become</span>
            </h2>
            <p className="text-base text-white/40 max-w-2xl mb-14">
              Not for your resume. For how you see yourself.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {[
              { title: 'You operate at consulting-grade intensity.', desc: 'The same quality of thinking top consulting firms demand, you deliver, but with the advantage of building real systems, not just recommending them. Strategy AND execution in the same person.', check: '"This month I delivered [specific output] that moved [specific client metric]. The intervention is live and producing results."' },
              { title: 'You work at founder altitude.', desc: 'Founder-direct conversations. EBITDA-level decisions. Systems-level exposure. At 20, you\'re in rooms where business strategy gets made, because MSMEs need this profile at the table.', check: '"This month I had [X] direct conversations with the MD where [specific decision] was shaped by my analysis."' },
              { title: 'Your profile fills a structural gap.', desc: 'Engineering + commercial fluency + systems thinking + MSME-native operation. CXOs who\'ve done transformation work recognize this profile instantly, because they\'ve tried to hire it and couldn\'t find it.', check: '"When I described my work to [CXO/founder], they recognized the profile because they\'ve been looking for exactly this combination."' },
              { title: 'You understand code faster because you know WHY it exists.', desc: 'Business context IS the shortcut to architectural thinking. You reach systems-level architectural thinking faster because you have the map that pure-tech paths don\'t provide.', check: '"This month I designed [specific architecture] because I understood what the business needed, not just what the spec said."' },
              { title: 'Your path stacks capabilities. It doesn\'t replace them.', desc: 'Stage 3 masters tech. Stage 4 adds PM on top. Stage 5 adds commercial. Stage 6 adds systems design. Nothing atrophies because each stage keeps prior capabilities active.', check: null },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-7 md:p-8">
                  <h3 className="text-lg md:text-xl font-black text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.desc}</p>
                  {item.check && (
                    <div className="rounded-lg bg-[#FFD700]/[0.06] border border-[#FFD700]/10 px-5 py-3">
                      <p className="text-xs text-[#FFD700]/70 font-mono leading-relaxed">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#FFD700]/40 mr-2">Monthly check:</span>
                        {item.check}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CAREER SPINE ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">Career Architecture</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              Stages 1 to 6
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mb-6">
              Each stage builds a harder capability on top of the ones you've already mastered. That's a 12–15 year arc of genuine capability building, not title inflation.
            </p>
          </FadeIn>

          {/* Incubation */}
          <FadeIn delay={100}>
            <div className="flex items-center gap-3 mb-6 mt-10">
              <GraduationCap className="w-5 h-5 text-[#8A8A8A]" />
              <span className="text-xs font-black uppercase tracking-widest font-mono text-[#8A8A8A]">Incubation: Where You Start</span>
            </div>
          </FadeIn>
          <div className="ml-0">
            {INCUBATION_STAGES.map((s, i) => <StageRow key={s.stage} s={s} index={i} />)}
          </div>

          {/* Student track note */}
          <FadeIn delay={200}>
            <div className="ml-16 md:ml-[4.5rem] rounded-lg bg-[#E4ECF9] border border-[#0033CC]/10 p-4 mb-8 text-sm text-[#0033CC]">
              <span className="font-bold">Student track total:</span> 18 months of real client experience by graduation.
            </div>
          </FadeIn>

          {/* Career */}
          <FadeIn delay={250}>
            <div className="flex items-center gap-3 mb-6 mt-8">
              <Rocket className="w-5 h-5 text-[#0033CC]" />
              <span className="text-xs font-black uppercase tracking-widest font-mono text-[#0033CC]">Career: Where Value Compounds</span>
            </div>
          </FadeIn>
          <div className="ml-0">
            {CAREER_STAGES.map((s, i) => <StageRow key={s.stage} s={s} index={i + 2} />)}
          </div>

          {/* Leapfrog callout */}
          <FadeIn delay={400}>
            <div className="ml-16 md:ml-[4.5rem] mt-4 rounded-2xl border-2 border-dashed border-[#FFD700]/40 bg-[#FFF9E6] p-6">
              <p className="text-xs font-black uppercase tracking-widest font-mono text-[#C8952E] mb-2">The Leapfrog</p>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-3">
                Exceptional Stage 2 Fellows can skip Stage 3 entirely and go directly to Stage 4. Published criteria, meritocratic, not manager-discretion.
              </p>
              <div className="flex flex-wrap gap-2">
                {['PM mastery', 'Commercial acumen', 'Stakeholder management', 'Tech sufficiency', 'Opening exists'].map((c) => (
                  <span key={c} className="text-[10px] font-bold font-mono uppercase tracking-wider bg-[#C8952E]/10 text-[#C8952E] px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Parallel track */}
          <FadeIn delay={450}>
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-5 h-5 text-[#7B1E3A]" />
                <span className="text-xs font-black uppercase tracking-widest font-mono text-[#7B1E3A]">Parallel Track: Systems Designer</span>
              </div>
              <p className="text-sm text-[#4A4A4A] mb-5">Not everyone wants to manage people. The IC-depth track for architecture, data pipelines, and system design.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { level: 'Systems Designer', pay: '₹15–25 LPA', entry: '1–2 yr' },
                  { level: 'Senior', pay: '₹25–40 LPA', entry: '4–6 yr' },
                  { level: 'Principal', pay: '₹40–70 LPA', entry: '8+ yr' },
                  { level: 'Distinguished', pay: '₹70 LPA+', entry: '10+ yr' },
                ].map((l) => (
                  <div key={l.level} className="rounded-xl border border-[#E8E4E0] bg-white p-4 text-center">
                    <p className="text-xs font-black text-[#7B1E3A] mb-1">{l.level}</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{l.pay}</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono mt-1">{l.entry}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#8A8A8A] mt-4">Cross-track mobility is open. Life changes. Preferences evolve. The system accommodates that.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── WHERE YOU ENTER ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">Entry Points</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              Where you enter
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-3xl mb-12">
              Entry is capability-assessed, not calendar-assessed. Years of experience determine the default. Demonstrated capability can shift it, up or down.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {ENTRY_POINTS.map((ep, i) => (
              <FadeIn key={ep.label} delay={i * 80}>
                <div className={`card-lift rounded-2xl border p-6 h-full ${ep.highlight ? 'border-[#0033CC]/30 bg-[#E4ECF9]/40' : 'border-[#E8E4E0] bg-[#FAF8F5]'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${ep.highlight ? 'text-[#0033CC]' : 'text-[#8A8A8A]'}`}>{ep.label}</span>
                  <p className="text-lg font-black text-[#1A1A1A] mt-2 mb-1">{ep.stage}</p>
                  <p className="text-xs text-[#8A8A8A] font-mono mb-3">{ep.mode}</p>
                  <p className="text-sm text-[#4A4A4A] mb-2">{ep.path}</p>
                  <p className="text-xs text-[#0033CC] font-semibold">{ep.incubation}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Two axes */}
          <FadeIn delay={500}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#E8E4E0] bg-[#FAF8F5] p-7">
                <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#0033CC]">Axis 1: Pillar Development</span>
                <p className="text-sm text-[#4A4A4A] mt-3 leading-relaxed">
                  Which of the four capabilities have you actually built? Tech execution? PM coordination? Commercial framing? Systems thinking? <span className="font-bold text-[#1A1A1A]">This determines your stage.</span>
                </p>
              </div>
              <div className="rounded-2xl border border-[#E8E4E0] bg-[#FAF8F5] p-7">
                <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#7B1E3A]">Axis 2: Operating Mode</span>
                <p className="text-sm text-[#4A4A4A] mt-3 leading-relaxed">
                  Do you frame as "I built X to solve Y for Z" or "I coordinated delivery"? <span className="font-bold text-[#1A1A1A]">Builder mindset vs. compliance mindset determines if you'll thrive.</span>
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <p className="text-center text-sm text-[#4A4A4A] mt-8 max-w-xl mx-auto leading-relaxed">
              <span className="font-bold text-[#1A1A1A]">Lower pillars but builder mindset = land lower, accelerate faster.</span> The mindset is the harder thing. If you already have it, DT builds everything else.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── EXIT DOORS ──────────────── */}
      <section id="exits" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#FFD700]/70 mb-6">Exit Doors</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              10 doors. <span className="text-[#FFD700]">All real.</span>
            </h2>
            <p className="text-base text-white/40 max-w-2xl mb-14">
              These are not hypothetical career paths. Real roles. Real compensation ranges. Real companies. Each one maps to specific DT capabilities. Each one unlocks at a specific stage.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXIT_DOORS.map((exit, i) => <ExitCard key={exit.title} exit={exit} index={i} />)}
          </div>

          <FadeIn delay={700}>
            <div className="mt-14 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8">
              <p className="text-sm font-black text-[#FFD700] uppercase tracking-wider font-mono mb-4">Where the Profile Has the Most Leverage</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { where: 'Founder-led companies (₹100–2000 Cr)', why: 'No buffer layers. Your full capability stack gets used.' },
                  { where: 'AI startups (Series A–C)', why: 'FDE roles are the exact DT profile. Supply-constrained globally.' },
                  { where: 'PE/VC operating teams', why: 'EBITDA improvement at scale. The jump is breadth, not new skills.' },
                  { where: 'Digital consulting practices', why: 'Top-tier digital practices specifically seek multi-stack candidates.' },
                ].map((item) => (
                  <div key={item.where} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">{item.where}</p>
                      <p className="text-xs text-white/40">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/30 mt-6 font-mono">The clean rule: Go where the founder or decision-maker is in the room.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── REAL TRAJECTORIES ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">Proof</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-4">
              Real trajectories
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mb-12">
              Real people. Real numbers. Real timelines.
            </p>
          </FadeIn>

          <div className="space-y-5">
            {TRAJECTORIES.map((t, i) => (
              <FadeIn key={t.name} delay={i * 120}>
                <div className="card-lift rounded-2xl border border-[#E8E4E0] bg-white p-7 flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0033CC] to-[#001A4D] flex items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-white">{t.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h4 className="text-lg font-black text-[#1A1A1A]">{t.name}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#0033CC] bg-[#E4ECF9] px-2.5 py-0.5 rounded-full">{t.tag}</span>
                    </div>
                    <p className="text-xs font-mono text-[#8A8A8A] mb-2">{t.path}</p>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{t.outcome}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <p className="text-center text-sm text-[#8A8A8A] mt-10">
              DT has 3 documented trajectories today. The list is growing. <span className="font-bold text-[#1A1A1A]">You'd be in the cohort that builds the next set.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── THE HONEST SIGNAL ──────────────── */}
      <section className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 48px, 28px 48px',
          backgroundPosition: '0 0, 14px 24px',
        }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="eyebrow text-[#FFD700]/70 mb-6">The Honest Signal</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
              Read this section last.<br />
              <span className="text-[#FFD700]">It's the most important.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="text-left space-y-6">
              <p className="text-base text-white/60 leading-relaxed">
                Most Fellows will exit at Stage 3 or Stage 4. Absorbed by a client. Solid career, a profile that fills a real gap in the economy, with capabilities most professionals take a decade longer to develop. <span className="text-white font-semibold">That is a valid and valuable outcome.</span>
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                Few will reach Stage 5 or Stage 6. Engagement Manager. Program Director. The full ladder.
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                The proof points are real, but early. Three people have demonstrated the middle stages. One has walked closer to the full path. You'd be in the early cohorts testing whether the map matches the territory.
              </p>

              <div className="rounded-2xl border border-[#FFD700]/20 bg-[#FFD700]/[0.04] p-7 mt-8">
                <p className="text-lg font-black text-[#FFD700] leading-snug mb-4">
                  That's either exciting or terrifying. Know which one you are before you join.
                </p>
                <p className="text-sm text-white/50 leading-relaxed">
                  DT is a young company. "Ex-DT Fellow" doesn't yet carry the way a top-firm alumni tag does. You'd be in the early cohorts building that brand. Five years from now, when DT has 50 alumni at AI startups, consulting firms, and founding teams, the credential compounds. <span className="text-white/80 font-semibold">You're buying early.</span>
                </p>
              </div>

              <p className="text-sm text-white/40 text-center mt-6">
                The map exists. The territory is being explored. The first explorers get the most altitude and the most risk.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── CLOSING.WHO YOU'RE BECOMING ──────────────── */}
      <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="eyebrow text-[#0033CC] mb-6">A Note on Who You're Becoming</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-8">
              You're 20 years old. You're sitting in meetings with founders who built ₹200 Cr businesses.
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">
              You're reading P&Ls. Designing systems. Driving change. Learning to see through three lenses that most professionals never develop even one of.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">
              Every CEO in India started somewhere. Most of them did NOT start with the combination of capabilities you are building right now. They built commercial sense over 10 years. They learned systems thinking through trial and error. They never got formal training in any of it.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg md:text-xl font-bold text-[#1A1A1A] leading-snug mb-6">
              The question is not whether this profile is valuable.the market is already telling you it is.
            </p>
          </FadeIn>
          <FadeIn delay={500}>
            <p className="text-lg md:text-xl font-bold text-[#0033CC] leading-snug mb-8">
              The question is whether you'll step into the identity. Whether you'll see yourself as someone who belongs at founder altitude, not because you were born into it, but because you're building the capability that earns it.
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <div className="inline-block rounded-2xl bg-gradient-to-r from-[#0033CC] to-[#001A4D] px-10 py-8 text-center">
              <p className="text-white/60 text-sm mb-2">The Fellowship gives you the exposure, the capabilities, and the altitude.</p>
              <p className="text-white text-lg font-black mb-2">The identity shift is yours to make.</p>
              <p className="text-[#FFD700] text-sm font-bold">Nobody can manifest it for you. But nobody can stop you either.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ──────────────── BACK NAV ──────────────── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          <a href="/" className="btn-blue-outline inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sciensation</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
