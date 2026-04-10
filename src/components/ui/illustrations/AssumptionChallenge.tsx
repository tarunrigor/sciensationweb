export const AssumptionChallenge = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
    {/* Top layer — accepted surface */}
    <rect x={20} y={15} width={80} height={35} rx={3} stroke="#E8E8E8" strokeWidth={2} />
    <line x1={28} y1={25} x2={92} y2={25} stroke="#E8E8E8" strokeWidth={1} />
    <line x1={28} y1={33} x2={92} y2={33} stroke="#E8E8E8" strokeWidth={1} />
    <line x1={28} y1={41} x2={78} y2={41} stroke="#E8E8E8" strokeWidth={1} />
    {/* Dividing line */}
    <line x1={15} y1={55} x2={105} y2={55} stroke="#0033CC" strokeWidth={1} strokeDasharray="2 4" />
    {/* Magnifying glass */}
    <circle cx={85} cy={50} r={14} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.03)" />
    <line x1={95} y1={60} x2={105} y2={70} stroke="#0033CC" strokeWidth={2} strokeLinecap="round" />
    {/* Bottom layer — hidden assumption */}
    <rect x={20} y={60} width={80} height={35} rx={3} stroke="#0033CC" strokeWidth={2} fill="rgba(0,102,204,0.04)" />
    {/* Question mark — yellow */}
    <path d="M52 72 Q52 66 57 66 Q65 66 65 73 Q65 79 58 82" stroke="#FFD700" strokeWidth={2.5} fill="none" strokeLinecap="round" />
    <circle cx={58} cy={88} r={1.8} fill="#FFD700" />
  </svg>
);
