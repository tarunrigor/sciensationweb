import { useState } from "react";

/* ── Types ── */

type QuadrantKey = "tl" | "tr" | "bl" | "br";

interface Company {
  name: string;
  era: string;
  story: string;
}

interface FinancialPeriod {
  revenueGrowth: string;
  ebitda: string;
  multiple: string;
  narrative: string;
}

interface Quadrant {
  title: string;
  subtitle: string;
  tagline: string;
  companies: Company[];
  financials: Record<string, FinancialPeriod>;
  pdgms: string;
  movement: string;
}

interface Revolution {
  era: string;
  period: string;
  shift: string;
  insight: string;
  winners: string;
  losers: string;
  gridShift: string;
  color: string;
  highlight?: boolean;
}

/* ── Data ── */

const COLORS = {
  tl: { main: "#0033CC", light: "rgba(0,51,204,0.07)", border: "rgba(0,51,204,0.18)", text: "#0033CC" },
  tr: { main: "#0A8F3C", light: "rgba(10,143,60,0.07)", border: "rgba(10,143,60,0.18)", text: "#067a32" },
  bl: { main: "#9CA3AF", light: "rgba(156,163,175,0.07)", border: "rgba(156,163,175,0.22)", text: "#6B7280" },
  br: { main: "#B8860B", light: "rgba(184,134,11,0.07)", border: "rgba(184,134,11,0.18)", text: "#996f00" },
};

const quadrants: Record<QuadrantKey, Quadrant> = {
  tr: {
    title: "Builders",
    subtitle: "Wealth Creation × Capability",
    tagline: "Systems that compound independent of any single person",
    companies: [
      { name: "Apple", era: "2007→Now", story: "Post-Jobs, the system still compounds. Design capability is institutional, not individual." },
      { name: "HDFC Bank", era: "1994→Now", story: "Built credit risk systems so deep that leadership changes barely dent performance." },
      { name: "Amazon", era: "2002→Now", story: "The flywheel runs on process, not heroes. Any team can launch, test, and scale." },
      { name: "TCS", era: "2000→Now", story: "Delivery capability is embedded in methodology, not dependent on star consultants." },
    ],
    financials: {
      past: { revenueGrowth: "15–25%", ebitda: "22–35%", multiple: "8–12x", narrative: "Investing heavily in capability. Margins expanding as systems mature." },
      present: { revenueGrowth: "12–20%", ebitda: "28–42%", multiple: "15–30x", narrative: "Compounding returns. High margins because capability reduces cost of execution." },
      future: { revenueGrowth: "10–18%", ebitda: "30–45%", multiple: "20–40x", narrative: "Platform economics. Revenue grows faster than headcount. AI amplifies existing systems." },
    },
    pdgms: "These companies already have what PDGMS builds. They ARE the aspiration. PDGMS helps companies in other quadrants migrate here — by turning founder-dependent intuition into institutional capability.",
    movement: "→ Destination quadrant. Companies arrive here, they don't start here.",
  },
  tl: {
    title: "Visionaries",
    subtitle: "Wealth Creation × Dependency",
    tagline: "Extraordinary ambition, concentrated in few hands",
    companies: [
      { name: "Tesla", era: "2012→Now", story: "Musk IS the strategy. Every major bet flows from one mind. Wealth created, but what happens without him?" },
      { name: "Reliance", era: "1980→2002", story: "Dhirubhai era. Empire built on one man's relationships, deals, and vision. Succession was existential." },
      { name: "Infosys", era: "1981→2000", story: "Murthy's vision drove everything. The model worked because of 7 founders' personal credibility." },
      { name: "Paytm", era: "2015→2022", story: "Sharma's relationships and speed created value. Systems couldn't keep pace with ambition." },
    ],
    financials: {
      past: { revenueGrowth: "40–100%+", ebitda: "−10% to 15%", multiple: "10–50x (on narrative)", narrative: "Burning capital to capture markets. Growth is real but margins are sacrificed." },
      present: { revenueGrowth: "20–50%", ebitda: "5–20%", multiple: "8–25x", narrative: "Scaling but fragile. One leadership shock and the stock drops 30%." },
      future: { revenueGrowth: "?", ebitda: "?", multiple: "Volatile", narrative: "Binary outcomes. Either they build systems (→ Builder) or the founder burns out (→ Crossroads)." },
    },
    pdgms: "This is where PDGMS has the highest emotional resonance. Every founder here knows they're the bottleneck. PDGMS converts their intuition into institutional process — so the company can grow beyond their personal bandwidth.",
    movement: "→ Must migrate RIGHT to Builders. The founder's job is to make themselves unnecessary.",
  },
  br: {
    title: "Stewards",
    subtitle: "Wealth Preservation × Capability",
    tagline: "Deep systems protecting what exists, not creating what's next",
    companies: [
      { name: "IBM", era: "2000→Now", story: "Extraordinary capability in consulting and infrastructure. But wealth preservation, not creation. Revenue flat for a decade." },
      { name: "Unilever", era: "2010→Now", story: "Distribution systems that reach every village. But growth comes from acquisitions, not organic innovation." },
      { name: "Wipro", era: "2015→Now", story: "Delivery capability is strong. But stuck in margin optimization rather than value creation." },
      { name: "HUL", era: "2018→Now", story: "Best FMCG distribution in India. But premiumization is a preservation play, not a creation play." },
    ],
    financials: {
      past: { revenueGrowth: "3–8%", ebitda: "18–28%", multiple: "10–18x", narrative: "Stable, predictable. Investors buy these for dividends, not growth." },
      present: { revenueGrowth: "2–6%", ebitda: "18–25%", multiple: "8–15x", narrative: "Margins holding but growth stalling. Market re-rates downward as AI disrupts." },
      future: { revenueGrowth: "0–5%", ebitda: "15–22%", multiple: "6–12x", narrative: "Without reinvention, slow decline. Capability without direction is expensive inertia." },
    },
    pdgms: "Stewards have the systems but lost the ambition. PDGMS reconnects execution capability to strategic vision — the Talking Document layer reintroduces directional clarity that bureaucracy eroded.",
    movement: "→ Must migrate UP to Builders. Capability without creation is just expensive maintenance.",
  },
  bl: {
    title: "At a Crossroads",
    subtitle: "Wealth Preservation × Dependency",
    tagline: "Legacy position held together by inertia and a few key people",
    companies: [
      { name: "Nokia", era: "2007→2013", story: "Had the market. Had the brand. Couldn't execute the smartphone transition. Dependent on old playbook." },
      { name: "Kodak", era: "1990→2012", story: "Invented digital photography but couldn't cannibalize film revenue. Systems optimized for preservation." },
      { name: "Jet Airways", era: "2010→2019", story: "Dependent on founder relationships for routes and financing. No systems survived the leadership crisis." },
      { name: "Yes Bank", era: "2016→2020", story: "Growth built on one person's risk appetite. When governance caught up, no system existed to course-correct." },
    ],
    financials: {
      past: { revenueGrowth: "5–15% (decelerating)", ebitda: "10–20% (compressing)", multiple: "5–10x (eroding)", narrative: "Numbers look okay on surface. Underlying metrics deteriorating." },
      present: { revenueGrowth: "−5% to 5%", ebitda: "2–12%", multiple: "2–6x", narrative: "Market sees the decline before management admits it. Talent exodus begins." },
      future: { revenueGrowth: "Restructure or exit", ebitda: "Negative without intervention", multiple: "< 3x or acquisition", narrative: "Without fundamental reinvention, this quadrant leads to value destruction." },
    },
    pdgms: "Hardest quadrant to serve. These companies need both capability AND direction. PDGMS can help IF leadership acknowledges the crossroads. The diagnostic itself — showing them where they sit — is often the intervention.",
    movement: "→ Must migrate RIGHT first (build systems), then UP (redirect toward creation).",
  },
};

const revolutions: Revolution[] = [
  { era: "Industrial Revolution", period: "1760–1870", shift: "From craft to scale", insight: "Before: Every business was bottom-left. Craft guilds, family workshops, dependent on master artisans. The factory system moved companies RIGHT — standardised processes meant capability was institutional, not personal.", winners: "Companies that systematised (Ford, Carnegie Steel) → Builders", losers: "Artisan workshops that couldn't scale → stayed At a Crossroads", gridShift: "Mass migration from left to right. Dependency → Capability through process standardisation.", color: "#78716C" },
  { era: "Computer Revolution", period: "1960–1990", shift: "From analog coordination to digital record-keeping", insight: "Mainframes and early PCs gave companies memory. ERP systems (SAP, Oracle) codified business processes. For the first time, a company's knowledge existed outside people's heads. But only large enterprises could afford it.", winners: "Enterprises that digitised (GE, P&G, banks) → Stewards with deep systems", losers: "SMBs locked out of digital tools → remained in Dependency column", gridShift: "Large companies moved right. SMBs stayed left. The capability gap widened.", color: "#6366F1" },
  { era: "Internet Revolution", period: "1995–2010", shift: "From local to global, from closed to networked", insight: "Distribution became nearly free. A company in Hyderabad could serve clients in Houston. This moved companies UP — wealth creation became possible for anyone with a connection.", winners: "Amazon, Google, Infosys — built capability on top of internet reach → Builders", losers: "Bookstores, travel agents, local newspapers — dependent on physical distribution → Crossroads", gridShift: "Vertical shift. Wealth creation accessible to more. But new platform dependencies emerged.", color: "#0891B2" },
  { era: "Mobile Revolution", period: "2007–2020", shift: "From desktop sessions to always-on, from B2B to direct-to-consumer", insight: "Smartphones put computing in every pocket. Companies could reach consumers directly — Zomato, Ola, Paytm. But most became dependent on app stores, aggregator economics, and VC capital cycles.", winners: "Companies that built real capability behind mobile reach (HDFC, Zerodha) → Builders", losers: "Companies that rented growth through discounts (most foodtech, hyperlocal) → Visionaries stuck in dependency", gridShift: "Massive push UP-LEFT. Wealth creation through VC capital, but dependency on funding and platforms.", color: "#EA580C" },
  { era: "AI Revolution", period: "2023→Now", shift: "From human execution to augmented intelligence", insight: "For the first time, the THINKING layer of a company can be systematised. Not just record-keeping (computers), not just distribution (internet), not just reach (mobile) — but judgment, planning, review, and decision-making.", winners: "Companies that embed AI into their operating rhythm — not as a tool, but as institutional intelligence → Builders", losers: "Companies that use AI for cost-cutting without strategic integration → accelerated decline to Crossroads", gridShift: "The great equaliser. For the first time, SMBs can build Tier-1 capability without Tier-1 budgets. PDGMS is the vehicle for this migration.", color: "#7C3AED", highlight: true },
  { era: "Quantum Era", period: "2030→", shift: "From probabilistic AI to deterministic optimisation", insight: "Quantum computing will make certain classes of problems — logistics, molecular simulation, financial modelling, cryptography — solvable in minutes rather than years.", winners: "Companies already in the Builder quadrant with strong AI foundations → quantum-ready", losers: "Companies still dependent on pre-AI processes → multiple generations behind", gridShift: "Amplifies the existing grid position. Builders accelerate. Everyone else falls further behind.", color: "#0F172A" },
];

/* ── Internal components ── */

function QuadrantCell({ q, sel, onSelect, c, data, radius, companies }: {
  q: QuadrantKey;
  sel: QuadrantKey | null;
  onSelect: (q: QuadrantKey) => void;
  c: typeof COLORS[QuadrantKey];
  data: Quadrant;
  radius: string;
  companies: string;
}) {
  const isSelected = sel === q;
  return (
    <div onClick={() => onSelect(q)} style={{
      background: isSelected ? `${c.main}12` : c.light,
      border: `1.5px solid ${isSelected ? c.main : c.border}`,
      borderRadius: radius, padding: 16, cursor: "pointer", transition: "all 0.2s",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: c.main, marginBottom: 2 }}>{data.title}</div>
        <div style={{ fontSize: 11, color: "#777", lineHeight: 1.35 }}>{data.tagline}</div>
      </div>
      <div style={{ fontSize: 10, color: c.text, marginTop: 10, fontFamily: "'JetBrains Mono', monospace", opacity: 0.8 }}>{companies}</div>
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ padding: "10px 12px", background: "#FAF8F5", borderRadius: 6, textAlign: "center" }}>
      <div style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

/* ── Main Component ── */

export function MarketGrid() {
  const [activeTab, setActiveTab] = useState<"Grid" | "Revolutions">("Grid");
  const [selectedQ, setSelectedQ] = useState<QuadrantKey | null>(null);
  const [financialPeriod, setFinancialPeriod] = useState("present");
  const [expandedRev, setExpandedRev] = useState<number | null>(4);

  const activeQuadrant = selectedQ ? quadrants[selectedQ] : null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 4, color: "#999", marginBottom: 6 }}>
          PDGMS MARKET INTELLIGENCE
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 4px", letterSpacing: -0.5 }}>
          Where Does Your Company Sit Today?
        </h3>
        <p style={{ color: "#777", fontSize: 13, margin: 0, fontStyle: "italic" }}>
          And where must it move in the AI age?
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "12px 0 8px" }}>
        {(["Grid", "Revolutions"] as const).map(t => (
          <button key={t} onClick={() => { setActiveTab(t); setSelectedQ(null); }} style={{
            padding: "6px 20px", border: "1px solid", borderRadius: 20, cursor: "pointer",
            fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, transition: "all 0.2s",
            background: activeTab === t ? "#1A1A1A" : "transparent",
            color: activeTab === t ? "#FAF8F5" : "#888",
            borderColor: activeTab === t ? "#1A1A1A" : "#E8E4E0",
          }}>{t}</button>
        ))}
      </div>

      {activeTab === "Grid" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "8px 0 20px" }}>
          <div style={{ display: "flex", maxWidth: 680, margin: "0 auto" }}>
            <div style={{ width: 44, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
              <span style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: COLORS.tr.main }}>
                WEALTH CREATION
              </span>
              <span style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: COLORS.br.main }}>
                WEALTH PRESERVATION
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 8px", marginBottom: 4 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#999" }}>DEPENDENCY</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#999" }}>CAPABILITY</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 3, aspectRatio: "1.5", position: "relative" }}>
                <QuadrantCell q="tl" sel={selectedQ} onSelect={setSelectedQ} c={COLORS.tl} data={quadrants.tl} radius="10px 3px 3px 3px" companies="Tesla · Reliance · Early Infosys" />
                <QuadrantCell q="tr" sel={selectedQ} onSelect={setSelectedQ} c={COLORS.tr} data={quadrants.tr} radius="3px 10px 3px 3px" companies="Apple · Amazon · HDFC Bank · TCS" />
                <QuadrantCell q="bl" sel={selectedQ} onSelect={setSelectedQ} c={COLORS.bl} data={quadrants.bl} radius="3px 3px 3px 10px" companies="Nokia · Kodak · Jet Airways" />
                <QuadrantCell q="br" sel={selectedQ} onSelect={setSelectedQ} c={COLORS.br} data={quadrants.br} radius="3px 3px 10px 3px" companies="IBM · Unilever · Wipro · HUL" />

                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                  background: "rgba(250,248,245,0.95)", border: "1.5px solid #E8E4E0", borderRadius: "50%",
                  width: 110, height: 110, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  zIndex: 2, backdropFilter: "blur(6px)",
                }}>
                  <div style={{ fontSize: 10, color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", textAlign: "center", lineHeight: 1.3 }}>In the AI age</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", textAlign: "center", lineHeight: 1.2, margin: "2px 0" }}>Every company</div>
                  <div style={{ fontSize: 10, color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>must move ↗</div>
                </div>

                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 400 267">
                  <defs>
                    <marker id="mkt-arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#7C3AED" opacity="0.3" />
                    </marker>
                  </defs>
                  <line x1="100" y1="200" x2="290" y2="50" stroke="#7C3AED" strokeWidth="1.5" opacity="0.15" strokeDasharray="6,4" markerEnd="url(#mkt-arrowhead)" />
                </svg>
              </div>
            </div>
          </div>

          {activeQuadrant && selectedQ && (
            <div style={{ maxWidth: 680, margin: "16px auto 0", background: "#FAF8F5", border: `1px solid ${COLORS[selectedQ].border}`, borderRadius: 8, padding: 24, animation: "mktFadeIn 0.2s ease" }}>
              <style>{`@keyframes mktFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 20, color: COLORS[selectedQ].main }}>{activeQuadrant.title}</h4>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{activeQuadrant.subtitle}</div>
                  <div style={{ fontSize: 13, color: "#555", fontStyle: "italic", marginTop: 4 }}>{activeQuadrant.tagline}</div>
                </div>
                <div style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, background: `${COLORS[selectedQ].main}10`, color: COLORS[selectedQ].main, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {activeQuadrant.movement.replace("→ ", "")}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>Classic Examples</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {activeQuadrant.companies.map((co, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: "#fff", borderRadius: 6, borderLeft: `3px solid ${COLORS[selectedQ].main}30` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>{co.name}</span>
                        <span style={{ fontSize: 10, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>{co.era}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#555", lineHeight: 1.45 }}>{co.story}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "'JetBrains Mono', monospace" }}>Financial Health Profile</div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {(["past", "present", "future"] as const).map(p => (
                      <button key={p} onClick={() => setFinancialPeriod(p)} style={{
                        padding: "3px 12px", borderRadius: 14, border: "1px solid", cursor: "pointer", fontSize: 11,
                        fontFamily: "'JetBrains Mono', monospace", transition: "all 0.15s",
                        background: financialPeriod === p ? COLORS[selectedQ].main : "transparent",
                        color: financialPeriod === p ? "#fff" : "#888",
                        borderColor: financialPeriod === p ? COLORS[selectedQ].main : "#E8E4E0",
                      }}>
                        {p === "past" ? "Past" : p === "present" ? "Present" : "Future"}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <MetricCard label="Revenue Growth" value={activeQuadrant.financials[financialPeriod].revenueGrowth} color={COLORS[selectedQ].main} />
                  <MetricCard label="EBITDA Margin" value={activeQuadrant.financials[financialPeriod].ebitda} color={COLORS[selectedQ].main} />
                  <MetricCard label="Valuation Multiple" value={activeQuadrant.financials[financialPeriod].multiple} color={COLORS[selectedQ].main} />
                </div>
                <div style={{ fontSize: 13, color: "#444", lineHeight: 1.55, marginTop: 10, padding: "10px 14px", background: `${COLORS[selectedQ].main}06`, borderRadius: 6, fontStyle: "italic" }}>
                  {activeQuadrant.financials[financialPeriod].narrative}
                </div>
              </div>

              <div style={{ padding: "14px 16px", borderLeft: `3px solid ${COLORS[selectedQ].main}`, background: `${COLORS[selectedQ].main}05`, borderRadius: "0 6px 6px 0" }}>
                <div style={{ fontSize: 10, color: COLORS[selectedQ].main, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>What PDGMS Does Here</div>
                <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{activeQuadrant.pdgms}</div>
              </div>
            </div>
          )}

          {!selectedQ && (
            <div style={{ maxWidth: 680, margin: "20px auto 0", padding: "20px 24px", background: "#FAF8F5", border: "1px solid #E8E4E0", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>The AI Age Question</div>
              <div style={{ fontSize: 17, color: "#1A1A1A", fontWeight: 400, lineHeight: 1.5, marginBottom: 12 }}>
                Should every company move to <span style={{ color: COLORS.tr.main, fontWeight: 600 }}>Wealth Creation × Capability</span>?
              </div>
              <div style={{ fontSize: 14, color: "#444", lineHeight: 1.65 }}>
                Before AI, building institutional capability required decades and millions. Only large enterprises could afford the systems, the training, the process engineering.
              </div>
              <div style={{ fontSize: 14, color: "#444", lineHeight: 1.65, marginTop: 10 }}>
                AI changes the cost structure of capability. What took a 50-person PMO can now be scaffolded by an intelligent system. For the first time, the migration from Dependency to Capability is affordable for every company.
              </div>
              <div style={{ fontSize: 12, color: "#7C3AED", fontStyle: "italic", marginTop: 12 }}>
                Click any quadrant to see how companies there look financially — and what the migration path requires.
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "Revolutions" && (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "12px 0 20px" }}>
          <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6, marginBottom: 20, textAlign: "center", fontStyle: "italic" }}>
            Each technological revolution changed where companies could sit on the grid — and who got left behind.
          </div>

          {revolutions.map((rev, i) => {
            const isExpanded = expandedRev === i;
            return (
              <div key={i} onClick={() => setExpandedRev(isExpanded ? null : i)} style={{
                marginBottom: 8, cursor: "pointer", transition: "all 0.2s",
                border: `1px solid ${isExpanded ? rev.color + "30" : "#E8E4E0"}`,
                borderRadius: 8, overflow: "hidden",
                background: isExpanded ? "#FAF8F5" : rev.highlight ? "rgba(124,58,237,0.03)" : "transparent",
              }}>
                <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${rev.color}12`, color: rev.color, fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#1A1A1A" }}>{rev.era}</span>
                      <span style={{ fontSize: 11, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>{rev.period}</span>
                      {rev.highlight && <span style={{ fontSize: 9, padding: "2px 8px", background: "#7C3AED", color: "#fff", borderRadius: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>NOW</span>}
                    </div>
                    <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{rev.shift}</div>
                  </div>
                  <div style={{ fontSize: 18, color: "#bbb", transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</div>
                </div>

                {isExpanded && (
                  <div style={{ padding: "0 18px 18px", animation: "mktFadeIn 0.2s ease" }}>
                    <div style={{ fontSize: 14, color: "#333", lineHeight: 1.6, marginBottom: 14, paddingLeft: 54 }}>
                      {rev.insight}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingLeft: 54 }}>
                      <div style={{ padding: "10px 12px", background: "rgba(10,143,60,0.05)", borderRadius: 6, borderLeft: "3px solid rgba(10,143,60,0.3)" }}>
                        <div style={{ fontSize: 10, color: "#0A8F3C", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>WINNERS</div>
                        <div style={{ fontSize: 12, color: "#333", lineHeight: 1.45 }}>{rev.winners}</div>
                      </div>
                      <div style={{ padding: "10px 12px", background: "rgba(156,163,175,0.06)", borderRadius: 6, borderLeft: "3px solid rgba(156,163,175,0.3)" }}>
                        <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>LEFT BEHIND</div>
                        <div style={{ fontSize: 12, color: "#333", lineHeight: 1.45 }}>{rev.losers}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, paddingLeft: 54 }}>
                      <div style={{ fontSize: 10, color: rev.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 }}>GRID SHIFT</div>
                      <div style={{ fontSize: 13, color: "#333", lineHeight: 1.5, fontStyle: "italic" }}>{rev.gridShift}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ marginTop: 20, padding: "20px 24px", background: "#FAF8F5", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>The Pattern Across All Revolutions</div>
            <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65, marginBottom: 10 }}>
              Every revolution made <strong>capability cheaper to build</strong> and <strong>dependency more expensive to maintain</strong>.
            </div>
            <div style={{ fontSize: 14, color: "#333", lineHeight: 1.65, marginBottom: 10 }}>
              AI makes <strong>thinking capability</strong> affordable. Strategy, planning, review, judgment — the last bastion of &quot;you need expensive humans for this&quot; — is now augmentable.
            </div>
            <div style={{ fontSize: 15, color: "#7C3AED", fontWeight: 600, lineHeight: 1.5, padding: "12px 16px", background: "rgba(124,58,237,0.04)", borderRadius: 6 }}>
              PDGMS is the migration vehicle. It takes a company from wherever they sit on this grid and moves them toward Builders — using AI as the cost equaliser.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
