import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '@/src/components/ui/FadeIn';

const countryCodeMap: Record<string, string> = {
  'India': 'in',
  'USA': 'us',
  'England': 'gb',
  'Finland': 'fi',
  'Belgium': 'be',
  'Kenya': 'ke',
  'Spain': 'es',
  'Canada': 'ca',
};

function getFlagUrl(country: string) {
  const code = countryCodeMap[country] ?? 'un';
  return `https://flagcdn.com/20x15/${code}.png`;
}

/* ── 2A: Full 50-participant roster — photos first, then monograms ── */
const participants = [
  // Default visible (first 10) — all have photos
  { name: 'Raghu Seelamsetty', title: 'Founder, Escape Velocity', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/raghuseelamsetty.jpg' },
  { name: 'Nastaran Bisheban', title: 'CTO, KFC Canada', country: 'Canada', flag: '🇨🇦', year: 2021, image: '/images/jurors/nastaranbisheban.png' },
  { name: 'Dave Snowden', title: 'Founder & CSO, Cognitive Edge', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', year: 2021, image: '/images/jurors/davesnowden.png' },
  { name: 'Dr. Michael Lissack', title: 'President, American Society for Cybernetics', country: 'USA', flag: '🇺🇸', year: 2021, image: '/images/jurors/michaellissack.png' },
  { name: 'Abhinav Gupta', title: 'AVP Innovation, Broadridge', country: 'India', flag: '🇮🇳', year: 2023, image: '/images/jurors/abhinavgupta.png' },
  { name: 'Humberto Schwab', title: 'Founder, Socratic Design Academy', country: 'Spain', flag: '🇪🇸', year: 2020, image: '/images/jurors/HumbertoSchwab.png' },
  { name: 'Dr. Matti Itkonen', title: 'Cultural Philosopher, University of Jyväskylä', country: 'Finland', flag: '🇫🇮', year: 2021, image: '/images/jurors/MattiItkonen.png' },
  { name: 'Kashyap Kompella', title: 'Hyderabad Chair, StartupGrind', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/KashyapKompella.png' },
  { name: 'Jayesh Ranjan', title: 'IAS Officer, Govt of Telangana', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/jayeshranjan.png' },
  { name: 'Dr. David Willows', title: 'Director of Advancement, University of Brussels', country: 'Belgium', flag: '🇧🇪', year: 2021, image: '/images/jurors/davidwillows.png' },
  // Expanded — with photos
  { name: 'Javagal Srinath', title: 'Former Indian Fast Bowler', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/javagalsrinath.png' },
  { name: 'Nagesh Kukunoor', title: 'Film-Maker', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/nageshkukunoor.png' },
  { name: 'Pallam Raju', title: 'Former Minister, H.R.D.', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/pallamraju.png' },
  { name: 'Marri Adithya Reddy', title: 'Secretary, Telangana Pradesh Congress Committee', country: 'India', flag: '🇮🇳', year: 2018, image: '/images/jurors/other/marriadithyareddy.png' },
  { name: 'Dr. Suryesh Namdeo', title: 'Program Officer, DST, Govt of India', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/suryeshnamdeo.png' },
  { name: 'Dr. Alexandra Rogacheva', title: 'CoFounder, Simplarity', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', year: 2020, image: '/images/jurors/alexandrarogacheva.png' },
  { name: 'Dr. Lucas Nyabero', title: 'Founder, Elara Health', country: 'Kenya', flag: '🇰🇪', year: 2021, image: '/images/jurors/other/lucasnyabero.png' },
  { name: 'Sandeep Dikshit', title: 'Former MP, Govt of India', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/sandeepdikshit.png' },
  { name: 'Prithvi Chaitanya', title: 'Head, Corporate Innovation, Hexagon', country: 'India', flag: '🇮🇳', year: 2023, image: '/images/jurors/other/prithvichaitanya.png' },
  { name: 'Dr. Ritesh Khunyakari', title: 'Asst Professor, TISS Hyderabad', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/riteshkhunyakari.png' },
  { name: 'Hariharan Anand', title: 'Fractional CTO', country: 'India', flag: '🇮🇳', year: 2021, image: '/images/jurors/other/hariharananand.png' },
  { name: 'Gautam Seth', title: 'CTO, Thinkzy', country: 'India', flag: '🇮🇳', year: 2021, image: '/images/jurors/other/gautamseth.png' },
  { name: 'Sriram Karri', title: 'Editor, Deccan Chronicle', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/sriramkarri.png' },
  { name: 'Dr. Uma Joseph', title: 'HOD, St. Francis College', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/umajoseph.png' },
  { name: 'Sujiv Nair', title: 'CEO, TASK', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/sujivnair.png' },
  { name: 'Pallav Bajjuri', title: 'Founder, IPx', country: 'India', flag: '🇮🇳', year: 2018, image: '/images/jurors/other/pallavbajjuri.png' },
  { name: 'Raghu Kanchustambham', title: 'CEO, ConceptWaves', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/raghukanchustambham.png' },
  { name: 'Dr. Ramanjaneyulu G.V.', title: 'Executive Director, CSA', country: 'India', flag: '🇮🇳', year: 2015, image: '/images/jurors/ramanjaneyulugv.png' },
  { name: 'Vijay Vedantam', title: 'Secretary, Hyderabad Management Association', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/vijayvedantam.png' },
  { name: 'Dr. Chandrasekhar D.P.', title: 'CEO, JGI Schools', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/chandrasekhardp.png' },
  { name: 'K.P. Madhu', title: 'Science Media Production Expert', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/kpmadhu.png' },
  { name: 'Dr. Jayasree Subramanian', title: 'Associate Professor, TISS Hyderabad', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/jayasreesubramanian.png' },
  { name: 'Prof. Kumar Eswaran', title: 'Mathematician', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/kumareswaran.png' },
  { name: 'Dr. Soma Paul', title: 'Associate Professor, IIIT Hyderabad', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/somapaul.png' },
  { name: 'Prof. Susie Tharu', title: 'Professor, EFLU Hyderabad', country: 'India', flag: '🇮🇳', year: 2018, image: '/images/jurors/other/susietharu.png' },
  { name: 'Vijay Marur', title: 'Veteran Ad Film Maker', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/vijaymarur.png' },
  { name: 'Prof. Geeta Durairajan', title: 'Professor, EFLU Hyderabad', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/geetadurairajan.png' },
  { name: 'L. Ravichander', title: 'Designated Senior Counsel, AP & TS High Court', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/lravichander.png' },
  { name: 'Dr. Lavanya Suresh', title: 'Faculty, TISS Hyderabad', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/lavanyasuresh.png' },
  { name: 'John Hemanth Kumar', title: 'Educational Psychologist', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/johnhemanthkumar.png' },
  // Expanded — no photos
  { name: 'Dr. Vishnuprivya', title: 'Sr Scientist, CCMB', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/vishnupriya.png' },
  { name: 'Pramod Reddy', title: 'Lawyer', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/pramodreddy.png' },
  { name: 'Ashish Srivastava', title: 'Founder, Shiksharth', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/ashishsrivastava.png' },
  { name: 'S.G. Srinivas', title: 'Scientific Motivator', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/sgsrinivas.png' },
  { name: 'Prof. Karanam Pushpanadham', title: 'Professor, M.S. University of Baroda', country: 'India', flag: '🇮🇳', year: 2020, image: '/images/jurors/other/karanampushpanadham.png' },
  { name: 'Karthi Subbaraman', title: 'Founder, Oghma Design', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/karthisubbaraman.png' },
  { name: 'Pramod Ponnaluri', title: 'Founder, Kitki', country: 'India', flag: '🇮🇳', year: 2015, image: '/images/jurors/other/pramodponnaluri.png' },
  { name: 'Pranith Simha', title: 'Founder, Bachpan Banao', country: 'India', flag: '🇮🇳', year: 2016, image: '/images/jurors/other/pranithsimha.png' },
  { name: 'Deepa Kiran', title: 'Storyteller', country: 'India', flag: '🇮🇳', year: 2017, image: '/images/jurors/other/deepakiran.png' },
  { name: 'Kalpana Ramesh', title: 'Founder, SAHE', country: 'India', flag: '🇮🇳', year: 2018, image: '/images/jurors/other/kalpanaramesh.png' },
];

/* ── 2C: Theme chips with hover subtitles ── */
const themes: { label: string; subtitle: string }[] = [
  { label: 'Competitive Strategy', subtitle: 'Porter, Wardley, positioning' },
  { label: 'Deep Tech & Innovation', subtitle: 'Innovation roadmaps, TRL, R&D strategy' },
  { label: 'MVP Design', subtitle: 'Lean Canvas, business model validation' },
  { label: 'Market Focus', subtitle: 'Specialization, niche, segment selection' },
  { label: 'CTO Leadership', subtitle: 'Technical strategy, build vs buy' },
  { label: 'Risk-Taking & Family Business', subtitle: 'Growth appetite, succession, capital allocation' },
  { label: 'Cash Flow', subtitle: 'Monetary systems, working capital, margins' },
  { label: 'Outsourcing vs In-House', subtitle: 'Capability sourcing, make-or-buy' },
  { label: 'Trade & Supply Chains', subtitle: 'Export, logistics, supply chain design' },
  { label: 'Institutional Design', subtitle: 'Governance, org structure, policy' },
  { label: 'BizTech Model Design', subtitle: 'Technology-business model integration' },
  { label: 'Scientific Thinking', subtitle: 'Philosophy of science, first principles' },
];

const tabs = [
  { id: 'participants', label: 'Participants', sub: '50 across 6 countries' },
  { id: 'story', label: 'The Story', sub: '2011 → 2026' },
  { id: 'themes', label: 'Themes', sub: '30+ questionnaires' },
];

function getInitials(name: string) {
  const parts = name.replace(/^Dr\.\s*/i, '').replace(/^Prof\.\s*/i, '').split(' ');
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '');
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setValue(Math.round(t * target));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ── 2A: Circular participant portrait with photo (light) ── */
const ParticipantCircle = ({ person, index }: { person: typeof participants[0]; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = 'image' in person && (person as any).image && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index >= 10 ? (index - 10) * 0.05 : 0 }}
      className="flex flex-col items-center text-center w-[120px] group"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-[#0033CC]/15 group-hover:border-[#0033CC]/40 group-hover:shadow-[0_0_16px_rgba(0,51,204,0.15)] transition-all duration-300 bg-[#0033CC]/10 flex items-center justify-center">
        {hasImage ? (
          <img
            src={(person as any).image}
            alt={person.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-lg font-mono font-bold text-[#0033CC]/50 group-hover:text-[#0033CC]/80 transition-colors">
            {getInitials(person.name)}
          </span>
        )}
      </div>
      <p className="text-[11px] font-bold text-[#1A1A1A] leading-tight">{person.name}</p>
      <p className="text-[9px] text-[#4A4A4A] mt-0.5 leading-tight">{person.title}</p>
      <span className="mt-1 flex items-center gap-0.5 text-xs" title={person.country}>
        <img src={getFlagUrl(person.country)} alt={person.country} width={20} height={15} className="rounded-[2px]" />
      </span>
      <span className="mt-0.5 text-[9px] font-mono text-[#0033CC]/50">{person.year}</span>
    </motion.div>
  );
};

/* ── 2B: Heritage typographic treatment (light) ── */
const HeritageTypographic = () => (
  <div className="mb-8">
    <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 py-6">
      <div className="text-right">
        <div className="text-lg sm:text-xl font-light tracking-wide text-[#8A8A8A] uppercase">
          School Children
        </div>
        <div className="text-[11px] text-[#8A8A8A]/70 mt-1">discussing Lean Startup</div>
        <div className="text-[10px] font-mono text-[#8A8A8A]/50 mt-0.5">(2011)</div>
      </div>

      <div className="flex-1 max-w-[200px] flex items-center">
        <svg viewBox="0 0 200 20" className="w-full h-5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="arrow-grad-light" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,51,204,0.15)" />
              <stop offset="100%" stopColor="rgba(0,51,204,0.6)" />
            </linearGradient>
          </defs>
          <polygon points="0,9 180,7 180,4 200,10 180,16 180,13 0,11" fill="url(#arrow-grad-light)" />
        </svg>
      </div>

      <div className="text-left">
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase">
          CXOs
        </div>
        <div className="text-[11px] text-[#4A4A4A] mt-1">working revenue KPIs</div>
        <div className="text-[10px] font-mono text-[#0033CC] mt-0.5">(2026)</div>
      </div>
    </div>

    <div className="max-w-2xl">
      <div className="rounded-2xl border border-[#E8E4E0] bg-white p-8">
        <p className="text-base text-[#4A4A4A] leading-relaxed mb-5">
          School children on stage discussing Eric Ries' Lean Startup, Business Model Design,
          and concepts usually reserved for CXOs. Discussing AI and Deep Tech since 2014 — before
          it was mainstream. That was Sciensation's vision: see school kids as future CXOs.
        </p>
        <p className="text-base text-[#4A4A4A] leading-relaxed">
          The organisation evolved into a Management Consulting firm in 2024 and a Scientific Execution
          AI Platform in 2026 — helping businesses sustain growth at 25–30% CAGR. The Socratic method
          stayed the same. The audience grew up.
        </p>
      </div>
    </div>
  </div>
);

/* ── 2C: Theme chip with hover subtitle (light) ── */
const ThemeChip = ({ theme }: { theme: typeof themes[0] }) => (
  <span className="group relative px-4 py-2 rounded-xl bg-white border border-[#E8E4E0] text-sm font-semibold text-[#4A4A4A] hover:text-[#0033CC] hover:border-[#0033CC]/30 hover:shadow-[0_2px_8px_rgba(0,51,204,0.08)] transition-all duration-300 cursor-default">
    {theme.label}
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono text-[#0033CC]/70 whitespace-nowrap pointer-events-none z-10">
      {theme.subtitle}
    </span>
  </span>
);

export const Heritage = () => {
  const [activeTab, setActiveTab] = useState('participants');
  const [showAll, setShowAll] = useState(false);

  const visibleParticipants = showAll ? participants : participants.slice(0, 10);

  return (
    <section id="heritage" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF8F5]">
      {/* subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,51,204,0.04) 1px, transparent 1px), radial-gradient(circle, rgba(0,51,204,0.04) 1px, transparent 1px)', backgroundSize: '28px 48px', backgroundPosition: '0 0, 14px 24px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="eyebrow text-[#0033CC] mb-2">Heritage</div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A]">
              Who's been in <span className="text-[#0033CC]">this room</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-[#8A8A8A] flex flex-wrap gap-4 items-center">
            <span><CountUp target={200} suffix="+" /> dialogues</span>
            <span className="text-[#E8E4E0]">|</span>
            <span><CountUp target={15} /> years</span>
            <span className="text-[#E8E4E0]">|</span>
            <span><CountUp target={6} /> countries</span>
          </div>
        </FadeIn>

        {/* Tab navigation */}
        <div className="flex gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative text-left py-3 px-5 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0033CC] text-white shadow-lg shadow-[#0033CC]/20'
                  : 'text-[#8A8A8A] hover:text-[#4A4A4A] hover:bg-[#0033CC]/[0.04]'
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest mb-0.5">
                {tab.label}
              </div>
              <div className={`text-[9px] font-bold uppercase tracking-widest transition-opacity ${
                activeTab === tab.id ? 'text-white/70' : 'opacity-50'
              }`}>
                {tab.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'participants' && (
            <motion.div
              key="participants"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
                {visibleParticipants.map((person, i) => (
                  <ParticipantCircle key={person.name} person={person} index={i} />
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0033CC]/70 hover:text-[#0033CC] transition-colors cursor-pointer"
                >
                  {showAll ? '← Show featured 10' : `Explore all ${participants.length} participants →`}
                </button>
              </div>
              <p className="mt-6 text-center text-[10px] font-mono text-[#8A8A8A]/60 italic">
                Designations are as on the date when the participant attended the dialogue.
              </p>
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <HeritageTypographic />
            </motion.div>
          )}

          {activeTab === 'themes' && (
            <motion.div
              key="themes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                {themes.map((theme) => (
                  <ThemeChip key={theme.label} theme={theme} />
                ))}
              </div>
              <a href="#" className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0033CC]/70 hover:text-[#0033CC] transition-colors">
                Browse 30+ questionnaires →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
