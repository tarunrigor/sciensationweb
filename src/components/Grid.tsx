import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ── Grid data ── */
const H_LABELS = ['Offers', 'Capability', 'Capacity', 'Experience', 'Orders'] as const;
const H_NUMS = ['H5', 'H4', 'H3', 'H2', 'H1'] as const;
const H_INTERNAL = ['H1', 'H2', 'H3', 'H4', 'H5'] as const;
const V_LABELS = ['V5 Direction', 'V4 Strategy', 'V3 Plan', 'V2 Supervisor', 'V1 Employee'] as const;

type CellKey = `${string}×${string}`;

const cellDescriptions: Record<CellKey, { coord: string; desc: string }> = {
  'V5×H1': { coord: 'Direction × Offers', desc: 'The board decides what to offer the market. Which segments to enter, which bets to place, which products to build or kill.' },
  'V4×H1': { coord: 'Strategy × Offers', desc: 'Strategy translates direction into market moves. Pricing, positioning, competitive response.' },
  'V3×H1': { coord: 'Plan × Offers', desc: 'The program manager plans the go-to-market. Launch timelines, campaign specs, channel priorities.' },
  'V2×H1': { coord: 'Supervisor × Offers', desc: 'The supervisor manages the team doing market research, customer interviews, competitive analysis.' },
  'V1×H1': { coord: 'Employee × Offers', desc: 'The employee does the research, talks to customers, drafts the offer documents.' },
  'V5×H2': { coord: 'Direction × Capability', desc: 'The board sets the capability agenda. What skills, R&D investments, and knowledge does the company need?' },
  'V4×H2': { coord: 'Strategy × Capability', desc: 'Strategy designs the capability roadmap. Which technologies, processes, and people to develop.' },
  'V3×H2': { coord: 'Plan × Capability', desc: 'The program manager runs R&D and training programs. Investigate, hypothesise, experiment, standardise.' },
  'V2×H2': { coord: 'Supervisor × Capability', desc: 'The supervisor manages engineers, trainers, R&D teams. Root cause analysis, process experiments, quality checks.' },
  'V1×H2': { coord: 'Employee × Capability', desc: 'The employee builds — prototyping, testing, learning, documenting.' },
  'V5×H3': { coord: 'Direction × Capacity', desc: 'The board decides the scale at which the company operates. Production philosophy, plant investments, make-or-buy.' },
  'V4×H3': { coord: 'Strategy × Capacity', desc: 'Strategy plans infrastructure and production. Build vs buy, capacity planning, supply chain design.' },
  'V3×H3': { coord: 'Plan × Capacity', desc: 'The program manager plans production schedules and delivery timelines. Work breakdown, resource allocation, bottleneck navigation.' },
  'V2×H3': { coord: 'Supervisor × Capacity', desc: 'The supervisor manages the floor — production, logistics, throughput, daily delivery targets.' },
  'V1×H3': { coord: 'Employee × Capacity', desc: 'The employee does the work — manufacturing, shipping, coding, delivering.' },
  'V5×H4': { coord: 'Direction × Experience', desc: 'The board defines what the customer experience should feel like. The promise the company makes.' },
  'V4×H4': { coord: 'Strategy × Experience', desc: 'Strategy designs the service and fulfillment model. Channels, support tiers, satisfaction benchmarks.' },
  'V3×H4': { coord: 'Plan × Experience', desc: 'The program manager plans the fulfillment process. Delivery workflows, quality checkpoints, escalation paths.' },
  'V2×H4': { coord: 'Supervisor × Experience', desc: 'The supervisor manages customer-facing teams — support, service, complaint resolution.' },
  'V1×H4': { coord: 'Employee × Experience', desc: 'The employee serves the customer. Handles complaints, ensures satisfaction, closes the loop.' },
  'V5×H5': { coord: 'Direction × Orders', desc: 'The board sets revenue targets. How much, from whom, by when. The number the entire grid works backward from.' },
  'V4×H5': { coord: 'Strategy × Orders', desc: 'Strategy designs the sales architecture. Account targeting, pipeline design, deal structures.' },
  'V3×H5': { coord: 'Plan × Orders', desc: 'The program manager plans the sales pipeline. Territory assignments, deal stages, forecast cadence.' },
  'V2×H5': { coord: 'Supervisor × Orders', desc: 'The supervisor manages sales reps — daily call targets, proposal reviews, deal coaching.' },
  'V1×H5': { coord: 'Employee × Orders', desc: 'The salesperson sells — calls, proposals, negotiations, closes. Cash enters the system. When they discover customers want something the offer doesn\'t include, that signal flows all the way back to H1.' },
};

const cellFrameworks: Record<CellKey, string> = {
  'V5×H1': 'PESTEL · Megatrends · Ansoff Matrix · Blue Ocean Strategy · Category Design · Real Options',
  'V4×H1': 'Porter\'s Five Forces · SWOT · Wardley Mapping · Business Model Canvas · Value Proposition Canvas · STP · Positioning · Stage-Gate',
  'V3×H1': 'Competitor Analysis · Jobs-to-be-Done · RICE · Kano Model · MoSCoW · Lean Canvas · 4Ps Marketing Mix · Perceptual Mapping · Opportunity Scoring',
  'V2×H1': 'Voice of Customer · Eisenhower Matrix · ICE Scoring · Van Westendorp · Feature-Benefit Matrix · Cost-Benefit Analysis',
  'V1×H1': 'Empathy Map · The Mom Test · Weighted Scoring · User Story Mapping · Elevator Pitch · Assumption Mapping',
  'V5×H2': 'Technology Readiness Levels · APQP · Theory of Constraints · PDCA · CMMI · TQM',
  'V4×H2': 'Gap Analysis · Value Stream Mapping · TRIZ · QFD · Design of Experiments · BPMN · Six Sigma',
  'V3×H2': 'Benchmarking · 8D Problem Solving · Taguchi Method · PDCA · FMEA · SOPs · Kaizen · PPAP',
  'V2×H2': '5 Whys · Fishbone Diagram · Taguchi (applied) · Control Charts · Checklist Manifesto · OEE · Kanban',
  'V1×H2': 'Gemba Walk · 5 Whys (applied) · Poka-Yoke · Standard Work · Andon',
  'V5×H3': 'Toyota Production System · Lean Thinking · Total Productive Maintenance · Factory Physics · HRO',
  'V4×H3': 'Kanban Method · Scrum · Critical Chain · ISO 22301 · Lean Six Sigma · Incident Command System',
  'V3×H3': 'WBS · Critical Path Method · Takt Time · Risk Matrix · Drum-Buffer-Rope · CAPA',
  'V2×H3': 'Visual Management · Daily Management System · 5S · Pareto Analysis · Quick Changeover / SMED',
  'V1×H3': 'Job Instruction (TWI) · One-Piece Flow · Line Balancing · SMED · Jidoka',
  'V5×H4': 'Service-Dominant Logic · Emotional Intelligence',
  'V4×H4': 'Customer Journey Mapping · NPS · Service Blueprint',
  'V3×H4': 'SLA Design · Complaint Resolution Frameworks',
  'V2×H4': 'First Call Resolution · Empathy Training · Recovery Paradox',
  'V1×H4': 'Active Listening · Service Recovery',
  'V5×H5': 'Revenue Growth Strategy · Market Sizing',
  'V4×H5': 'Challenger Sale · MEDDIC · Account-Based Marketing',
  'V3×H5': 'Pipeline Management · Sales Forecasting · Deal Review',
  'V2×H5': 'Referral Selling · Sandler Method · SPIN Selling',
  'V1×H5': 'BANT · Consultative Selling · Objection Handling',
};

/* ── KPI data ── */
const kpis: { name: string; short: string; columns: number[]; question: string }[] = [
  { name: 'Lead Generation', short: 'Leads', columns: [0, 4], question: 'Where do your high-intent leads come from?' },
  { name: 'Conversion', short: 'Convert', columns: [4], question: 'Where in your pipeline do deals die, and who owns that stage?' },
  { name: 'Upselling', short: 'Upsell', columns: [4], question: 'Which customers would buy more if someone was working the relationship?' },
  { name: 'Cross-selling', short: 'X-Sell', columns: [0, 4], question: 'What offering do your customers not know you have?' },
  { name: 'Retention', short: 'Retain', columns: [3], question: 'When you lose a customer, is it delivery or relationship?' },
  { name: 'TAT', short: 'TAT', columns: [2], question: 'Where does a 2-day delay become a 2-week delay?' },
  { name: 'Margins', short: 'Margins', columns: [1, 2], question: 'Which product line is making money after hidden costs?' },
  { name: 'Compliance', short: 'Comply', columns: [1], question: 'What compliance burden is competing with growth?' },
];

/* ── Color logic ── */
function getCellColor(hIdx: number, vIdx: number): string {
  const hue = 215 + hIdx * 5;
  const sat = 80 + hIdx * 4;
  const lightBase = 12 + hIdx * 5;
  const vBoost = (4 - vIdx) * 2.5;
  const light = lightBase + vBoost;
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

/* ── KPI Card ── */
const KPICard = ({ kpi }: { kpi: typeof kpis[0] }) => (
  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 min-h-[200px] flex flex-col hover:border-[#FFD700]/20 hover:bg-[#FFD700]/[0.04] transition-all duration-500 group">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]/30 group-hover:bg-[#FFD700] transition-colors duration-500" />
      <span className="text-xs font-mono font-black uppercase tracking-[0.15em] text-[#FFD700]/60 group-hover:text-[#FFD700] transition-colors duration-500">
        {kpi.name}
      </span>
    </div>

    <p className="text-lg font-bold text-white/80 leading-snug mb-4">
      {kpi.question}
    </p>

    <div className="mt-auto">
      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/15 group-hover:text-[#FFD700]/30 transition-colors duration-500">
        Session topic
      </span>
    </div>
  </div>
);

/* ── Detail panel ── */
const displayCellKey = (key: string) => {
  const map: Record<string, string> = { H1: 'H5', H2: 'H4', H3: 'H3', H4: 'H2', H5: 'H1' };
  return key.replace(/H[1-5]/g, (m) => map[m] || m);
};

const CellPanel = ({ cellKey, onClose }: { cellKey: CellKey; onClose: () => void }) => {
  const [showFrameworks, setShowFrameworks] = useState(false);
  const cell = cellDescriptions[cellKey];
  const frameworks = cellFrameworks[cellKey];
  if (!cell) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-2xl p-6 max-w-sm w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] font-mono font-bold text-[#FFD700] uppercase tracking-widest mb-1">
            {displayCellKey(cellKey)}
          </div>
          <div className="text-sm font-bold text-white">{cell.coord}</div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <p className="text-sm text-white/60 leading-relaxed mb-4">{cell.desc}</p>

      {!showFrameworks ? (
        <button
          onClick={() => setShowFrameworks(true)}
          className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFD700]/70 hover:text-[#FFD700] transition-colors cursor-pointer"
        >
          Explore frameworks →
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/30 mb-2">
            Frameworks
          </div>
          <div className="flex flex-wrap gap-1.5">
            {frameworks.split(' · ').map((fw) => (
              <span key={fw} className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono text-white/50">
                {fw}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const Grid = () => {
  const [activeCell, setActiveCell] = useState<CellKey | null>(null);
  const [kpiIdx, setKpiIdx] = useState(0);
  const total = kpis.length;

  const visibleKPIs = [
    kpis[kpiIdx],
    kpis[(kpiIdx + 1) % total],
    kpis[(kpiIdx + 2) % total],
  ];

  const visibleSet = new Set([kpiIdx, (kpiIdx + 1) % total, (kpiIdx + 2) % total]);

  const highlightedCols = kpis[kpiIdx].columns;

  return (
    <section
      id="grid"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #001233 0%, #001A4D 50%, #001233 100%)', color: '#FAF8F5' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 48px', backgroundPosition: '0 0, 14px 24px' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── KPIs first ── */}
        <FadeIn>
          <div className="eyebrow text-[#FFD700] mb-4">Your Number</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-3">
            Which KPI keeps you<br />
            <span className="text-[#FFD700]">up at night?</span>
          </h2>
          <p className="text-base text-white/50 font-medium max-w-lg mb-14">
            Each Sciensation session starts with one number. Yours. Pick a KPI and we work it structurally across industries, together.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div>
            <motion.div
              key={kpiIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {visibleKPIs.map((kpi) => (
                <KPICard key={kpi.name} kpi={kpi} />
              ))}
            </motion.div>

            {/* KPI carousel toggles */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {kpis.map((kpi, i) => {
                const isSelected = i === kpiIdx;
                const isVisible = visibleSet.has(i);
                return (
                  <button
                    key={kpi.name}
                    onClick={() => setKpiIdx(i)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-mono font-bold transition-all duration-300 ${
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
                    {kpi.short}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ── The 5×5 Grid ── */}
        <FadeIn delay={200}>
          <div className="mt-24">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-2">
              The Grid. Where the problem lives.
            </h3>
            <p className="text-sm text-white/40 mb-10 max-w-lg">
              Every business runs this grid. Revenue lives in how well it flows. Click any cell to see what happens at that intersection.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                {/* Authorization arrow */}
                <div className="flex items-center gap-3 mb-3 ml-[100px] lg:ml-[120px]">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Authorization</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-white/5 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-white/20 border-y-[3px] border-y-transparent" />
                  </div>
                </div>

                {/* Column headers */}
                <div className="grid gap-1" style={{ gridTemplateColumns: '100px repeat(5, 1fr)' }}>
                  <div />
                  {H_LABELS.map((name, hIdx) => (
                    <div key={name} className="text-center">
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider transition-colors duration-300 ${
                        highlightedCols.includes(hIdx) ? 'text-[#FFD700]' : 'text-white/40'
                      }`}>
                        {H_NUMS[hIdx]} {name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Grid rows */}
                {V_LABELS.map((v, vIdx) => {
                  const vKey = v.split(' ')[0];
                  return (
                    <div key={v} className="grid gap-1 mt-1" style={{ gridTemplateColumns: '100px repeat(5, 1fr)' }}>
                      <div className="flex items-center justify-end pr-3">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 text-right">
                          {v}
                        </span>
                      </div>

                      {H_LABELS.map((_name, hIdx) => {
                        const hInternal = H_INTERNAL[hIdx];
                        const hDisplay = H_NUMS[hIdx];
                        const key = `${vKey}×${hInternal}` as CellKey;
                        const isActive = activeCell === key;
                        const isHighlighted = highlightedCols.includes(hIdx);

                        return (
                          <button
                            key={key}
                            onClick={() => setActiveCell(isActive ? null : key)}
                            className="relative aspect-square sm:aspect-[4/3] rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center group"
                            style={{
                              backgroundColor: getCellColor(hIdx, vIdx),
                              opacity: isHighlighted ? 1 : 0.4,
                              boxShadow: isHighlighted
                                ? '0 0 12px rgba(255, 215, 0, 0.4), inset 0 0 0 2px rgba(255, 215, 0, 0.6)'
                                : isActive
                                ? 'inset 0 0 0 2px rgba(255, 255, 255, 0.4)'
                                : 'none',
                            }}
                          >
                            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-white/40 group-hover:text-white/70 transition-colors">
                              {vKey}×{hDisplay}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Accountability arrow */}
                <div className="flex items-center gap-3 mt-3 ml-[100px] lg:ml-[120px]">
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-white/20 to-white/5 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-r-[6px] border-r-white/20 border-y-[3px] border-y-transparent" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Accountability</span>
                </div>
              </div>

              {/* Cell detail panel — desktop */}
              <div className="hidden lg:block w-[340px] shrink-0">
                <AnimatePresence mode="wait">
                  {activeCell && (
                    <CellPanel
                      key={activeCell}
                      cellKey={activeCell}
                      onClose={() => setActiveCell(null)}
                    />
                  )}
                </AnimatePresence>
                {!activeCell && (
                  <div className="text-sm text-white/20 font-mono text-center pt-8">
                    Click any cell to explore
                  </div>
                )}
              </div>
            </div>

            {/* Cell detail panel — mobile */}
            <div className="lg:hidden mt-6">
              <AnimatePresence mode="wait">
                {activeCell && (
                  <CellPanel
                    key={activeCell}
                    cellKey={activeCell}
                    onClose={() => setActiveCell(null)}
                  />
                )}
              </AnimatePresence>
            </div>

            <p className="text-xs text-white/25 font-mono mt-8 uppercase tracking-wider">
              Offers to Orders. Orders back to Offers. The grid shows where the problem lives.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
