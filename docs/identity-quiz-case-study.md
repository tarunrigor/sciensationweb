# Identity Quiz — Iterative Build Case Study

**Product:** DT Fellowship Identity Assessment  
**Stack:** React 19 + TypeScript + Vite + Framer Motion + Tailwind CSS  
**Build period:** May 20–21, 2026  
**Iterations:** 6  

---

## What was built

A 5-question identity assessment quiz where each question has 8 long-form options (40 options total). Each option is a paragraph describing a real way people think about their career. Options are scored 1–8 via a rubric, with per-answer feedback. The quiz supports multiple languages and loads content dynamically from JSON files at runtime.

---

## Iteration 1 — The Basic Quiz

**Commit:** `98955f3` — *feat(identity): add /identity page with 5-question identity assessment quiz*  
**Files:** `Identity.tsx` (681 lines), route in `main.tsx`  
**What existed:**

- Single-file component with types, data, and UI all embedded
- `QUIZ_DATA` constant hardcoded at the top of the file
- `OptionButton` component — all 8 options visible at once in a vertical list
- Each option had a letter badge (A–H) and text
- Click an option → it highlights → click Next
- `AnimatePresence mode="wait"` for question transitions
- `ProgressBar` with "Question X of Y" and percentage
- After answering all 5 → results page with `ScoreRing` (animated SVG donut)
- `QuestionResult` expandable cards with per-answer feedback
- Score bands: Exceptional (≥80%), Strong (≥60%), Developing (≥40%), Emerging (<40%)
- Hardcoded English strings throughout ("Start the Quiz", "See Results", etc.)

**Architecture:**
```
Identity.tsx (681 lines)
  ├── Types (Option, Question, QuestionRubric, QuizData)
  ├── QUIZ_DATA constant (all questions + rubric inline)
  ├── Helper functions (getScoreLabel, getOverallInsight)
  ├── Sub-components (ProgressBar, OptionButton, ScoreRing, QuestionResult)
  └── Main Identity() component (no props, self-contained)
```

**Key design decisions:**
- All 8 options shown simultaneously — the user scrolls a long list
- Options labeled A through H with letter badges
- Simple click-to-select, no intermediate steps
- No examples on options — just the response text
- `export function Identity()` — no props, not reusable

**Limitation:** One language, one file, hardcoded data. UI strings baked into JSX.

---

## Iteration 2 — Locale Extraction + Multi-Language

**Commit:** `48f094f` — *extract locale system, add Telugu and Hindi routes*  
**Commit:** `a4f4437` — *add Hindi quiz content for /identityhindi*  
**Files changed:** Identity.tsx refactored (681→507 lines), created `types.ts`, `en.ts`, `hi.ts`, `te.ts`  
**What changed:**

- **Extracted types** into `identity/types.ts` — `Option`, `Question`, `QuestionRubric`, `QuizData`, `QuizLocale`
- **Created `QuizLocale` interface** — separated UI strings from quiz data:
  ```typescript
  interface QuizLocale {
    ui: {
      eyebrow: string;
      heroLine1: string;
      questionOf: (current: number, total: number) => string;
      // ... all UI text
      scoreLabels: { exceptional, strong, developing, emerging };
      insights: { exceptional, strong, developing, emerging };
    };
    data: QuizData;
  }
  ```
- **Function-typed strings** for dynamic labels: `questionOf`, `answeredOf`, `question`
- **Split data into locale files** — `en.ts` (186 lines), `te.ts` (186 lines), `hi.ts` (stub → then 194 lines)
- **Component signature changed:** `Identity()` → `Identity({ locale }: { locale: QuizLocale })`
- **Helper functions parameterized:** `getScoreLabel(pct)` → `getScoreLabel(pct, labels)` 
- **Three separate routes** in main.tsx:
  ```tsx
  <Route path="/identity" element={<Identity locale={en} />} />
  <Route path="/identitytelugu" element={<Identity locale={te} />} />
  <Route path="/identityhindi" element={<Identity locale={hi} />} />
  ```

**Architecture:**
```
main.tsx — static imports of en, te, hi; 3 hardcoded routes
identity/
  ├── types.ts (QuizLocale interface)
  ├── en.ts (186 lines — questions + rubric, no examples)
  ├── hi.ts (194 lines — full Hindi content)
  └── te.ts (186 lines — full Telugu content)
Identity.tsx (507 lines — locale-driven, no hardcoded strings)
```

**What stayed the same:** OptionButton with A–H badges, all 8 options visible at once, click-to-select flow.

**Limitation:** Adding a language required: (1) write a TypeScript file, (2) import it in main.tsx, (3) add a new route. Three code changes per language.

---

## Iteration 3 — Spec Alignment: Remove Labels, Add Randomization, Add Feedback Flow

**Session:** Conversation 2 (uncommitted changes)  
**Trigger:** Review of `dt_fellowship_assessment_product_notes.md` — identified gaps vs. product spec  
**What changed:**

### 3a. Removed option labels (A–H)
- Deleted the letter badge `div` from `OptionButton`
- Removed `{String.fromCharCode(65 + index)}` rendering
- "Answered: C" badge → just "Answered"
- **Why:** The spec said options should not be labeled to avoid anchoring bias. Labels imply ordering.

### 3b. Added option randomization (Fisher-Yates shuffle)
```typescript
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function shuffleQuestionOptions(qs: Question[]): Question[] {
  return qs.map(q => ({ ...q, options: shuffleArray(q.options) }));
}
```
- Options shuffled once on mount via `useState(() => shuffleQuestionOptions(questions))`
- Re-shuffled on retake
- **Scoring integrity preserved** because scoring uses option IDs (`'1a'`, `'1b'`...), not position indices

### 3c. Added immediate feedback after selection
- New `viewMode` state: `'browse' | 'shortlist' | 'feedback'`
- After choosing an option → feedback panel appears showing the rubric feedback for that answer
- "Continue" button advances to next question (or shows results on last question)
- **Why:** The spec required Fellows see feedback immediately per question, not all at once at the end.

**New types added to `QuizLocale.ui`:** `continue: string`

---

## Iteration 4 — Browse + Shortlist UX

**Session:** Same conversation (uncommitted changes)  
**What changed:**

Replaced `OptionButton` (show all 8 at once) with a two-phase flow:

### Phase 1: Browse
- New `BrowseCard` component — shows ONE option at a time, full card with text and example
- Added `example?: string` field to `Option` type
- Navigation: `ChevronLeft` / `ChevronRight` arrows + dot indicators
- Each dot shows: current (blue), shortlisted (gold), or unseen (gray)
- `browseIndex` state tracks which option is being viewed
- `browseDirection` state controls animation direction
- "Shortlist" button (star icon) on each card

### Phase 2: Shortlist Review
- New `ShortlistItem` component — compact cards for shortlisted options
- "Choose This" button to make final selection
- "Remove" to un-shortlist
- "Back to Browsing" to return to browse phase
- `shortlisted` state: `Record<number, string[]>` — per-question shortlist

### Phase 3: Feedback (from Iteration 3c)
- After choosing → feedback card appears
- "Continue" or "See Results" button

**New types added to `QuizLocale.ui`:** `shortlist`, `shortlisted`, `viewShortlist`, `backToBrowse`, `chooseThis`, `exampleLabel`, `optionOf`

**Architecture of the question flow:**
```
Browse (one card at a time) 
  → Shortlist (review favorites) 
    → Choose (pick one) 
      → Feedback (see rubric response) 
        → Continue (next question)
```

---

## Iteration 5 — UX Polish: Animation Fix + Content Refinement

**Session:** Same conversation (uncommitted changes)  
**What changed:**

### 5a. Fixed rapid-click animation desync
- **Problem:** Triple-nested `AnimatePresence mode="wait"` (question → viewMode → browseCard) caused animation queue buildup on rapid clicks
- **Fix:** Removed the innermost `AnimatePresence` around browse cards, replaced with a simple keyed `motion.div`:
  ```tsx
  <motion.div
    key={browseIndex}
    initial={{ opacity: 0, x: browseDirection * 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
  >
  ```
- Old card unmounts instantly, new card fades in, no queue

### 5b. Updated subtitle/framing text
- Old: `"Five questions. Eight choices each. No right answers — only revealing ones."`
- New: `"This is not a test. There are no wrong answers. Each option describes a real way people think about their career. Pick the one closest to how you actually think today — not how you want to think."`

### 5c. Refined question text from spec document
- Updated all 5 questions × 8 options with refined wording from `dt_fellowship_identity_questions_v1.md`
- Added rich examples to every option (40 examples total)
- Tightened feedback text across all 40 rubric entries

**en.ts grew from 186 lines → 354 lines** (examples are substantial — each is a paragraph-length story)

---

## Iteration 6 — Dynamic Architecture for Language Scalability

**Session:** Same conversation (current work)  
**Trigger:** "How do you ensure this code is scalable to 20 languages?"  
**What changed:**

### Problem
Each language required 3 code changes:
1. Create a `.ts` file with the full locale object
2. `import` it in `main.tsx`
3. Add a `<Route>` element

This doesn't scale. 20 languages = 60 code changes.

### Solution
Moved from static TypeScript imports to runtime JSON loading.

**New files created:**
- `public/locales/identity/en.json` — quiz data as JSON
- `public/locales/identity/hi.json`
- `public/locales/identity/te.json`
- `src/components/identity/loadLocale.ts` — fetch + hydrate loader
- `src/components/IdentityPage.tsx` — route wrapper with dynamic loading

**Files removed:**
- `src/components/identity/en.ts`
- `src/components/identity/hi.ts`
- `src/components/identity/te.ts`

**Key technical challenge:** `QuizLocale` has function-typed UI strings (`questionOf: (c, t) => string`). JSON can't hold functions.

**Solution — template string hydration:**
```
JSON:  "questionOf": "Question {0} of {1}"
       ↓ loadLocale() ↓
Code:  questionOf: (c, t) => "Question " + c + " of " + t
```

```typescript
// loadLocale.ts
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
```

**Route change:**
```tsx
// Before: 3 static routes
<Route path="/identity" element={<Identity locale={en} />} />
<Route path="/identitytelugu" element={<Identity locale={te} />} />
<Route path="/identityhindi" element={<Identity locale={hi} />} />

// After: 1 parameterized route
<Route path="/identity/:lang?" element={<IdentityPage />} />
```

**IdentityPage wrapper:**
- Reads `:lang` param (defaults to `'en'`)
- Calls `loadLocale(lang)` — fetches JSON, hydrates, caches
- Shows spinner during load
- Passes hydrated `QuizLocale` to `<Identity />`

**Final architecture:**
```
public/locales/identity/
  ├── en.json    ← drop new JSON files here
  ├── hi.json       to add languages
  └── te.json       zero code changes needed

src/components/identity/
  ├── types.ts          ← shared TypeScript types (unchanged)
  └── loadLocale.ts     ← fetch, hydrate template→function, cache

src/components/
  ├── Identity.tsx      ← quiz component (unchanged, receives QuizLocale prop)
  └── IdentityPage.tsx  ← route wrapper: reads :lang, loads JSON, renders Identity

src/main.tsx
  └── /identity/:lang?  ← single parameterized route
```

**Adding language #21:** Create one JSON file. Done.

---

## Summary of Evolution

| Iter | What | Identity.tsx | Files | Languages | Options UX |
|------|------|-------------|-------|-----------|------------|
| 1 | Basic quiz | 681 lines, self-contained | 1 | English only | All 8 visible, labeled A–H |
| 2 | Locale extraction | 507 lines, prop-driven | 5 (types + 3 locales) | EN, HI, TE | Same |
| 3 | Spec alignment | +shuffle, +feedback flow | Same | Same | Randomized, with feedback |
| 4 | Browse + Shortlist | +BrowseCard, +ShortlistItem | Same + example field | Same | One at a time → shortlist → choose |
| 5 | Polish | Animation fix, content refresh | Same | Same | Smooth rapid navigation |
| 6 | Dynamic loading | Unchanged | +3 JSON, +loader, +wrapper, −3 .ts | Unlimited | Same |

## Key Patterns

**1. Start monolithic, extract when the reason arrives.**  
Iteration 1 was a single 681-line file with types, data, and UI all inline. That was correct for "build the quiz." When languages were needed (Iter 2), extraction happened. Premature separation would have been wasted effort if the quiz had been scrapped.

**2. The component interface is a contract.**  
`Identity({ locale }: { locale: QuizLocale })` was established in Iteration 2. Everything after that — shortlisting, feedback, shuffling, dynamic loading — happened without changing this interface. The component doesn't know or care where its data comes from.

**3. Separate data from presentation before separating data from code.**  
Iteration 2 separated "what text to show" from "how to show it" (locale objects vs. component). Iteration 6 separated "what text to show" from "how to store it" (JSON files vs. TypeScript). The first separation was about reuse. The second was about scalability.

**4. UX complexity was additive, not rewriting.**  
Each iteration added a layer: option labels removed, randomization added, browse cards added, shortlist added, feedback step added. The core quiz state machine (answer questions → score → show results) never changed.

**5. Fix the right layer.**  
Animation bug (Iter 5a) was in the component nesting, not the animation library. Scalability problem (Iter 6) was in the import system, not the component. The Identity component itself has been stable since Iteration 4.
