import { useState, useEffect } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from "recharts";

/* ── Types ── */

interface GameCell {
  n: string;
  l: string;
  eg: string;
  recog: string[];
  migration: string;
}

interface Financial {
  growth: string;
  margin: string;
  multiple: string;
  note: string;
}

interface Era {
  name: string;
  yr: string;
  color: string;
  hook: string;
  sub: string;
  now?: boolean;
  heat: number[][];
}

interface Tool {
  name: string;
  year: string;
  category: string;
  what: string;
}

interface ToolsEra {
  era: string;
  color: string;
  bottleneck: string;
  bottleneckDetail: string;
  tools: Tool[];
  filled: string;
  left: string;
  gridEffect: string;
  pdgmsIntro?: boolean;
}

interface PdgmsLayer {
  layer: string;
  label: string;
  existing: string;
  gap: string;
  pdgms: string;
}

/* ── Data ── */

const ROWS = ["Capital Preservation", "Margin Defence", "Steady State", "Growth Capital", "Frontier Capital"];
const COLS = ["Key-Person", "Core-Team", "Early Process", "Operating Leverage", "Scalable Infra"];

function hsl(r: number, c: number): string {
  const h = [[25,28,33,38,44],[18,22,160,165,170],[258,252,245,200,172],[218,212,195,178,158],[232,226,216,188,152]];
  return `hsl(${h[r][c]}, 44%, 40%)`;
}

const G: GameCell[][] = [
  [
    { n:"Sweat Equity", l:"The founder IS the balance sheet.", eg:"Dharavi leather workshops — ₹2Cr businesses where the owner's hands are the only asset.", recog:["Revenue stops when the founder stops","No documentation — the founder IS the process","Bank values business at liquidation, not going concern"], migration:"Amul started here in 1946. Village cooperatives. Systems came later, valuation much later." },
    { n:"Legacy Goodwill", l:"The brand outlived the business model.", eg:"Second-gen family businesses where grandfather's name still opens doors but the P&L doesn't justify it.", recog:["Clients trust the family, not the product","Goodwill on mental balance sheet is 10x book value","New competitors winning on price and speed"], migration:"Godrej moved to Operating Leverage over two decades — professionalising without liquidating brand equity." },
    { n:"Restructuring Candidate", l:"Next 12 months decide the next 12 years.", eg:"Nokia 2009, Jet Airways 2017 — revenue flowing, every leading indicator pointing down.", recog:["Quarterly results need creative narrative","Best people updating LinkedIn quietly","Board discussing 'strategic options'"], migration:"Fujifilm pivoted into cosmetics and medical imaging. Kodak didn't." },
    { n:"Dormant Book Value", l:"More capability than the market recognises.", eg:"ISRO in the 1990s — extraordinary assets on balance sheets valued at historical cost.", recog:["World-class talent commercially under-deployed","Declining returns on assets others would acquire","An activist investor would salivate"], migration:"ISRO commercialised launches — same assets, repriced by the market." },
    { n:"Going Concern", l:"The institution runs. That IS the product.", eg:"Indian Railways — 1.3M employees, systems that run regardless of who's in charge.", recog:["Nothing breaks. Nothing changes.","Innovation: 7 signatures, 14 months","Balance sheet fortress. Income statement flatline."], migration:"SBI launched YONO — same balance sheet, digital P&L layered on top." },
  ],
  [
    { n:"Relationship Capital", l:"The Rolodex is the most valuable intangible.", eg:"Founder-led trading firms, brokerages — the client book walks out every evening.", recog:["Top 5 relationships held by 2 people","Succession = CFO's nightmare","Revenue stable until one person retires"], migration:"Kotak converted personal trust into product trust — became an institution." },
    { n:"Revenue Concentration", l:"Few clients. Few people. High margins. High risk.", eg:"Mid-size IT services — top 3 clients are 60% of revenue.", recog:["Losing one client drops revenue 20%+","Every renewal keeps CFO awake","Margins excellent until you model concentration risk"], migration:"Persistent Systems diversified across 300+ clients." },
    { n:"Turnaround Play", l:"The bones are good. The P&L needs surgery.", eg:"Eicher Motors before Royal Enfield's revival.", recog:["EBITDA positive but ROIC below cost of capital","Board debating: invest or harvest?","One bold bet could change everything"], migration:"Eicher killed tractors, doubled down on Royal Enfield. Margin: 8% → 28%." },
    { n:"Margin Optimiser", l:"Squeezing more from what exists.", eg:"Wipro, large pharma generics — delivery never fails, margins managed to basis points.", recog:["CFO most powerful person after CEO","Every cycle: cut 3% more","Analyst calls: margins, never new markets"], migration:"HCL bet on infra management — moved from optimising to growing." },
    { n:"Dividend Aristocrat", l:"Valued for not surprising anyone.", eg:"HUL, Colgate India — free cash flow like clockwork.", recog:["Dividend payout >70%","Growth is GDP + 2-3%","Trades at 40x for boring consistency"], migration:"ITC layering FMCG onto tobacco cash machine." },
  ],
  [
    { n:"Single-Desk P&L", l:"One person approves every decision that matters.", eg:"₹15Cr manufacturer where the founder signs every PO above ₹50K.", recog:["Founder's calendar IS the bottleneck","Delegation fails: 'they won't do it my way'","Revenue = founder capacity × billing rate"], migration:"Zoho systematised without VC or losing the founder's imprint." },
    { n:"Partnership Equity", l:"The value is in the team. Not transferable.", eg:"Law firms, creative agencies — the 4-5 partners ARE the enterprise value.", recog:["Equity discussions emotional, not financial","New hires take 2 years to 'get it'","Partner exit triggers client risk"], migration:"McKinsey — Bower converted partnership into institutional methodology." },
    { n:"Working Capital", l:"The business runs. Where to next?", eg:"₹30Cr auto components — profitable, stable, at an inflection.", recog:["Comfortable — strength and trap","Founder wondering: is 10% growth forever enough?","Cash accumulating. Deployment thesis isn't."], migration:"Marico bet on brand-building. Same cash flows, 10x larger market." },
    { n:"Operational Efficiency", l:"Processes work. Surprises are rare.", eg:"Federal Bank, mid-tier IT — reliable, investable, not exciting.", recog:["Monthly MIS: no variance above 5%","Growth from incremental improvement","Analysts: 'well-managed' = 'no catalyst'"], migration:"Kotak entered new financial product categories → Compounding ROIC." },
    { n:"Process Capital", l:"The system is the moat.", eg:"Apollo Hospitals, McDonald's India — quality replicates automatically.", recog:["Expansion is a spreadsheet exercise","High turnover, consistent experience","Biggest risk: opportunity cost of incrementalism"], migration:"Mayo Clinic licensed clinical systems — process became product." },
  ],
  [
    { n:"Pre-Revenue Thesis", l:"Pitch deck worth more than P&L. For now.", eg:"Ola Electric 2020 — conviction capital against an unvalidated thesis.", recog:["Burn rate exceeds revenue 5-10x","Founder's conviction = primary asset","Board meetings: milestones, not margins"], migration:"Biocon — conviction against every signal that biotech in India was impossible." },
    { n:"Star-Driven P&L", l:"Exceptional people, disproportionate returns.", eg:"Early Freshworks — small Chennai team vs Zendesk on quality alone.", recog:["2-3 people could name their price","Wins from brilliance, not process","CFO models 'what if we lose Priya'"], migration:"Infosys — 7 founders' brilliance became Global Delivery Model." },
    { n:"Growth Capex", l:"Investing and scaling simultaneously.", eg:"boAt ₹100Cr→₹3000Cr — each quarter's process obsolete by next.", recog:["Hiring constant, onboarding can't keep up","Last quarter's org chart doesn't fit","EBITDA positive, every rupee reinvested"], migration:"Flipkart — capex on supply chain became the moat." },
    { n:"Operating Leverage", l:"Revenue grows faster than cost.", eg:"Pidilite, Asian Paints — unit economics improving every quarter.", recog:["EBITDA expanded 200-400bps three years running","Launches follow repeatable process","CFO's favourite: operating leverage curves"], migration:"Asian Paints → tech-driven inventory → Compounding ROIC." },
    { n:"Platform Economics", l:"Their growth IS your growth.", eg:"AWS, UPI/NPCI — marginal cost of next customer approaches zero.", recog:["Revenue per employee 3-5x industry","Third parties build ON your system","Your downtime affects thousands"], migration:"Amazon e-commerce → AWS Platform Economics." },
  ],
  [
    { n:"High-Conviction Capital", l:"One person's bet. Market reprices or doesn't.", eg:"Jio — ₹1.5L Cr before ₹1 revenue.", recog:["Industry says you're wrong. Capital says otherwise.","IRR: 50%+ or write-off","No middle outcome"], migration:"Reliance — Dhirubhai's bets → Mukesh's systems." },
    { n:"Lean Alpha", l:"Small team. Outsized returns. Zero fat.", eg:"WhatsApp 55 employees, 900M users. Zerodha: two brothers, ₹8000Cr+ revenue.", recog:["Revenue/employee 10-50x industry","Everyone ships. Titles meaningless.","Cap table clean — never needed dilution"], migration:"Zerodha tech replaced brokers → Compounding ROIC." },
    { n:"Blitzscale Capex", l:"Speed over efficiency. Share now, margins later.", eg:"Swiggy 2018, Zomato pre-IPO — 300% YoY, negative margins.", recog:["Runway in months, not years","Metric: GMV, never EBITDA","3 hires today, 2 from last week already lost"], migration:"Zomato post-IPO: growth moderated, margins became the story." },
    { n:"Compounding ROIC", l:"Every cycle: cheaper, faster, more profitable.", eg:"Bajaj Finance, HDFC Bank — the flywheel is self-reinforcing.", recog:["ROIC > CoC for 10+ years","New customers from existing momentum","'Expensive but deserved'"], migration:"Bajaj Finance: loans → data → underwriting → cheaper loans." },
    { n:"Institutional Alpha", l:"The machine generates returns while leadership sleeps.", eg:"Apple post-Jobs, Berkshire, TCS.", recog:["CEO transition barely moves stock","Strategy reviews calm — execution predictable","Founder's achievement: made themselves unnecessary"], migration:"Apple: Jobs → Cook. Design culture became balance sheet." },
  ],
];

function fin(r: number, c: number, p: string): Financial {
  const gb=[[-3,0,2,1,0],[2,3,5,4,3],[5,7,10,9,7],[15,20,25,18,12],[30,45,35,22,16]];
  const mb=[[3,6,10,14,18],[6,10,15,20,24],[8,12,16,22,28],[5,10,16,24,30],[-5,5,14,26,35]];
  const xb=[[1,2,3,5,6],[3,4,6,9,13],[5,7,9,13,18],[10,14,16,20,25],[18,24,20,30,42]];
  const g=gb[r][c],m=mb[r][c],x=xb[r][c];
  if(p==="past")return{growth:g>25?"N/A":`${Math.max(g+4,1)}–${g+14}%`,margin:`${Math.max(m-5,-8)}–${m+2}%`,multiple:`${Math.max(x-3,1)}–${x+2}x`,note:r>=3?"Investing phase. Burn rate is the metric.":r>=1?"Stable. The past feels reassuring.":"Numbers that sustain the banking relationship."};
  if(p==="future")return{growth:r>=3&&c>=3?`${g-5}–${g+3}%`:r>=3?"Binary":c>=3?`${g}–${g+7}%`:`${Math.max(g-4,-8)}–${g+3}%`,margin:r<=1&&c<=1?"At risk":`${m}–${m+10}%`,multiple:r+c>=7?`${x}–${x+15}x`:r+c<=2?`${Math.max(x-2,1)}–${x}x`:`${x}–${x+6}x`,note:r+c>=6?"Compounding. Multiple expands.":r>=3?"Transition IS the valuation event.":c>=3?"Capability compounds. Market will reprice.":"Without migration, next 5 = last 5."};
  return{growth:g<=0?`${g}–${g+4}%`:`${g}–${g+10}%`,margin:`${m}–${m+8}%`,multiple:`${x}–${x+5}x`,note:r>=3&&c>=3?"Peak multiples. Growth + predictability.":r>=3?"Key-person discount caps multiple.":c>=3?"Capability premium. Where's the catalyst?":"Under-valued. Upside depends on what's next."};
}

const eras: Era[] = [
  { name:"Pre-Industrial",yr:"<1760",color:"#78716C",hook:"Almost every business was bottom-left.",sub:"No machines, no records, no scale beyond family or guild.",heat:[[35,15,2,0,0],[18,8,1,0,0],[10,5,2,1,0],[2,1,0,0,0],[1,0,0,0,0]] },
  { name:"Post-Industrial",yr:"1870",color:"#92400E",hook:"Factories moved capability from hands to machines.",sub:"Process capability became purchasable. Ford's assembly line: new hire productive on Day 1.",heat:[[20,10,5,2,0],[12,8,6,3,1],[6,5,6,4,2],[3,3,3,2,1],[2,1,1,0,0]] },
  { name:"Post-Computer",yr:"1990",color:"#6366F1",hook:"Information became institutional.",sub:"ERP codified business processes. Knowledge existed outside heads. But mainframes cost millions.",heat:[[12,8,5,2,1],[8,6,6,5,3],[5,5,5,5,4],[3,3,3,3,2],[2,1,1,1,1]] },
  { name:"Post-Internet",yr:"2005",color:"#0891B2",hook:"A company in Bangalore could serve Boston.",sub:"Distribution became free. Creation accessible to anyone with a connection.",heat:[[8,6,4,2,1],[6,5,5,4,3],[5,5,5,5,4],[4,4,4,4,3],[3,3,2,2,1]] },
  { name:"Post-Mobile",yr:"2015",color:"#EA580C",hook:"Every person became a customer, creator, and data point.",sub:"D2C for everyone. But most rented growth via VC. Top-left filled, many fell back.",heat:[[6,5,3,2,1],[5,4,4,3,2],[4,4,5,4,3],[5,5,4,4,3],[5,4,3,2,1]] },
  { name:"Post-AI",yr:"2026",color:"#7C3AED",hook:"A 20-person company can think like 200.",sub:"Every revolution before made DOING cheaper. AI makes THINKING cheaper.",now:true,heat:[[4,3,3,2,1],[3,3,3,3,2],[3,3,4,5,4],[3,3,4,5,5],[3,3,3,4,4]] },
  { name:"Post-Quantum",yr:"203x",color:"#0F172A",hook:"The cost of NOT being top-right becomes existential.",sub:"Quantum amplifies position. Intelligent systems absorb it. Gut-feel companies are generations behind.",heat:[[2,2,2,1,1],[2,2,2,2,2],[2,2,3,4,4],[2,2,3,5,6],[2,2,3,6,10]] },
];

const toolsData: ToolsEra[] = [
  { era:"Pre-Industrial",color:"#78716C",bottleneck:"Memory",bottleneckDetail:"Nothing existed outside a person's head. When the master died, the knowledge died.",tools:[{name:"Double-Entry Bookkeeping",year:"1494",category:"Record-keeping",what:"Pacioli's system let merchants track debits and credits. For the first time, a business could prove its financial position to someone who wasn't there."},{name:"Guild Apprenticeship",year:"~1200s",category:"Knowledge transfer",what:"The only 'system' for transferring capability. 7 years to learn, bound to a single master. Knowledge scaled at walking pace."},{name:"Paper Ledgers",year:"~1500s",category:"Record-keeping",what:"Transaction memory. But only what someone chose to write down, only as organised as the person writing."}],filled:"Financial memory. A business could now remember what it earned and owed.",left:"Operational memory. How the work gets done still lived entirely in people's heads.",gridEffect:"Enabled the bottom-right to exist — Going Concerns and Dividend Aristocrats became possible because you could track wealth across generations." },
  { era:"Post-Industrial",color:"#92400E",bottleneck:"Process",bottleneckDetail:"Making things required skilled hands. Scale required more skilled hands. There weren't enough.",tools:[{name:"Assembly Line",year:"1913",category:"Production system",what:"Ford's innovation: decompose a complex task into simple steps. A new hire is productive on Day 1. The process IS the capability, not the person."},{name:"Scientific Management",year:"1911",category:"Management method",what:"Taylor's time-motion studies. First attempt to turn management from art into science. Measure, optimise, standardise."},{name:"Telegraph / Telephone",year:"1844/1876",category:"Communication",what:"Coordination across distance. For the first time, a factory owner could manage multiple sites without physically being there."},{name:"Adding Machines",year:"1885",category:"Computation",what:"Burroughs' machines. Financial calculations that took hours took minutes. The CFO function became possible at scale."}],filled:"Production capability became systematisable. You could scale output without proportionally scaling skilled labour.",left:"Information. Factories produced goods efficiently but couldn't track inventory, costs, or demand in real-time. Decisions were still made on gut feel.",gridEffect:"Populated the middle columns. Early Process and Operating Leverage became accessible. But only for manufacturers — services stayed left." },
  { era:"Post-Computer",color:"#6366F1",bottleneck:"Information",bottleneckDetail:"Businesses had processes but couldn't remember enough. A 10,000-person company's knowledge lived in filing cabinets and people's memories.",tools:[{name:"ERP (SAP, Oracle)",year:"1972/1977",category:"Enterprise resource planning",what:"The first system that connected finance, inventory, production, and HR into one database. A company's brain, externalised."},{name:"Spreadsheets (Lotus, Excel)",year:"1983/1985",category:"Analysis",what:"Gave every manager a modelling tool. Financial planning went from annual to monthly. The CFO became strategic, not just clerical."},{name:"MRP / MRP II",year:"1964/1983",category:"Production planning",what:"Material Requirements Planning. Calculated exactly what to order, when, and how much. Inventory costs dropped 20-40%."},{name:"Email",year:"1971/1990s",category:"Communication",what:"Async communication at zero marginal cost. Decisions that required a meeting could happen over a day of emails. Coordination cost dropped."},{name:"Relational Databases",year:"1970s",category:"Data infrastructure",what:"Oracle, IBM DB2. Structured data storage that made ERP possible. The foundation everything else was built on."}],filled:"Institutional memory. A company could now know — across all functions, in real time — what it had, what it owed, and what it was producing.",left:"Customer intelligence. Companies knew their operations cold but knew almost nothing about who was buying or why. Sales was still Rolodex and gut.",gridEffect:"Large companies leaped right — Operating Leverage and Scalable Infra became achievable. But at ₹1Cr+ implementation cost, SMBs were locked out. The column gap widened." },
  { era:"Post-Internet",color:"#0891B2",bottleneck:"Reach",bottleneckDetail:"You could run a tight operation but only sell to people you could physically reach. Distribution was geography.",tools:[{name:"CRM (Salesforce)",year:"1999",category:"Customer management",what:"Customer relationships became a database, not a Rolodex. For the first time, the company owned the client relationship, not the salesperson."},{name:"Google Search / AdWords",year:"1998/2000",category:"Demand generation",what:"Customers finding YOU instead of you finding them. Demand generation at scale for the first time. The top rows of the grid opened up."},{name:"E-Commerce (Amazon, Shopify)",year:"1995/2006",category:"Distribution",what:"Sell to anyone, anywhere, 24/7. A ₹50L company in Jaipur could have customers in Japan. Distribution cost → zero."},{name:"Cloud Computing (AWS)",year:"2006",category:"Infrastructure",what:"Pay-per-use computing. A startup could have the same infrastructure as a Fortune 500. The right columns became affordable."},{name:"Open Source (Linux, MySQL)",year:"1991/1995",category:"Technology access",what:"Enterprise-grade technology, free. What cost ₹1Cr in licenses became ₹0. The barrier to the right columns dropped by 90%."}],filled:"Market reach and customer intelligence. Companies could now find customers globally and understand their behaviour digitally.",left:"Coordination. Companies could reach globally but still coordinated internally via email chains and spreadsheets. The bigger you grew, the more chaotic the middle layer became.",gridEffect:"Top rows exploded. Wealth creation became accessible to anyone with a product and a connection. But many companies moved up-left — growth through reach, without building internal systems." },
  { era:"Post-Mobile",color:"#EA580C",bottleneck:"Coordination",bottleneckDetail:"Teams were distributed, projects were multiplying, but nobody could see who was doing what, where, or whether it connected to the strategy.",tools:[{name:"Project Mgmt (Jira, Asana, Monday)",year:"2002/2008/2012",category:"Task management",what:"Made work visible. Every task tracked, assigned, deadlined. The manager could finally see the queue. But — it tracked tasks, not strategy."},{name:"Collaboration (Slack, Teams)",year:"2013/2017",category:"Communication",what:"Real-time team communication. Killed the email chain for coordination. But created a new problem: information overload, everything urgent, nothing prioritised."},{name:"Analytics (Tableau, Power BI)",year:"2003/2013",category:"Business intelligence",what:"Dashboards for everything. Executives could see KPIs in real time. But seeing ≠ acting. The dashboard showed WHAT was broken, not WHY or HOW to fix it."},{name:"OKR Tools (Lattice, 15Five)",year:"2011/2012",category:"Goal alignment",what:"Tried to connect company goals to team goals to individual goals. Worked in theory. In practice, OKRs became a quarterly ritual disconnected from daily work."},{name:"HR/People (Workday, Darwinbox)",year:"2005/2015",category:"Workforce management",what:"Hiring, payroll, performance reviews — systematised. But measured people's presence and output, not whether their work connected to strategic outcomes."},{name:"No-Code (Airtable, Notion)",year:"2013/2016",category:"Flexible databases",what:"Anyone could build a system. Democratised tooling. But also created 500 disconnected Notion pages per company — more knowledge, less coherence."}],filled:"Task visibility and team communication. Managers could see work, teams could talk, executives could see dashboards.",left:"Strategic coherence. Every tool solved its own layer but nothing connected strategy (Layer 4-5) to plans (Layer 3) to execution (Layer 1-2) to review. The tools created more data but not more intelligence.",gridEffect:"Moved companies one column right — from Key-Person to Core-Team, from Core-Team to Early Process. But couldn't push to Operating Leverage or Scalable Infra because the strategy-execution gap remained unbridged." },
  { era:"Post-AI",color:"#7C3AED",bottleneck:"Thinking",bottleneckDetail:"Companies had tools for everything — recording, communicating, tracking, analysing. But the GAP between what leadership decided and what teams executed remained a human-only bridge.",tools:[{name:"LLMs (ChatGPT, Claude, Gemini)",year:"2022–24",category:"Augmented reasoning",what:"For the first time, machines could reason, draft, analyse, and review — not just compute. Every knowledge worker got a thinking partner. But each conversation starts from zero. No organisational memory."},{name:"Copilots (GitHub, M365)",year:"2023",category:"Task augmentation",what:"AI embedded in existing tools. Code faster, write faster, analyse faster. But copilots enhance individual productivity, not organisational coherence."},{name:"AI Agents",year:"2024–25",category:"Autonomous execution",what:"AI that can take multi-step actions — research, book, file, execute. Powerful for individual workflows. But agents don't know your strategy, your org context, or whether the task they're completing connects to anything that matters."},{name:"Vertical AI (Harvey, Abridge)",year:"2023–25",category:"Industry-specific AI",what:"AI trained on legal documents, medical records, financial filings. Deep in one domain. But companies aren't one domain — they're strategy + operations + people + markets all connected."}],filled:"Individual thinking augmentation. Any person can now reason at a higher level. But—",left:"Organisational thinking. No AI tool today connects a company's strategic direction → to plans → to execution → to review → back to strategy in a continuous loop.",gridEffect:"Every tool in the AI era makes INDIVIDUALS more capable. None of them make the ORGANISATION more intelligent. This is the gap.",pdgmsIntro:true },
  { era:"Post-Quantum",color:"#0F172A",bottleneck:"Optimisation at scale",bottleneckDetail:"AI makes thinking cheaper. Quantum makes certain classes of thinking — logistics, molecular, financial — essentially free.",tools:[{name:"Quantum Cloud Services",year:"203x",category:"Infrastructure",what:"Quantum computing as a service. Companies won't own quantum machines — they'll call APIs. But only companies already running on intelligent systems will know what to ask."},{name:"Quantum ML Models",year:"203x",category:"Optimisation",what:"Machine learning models that train in seconds instead of days. Strategy scenarios that took weeks to model will run in real-time. But only if the strategy is already structured in a system."}],filled:"Computational bottlenecks that even AI can't solve today — protein folding, logistics with millions of variables, real-time financial risk modelling.",left:"Nothing new. Quantum doesn't create a new category of problem. It collapses the time to solve existing ones.",gridEffect:"The gap between top-right and bottom-left becomes uncrossable. Quantum is an accelerant, not an equaliser." },
];

const pdgmsStack: PdgmsLayer[] = [
  { layer:"Layer 5–4",label:"Direction & Strategy",existing:"Board portals, Anaplan, strategy decks",gap:"Strategy lives in documents nobody reads after the meeting",pdgms:"Talking Document — strategy that's alive, queryable, and connected to execution" },
  { layer:"Layer 3",label:"Plans & Programs",existing:"Nothing. PowerPoint + consultants.",gap:"The ₹50L/yr program manager gap. No software bridges strategy → execution.",pdgms:"Mimamsaka — AI that converts strategy into plans, reviews iterations, debates priorities" },
  { layer:"Layer 2",label:"Task & Team Mgmt",existing:"Jira, Asana, Monday, Slack",gap:"Track tasks but don't know if they connect to strategy",pdgms:"Execution Workspace — tasks tied to plans tied to strategy. Every sprint knows WHY." },
  { layer:"Layer 1",label:"Individual Work",existing:"Copilots, ChatGPT, code editors",gap:"Individual productivity up. Organisational coherence unchanged.",pdgms:"AI Shell — LLM augmentation WITH organisational context. Not generic AI, YOUR company's AI." },
];

function computeTrends() {
  return eras.map(era => {
    const h = era.heat, total = h.flat().reduce((a, b) => a + b, 0);
    const creation = (h[3].reduce((a, b) => a + b, 0) + h[4].reduce((a, b) => a + b, 0)) / total * 100;
    const preservation = (h[0].reduce((a, b) => a + b, 0) + h[1].reduce((a, b) => a + b, 0)) / total * 100;
    const steady = h[2].reduce((a, b) => a + b, 0) / total * 100;
    let people = 0, emerging = 0, systems = 0;
    for (let r = 0; r < 5; r++) { people += h[r][0] + h[r][1]; emerging += h[r][2]; systems += h[r][3] + h[r][4]; }
    people = people / total * 100; emerging = emerging / total * 100; systems = systems / total * 100;
    return { era: era.name.replace("Post-", "").replace("Pre-", "Pre "), creation: Math.round(creation), steady: Math.round(steady), preservation: Math.round(preservation), people: Math.round(people), emerging: Math.round(emerging), systems: Math.round(systems) };
  });
}

const trendData = computeTrends();

const accessData = [
  { era:"Pre Ind.","Capital Access":5,"Technology Access":2,"Management Science":5,"Information Flow":3,"Talent Mobility":5,"Market Reach":5 },
  { era:"Industrial","Capital Access":30,"Technology Access":25,"Management Science":20,"Information Flow":10,"Talent Mobility":15,"Market Reach":15 },
  { era:"Computer","Capital Access":50,"Technology Access":45,"Management Science":45,"Information Flow":35,"Talent Mobility":30,"Market Reach":25 },
  { era:"Internet","Capital Access":65,"Technology Access":70,"Management Science":55,"Information Flow":70,"Talent Mobility":45,"Market Reach":75 },
  { era:"Mobile","Capital Access":75,"Technology Access":82,"Management Science":60,"Information Flow":85,"Talent Mobility":55,"Market Reach":90 },
  { era:"AI","Capital Access":80,"Technology Access":90,"Management Science":80,"Information Flow":92,"Talent Mobility":78,"Market Reach":92 },
  { era:"Quantum","Capital Access":85,"Technology Access":95,"Management Science":92,"Information Flow":98,"Talent Mobility":88,"Market Reach":95 },
];

const marketData = [
  { era:"Pre Ind.",avgMultiple:1.5,topDecileMultiple:4,medianMargin:8,topDecileMargin:20 },
  { era:"Industrial",avgMultiple:3,topDecileMultiple:8,medianMargin:12,topDecileMargin:25 },
  { era:"Computer",avgMultiple:6,topDecileMultiple:18,medianMargin:14,topDecileMargin:30 },
  { era:"Internet",avgMultiple:10,topDecileMultiple:35,medianMargin:15,topDecileMargin:35 },
  { era:"Mobile",avgMultiple:12,topDecileMultiple:50,medianMargin:14,topDecileMargin:38 },
  { era:"AI",avgMultiple:15,topDecileMultiple:65,medianMargin:16,topDecileMargin:42 },
  { era:"Quantum",avgMultiple:18,topDecileMultiple:85,medianMargin:18,topDecileMargin:50 },
];

const CF = { fontSize: 10, fontFamily: "'JetBrains Mono', monospace" };
const TS = { fontSize: 11, fontFamily: "'Inter', sans-serif", borderRadius: 4, border: "1px solid #E8E4E0" };

/* ── Component ── */

export function GamesGrid() {
  const [sel, setSel] = useState<{ r: number; c: number } | null>(null);
  const [period, setPeriod] = useState("present");
  const [tab, setTab] = useState("grid");
  const [eraIdx, setEraIdx] = useState(5);
  const [chartView, setChartView] = useState("tools");
  const [fade, setFade] = useState(true);

  useEffect(() => { setFade(false); const t = setTimeout(() => setFade(true), 20); return () => clearTimeout(t); }, [sel, tab, eraIdx, chartView]);

  const d = sel ? G[sel.r][sel.c] : null;
  const dc = sel ? hsl(sel.r, sel.c) : "#666";
  const f = sel ? fin(sel.r, sel.c, period) : null;
  const era = eras[eraIdx];
  const tools = toolsData[eraIdx];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1A1A1A" }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h3 style={{ fontSize: 22, fontWeight: 400, margin: 0, lineHeight: 1.35 }}>Every company is playing one of twenty-five games.</h3>
        <p style={{ fontSize: 12, color: "#999", margin: "5px 0 0", fontFamily: "'JetBrains Mono', monospace" }}>Which one is yours?</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "8px 0" }}>
        {([["grid", "The 25 Games"], ["shifts", "How Revolutions Redraw the Board"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => { setTab(k); setSel(null); }} style={{ padding: "5px 16px", border: "1px solid", borderRadius: 16, cursor: "pointer", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.15s", background: tab === k ? "#1A1A1A" : "transparent", color: tab === k ? "#FAF8F5" : "#999", borderColor: tab === k ? "#1A1A1A" : "#E8E4E0" }}>{l}</button>
        ))}
      </div>

      {tab === "grid" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "4px 0 20px" }}>
          <div style={{ display: "flex", maxWidth: 740, margin: "0 auto" }}>
            <div style={{ width: 26, display: "flex", flexDirection: "column-reverse", justifyContent: "space-around", paddingRight: 3, paddingBottom: 16 }}>
              {ROWS.map((l, i) => (<div key={i} style={{ fontSize: 7, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", writingMode: "vertical-lr", transform: "rotate(180deg)", display: "flex", alignItems: "center", justifyContent: "center", height: "20%" }}>{l.toUpperCase()}</div>))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 2, marginBottom: 2 }}>
                {COLS.map((l, i) => (<div key={i} style={{ fontSize: 7, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>{l.toUpperCase()}</div>))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(5,1fr)", gap: 2, aspectRatio: "1.55" }}>
                {[4, 3, 2, 1, 0].map(r => [0, 1, 2, 3, 4].map(c => {
                  const cell = G[r][c]; const isSel = sel?.r === r && sel?.c === c; const cc = hsl(r, c);
                  return (<div key={`${r}-${c}`} onClick={() => { setSel(isSel ? null : { r, c }); setPeriod("present"); }}
                    style={{ background: isSel ? `${cc}14` : "#FAF8F5", border: `1.5px solid ${isSel ? cc : "#E8E4E0"}`, borderRadius: 4, padding: "7px 6px", cursor: "pointer", transition: "all 0.15s", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                    onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLDivElement).style.borderColor = cc + "50"; }}
                    onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLDivElement).style.borderColor = "#E8E4E0"; }}
                  ><div style={{ fontSize: 11, fontWeight: 600, color: cc, lineHeight: 1.15 }}>{cell.n}</div><div style={{ fontSize: 8.5, color: "#999", lineHeight: 1.25, marginTop: 2 }}>{cell.l}</div></div>);
                }))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 8, color: "#ccc", fontFamily: "'JetBrains Mono', monospace" }}>← PEOPLE-DRIVEN</span>
                <span style={{ fontSize: 8, color: "#ccc", fontFamily: "'JetBrains Mono', monospace" }}>SYSTEM-DRIVEN →</span>
              </div>
            </div>
            <div style={{ width: 16, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: 3, paddingBottom: 16 }}>
              <span style={{ writingMode: "vertical-lr", fontSize: 8, color: "#0A8F3C", fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>CREATING ↑</span>
              <span style={{ writingMode: "vertical-lr", fontSize: 8, color: "#B8860B", fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>↓ PRESERVING</span>
            </div>
          </div>
          {!sel && <p style={{ textAlign: "center", fontSize: 13, color: "#aaa", fontStyle: "italic", maxWidth: 480, margin: "14px auto 0" }}>Pick the cell that feels most like your company today.</p>}
          {d && f && (
            <div style={{ maxWidth: 700, margin: "12px auto 0", opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(6px)", transition: "all 0.2s" }}>
              <div style={{ background: dc, borderRadius: "7px 7px 0 0", padding: "13px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>{d.n}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", fontFamily: "'JetBrains Mono', monospace" }}>{ROWS[sel!.r]} × {COLS[sel!.c]}</div></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontStyle: "italic", maxWidth: 280, textAlign: "right" }}>{d.l}</div>
              </div>
              <div style={{ background: "#FAF8F5", border: "1px solid #E8E4E0", borderTop: "none", borderRadius: "0 0 7px 7px" }}>
                <div style={{ padding: "16px 18px", borderBottom: "1px solid #f0efeb" }}>
                  <div style={{ fontSize: 8.5, color: dc, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 8 }}>YOUR CFO RECOGNISES THIS</div>
                  {d.recog.map((r, i) => (<div key={i} style={{ fontSize: 13, color: "#444", lineHeight: 1.5, padding: "4px 0 4px 14px", position: "relative" }}><span style={{ position: "absolute", left: 0, color: dc }}>›</span>{r}</div>))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #f0efeb" }}>
                  <div style={{ padding: "14px 18px", borderRight: "1px solid #f0efeb" }}><div style={{ fontSize: 8.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 5 }}>CLASSIC EXAMPLE</div><div style={{ fontSize: 12, color: "#444", lineHeight: 1.5 }}>{d.eg}</div></div>
                  <div style={{ padding: "14px 18px" }}><div style={{ fontSize: 8.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 5 }}>MIGRATION STORY</div><div style={{ fontSize: 12, color: "#444", lineHeight: 1.5 }}>{d.migration}</div></div>
                </div>
                <div style={{ padding: "14px 18px", borderBottom: "1px solid #f0efeb" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 8.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5 }}>FINANCIAL MIRROR</div>
                    <div style={{ display: "flex", gap: 2 }}>{([["past", "5yr ago"], ["present", "Today"], ["future", "5yr ahead"]] as const).map(([k, lbl]) => (<button key={k} onClick={e => { e.stopPropagation(); setPeriod(k); }} style={{ padding: "2px 10px", borderRadius: 10, border: "1px solid", cursor: "pointer", fontSize: 9, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.15s", background: period === k ? dc : "transparent", color: period === k ? "#fff" : "#bbb", borderColor: period === k ? dc : "#E8E4E0" }}>{lbl}</button>))}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                    {([["Revenue Growth", f.growth], ["EBITDA Margin", f.margin], ["Valuation Multiple", f.multiple]] as const).map(([lbl, val], i) => (<div key={i} style={{ padding: "8px", background: "#fff", borderRadius: 5, textAlign: "center" }}><div style={{ fontSize: 7.5, color: "#bbb", textTransform: "uppercase", letterSpacing: 1, fontFamily: "'JetBrains Mono', monospace", marginBottom: 3 }}>{lbl}</div><div style={{ fontSize: 15, fontWeight: 700, color: dc }}>{val}</div></div>))}
                  </div>
                  <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5, fontStyle: "italic" }}>{f.note}</div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontSize: 8.5, color: dc, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 5 }}>WHAT PDGMS CHANGES</div>
                  <div style={{ fontSize: 12.5, color: "#333", lineHeight: 1.6 }}>
                    {sel!.r >= 3 && sel!.c >= 3 && "Already compounding. PDGMS makes reviews predictive, plans adaptive, execution self-correcting. ROIC curve steepens."}
                    {sel!.r >= 3 && sel!.c >= 1 && sel!.c < 3 && "Growth real, key-person risk caps multiple. PDGMS makes capability institutional. Market removes the discount."}
                    {sel!.r >= 3 && sel!.c === 0 && "Conviction built this. But conviction doesn't scale. PDGMS encodes your judgment so 50 people can use it."}
                    {sel!.r >= 1 && sel!.r < 3 && sel!.c >= 3 && "Capability without ambition = expensive inertia. PDGMS reconnects machinery to a creation agenda."}
                    {sel!.r >= 1 && sel!.r < 3 && sel!.c >= 1 && sel!.c < 3 && "Profitable, stable, deciding what's next. PDGMS: execution layer to move right and up without breaking what works."}
                    {sel!.r >= 1 && sel!.r < 3 && sel!.c === 0 && "Everything runs through you. PDGMS captures your operating logic so the business has a brain beyond yours."}
                    {sel!.r === 0 && sel!.c >= 3 && "Fortress. PDGMS introduces ambition without instability. AI experimentation at fraction of historical cost."}
                    {sel!.r === 0 && sel!.c >= 1 && sel!.c < 3 && "Assets real, thesis missing. PDGMS connects dormant capability to demand through strategy-execution loops."}
                    {sel!.r === 0 && sel!.c === 0 && "Hardest start. But every Compounder started here. PDGMS: first scaffold, first process, first handoff."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "shifts" && (
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "4px 0 20px" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#888", fontStyle: "italic", margin: "0 0 14px" }}>Every revolution solved one bottleneck — and revealed the next.</p>

          <div style={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", marginBottom: 14 }}>
            {eras.map((e, i) => (
              <button key={i} onClick={() => setEraIdx(i)} style={{ padding: "4px 11px", borderRadius: 14, border: "1px solid", cursor: "pointer", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", transition: "all 0.15s", background: eraIdx === i ? e.color : "transparent", color: eraIdx === i ? "#fff" : "#999", borderColor: eraIdx === i ? e.color : "#E8E4E0" }}>
                {e.name.replace("Post-", "").replace("Pre-", "Pre ")} {e.now && "●"}
              </button>
            ))}
          </div>

          <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.25s" }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 19, fontWeight: 600, color: era.color }}>{era.name}</div>
              <div style={{ fontSize: 11, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>{era.yr}</div>
              <div style={{ fontSize: 13.5, color: "#555", fontStyle: "italic", marginTop: 3 }}>{era.hook}</div>
            </div>

            <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 12 }}>
              {([["tools", "Tools & Software"], ["distribution", "Business Distribution"], ["drivers", "Driver Variables"], ["markets", "Market Rewards"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => setChartView(k)} style={{ padding: "4px 12px", borderRadius: 12, border: "1px solid", cursor: "pointer", fontSize: 9, fontFamily: "'JetBrains Mono', monospace", background: chartView === k ? "#1A1A1A" : "transparent", color: chartView === k ? "#FAF8F5" : "#aaa", borderColor: chartView === k ? "#1A1A1A" : "#E8E4E0" }}>{l}</button>
              ))}
            </div>

            {chartView === "tools" && (
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                  <div style={{ flex: "0 0 200px", padding: "14px 16px", background: `${tools.color}08`, border: `1px solid ${tools.color}20`, borderRadius: 6 }}>
                    <div style={{ fontSize: 8.5, color: tools.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 4 }}>ERA BOTTLENECK</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: tools.color }}>{tools.bottleneck}</div>
                    <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, marginTop: 6 }}>{tools.bottleneckDetail}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 8.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>TOOLS THAT EMERGED</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {tools.tools.map((t, i) => (
                        <div key={i} style={{ padding: "10px 12px", background: "#FAF8F5", border: "1px solid #E8E4E0", borderRadius: 5, borderLeft: `3px solid ${tools.color}40` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{t.name}</span>
                              <span style={{ fontSize: 9, color: tools.color, fontFamily: "'JetBrains Mono', monospace", padding: "1px 6px", background: `${tools.color}08`, borderRadius: 8 }}>{t.category}</span>
                            </div>
                            <span style={{ fontSize: 9, color: "#bbb", fontFamily: "'JetBrains Mono', monospace" }}>{t.year}</span>
                          </div>
                          <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{t.what}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                  <div style={{ padding: "12px 14px", background: "#FAF8F5", border: "1px solid #E8E4E0", borderRadius: 6 }}>
                    <div style={{ fontSize: 8.5, color: "#0A8F3C", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 4 }}>WHAT THESE TOOLS SOLVED</div>
                    <div style={{ fontSize: 12, color: "#333", lineHeight: 1.55 }}>{tools.filled}</div>
                  </div>
                  <div style={{ padding: "12px 14px", background: "#FAF8F5", border: "1px solid #E8E4E0", borderRadius: 6 }}>
                    <div style={{ fontSize: 8.5, color: "#DC2626", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 4 }}>WHAT THEY LEFT UNSOLVED</div>
                    <div style={{ fontSize: 12, color: "#333", lineHeight: 1.55 }}>{tools.left}</div>
                  </div>
                </div>

                <div style={{ padding: "10px 14px", background: `${tools.color}06`, border: `1px solid ${tools.color}15`, borderRadius: 6, marginBottom: 10 }}>
                  <div style={{ fontSize: 8.5, color: tools.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 3 }}>GRID EFFECT</div>
                  <div style={{ fontSize: 12, color: "#444", lineHeight: 1.55 }}>{tools.gridEffect}</div>
                </div>

                {tools.pdgmsIntro && (
                  <div style={{ padding: "18px 20px", background: "#FAF8F5", border: "2px solid #7C3AED25", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, marginBottom: 10 }}>THIS IS WHY PDGMS EXISTS</div>
                    <div style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, marginBottom: 14 }}>
                      Every era&apos;s tools solved the bottleneck of that era. Ledgers solved memory. Factories solved process. ERP solved information. CRM solved customers. Jira solved task visibility. Each tool moved companies one column to the right on the grid.
                    </div>
                    <div style={{ fontSize: 13.5, color: "#333", lineHeight: 1.6, marginBottom: 14 }}>
                      But no tool — across any era — has connected <strong>what leadership decides</strong> to <strong>what teams plan</strong> to <strong>what people execute</strong> to <strong>what the data reveals</strong> in a continuous, intelligent loop.
                    </div>
                    <div style={{ fontSize: 14, color: "#7C3AED", fontWeight: 500, lineHeight: 1.5, marginBottom: 14 }}>
                      AI made the last bottleneck — thinking — solvable by machines. PDGMS is the first system that uses AI to bridge the strategy-execution gap as a continuous loop, not a one-shot exercise.
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {pdgmsStack.map((s, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr", gap: 0, borderRadius: 5, overflow: "hidden", border: "1px solid #E8E4E0" }}>
                          <div style={{ background: "#7C3AED12", padding: "8px 10px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ fontSize: 9, color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{s.layer}</div>
                            <div style={{ fontSize: 8, color: "#888", marginTop: 1 }}>{s.label}</div>
                          </div>
                          <div style={{ padding: "8px 10px", borderLeft: "1px solid #f0efeb" }}>
                            <div style={{ fontSize: 7.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>EXISTING TOOLS</div>
                            <div style={{ fontSize: 10.5, color: "#666", lineHeight: 1.35 }}>{s.existing}</div>
                          </div>
                          <div style={{ padding: "8px 10px", borderLeft: "1px solid #f0efeb" }}>
                            <div style={{ fontSize: 7.5, color: "#DC2626", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>GAP</div>
                            <div style={{ fontSize: 10.5, color: "#666", lineHeight: 1.35 }}>{s.gap}</div>
                          </div>
                          <div style={{ padding: "8px 10px", borderLeft: "1px solid #7C3AED20", background: "#7C3AED06" }}>
                            <div style={{ fontSize: 7.5, color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 2 }}>PDGMS</div>
                            <div style={{ fontSize: 10.5, color: "#333", lineHeight: 1.35, fontWeight: 500 }}>{s.pdgms}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 14, padding: "12px 14px", borderLeft: "3px solid #7C3AED", background: "#7C3AED05", borderRadius: "0 6px 6px 0" }}>
                      <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>
                        Ledgers gave companies financial memory. ERP gave them operational memory. CRM gave them customer memory. <strong>PDGMS gives them strategic memory</strong> — a system that remembers what the company decided, why, what happened, and what to do differently.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {chartView === "distribution" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 780, margin: "0 auto" }}>
                <div>
                  <div style={{ fontSize: 8.5, color: "#bbb", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 6, textAlign: "center" }}>BUSINESS DENSITY MAP</div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: 20, display: "flex", flexDirection: "column-reverse", justifyContent: "space-around" }}>
                      {ROWS.map((l, i) => (<div key={i} style={{ fontSize: 6, color: "#ccc", fontFamily: "'JetBrains Mono', monospace", writingMode: "vertical-lr", transform: "rotate(180deg)", textAlign: "center", height: "20%" }}>{l.split(" ")[0].toUpperCase()}</div>))}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 1.5, aspectRatio: "1" }}>
                        {[4, 3, 2, 1, 0].map(r => [0, 1, 2, 3, 4].map(c => {
                          const val = era.heat[r][c]; const maxVal = Math.max(...era.heat.flat()); const intensity = val / maxVal;
                          const rgb = era.color === "#0F172A" ? "15,23,42" : era.color === "#7C3AED" ? "124,58,237" : era.color === "#EA580C" ? "234,88,12" : era.color === "#0891B2" ? "8,145,178" : era.color === "#6366F1" ? "99,102,241" : era.color === "#92400E" ? "146,64,14" : "120,113,108";
                          return (<div key={`${r}-${c}`} style={{ background: `rgba(${rgb},${0.04 + intensity * 0.8})`, borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background 0.4s" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: intensity > 0.5 ? "#fff" : intensity > 0.2 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)" }}>{val || ""}</div>
                            <div style={{ fontSize: 5.5, color: intensity > 0.5 ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.25)", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>{G[r][c].n}</div>
                          </div>);
                        }))}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#444", lineHeight: 1.55, marginTop: 10, padding: "10px 14px", background: `${era.color}06`, borderRadius: 5, borderLeft: `3px solid ${era.color}30` }}>{era.sub}</div>
                </div>
                <div>
                  <div style={{ fontSize: 8, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 3 }}>CREATION ↔ PRESERVATION</div>
                  <ResponsiveContainer width="100%" height={130}><AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}><XAxis dataKey="era" tick={CF} interval={0} angle={-20} textAnchor="end" height={35} /><YAxis tick={CF} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} /><Tooltip contentStyle={TS} /><Area type="monotone" dataKey="creation" stackId="1" fill="#0A8F3C" fillOpacity={0.25} stroke="#0A8F3C" strokeWidth={1.5} name="Creating" /><Area type="monotone" dataKey="steady" stackId="1" fill="#7C3AED" fillOpacity={0.12} stroke="#7C3AED" strokeWidth={1} name="Steady" /><Area type="monotone" dataKey="preservation" stackId="1" fill="#B8860B" fillOpacity={0.2} stroke="#B8860B" strokeWidth={1.5} name="Preserving" /></AreaChart></ResponsiveContainer>
                  <div style={{ fontSize: 8, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 3, marginTop: 10 }}>PEOPLE ↔ SYSTEMS</div>
                  <ResponsiveContainer width="100%" height={130}><AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}><XAxis dataKey="era" tick={CF} interval={0} angle={-20} textAnchor="end" height={35} /><YAxis tick={CF} domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} /><Tooltip contentStyle={TS} /><Area type="monotone" dataKey="people" stackId="1" fill="#0033CC" fillOpacity={0.2} stroke="#0033CC" strokeWidth={1.5} name="People" /><Area type="monotone" dataKey="emerging" stackId="1" fill="#8B5CF6" fillOpacity={0.12} stroke="#8B5CF6" strokeWidth={1} name="Emerging" /><Area type="monotone" dataKey="systems" stackId="1" fill="#0A8F3C" fillOpacity={0.25} stroke="#0A8F3C" strokeWidth={1.5} name="Systems" /></AreaChart></ResponsiveContainer>
                </div>
              </div>
            )}

            {chartView === "drivers" && (
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ fontSize: 8.5, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 6, textAlign: "center" }}>ACCESSIBILITY OF KEY BUSINESS DRIVERS (0 = SCARCE → 100 = DEMOCRATISED)</div>
                <ResponsiveContainer width="100%" height={280}><LineChart data={accessData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" /><XAxis dataKey="era" tick={CF} interval={0} angle={-20} textAnchor="end" height={35} /><YAxis tick={CF} domain={[0, 100]} /><Tooltip contentStyle={TS} /><Line type="monotone" dataKey="Capital Access" stroke="#B8860B" strokeWidth={1.5} dot={{ r: 2.5 }} /><Line type="monotone" dataKey="Technology Access" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} /><Line type="monotone" dataKey="Management Science" stroke="#0A8F3C" strokeWidth={1.5} dot={{ r: 2.5 }} /><Line type="monotone" dataKey="Information Flow" stroke="#0891B2" strokeWidth={1.5} dot={{ r: 2.5 }} /><Line type="monotone" dataKey="Talent Mobility" stroke="#EA580C" strokeWidth={1.5} dot={{ r: 2.5 }} /><Line type="monotone" dataKey="Market Reach" stroke="#0033CC" strokeWidth={1.5} dot={{ r: 2.5 }} /><Legend wrapperStyle={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }} /></LineChart></ResponsiveContainer>
                <div style={{ fontSize: 11, color: "#777", fontStyle: "italic", lineHeight: 1.5, marginTop: 8, textAlign: "center" }}>Each revolution bent one or two curves. AI is the first era where all six cross 75% simultaneously.</div>
              </div>
            )}

            {chartView === "markets" && (
              <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ fontSize: 8.5, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 3, textAlign: "center" }}>VALUATION MULTIPLES: MEDIAN vs TOP DECILE</div>
                <ResponsiveContainer width="100%" height={160}><BarChart data={marketData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" /><XAxis dataKey="era" tick={CF} interval={0} angle={-20} textAnchor="end" height={35} /><YAxis tick={CF} /><Tooltip contentStyle={TS} /><Bar dataKey="avgMultiple" fill="#B8860B" fillOpacity={0.35} name="Median" radius={[2, 2, 0, 0]} /><Bar dataKey="topDecileMultiple" fill="#7C3AED" fillOpacity={0.5} name="Top Decile" radius={[2, 2, 0, 0]} /></BarChart></ResponsiveContainer>
                <div style={{ fontSize: 8.5, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 3, marginTop: 12, textAlign: "center" }}>EBITDA MARGINS: MEDIAN vs TOP DECILE</div>
                <ResponsiveContainer width="100%" height={140}><BarChart data={marketData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#E8E4E0" /><XAxis dataKey="era" tick={CF} interval={0} angle={-20} textAnchor="end" height={35} /><YAxis tick={CF} tickFormatter={(v: number) => `${v}%`} /><Tooltip contentStyle={TS} /><Bar dataKey="medianMargin" fill="#0A8F3C" fillOpacity={0.3} name="Median EBITDA %" radius={[2, 2, 0, 0]} /><Bar dataKey="topDecileMargin" fill="#0A8F3C" fillOpacity={0.6} name="Top Decile EBITDA %" radius={[2, 2, 0, 0]} /></BarChart></ResponsiveContainer>
                <div style={{ fontSize: 11, color: "#777", fontStyle: "italic", lineHeight: 1.5, marginTop: 8, textAlign: "center" }}>The gap between median and top-decile widens every revolution. The market rewards companies that absorbed the revolution into their operating model.</div>
              </div>
            )}
          </div>

          <div style={{ maxWidth: 600, margin: "20px auto 0", padding: "16px 20px", background: "#FAF8F5", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 7 }}>
            <div style={{ fontSize: 14, color: "#1A1A1A", lineHeight: 1.55 }}>Steam made <em>doing</em> cheaper. Computers made <em>remembering</em> cheaper. Internet made <em>reaching</em> cheaper. Mobile made <em>connecting</em> cheaper.</div>
            <div style={{ fontSize: 15, color: "#7C3AED", lineHeight: 1.5, fontWeight: 500, margin: "8px 0" }}>AI makes <em>thinking</em> cheaper. That&apos;s the last domino.</div>
            <div style={{ fontSize: 12.5, color: "#777", lineHeight: 1.55 }}>Every revolution pushed businesses toward the top-right and widened the gap between those who moved and those who didn&apos;t. PDGMS is the migration vehicle for the AI era.</div>
          </div>
        </div>
      )}
    </div>
  );
}
