import { Phone, Globe, Mail, Linkedin, Instagram, Youtube } from 'lucide-react';
import { LogoLight } from '@/src/components/ui/Logo';

export const Footer = () => (
  <footer className="py-24 bg-[#060A14] text-[#5A6070] border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-4 gap-16 mb-16">
        {/* Brand */}
        <div className="lg:col-span-2 space-y-6">
          <LogoLight className="h-10" />
          <p className="text-sm leading-relaxed max-w-md font-medium text-[#7A8090]">
            A DeepThought initiative. Scientific thinking applied to business growth since 2011.
          </p>
        </div>

        {/* Connect */}
        <div>
          <h4 className="eyebrow text-white mb-8">Connect</h4>
          <ul className="space-y-5 text-xs font-medium">
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="tel:+917207001400" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">+91 7207001400</span>
              </a>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="mailto:tarun@deepthought.education" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Mail className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">tarun@deepthought.education</span>
              </a>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="https://www.dtgrowthteams.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Globe className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">www.dtgrowthteams.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="eyebrow text-white mb-8">Socials</h4>
          <ul className="space-y-5 text-xs font-medium">
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="https://www.linkedin.com/company/dtgrowthteams" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Linkedin className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">LinkedIn</span>
              </a>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="https://www.instagram.com/deepthoughtculturetech/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Instagram className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">Instagram</span>
              </a>
            </li>
            <li className="flex items-center gap-4 group cursor-pointer card-lift">
              <a href="https://www.youtube.com/@SciensationMedia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-[#0033CC] transition-all duration-300">
                  <Youtube className="w-3.5 h-3.5 text-[#0033CC] group-hover:text-white" />
                </div>
                <span className="group-hover:text-white transition-colors">YouTube</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em]">
        <p className="text-[#3A4050]">&copy; 2026 DeepThought CultureTech Ventures Pvt Ltd.</p>
      </div>
    </div>
  </footer>
);
