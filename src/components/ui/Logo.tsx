export const Logo = ({ className = 'h-8' }: { className?: string }) => (
  <svg viewBox="0 0 260 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Network / constellation graphic */}
    <g>
      {/* Nodes */}
      <circle cx="12" cy="20" r="2.5" fill="#0033CC" />
      <circle cx="24" cy="8" r="2" fill="#0033CC" />
      <circle cx="36" cy="14" r="2.5" fill="#0033CC" />
      <circle cx="30" cy="28" r="2" fill="#0033CC" />
      <circle cx="18" cy="34" r="2.5" fill="#0033CC" />
      <circle cx="8" cy="32" r="1.8" fill="#0033CC" />
      <circle cx="42" cy="24" r="1.5" fill="#0033CC" />
      <circle cx="38" cy="6" r="1.5" fill="#0033CC" />
      <circle cx="26" cy="22" r="1.8" fill="#0033CC" />
      {/* Trailing dots */}
      <circle cx="44" cy="10" r="1.2" fill="#0033CC" opacity="0.6" />
      <circle cx="48" cy="6" r="0.9" fill="#0033CC" opacity="0.4" />
      <circle cx="46" cy="14" r="0.8" fill="#0033CC" opacity="0.3" />
      {/* Edges */}
      <line x1="12" y1="20" x2="24" y2="8" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="24" y1="8" x2="36" y2="14" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="36" y1="14" x2="30" y2="28" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="28" x2="18" y2="34" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="34" x2="8" y2="32" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="8" y1="32" x2="12" y2="20" stroke="#0033CC" strokeWidth="0.8" opacity="0.4" />
      <line x1="12" y1="20" x2="26" y2="22" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="36" y2="14" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="30" y2="28" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
      <line x1="24" y1="8" x2="38" y2="6" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
      <line x1="36" y1="14" x2="42" y2="24" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="18" y2="34" stroke="#0033CC" strokeWidth="0.8" opacity="0.3" />
    </g>
    {/* Text: Sciensation */}
    <text x="56" y="32" fontSize="26" fontWeight="900" fill="#0033CC" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
      Sciensation
    </text>
    {/* Tagline */}
    <text x="57" y="48" fontSize="10" fontWeight="600" fill="#0033CC" fontFamily="Inter, sans-serif" letterSpacing="0.08em" opacity="0.45">
      gestating science!
    </text>
  </svg>
);

export const LogoLight = ({ className = 'h-10' }: { className?: string }) => (
  <svg viewBox="0 0 260 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g>
      <circle cx="12" cy="20" r="2.5" fill="#FFD700" />
      <circle cx="24" cy="8" r="2" fill="#FFD700" />
      <circle cx="36" cy="14" r="2.5" fill="#FFD700" />
      <circle cx="30" cy="28" r="2" fill="#FFD700" />
      <circle cx="18" cy="34" r="2.5" fill="#FFD700" />
      <circle cx="8" cy="32" r="1.8" fill="#FFD700" />
      <circle cx="42" cy="24" r="1.5" fill="#FFD700" />
      <circle cx="38" cy="6" r="1.5" fill="#FFD700" />
      <circle cx="26" cy="22" r="1.8" fill="#FFD700" />
      <circle cx="44" cy="10" r="1.2" fill="#FFD700" opacity="0.6" />
      <circle cx="48" cy="6" r="0.9" fill="#FFD700" opacity="0.4" />
      <circle cx="46" cy="14" r="0.8" fill="#FFD700" opacity="0.3" />
      <line x1="12" y1="20" x2="24" y2="8" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="24" y1="8" x2="36" y2="14" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="36" y1="14" x2="30" y2="28" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="28" x2="18" y2="34" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="34" x2="8" y2="32" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="8" y1="32" x2="12" y2="20" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
      <line x1="12" y1="20" x2="26" y2="22" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="36" y2="14" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="30" y2="28" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
      <line x1="24" y1="8" x2="38" y2="6" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
      <line x1="36" y1="14" x2="42" y2="24" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
      <line x1="26" y1="22" x2="18" y2="34" stroke="#FFD700" strokeWidth="0.8" opacity="0.3" />
    </g>
    <text x="56" y="32" fontSize="26" fontWeight="900" fill="white" fontFamily="Inter, sans-serif" letterSpacing="-0.02em">
      Sciensation
    </text>
    <text x="57" y="48" fontSize="10" fontWeight="600" fill="white" fontFamily="Inter, sans-serif" letterSpacing="0.08em" opacity="0.45">
      gestating science!
    </text>
  </svg>
);
