import type { QuizLocale } from './types';

function templateFn(template: string): (...args: (string | number)[]) => string {
  return (...args) =>
    template.replace(/\{(\d+)\}/g, (_, i) => String(args[Number(i)]));
}

function hydrateUI(raw: Record<string, unknown>): QuizLocale['ui'] {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'string' && value.includes('{0}')) {
      result[key] = templateFn(value);
    } else {
      result[key] = value;
    }
  }
  return result as QuizLocale['ui'];
}

export interface LangEntry {
  code: string;
  name: string;
}

let manifestCache: LangEntry[] | null = null;

export async function loadManifest(): Promise<LangEntry[]> {
  if (manifestCache) return manifestCache;
  const res = await fetch('/locales/identity/manifest.json');
  if (!res.ok) return [];
  manifestCache = await res.json();
  return manifestCache!;
}

const cache = new Map<string, QuizLocale>();

export async function loadLocale(lang: string): Promise<QuizLocale> {
  const cached = cache.get(lang);
  if (cached) return cached;

  const res = await fetch(`/locales/identity/${lang}.json`);
  if (!res.ok) throw new Error(`Locale '${lang}' not found`);
  const raw = await res.json();

  const locale: QuizLocale = {
    ui: hydrateUI(raw.ui),
    data: raw.data,
  };

  cache.set(lang, locale);
  return locale;
}
