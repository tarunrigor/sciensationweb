import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Identity } from './Identity';
import { loadLocale, loadManifest } from './identity/loadLocale';
import type { LangEntry } from './identity/loadLocale';
import type { QuizLocale } from './identity/types';

function LangSwitcher({ langs, current }: { langs: LangEntry[]; current: string }) {
  const navigate = useNavigate();

  if (langs.length <= 1) return null;

  return (
    <div className="fixed top-5 right-36 z-[60] flex gap-1.5 bg-white/90 backdrop-blur-sm border border-[#E8E4E0] rounded-full px-1.5 py-1.5 shadow-lg">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => navigate(l.code === 'en' ? '/identity' : `/identity/${l.code}`)}
          className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            l.code === current
              ? 'bg-[#0033CC] text-white'
              : 'text-[#4A4A4A] hover:bg-[#F5F3F0]'
          }`}
        >
          {l.name}
        </button>
      ))}
    </div>
  );
}

export function IdentityPage() {
  const { lang = 'en' } = useParams<{ lang?: string }>();
  const [locale, setLocale] = useState<QuizLocale | null>(null);
  const [langs, setLangs] = useState<LangEntry[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadManifest().then(setLangs);
  }, []);

  useEffect(() => {
    setLocale(null);
    setError(false);
    loadLocale(lang).then(setLocale).catch(() => setError(true));
  }, [lang]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <p className="text-[#8A8A8A]">Locale not found.</p>
      </div>
    );
  }

  if (!locale) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="w-8 h-8 border-2 border-[#0033CC] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <LangSwitcher langs={langs} current={lang} />
      <Identity locale={locale} />
    </>
  );
}
