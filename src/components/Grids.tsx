import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { Grid } from '@/src/components/grids/Grid';

export function Grids() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A]">
      <Navbar />

      <section className="bg-[#0033CC] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 48px, 28px 48px',
            backgroundPosition: '0 0, 14px 24px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="eyebrow text-blue-200 mb-4">The PDGMS Grid</div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            Every Company Runs On 25 Cells
          </h1>
          <p className="text-lg text-blue-100 font-medium max-w-2xl leading-relaxed">
            Three lenses into how companies operate, compete, and migrate toward institutional intelligence.
          </p>
        </div>
      </section>

      <Grid />

      <section className="bg-[#FAF8F5] py-12 border-t border-[#E8E4E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/"
            className="btn-blue-outline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sciensation</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
