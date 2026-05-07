# Spatial Mapping — Thinking on a Canvas

---

## The Problem with Lists

When you take notes from a conversation, the default is a linear list — bullet points, one after another, top to bottom. This feels organized. It is not.

Humans are bad at remembering lists. We are good at **associative learning** — connecting ideas like a network. A list hides gaps. A spatial arrangement exposes them.

---

## The Method

Use a Google Sheet as a **canvas**, not a document.

**Rules:**
- Each cell contains **a few words** — not a full sentence
- Arrange ideas **spatially** — related ideas near each other, different clusters in different areas of the sheet
- When you see **asymmetry or incompleteness** in the arrangement, you feel the urge to fill it — that urge is your brain detecting a gap you would have missed in a list
- **Connect ideas** by proximity and by adding bridging cells between clusters
- **Rough mode, not fair mode** — focus is on insights, not on writing quality. You can clean it up later if needed.

---

## Why Small Blocks Work

| Reason | What happens |
|--------|-------------|
| **Easy to fill** | You beat procrastination — writing 3 words is effortless, writing a paragraph requires motivation |
| **Easy to connect** | You read blocks faster than paragraphs — connections between ideas become visible |
| **Incompleteness is felt** | "I only have 2 blocks here but 5 over there" — your brain wants symmetry, so you investigate the gap |
| **Raw entry → refined thinking** | You enter something raw, then think about improvement — either headline → insight, or chunk → detail, or connect to other blocks, or pose questions |

---

## Structures You Can Use as Starting Scaffolds

These are not templates to fill mechanically. They are starting structures that trigger spatial thinking:

**Golden Circle:**
| What | Details — the specifics |
|------|------------------------|
| Why | Reason or Purpose — the motivation |
| How | Process — the method |

**Storytelling (Problem-Solution-Impact):**
| Problem | Gets Attention — names the pain |
|---------|-------------------------------|
| Solution | Explains How — the mechanism |
| Impact | Tells Why Do It — the business case |

**Wholesome Learning:**
| Learnings | Concept — what did I understand |
|-----------|-------------------------------|
| Feelings | Emotion — what did I feel |
| Activity | Task — what did I do |

---

## Writing Controls Attention

Writing in verbatim **beats selective attention.** When you write what the speaker says, you stop filtering. You stop deciding "is this important?" in real-time. You capture everything, then organize spatially.

Writing is not for remembering — it's for **attention.** Writing controls ego. It forces listening with an open mind instead of listening for what you already believe or already know.

What you selectively listen to:
1. What you already believe
2. What you already know

Both lead to **rework** — because you filter out the speaker's novel points and capture only the obvious ones.

---

## Information vs. Insights vs. Headlines

| Type | What it is |
|------|-----------|
| **Information** | Free — available on the internet. Raw facts. |
| **Insights** | Non-trivial — connections, implications, second-order effects that require thinking |
| **Headlines** | Catchy, get attention — useful for communication but shallow without insights underneath |

The job in spatial mapping is to convert information → insights. Headlines come last, for presentation.

---

## Sample Spatial Maps

See `inputs/j1.png`, `inputs/j2.png`, `inputs/j3.png` for real examples of spatial mapping in Google Sheets.

**What j1 demonstrates (Journaling methodology):**
- "Core Journal Concepts" mapped spatially: three concepts (Zero to One, New Structure, Spatial Arrangement) in the left region, five "Traits of a Good Journal" in the right region
- "Example Structures" cluster: Why/What/How, Problem/Solution/Impact, Learnings/Feelings/Activity — each in its own spatial block
- "Why Block Level Thinking" and "Why Small" as separate clusters connected to the method
- Notice: entries are 3–6 words each. Not sentences. "We beat procrastination" / "easy to fill" / "will connect faster" — block-sized ideas that your eye scans and connects

**What j2 demonstrates (Deeper concepts):**
- "Selective Attention" cluster with sub-points: "We listen to 1. what we believe, 2. what we already know" → "leads to ReWork"
- "Self Gratitude" cluster: self-critical/cortisol/stress on one side, self-compassion/oxytocin/felt better on the other — the spatial contrast IS the insight
- "Under pressure" cluster: Bumrah in CT (experimented, noball) vs Bumrah in 2024 WC (yorkers, slower ones) — concrete examples placed next to abstract concept (experiment vs stick to basics)
- "Information / Insights / Headlines" as three adjacent columns — spatial arrangement shows the hierarchy

**What j3 demonstrates (Real project — personalized email system):**
- Full project mapped spatially: tool choices (SendGrid, OpenAI) with "Why only this" column, alternatives column, and reasoning
- "Psychology Frameworks" cluster: AIDCA, Cialdini, Judith Glaser mapped to attention stages
- "Cost Efficiency" calculated directly in the sheet — OpenAI costs per 10,000 companies, with token math visible
- "Plan B" cluster with 5 contingencies — each with specific reasoning
- "Security" cluster: 3 specific concerns (API tokens, DKIM/DMARC, staggered delivery)
- This is what a spatial map of a project SHOULD look like: the entire space visible on one canvas, with clusters for every dimension, specifics in every cell, and the connections between clusters visible through spatial proximity

---

## Scoring Rubric — Spatial Mapping

### How to Score

Each criterion is scored **0 / 1 / 2**. No half-points. No rounding up for effort.

- **0** = Not present, or present but fundamentally violates the concept
- **1** = Present but weak, incomplete, or partially misapplied
- **2** = Meets the standard — specific, complete, correctly applied

**Total: 16 points.**

The evaluating LLM must: (a) score each criterion with a number, (b) cite specific evidence from the sheet for each score, (c) state what is missing or wrong for any score below 2.

---

### Red Flags — Auto-Cap at 50%

If ANY of these are true, the final score is capped at 50% regardless of individual criterion scores.

| Red Flag | Why it's fatal |
|----------|---------------|
| All content sits in a single column or row (linear list) | Not spatial — the sheet was used as a document, not a canvas |
| Every cell contains full sentences (10+ words avg) | Block-level thinking not applied — this is paragraph writing on a grid |
| No clusters visible — ideas scattered randomly with no grouping logic | Spatial arrangement requires intentional proximity = relationship |

---

### Criteria

| # | Criterion | 0 | 1 | 2 |
|---|-----------|---|---|---|
| S1 | **Block size** | Entries are full sentences (avg 10+ words per cell) | Mix — some blocks, some sentences (avg 5–9 words) | Consistently short blocks (avg 2–5 words per cell). Ideas are compressed to essence. |
| S2 | **Spatial clustering** | Content is in a single column or ungrouped | Some grouping visible but clusters aren't labeled or are unclear | Distinct, labeled clusters — related ideas occupy a region, different topics are spatially separated |
| S3 | **Coverage breadth** | Fewer than 3 distinct topic areas | 3–5 topic areas | 6+ topic areas covering multiple dimensions of the subject |
| S4 | **Gap identification** | No gaps noted — treats the map as complete | Gaps mentioned in passing but not specific ("need to learn more") | Specific gaps identified: "This cluster has only 1 block vs. 5 in the other — what am I missing here?" |
| S5 | **Connections between clusters** | Isolated islands — no bridging ideas between clusters | Some clusters reference each other but connections aren't explicit | Bridging cells or explicit connections between clusters — an idea appearing in two clusters with a linking note |
| S6 | **Raw vs. over-polished** | Over-polished — formatted like a report, clean paragraphs, no rough edges | Somewhere between — some rough entries, some cleaned up | Working state — rough entries, half-formed ideas, question marks, "???" next to uncertain points. This is a thinking tool, not a deliverable. |
| S7 | **Information → Insight conversion** | All entries are raw facts restated from what was heard | Some entries show second-order thinking but most are surface-level | Multiple entries convert information into insights: not just "margins 12%" but "margin gap = 23pp → size of the prize" |
| S8 | **Associative links visible** | Ideas placed randomly — no logic to spatial arrangement | Some proximity logic but not consistent | Reader can understand WHY ideas are near each other. Proximity = relationship. Distance = different domain. The spatial arrangement itself communicates structure. |

---

### Score Interpretation

| Score | % | Band | What it means |
|-------|---|------|--------------|
| 0–4 | 0–25% | **Not yet** | Fundamental concept not applied. This is a list on a grid, not a spatial map. Re-read the method and redo. |
| 5–8 | 31–50% | **Emerging** | Some spatial thinking visible but inconsistent. Likely has clusters but blocks are too large or connections are missing. |
| 9–12 | 56–75% | **Developing** | Spatial mapping applied. Gaps exist but the mapper knows where they are. Focus on specific criteria to improve. |
| 13–16 | 81–100% | **Strong** | Rare on first attempt. The sheet functions as a genuine thinking tool — the spatial arrangement itself reveals structure and gaps. |

### Feedback Format

```
## Score: [X]% [Band name]
(Computed as: total points / 16 x 100, rounded to nearest whole number)

### Red Flags: [None / List any triggered — if triggered, score is capped at 50%]

### Criteria Scores
S1: [score] — [evidence]
S2: [score] — [evidence]
S3: [score] — [evidence]
S4: [score] — [evidence]
S5: [score] — [evidence]
S6: [score] — [evidence]
S7: [score] — [evidence]
S8: [score] — [evidence]

### Top 3 Gaps to Fix (in priority order)
1. [Criterion ID] — [What's missing] — [How to fix it]
2. [Criterion ID] — [What's missing] — [How to fix it]
3. [Criterion ID] — [What's missing] — [How to fix it]

### What Worked
[1–2 specific strengths with evidence — not praise, evidence]
```

**Rules for the evaluating LLM:**
- Never score above 1 on a criterion without citing specific content from the sheet
- "Top 3 Gaps" is mandatory. If you can't find 3 gaps, you're not looking hard enough.
- "What Worked" is max 2 items. The mapper needs to know where to improve, not feel good about what they did.
- If the sheet content is too sparse to evaluate (fewer than 10 cells of content total), return: "Insufficient content to evaluate. Minimum: 10+ cells across 3+ clusters. Resubmit when the sheet has more substance."

---

## Key Takeaways

1. **Selective attention is the enemy.** You will miss what you don't understand the value of. Write verbatim first, organize spatially second.
2. **Spatial beats linear.** Gaps are visible in a canvas. They're invisible in a list.
3. **Listen to conviction, not just content.** When the speaker is unusually keen, that's signal. Ask why.
4. **Incompleteness drives discovery.** When your spatial map has asymmetry — 5 blocks in one cluster, 1 in another — your brain knows something is missing. Follow that instinct.
5. **Information → Insights → Headlines.** Capture raw, think deeper, present last.
