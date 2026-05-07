import { useState } from 'react';
import { ArrowLeft, Download, ChevronRight } from 'lucide-react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';

/* ── Cell / Grid types ─────────────────────────────────────────── */

interface C {
  v: string;
  bg?: string;
  bold?: boolean;
  fg?: string;
  cs?: number;
}

type Row = Record<number, C>;
type Grid = Record<number, Row>;

interface SampleDef {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  cols: number;
  rows: number;
  colWidths?: number[];
  grid: Grid;
}

/* ── Palette ───────────────────────────────────────────────────── */

const BG = {
  head: '#0033CC',
  headLight: '#E4ECF9',
  yellow: '#FFF9E6',
  green: '#EEF7EF',
  pink: '#FEF0F4',
  lavender: '#F3F0FF',
  gray: '#F5F5F5',
  teal: '#E8F5F3',
} as const;

const FG = {
  white: '#FFFFFF',
  blue: '#0033CC',
  green: '#2E7D32',
  dim: '#888888',
} as const;

/* ── Sample 1 ──────────────────────────────────────────────────── */

const SAMPLE_1: SampleDef = {
  title: 'Core Journal Concepts',
  badge: 'L3 — Spatial',
  badgeColor: BG.headLight,
  description:
    'This observer mapped how spatial journaling works. Frameworks sit as separate clusters on the left. Traits of a good journal line up on the right. The "Why" reasoning blocks connect both sides.',
  cols: 10,
  rows: 22,
  colWidths: [28, 80, 120, 110, 120, 28, 80, 180, 120, 100],
  grid: {
    0: { 1: { v: 'Core Journal Concepts', bold: true, bg: BG.head, fg: FG.white, cs: 3 } },
    1: {
      1: { v: '1', bold: true, fg: FG.blue },
      2: { v: 'Zero to One', bg: BG.headLight, bold: true },
      4: { v: 'One to Many', bg: BG.headLight, bold: true },
      6: { v: 'Traits of a Good Journal', bold: true, bg: BG.head, fg: FG.white, cs: 3 },
    },
    2: {
      2: { v: 'Making Templates', bg: BG.yellow },
      4: { v: 'Using templates', bg: BG.yellow },
      6: { v: 'A', bold: true, fg: FG.blue },
      7: { v: 'Questioning what we wrote', bg: BG.lavender },
    },
    3: {
      1: { v: '2', bold: true, fg: FG.blue },
      2: { v: 'New Structure', bg: BG.headLight, bold: true },
      6: { v: 'B', bold: true, fg: FG.blue },
      7: { v: 'Breaking things into chunks', bg: BG.lavender },
    },
    4: {
      2: { v: 'get questions with no answers', bg: BG.yellow },
      6: { v: 'C', bold: true, fg: FG.blue },
      7: { v: 'Connecting the dots', bg: BG.lavender },
    },
    5: { 2: { v: 'Opportunity to think', bg: BG.yellow } },
    6: {
      1: { v: '3', bold: true, fg: FG.blue },
      2: { v: 'Spatial Arrangement', bg: BG.headLight, bold: true },
      6: { v: 'D', bold: true, fg: FG.blue },
      7: { v: 'Adding detail', bg: BG.lavender },
    },
    7: {
      2: { v: 'Making connections', bg: BG.yellow },
      6: { v: 'E', bold: true, fg: FG.blue },
      7: { v: 'Converting headlines to insights', bg: BG.lavender },
    },
    8: { 2: { v: 'Creating new structures', bg: BG.yellow } },
    10: {
      1: { v: 'Example Structures', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
      6: { v: 'Why Block Level Thinking', bold: true, bg: BG.head, fg: FG.white, cs: 3 },
    },
    11: {
      1: { v: 'Golden Circle', bg: BG.teal, bold: true },
      6: { v: 'We enter small pieces', bg: BG.green },
      8: { v: 'not large sentences', bg: BG.green },
    },
    12: {
      0: { v: 'What', bold: true, fg: FG.blue },
      1: { v: 'Details' },
      6: { v: 'We beat procrastination', bg: BG.green },
      8: { v: 'we stop if it needs more effort', fg: FG.dim },
    },
    13: {
      0: { v: 'Why', bold: true, fg: FG.blue },
      1: { v: 'Reason or Purpose' },
      6: { v: 'We enter something raw', bg: BG.green },
    },
    14: {
      0: { v: 'How', bold: true, fg: FG.blue },
      1: { v: 'Process' },
      6: { v: 'We then think of improvement', bg: BG.green },
      8: { v: 'headline to insight', bg: BG.yellow },
    },
    15: {},
    16: {
      1: { v: 'Story Telling', bg: BG.teal, bold: true },
      6: { v: 'Rough mode, not fair mode', bg: BG.pink },
      8: { v: 'Can fair it up later', fg: FG.dim },
    },
    17: {
      0: { v: 'Problem', bold: true, fg: FG.blue },
      1: { v: 'Gets Attention' },
      8: { v: 'focus is on insights, not writing', bg: BG.yellow },
    },
    18: {
      0: { v: 'Solution', bold: true, fg: FG.blue },
      1: { v: 'Explains how' },
      8: { v: 'throw blocks in, arrange', bg: BG.yellow },
      9: { v: 'creating new structures', bg: BG.yellow },
    },
    19: {
      0: { v: 'Impact', bold: true, fg: FG.blue },
      1: { v: 'Tells why do it' },
    },
    20: {
      1: { v: 'Wholesome Learning', bg: BG.teal, bold: true },
      6: { v: 'Why Small', bold: true, bg: BG.head, fg: FG.white, cs: 3 },
    },
    21: {
      0: { v: 'Learnings', bold: true, fg: FG.blue },
      1: { v: 'Concept' },
      5: { v: '1', fg: FG.dim },
      6: { v: 'Write more blocks', bg: BG.green },
      8: { v: 'easy to fill', fg: FG.dim },
    },
  },
};

/* ── Sample 2 ──────────────────────────────────────────────────── */

const SAMPLE_2: SampleDef = {
  title: 'Selective Attention & Self-Gratitude',
  badge: 'L3 — Spatial',
  badgeColor: BG.headLight,
  description:
    'Spatial distance shows cause and effect. "Self-critical" sits next to "cortisol" and "stress." "Self-compassion" sits next to "oxytocin" and "felt better." No connecting sentence needed.',
  cols: 9,
  rows: 18,
  colWidths: [90, 100, 90, 60, 110, 100, 80, 110, 100],
  grid: {
    0: { 3: { v: 'Threadbuilder', bold: true, bg: BG.head, fg: FG.white, cs: 2 } },
    1: {
      3: { v: 'write in verbatim', bg: BG.green },
      5: { v: 'beats Selective Attention', bg: BG.yellow },
    },
    2: {
      3: { v: 'not for remembering', fg: FG.dim },
      5: { v: 'but for attention', bg: BG.yellow },
    },
    3: {
      3: { v: 'writing controls ego', bg: BG.lavender },
      5: { v: 'listening with an open mind', bg: BG.lavender },
    },
    5: { 0: { v: 'Selective Attention', bold: true, bg: BG.head, fg: FG.white, cs: 2 } },
    6: { 1: { v: 'leads to ReWork', bg: BG.pink, bold: true } },
    7: {
      0: { v: 'We listen to', fg: FG.dim },
      7: { v: 'Under Pressure', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
    },
    8: {
      0: { v: '1', fg: FG.dim },
      1: { v: 'What we believe', bg: BG.pink },
    },
    9: {
      0: { v: '2', fg: FG.dim },
      1: { v: 'What we already know', bg: BG.pink },
      4: { v: 'experiment', bg: BG.yellow },
      6: { v: 'stick to basics', bg: BG.green },
    },
    10: { 7: { v: 'Jasprit Bumrah', bold: true, fg: FG.blue } },
    11: {
      0: { v: 'Self Gratitude', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
      4: { v: 'in CT', fg: FG.dim },
      7: { v: 'in 2024 WC', fg: FG.dim },
    },
    12: {
      0: { v: 'self-critical', bg: BG.pink, bold: true },
      2: { v: 'self-compassion', bg: BG.green, bold: true },
      4: { v: 'experimented', bg: BG.yellow },
      5: { v: 'noball', bg: BG.pink },
      7: { v: 'yorkers, slower ones', bg: BG.green },
    },
    13: {
      0: { v: 'cortisol', bg: BG.pink },
      2: { v: 'oxytocin', bg: BG.green },
      4: { v: 'tried too many things', bg: BG.pink },
    },
    14: {
      0: { v: 'stress', bg: BG.pink },
      2: { v: 'felt better', bg: BG.green },
    },
    16: {
      1: { v: 'Thank you Varun', bg: BG.lavender },
      3: { v: 'Information', bold: true, bg: BG.headLight },
      4: { v: 'Insights', bold: true, bg: BG.headLight },
      5: { v: 'Headlines', bold: true, bg: BG.headLight },
    },
    17: {
      1: { v: 'with the name', fg: FG.dim },
      3: { v: 'free due to internet', fg: FG.dim },
      4: { v: 'non-trivial', bg: BG.yellow },
      5: { v: 'catchy, get attention', bg: BG.yellow },
    },
  },
};

/* ── Sample 3 ──────────────────────────────────────────────────── */

const SAMPLE_3: SampleDef = {
  title: 'Email System Architecture',
  badge: 'L4 — Systemic',
  badgeColor: BG.green,
  description:
    'This one reads like system design. Psychology Frameworks, Cost Efficiency, and a Plan B sit as separate but connected zones. The observer ran actual cost calculations inside the journal.',
  cols: 10,
  rows: 22,
  colWidths: [80, 100, 130, 80, 130, 110, 130, 130, 120, 100],
  grid: {
    0: {
      1: { v: 'Personalized', bg: BG.head, fg: FG.white, bold: true },
      2: { v: 'Email', bg: BG.head, fg: FG.white, bold: true },
    },
    1: {
      1: { v: 'Through', bold: true, fg: FG.blue },
      4: { v: 'Alternatives', bold: true, fg: FG.blue },
      5: { v: 'Why only this', bold: true, bg: BG.headLight, cs: 2 },
    },
    2: {
      1: { v: 'SendGrid API', bg: BG.teal, bold: true },
      4: { v: 'MailGun', fg: FG.dim },
      5: { v: 'SendGrid is market leader', bg: BG.green },
      7: { v: 'better mail deliverability', bg: BG.green },
    },
    3: {
      1: { v: 'OpenAI API', bg: BG.teal, bold: true },
      4: { v: 'Gemini', fg: FG.dim },
      5: { v: 'OpenAI has better output', bg: BG.green },
      7: { v: 'better context, psychology', bg: BG.green },
    },
    5: {
      0: { v: 'Psychology Frameworks', bold: true, bg: BG.head, fg: FG.white, cs: 3 },
      5: { v: 'Modularity', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
    },
    6: {
      0: { v: 'Attention', bg: BG.yellow },
      1: { v: 'AIDCA', bg: BG.headLight, bold: true },
      2: { v: 'Getting Attention' },
      5: { v: 'Segmented contact lists', bg: BG.lavender },
      7: { v: 'Country, Industry', fg: FG.dim },
    },
    7: {
      0: { v: 'Interest', bg: BG.yellow },
      1: { v: 'Cialdini', bg: BG.headLight, bold: true },
      2: { v: 'Persuasion' },
      5: { v: 'Segmented comm logs', bg: BG.lavender },
      7: { v: 'New sheet every week', fg: FG.dim },
    },
    8: {
      0: { v: 'Desire', bg: BG.yellow },
      1: { v: 'Judith Glaser', bg: BG.headLight, bold: true },
      2: { v: 'Conversational Intelligence' },
      3: { v: 'Trust', bg: BG.green, bold: true },
      5: { v: 'Segmented funnel wise', bg: BG.lavender },
      7: { v: 'Cold vs Warm separate', bg: BG.pink },
    },
    9: { 0: { v: 'Conviction', bg: BG.yellow } },
    10: {
      0: { v: 'Action', bg: BG.yellow },
      5: { v: 'Data Ops', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
    },
    11: {
      0: { v: 'Cost Efficiency', bold: true, bg: BG.head, fg: FG.white, cs: 2 },
      5: { v: 'Computation in separate sheet', bg: BG.teal },
      7: { v: 'Where calculations happen', fg: FG.dim },
    },
    12: {
      1: { v: 'SendGrid', bg: BG.teal },
      2: { v: '20$ for 50000 emails', bg: BG.gray },
      5: { v: 'User inputs in separate sheet', bg: BG.teal },
      7: { v: 'Where humans enter data', fg: FG.dim },
    },
    13: {
      1: { v: 'OpenAI', bg: BG.teal },
      2: { v: '0.25$ for 1M tokens', bg: BG.gray },
      5: { v: 'Data dump in separate sheet', bg: BG.teal },
      7: { v: 'Processed info, no calcs', fg: FG.dim },
    },
    15: {
      1: { v: 'Plan B', bold: true, bg: BG.head, fg: FG.white },
      2: { v: 'incase price is high', bg: BG.pink },
    },
    16: { 1: { v: 'Token Efficiency', bg: BG.headLight, bold: true } },
    17: {
      0: { v: 'A', bold: true, fg: FG.blue },
      1: { v: 'Cache general rules', bg: BG.green },
      4: { v: 'AIDCA and standard rules', fg: FG.dim },
      5: { v: '0.025$ per input', bg: BG.yellow },
    },
    18: {
      0: { v: 'B', bold: true, fg: FG.blue },
      1: { v: 'Embeddings', bg: BG.green },
      4: { v: 'prompt decreased', fg: FG.dim },
      5: { v: 'quality of output increases', bg: BG.green },
    },
    19: {
      0: { v: 'C', bold: true, fg: FG.blue },
      1: { v: 'Batch APIs', bg: BG.green },
      4: { v: 'best pricing', bg: BG.yellow },
    },
    20: {
      0: { v: 'D', bold: true, fg: FG.blue },
      1: { v: 'Slower response APIs', bg: BG.green },
      4: { v: 'real-time not needed', fg: FG.dim },
      5: { v: 'make 50k on Sat, send Mon', bg: BG.lavender },
    },
    21: {
      0: { v: 'E', bold: true, fg: FG.blue },
      1: { v: 'Shorter emails', bg: BG.green },
      4: { v: 'more effective, lower pricing', bg: BG.yellow },
    },
  },
};

const SAMPLES = [SAMPLE_1, SAMPLE_2, SAMPLE_3];

/* ── Grid Renderer ─────────────────────────────────────────────── */

function GridRenderer({ sample }: { sample: SampleDef }) {
  const colLetters = 'ABCDEFGHIJKLMNOP'.slice(0, sample.cols).split('');

  return (
    <div className="overflow-x-auto rounded-lg border border-[#E8E4E0]">
      <table
        className="border-collapse text-[11px] leading-tight"
        style={{ minWidth: sample.cols * 90 }}
      >
        <thead>
          <tr>
            <th className="w-7 min-w-[28px] bg-[#F0EDE8] border border-[#E8E4E0] text-[9px] text-[#8A8A8A] text-center p-1" />
            {colLetters.map((letter, ci) => (
              <th
                key={letter}
                className="bg-[#F0EDE8] border border-[#E8E4E0] text-[9px] font-semibold text-[#8A8A8A] text-center p-1"
                style={{ width: sample.colWidths?.[ci] ?? 100 }}
              >
                {letter}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: sample.rows }, (_, ri) => {
            const row = sample.grid[ri];
            const cells: React.ReactNode[] = [];
            let skipUntil = -1;

            for (let ci = 0; ci < sample.cols; ci++) {
              if (ci <= skipUntil) continue;
              const cell = row?.[ci];
              if (cell?.cs && cell.cs > 1) skipUntil = ci + cell.cs - 2;
              cells.push(
                <td
                  key={ci}
                  colSpan={cell?.cs ?? 1}
                  className="border border-[#E8E4E0] px-1.5 py-1 whitespace-nowrap"
                  style={{
                    backgroundColor: cell?.bg ?? 'transparent',
                    color: cell?.fg ?? '#1A1A1A',
                    fontWeight: cell?.bold ? 700 : 400,
                  }}
                >
                  {cell?.v ?? ''}
                </td>,
              );
            }

            return (
              <tr key={ri}>
                <td className="bg-[#F0EDE8] border border-[#E8E4E0] text-[9px] text-[#8A8A8A] text-center p-1 font-medium">
                  {ri + 1}
                </td>
                {cells}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Sample Card ───────────────────────────────────────────────── */

function SampleCard({ sample, defaultOpen }: { sample: SampleDef; defaultOpen?: boolean }) {
  const [expanded, setExpanded] = useState(defaultOpen ?? false);

  return (
    <div className="rounded-xl border border-[#E8E4E0] overflow-hidden bg-white card-lift">
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#1A1A1A]">{sample.title}</span>
          <span
            className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded font-mono"
            style={{
              backgroundColor: sample.badgeColor,
              color: sample.badgeColor === BG.green ? FG.green : FG.blue,
            }}
          >
            {sample.badge}
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#0033CC] shrink-0 ml-3 font-mono uppercase tracking-wider">
          {expanded ? 'Collapse' : 'View sample'}
        </span>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          <GridRenderer sample={sample} />
          <p className="text-xs text-[#4A4A4A] leading-relaxed max-w-3xl">
            {sample.description}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Rubric Data ───────────────────────────────────────────────── */

interface RubricLevel {
  desc: string;
  example: string;
}

interface RubricDim {
  name: string;
  question: string;
  levels: readonly [RubricLevel, RubricLevel, RubricLevel, RubricLevel];
}

const RUBRIC: RubricDim[] = [
  {
    name: 'Compression',
    question: 'Are you writing blocks or sentences?',
    levels: [
      {
        desc: 'Full sentences typed into rows',
        example: '"The speaker mentioned that selective attention leads to rework because we filter out novel points and only capture what we already know"',
      },
      {
        desc: 'Shorter phrases, but still wordy',
        example: '"Selective attention causes rework by filtering novel points"',
      },
      {
        desc: '2 to 5 word blocks consistently',
        example: '"selective attention → rework"',
      },
      {
        desc: 'Single-word anchors that carry meaning in context',
        example: '"filter" next to "rework" — the spatial position does the explaining',
      },
    ],
  },
  {
    name: 'Spatial Logic',
    question: 'Does where you put things mean something?',
    levels: [
      {
        desc: 'Everything in column A, top to bottom',
        example: 'A1: AIDCA, A2: Cialdini, A3: SendGrid, A4: Cost — a flat list with no grouping',
      },
      {
        desc: 'Some grouping, but mostly filling cells left to right',
        example: 'Row 1 has psychology terms, row 2 has tools — but no clear spatial separation between zones',
      },
      {
        desc: 'Position carries meaning: proximity = related, distance = separate',
        example: 'Psychology frameworks in the top-left, cost calculations in the bottom-left, modularity on the right — each is its own zone',
      },
      {
        desc: 'Layout tells a story without reading any text',
        example: 'Cause flows left to right: self-critical → cortisol → stress. The opposite path (self-compassion → oxytocin → felt better) sits directly below for contrast',
      },
    ],
  },
  {
    name: 'Connections',
    question: 'Do your clusters talk to each other?',
    levels: [
      {
        desc: 'No clusters at all, just a list',
        example: 'Bullet points: 1. AIDCA 2. SendGrid 3. Pricing — no relationship shown',
      },
      {
        desc: 'Clusters exist but sit in isolation',
        example: '"Psychology Frameworks" and "Cost Efficiency" are in separate zones but nothing links them',
      },
      {
        desc: 'Clusters linked via shared items or color bridges',
        example: '"Trust" block sits between Psychology and Modularity — it belongs to both, bridging the two clusters',
      },
      {
        desc: 'Cause-and-effect chain across 3+ clusters',
        example: 'AIDCA (Psychology) → segmented funnel (Modularity) → cold vs warm separate (Data Ops) — a traceable chain across three zones',
      },
    ],
  },
  {
    name: 'Visual Coding',
    question: 'Are you using color and formatting to carry information?',
    levels: [
      {
        desc: 'No color, no formatting',
        example: 'Plain black text in every cell, no backgrounds — a white grid',
      },
      {
        desc: 'Some color, but inconsistent or decorative',
        example: 'Some cells are yellow, some green, but the same color means different things in different areas',
      },
      {
        desc: 'Consistent color = theme',
        example: 'Yellow always = questions/templates, green always = benefits/outcomes, pink always = risks/warnings across the entire sheet',
      },
      {
        desc: 'Color, merged cells, and borders all carry distinct meaning',
        example: 'Blue headers mark cluster titles, teal marks tools, yellow marks open questions, green marks validated benefits — a stranger could read the logic',
      },
    ],
  },
  {
    name: 'Insight Depth',
    question: 'Are these headlines or insights?',
    levels: [
      {
        desc: 'Restating what the case study said',
        example: '"They used SendGrid for emails" — repeating the fact',
      },
      {
        desc: 'Summarizing what happened, in your own words',
        example: '"Chose SendGrid over MailGun for deliverability" — correct, but surface-level',
      },
      {
        desc: "Patterns the source didn't spell out",
        example: "\"SendGrid for reach + OpenAI for psychology = persuasion at scale\" — connecting two tools into a strategy the speaker didn't name",
      },
      {
        desc: 'The spatial arrangement reveals something new',
        example: 'The gap between Psychology Frameworks (5 blocks) and Cost Efficiency (2 blocks) reveals the project is over-designed on persuasion but under-designed on economics',
      },
    ],
  },
  {
    name: 'Cumulative Growth',
    question: 'Does it build across days?',
    levels: [
      {
        desc: 'Starting fresh every day',
        example: 'Day 2 sheet is blank — nothing carried from Day 1',
      },
      {
        desc: "Day 2+ adds new rows but doesn't touch Day 1",
        example: 'Day 1 clusters stay frozen. New rows appear below, disconnected from earlier thinking',
      },
      {
        desc: 'Rearranging old blocks as new context arrives',
        example: 'Day 3: moved "Trust" block from Psychology into a new bridge position between Psychology and Modularity after hearing about relationship selling',
      },
      {
        desc: 'Early assumptions challenged, clusters merge or split',
        example: 'Day 1: "Cost" was one block. By Day 4 it split into "Token Efficiency" and "Plan B" — the journal visibly matured',
      },
    ],
  },
];

const LEVEL_STYLES = [
  { bg: '#F5F5F5', accent: '#8A8A8A', label: 'L1' },
  { bg: '#FFF9E6', accent: '#B87800', label: 'L2' },
  { bg: '#E4ECF9', accent: '#0033CC', label: 'L3' },
  { bg: '#EEF7EF', accent: '#2E7D32', label: 'L4' },
] as const;

/* ── Rubric Dimension Card ─────────────────────────────────────── */

function RubricDimension({ dim, index }: { dim: RubricDim; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#E8E4E0] rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black font-mono text-white shrink-0"
          style={{ backgroundColor: '#0033CC' }}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-[#1A1A1A]">{dim.name}</span>
          <span className="text-xs text-[#8A8A8A] ml-3 hidden sm:inline">{dim.question}</span>
        </div>
        <ChevronRight
          className="w-4 h-4 text-[#0033CC] shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="text-xs text-[#4A4A4A] mb-4 sm:hidden">{dim.question}</p>
          <div className="space-y-2">
            {dim.levels.map((level, li) => {
              const style = LEVEL_STYLES[li];
              return (
                <div
                  key={li}
                  className="rounded-lg px-3.5 py-2.5"
                  style={{ backgroundColor: style.bg }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[9px] font-black font-mono tracking-wider mt-0.5 shrink-0"
                      style={{ color: style.accent }}
                    >
                      {style.label}
                    </span>
                    <span className="text-xs leading-relaxed text-[#1A1A1A] font-medium">{level.desc}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#4A4A4A] mt-1.5 ml-7 italic">
                    {level.example}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */

export const Journal = () => (
  <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A] selection:bg-[#0033CC]/15 selection:text-[#002299]">
    <Navbar />

    {/* Hero */}
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-[#0033CC]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#FFD700]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow text-[#FFD700]/80 mb-6 hero-eyebrow">Spatial Thinking</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6 hero-title">
          The Spatial{' '}
          <span className="text-[#FFD700]">Journal</span>
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed hero-sub">
          Position carries meaning. Clusters replace paragraphs. Colour codes replace adjectives.
          Three real observer journals show how spatial thinking captures what linear notes cannot.
        </p>
      </div>
    </section>

    {/* Explanation strip */}
    <section className="py-16 border-b border-[#E8E4E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <p className="eyebrow text-[#0033CC] mb-3">Blocks, not sentences</p>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Each cell holds 2-5 words. Small blocks beat procrastination and keep you in raw-thinking mode.
            </p>
          </div>
          <div>
            <p className="eyebrow text-[#0033CC] mb-3">Position = meaning</p>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Related ideas sit close. Cause-effect pairs share a row. Separate zones become separate clusters.
            </p>
          </div>
          <div>
            <p className="eyebrow text-[#0033CC] mb-3">Colour = category</p>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              Yellow for questions, green for benefits, pink for risks, lavender for principles, teal for structures.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/spatial-mapping-guide.md"
            download="spatial-mapping-guide.md"
            className="btn-yellow !py-3 !px-8 !text-[10px] gap-2 inline-flex items-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download the Guide</span>
          </a>
          <p className="text-[11px] text-[#8A8A8A] mt-3 font-mono">
            spatial-mapping-guide.md
          </p>
        </div>
      </div>
    </section>

    {/* Samples */}
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {SAMPLES.map((sample, i) => (
          <SampleCard key={sample.title} sample={sample} defaultOpen={i === 0} />
        ))}
      </div>
    </section>

    {/* Rubric */}
    <section className="py-20 border-t border-[#E8E4E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow text-[#0033CC] mb-4">How it's scored</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-4">
            Scoring Rubric
          </h2>
          <p className="text-sm text-[#4A4A4A] max-w-xl mx-auto leading-relaxed">
            Six dimensions, four levels each. Tap any dimension to see the progression
            from L1 (linear notes) to L4 (systemic spatial thinking).
          </p>
        </div>

        <div className="space-y-3">
          {RUBRIC.map((dim, i) => (
            <RubricDimension key={dim.name} dim={dim} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Back link */}
    <section className="pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
