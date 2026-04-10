import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Format } from '@/src/components/Format';
import { ThinkingModes } from '@/src/components/ThinkingModes';
import { Heritage } from '@/src/components/Heritage';
import { Grid } from '@/src/components/Grid';
import { Cta } from '@/src/components/Cta';
import { Footer } from '@/src/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A] selection:bg-[#0033CC]/15 selection:text-[#002299]">
      <Navbar />

      <main>
        <Hero />
        <Heritage />
        <Grid />
        <Format />
        <ThinkingModes />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
