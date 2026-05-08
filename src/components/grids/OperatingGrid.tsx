import { useState } from "react";

interface GridCell {
  v: number;
  h: number;
  label: string;
  description: string;
}

const HORIZONTAL_LABELS = ["H1 Offers", "H2 Capability", "H3 Capacity", "H4 Experience", "H5 Orders"];
const VERTICAL_LABELS = ["V5 Direction", "V4 Strategy", "V3 Plan", "V2 Supervisor", "V1 Employee"];

const GRID_DATA: GridCell[] = [
  { v: 5, h: 1, label: "V5×H1", description: "The board decides what to offer the market. Which segments to enter, which bets to place, which products to build or kill." },
  { v: 5, h: 2, label: "V5×H2", description: "The board sets the capability agenda. What skills, R&D investments, and knowledge does the company need?" },
  { v: 5, h: 3, label: "V5×H3", description: "The board decides the scale at which the company operates. Production philosophy, plant investments, make-or-buy." },
  { v: 5, h: 4, label: "V5×H4", description: "The board defines what the customer experience should feel like. The promise the company makes." },
  { v: 5, h: 5, label: "V5×H5", description: "The board sets revenue targets. How much, from whom, by when. The number the entire grid works backward from." },
  { v: 4, h: 1, label: "V4×H1", description: "Strategy translates direction into market moves. Pricing, positioning, competitive response." },
  { v: 4, h: 2, label: "V4×H2", description: "Strategy designs the capability roadmap. Which technologies, processes, and people to develop." },
  { v: 4, h: 3, label: "V4×H3", description: "Strategy plans infrastructure and production. Build vs buy, capacity planning, supply chain design." },
  { v: 4, h: 4, label: "V4×H4", description: "Strategy designs the service and fulfillment model. Channels, support tiers, satisfaction benchmarks." },
  { v: 4, h: 5, label: "V4×H5", description: "Strategy designs the sales architecture. Account targeting, pipeline design, deal structures." },
  { v: 3, h: 1, label: "V3×H1", description: "The program manager plans the go-to-market. Launch timelines, campaign specs, channel priorities." },
  { v: 3, h: 2, label: "V3×H2", description: "The program manager runs R&D and training programs. Investigate, hypothesise, experiment, standardise." },
  { v: 3, h: 3, label: "V3×H3", description: "The program manager plans production schedules and delivery timelines. Work breakdown, resource allocation, bottleneck removal." },
  { v: 3, h: 4, label: "V3×H4", description: "The program manager plans the fulfillment process. Delivery workflows, quality checkpoints, escalation paths." },
  { v: 3, h: 5, label: "V3×H5", description: "The program manager plans the sales pipeline. Territory assignments, deal stages, forecast cadence." },
  { v: 2, h: 1, label: "V2×H1", description: "The supervisor manages the team doing market research, customer interviews, competitive analysis." },
  { v: 2, h: 2, label: "V2×H2", description: "The supervisor manages engineers, trainers, R&D teams. Root cause analysis, process experiments, quality checks." },
  { v: 2, h: 3, label: "V2×H3", description: "The supervisor manages the floor. Production, logistics, throughput, daily delivery targets." },
  { v: 2, h: 4, label: "V2×H4", description: "The supervisor manages customer-facing teams. Support, service, complaint resolution." },
  { v: 2, h: 5, label: "V2×H5", description: "The supervisor manages sales reps. Daily call targets, proposal reviews, deal coaching." },
  { v: 1, h: 1, label: "V1×H1", description: "The employee does the research, talks to customers, drafts the offer documents." },
  { v: 1, h: 2, label: "V1×H2", description: "The employee builds, prototyping, testing, learning, documenting." },
  { v: 1, h: 3, label: "V1×H3", description: "The employee does the work. Manufacturing, shipping, coding, delivering." },
  { v: 1, h: 4, label: "V1×H4", description: "The employee serves the customer. Handles complaints, ensures satisfaction, closes the loop." },
  { v: 1, h: 5, label: "V1×H5", description: "The salesman sells. Calls, proposals, negotiations, closes. Cash enters the system." },
];

function getCell(v: number, h: number): GridCell | undefined {
  return GRID_DATA.find((cell) => cell.v === v && cell.h === h);
}

export function OperatingGrid() {
  const [selected, setSelected] = useState<GridCell | null>(null);
  const verticalLevels = [5, 4, 3, 2, 1];
  const horizontalLevels = [1, 2, 3, 4, 5];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, color: "#1A1A1A", marginBottom: 10 }}>
          25 cells. Every company.
        </h3>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 620 }}>
          Every company runs on 25 cells. Five vertical layers from Direction (V5) down to Employee (V1).
          Five horizontal functions from Offers (H1) through to Orders (H5). When something goes wrong
          in a business, it lives in one of these cells. The grid tells you where to look.
        </p>
      </div>

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 6, minWidth: 820, width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: 100 }} />
              {HORIZONTAL_LABELS.map((label, i) => (
                <th key={i} style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", padding: "8px 12px", textAlign: "left" }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {verticalLevels.map((v, rowIdx) => (
              <tr key={v}>
                <th style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#666", padding: "8px 12px", textAlign: "left", verticalAlign: "top", whiteSpace: "nowrap" }}>
                  {VERTICAL_LABELS[rowIdx]}
                </th>
                {horizontalLevels.map((h) => {
                  const cell = getCell(v, h);
                  if (!cell) return <td key={h} />;
                  const isSelected = selected?.v === cell.v && selected?.h === cell.h;
                  return (
                    <td
                      key={h}
                      onClick={() => setSelected(isSelected ? null : cell)}
                      style={{
                        verticalAlign: "top",
                        minWidth: 140,
                        padding: "10px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        background: isSelected ? "rgba(0,51,204,0.06)" : "#FAF8F5",
                        border: isSelected ? "1.5px solid rgba(0,51,204,0.4)" : "1.5px solid #E8E4E0",
                      }}
                    >
                      <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", fontWeight: 700, color: isSelected ? "#0033CC" : "#1A1A1A", marginBottom: 4 }}>
                        {cell.label}
                      </div>
                      <div style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "#666" }}>
                        {cell.description}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ marginTop: 20, padding: "16px 20px", background: "#FAF8F5", border: "1px solid #E8E4E0", borderLeft: "3px solid #0033CC", borderRadius: 8 }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", fontWeight: 700, color: "#0033CC", marginBottom: 8 }}>
            {selected.label}
          </p>
          <p style={{ fontSize: 14, color: "#444", lineHeight: 1.65, margin: 0 }}>{selected.description}</p>
        </div>
      )}
    </div>
  );
}
