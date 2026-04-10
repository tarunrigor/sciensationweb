export const FirstPrinciples = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    {/* Left: assembled shape (dashed, grey) */}
    <path d="M15 70 L15 40 L30 25 L45 40 L45 70 Z" stroke="#E8E8E8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" opacity={0.5} />
    {/* Arrow */}
    <line x1={52} y1={50} x2={65} y2={50} stroke="#0033CC" strokeWidth={1.5} strokeLinecap="round" />
    <polyline points="62,46 68,50 62,54" stroke="#0033CC" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Foundation rect */}
    <rect x={75} y={60} width={35} height={15} rx={3} stroke="#0033CC" strokeWidth={2} />
    <circle cx={75} cy={60} r={1.5} fill="#0033CC" /><circle cx={110} cy={60} r={1.5} fill="#0033CC" />
    <circle cx={75} cy={75} r={1.5} fill="#0033CC" /><circle cx={110} cy={75} r={1.5} fill="#0033CC" />
    {/* Principle triangle */}
    <path d="M82 30 L92 15 L102 30 Z" stroke="#0033CC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={82} cy={30} r={1.5} fill="#0033CC" /><circle cx={92} cy={15} r={1.5} fill="#0033CC" /><circle cx={102} cy={30} r={1.5} fill="#0033CC" />
    {/* Core — yellow */}
    <rect x={85} y={40} width={12} height={12} rx={2} stroke="#FFD700" strokeWidth={2} fill="rgba(255,215,0,0.15)" />
  </svg>
);
