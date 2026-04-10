export const ScaleShifting = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    {/* Outer (500Cr) */}
    <rect x={8} y={8} width={104} height={104} rx={6} stroke="#0033CC" strokeWidth={2} opacity={0.3} />
    <line x1={22} y1={98} x2={98} y2={22} stroke="#0033CC" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
    <polyline points="93,22 98,22 98,27" stroke="#0033CC" strokeWidth={1} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.3} />
    <text x={100} y={110} fontSize={6} fontFamily="monospace" fill="#0033CC" opacity={0.3}>500Cr</text>
    {/* Middle (50Cr) */}
    <rect x={28} y={28} width={64} height={64} rx={5} stroke="#0033CC" strokeWidth={2} opacity={0.6} />
    <line x1={38} y1={82} x2={82} y2={38} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
    <polyline points="77,38 82,38 82,43" stroke="#0033CC" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.5} />
    <text x={85} y={90} fontSize={6} fontFamily="monospace" fill="#0033CC" opacity={0.5}>50Cr</text>
    {/* Inner (1Cr) — yellow */}
    <rect x={48} y={48} width={24} height={24} rx={4} stroke="#FFD700" strokeWidth={2} fill="rgba(255,215,0,0.08)" />
    <line x1={54} y1={66} x2={66} y2={54} stroke="#FFD700" strokeWidth={2} strokeLinecap="round" />
    <polyline points="62,54 66,54 66,58" stroke="#FFD700" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x={68} y={71} fontSize={6} fontFamily="monospace" fill="#FFD700" opacity={0.8}>1Cr</text>
  </svg>
);
