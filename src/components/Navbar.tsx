import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Logo, LogoLight } from '@/src/components/ui/Logo';

const navLinks = [
  { label: 'Format', href: '#format' },
  { label: 'Thinking Modes', href: '#thinking-modes' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'Join', href: '#cta' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,51,204,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="/" className="flex items-center">
          {scrolled ? <Logo className="h-8" /> : <LogoLight className="h-8" />}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-[10px] font-black uppercase tracking-widest transition-colors font-mono ${
                scrolled
                  ? 'text-[#8A8A8A] hover:text-[#0033CC]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a href="#cta" className="btn-yellow !py-2.5 !px-6 !text-[10px] gap-2">
          <span>Join a Dialogue</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </nav>
  );
};
