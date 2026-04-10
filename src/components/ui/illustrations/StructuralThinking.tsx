export const StructuralThinking = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    {/* Outer shape — surface (faded) */}
    <rect x={10} y={15} width={100} height={90} rx={8} stroke="#E8E8E8" strokeWidth={2} opacity={0.3} />
    {/* Node 1 */}
    <circle cx={60} cy={32} r={8} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.06)" />
    <line x1={60} y1={40} x2={60} y2={47} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    {/* Node 2 */}
    <circle cx={60} cy={55} r={8} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.06)" />
    {/* Split */}
    <line x1={60} y1={63} x2={38} y2={72} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    <line x1={60} y1={63} x2={82} y2={72} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    {/* Node 3a, 3b */}
    <circle cx={38} cy={78} r={6} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.06)" />
    <circle cx={82} cy={78} r={6} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.06)" />
    {/* Converge */}
    <line x1={38} y1={84} x2={60} y2={90} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    <line x1={82} y1={84} x2={60} y2={90} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    {/* Node 4 — yellow output */}
    <circle cx={60} cy={96} r={9} stroke="#FFD700" strokeWidth={2} fill="rgba(255,215,0,0.12)" />
  </svg>
);
