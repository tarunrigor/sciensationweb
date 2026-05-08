import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OperatingGrid } from "./OperatingGrid";
import { GamesGrid } from "./GamesGrid";
import { MarketGrid } from "./MarketGrid";

const GRID_TABS = [
  { label: "The Grid", sub: "25 Cells" },
  { label: "25 Games", sub: "Financial Mirror" },
  { label: "Market Grid", sub: "4 Quadrants" },
];

const EXPO_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in-view")));
          obs.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

export interface GridProps {
  className?: string;
}

export function Grid({ className = "" }: GridProps) {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <section className={`py-12 bg-[#FAF8F5] relative overflow-hidden ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="mb-8">
          <div className="eyebrow text-[#0033CC] mb-2">
            Business Intelligence
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] leading-none">
            The <span className="text-[#0033CC]">Grid</span>
          </h2>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={tabIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EXPO_EASE }}
          >
            {tabIdx === 0 && <OperatingGrid />}
            {tabIdx === 1 && <GamesGrid />}
            {tabIdx === 2 && <MarketGrid />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-[#E8E4E0] flex justify-center gap-x-12">
          {GRID_TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setTabIdx(i)}
              className={`group relative py-2 transition-all duration-300 text-center cursor-pointer ${
                tabIdx === i ? "text-[#1A1A1A]" : "text-[#999] hover:text-[#666]"
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1 font-mono">
                {tab.label}
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest block leading-tight opacity-50 group-hover:opacity-100 transition-opacity font-mono">
                {tab.sub}
              </span>
              <span
                className={`block h-0.5 bg-[#0033CC] transition-all duration-500 mt-2 mx-auto ${
                  tabIdx === i ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
