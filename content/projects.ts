// Every project on the site lives here. Adding a project = adding one entry:
// its card, skill highlighting and (if `caseStudy` is set) its /work/[slug] page are generated from it.
// Facts and numbers come only from each project's README / RESULTS.md. Text in [BRACKETS] is a placeholder.

export const skills = [
  "Product discovery",
  "LLM engineering",
  "Evals",
  "Data analysis",
  "Research design",
  "Go-to-market",
  "Operations",
] as const;
export type Skill = (typeof skills)[number];

export type Stat = { value: string; label: string };
export type Signature = "route" | "clusters" | "tokens" | "fork" | "ticker" | "panel";

export type CaseStudy = {
  pitch: string;
  stack: string[];
  tldr: { problem: string; built: string; result: string };
  problem: string[];
  who: string[];
  steps: { title: string; body: string }[];
  decisions: { chose: string; over: string; because: string }[];
  evidence: { stats: Stat[]; body: string[] };
  didntWork: string[];
  next: string[];
};

export type Project = {
  slug: string;
  name: string;
  kind: "venture" | "ai";
  status: string;
  oneLiner: string;
  problem: string;
  role: string;
  headline: Stat;
  stats: Stat[];
  tags: string[];
  skills: Skill[];
  liveUrl: string | null;
  githubUrl: string | null;
  tint: string;
  dark?: boolean;
  signature: Signature;
  caseStudy?: CaseStudy;
  hidden?: boolean; // keep the entry but leave it off the site
};

const SOLO = "Solo: PRD, design, build, evaluation, launch";

const allProjects: Project[] = [
  {
    slug: "trido",
    name: "Trido Rentals",
    kind: "venture",
    status: "Exited",
    oneLiner:
      "A two-wheeler rental marketplace that helps travellers find and rent bikes and scooters in Uttarakhand’s hill-station towns. Co-founded with a friend; idea to launch in 7 days.",
    problem: "Travellers in Uttarakhand’s hill-station towns need an easy way to find and rent a two-wheeler.",
    role: "Co-founder: product, operations, customer acquisition and creator partnerships",
    headline: { value: "1,000+", label: "customers served" },
    stats: [
      { value: "1,000+", label: "customers served" },
      { value: "$10,000", label: "revenue in our peak month" },
      { value: "7 days", label: "from idea to launch" },
    ],
    tags: ["Marketplace", "0→1", "Go-to-market", "Operations", "Partnerships"],
    skills: ["Go-to-market", "Operations", "Product discovery"],
    liveUrl: "https://trido.in",
    githubUrl: null,
    tint: "#16161A",
    dark: true,
    signature: "route",
  },
  {
    slug: "overrun",
    name: "Overrun",
    kind: "ai",
    status: "Live",
    oneLiner:
      "Why your LLM bill doesn’t match your estimate. Counts tokens with real tokenizers in the browser, prices them exactly, and reconciles the estimate against what the provider reports.",
    problem: "Teams plan LLM features with “4 characters ≈ 1 token”, then the bill comes in higher.",
    role: SOLO,
    headline: { value: "5.35×", label: "how far the 4-characters rule underestimates Tamil" },
    stats: [
      { value: "5.35×", label: "how far the 4-characters rule underestimates Tamil" },
      { value: "100%", label: "of the held-out token gap explained" },
    ],
    tags: ["Tokenizers", "LLM cost", "Measurement study"],
    skills: ["Research design", "Data analysis", "LLM engineering"],
    liveUrl: "https://overrun-ashy.vercel.app",
    githubUrl: "https://github.com/divyamunderconfident/overrun",
    tint: "#FFC66E",
    signature: "tokens",
    caseStudy: {
      pitch: "Estimate what an LLM request will cost, check what the provider reports, and explain the gap.",
      stack: ["Next.js", "js-tiktoken", "@huggingface/transformers", "BigInt pricing", "Groq / Gemini", "TypeScript study"],
      tldr: {
        problem: "The “4 characters per token” rule breaks for non-English text, code, JSON and emoji, so LLM bills overrun estimates.",
        built: "An in-browser estimator with real tokenizers, integer nano-dollar pricing and reconciliation, plus a study across 10 languages and 4 tokenizers.",
        result: "The rule underestimates Tamil by 5.35× on cl100k_base; on held-out requests the named reasons explain 100% of the input-token gap.",
      },
      problem: [
        "Teams plan LLM features with a rough rule such as “4 characters is about 1 token”, then the bill comes in higher. The rule breaks for non-English text, code, JSON and emoji, it ignores system prompts and output tokens, and cached tokens get counted twice by mistake.",
        "Floating-point cost maths adds small rounding errors that add up over millions of calls.",
      ],
      who: [
        "PMs and engineers sizing the cost of an LLM feature before building it.",
        "Anyone checking an LLM usage log against a budget.",
      ],
      steps: [
        { title: "Estimate", body: "A labelled estimate from Unicode characters, with its rule shown." },
        { title: "Count", body: "Real tokenizers in the browser (o200k_base, cl100k_base, Llama 3.1, Gemma 3), loaded on demand." },
        { title: "Price", body: "Integer nano-dollars with BigInt and dated rate cards, so totals never drift." },
        { title: "Reconcile", body: "Compares the estimate with the provider’s reported usage and names the reasons for the gap." },
        { title: "Study", body: "200 samples across 10 languages, code, markdown, JSON and emoji, plus 50 real free-tier requests." },
      ],
      decisions: [
        {
          chose: "integer nano-dollars (BigInt)",
          over: "floating-point dollars",
          because: "float rounding errors add up over millions of calls; integers never drift.",
        },
        {
          chose: "real tokenizers running in the browser",
          over: "a character-count rule",
          because: "the rule is off by up to 5.35×, and in-browser counting needs no key and no upload.",
        },
        {
          chose: "measuring provider overhead on one random half and testing on the other",
          over: "fitting on all 50 requests",
          because: "a held-out half (seed 20261027) shows the explanation generalises instead of just fitting the data.",
        },
        {
          chose: "Gemma 3’s tokenizer as a stand-in for Gemini",
          over: "skipping Gemini",
          because: "Gemini’s tokenizer is not public; Gemma 3 is its closest open relative, and the mismatch is reported, not hidden.",
        },
      ],
      evidence: {
        stats: [
          { value: "5.35×", label: "Tamil on cl100k_base (0.74 characters per token)" },
          { value: "1.41×", label: "Tamil on o200k_base (2.8 characters per token)" },
          { value: "0.84×", label: "English news prose on o200k_base: an overestimate" },
          { value: "0 of 1,067", label: "held-out input tokens left unexplained" },
        ],
        body: [
          "In 50 real free-tier requests, openai/gpt-oss-20b on Groq reported 71 more input tokens than the o200k_base count (74 with a system prompt), on every request. gemini-3.1-flash-lite reported 1 more than the Gemma 3 count.",
          "Chinese and Japanese are also far off on every tokenizer: 3.09× and 3.12× on o200k_base.",
        ],
      },
      didntWork: [
        "Gemini’s tokenizer isn’t public, so part of the Gemini overhead spread is tokenizer mismatch, not overhead.",
        "The median estimate error was still −76.7% for gpt-oss-20b and −38.5% for gemini-3.1-flash-lite: the rule alone is not usable.",
        "Rate cards are dated fixtures from 2026-10-26/27, not current prices.",
      ],
      next: [
        "Extend the real usage check beyond the two free-tier models.",
        "Keep rate cards current instead of dated fixtures.",
      ],
    },
  },
  {
    slug: "retrace",
    name: "Retrace",
    kind: "ai",
    status: "Live",
    oneLiner:
      "A time-travel debugger for AI agents: record every step, replay it for free, fork it at any step with an edit, and diff two runs to find where they split.",
    problem: "Agents fail deep into a run, and the evidence is a wall of JSON logs.",
    role: SOLO,
    headline: { value: "10/10", label: "seeded bugs where the diff found the exact broken step" },
    stats: [
      { value: "10/10", label: "seeded bugs where the diff found the exact broken step" },
      { value: "0", label: "tokens spent replaying a recorded run" },
    ],
    tags: ["Agents", "Developer tools", "Evals"],
    skills: ["LLM engineering", "Evals", "Research design"],
    liveUrl: "https://retrace-debugger.vercel.app",
    githubUrl: "https://github.com/divyamunderconfident/retrace",
    tint: "#B9B1EE",
    signature: "fork",
    caseStudy: {
      pitch: "Record, replay, fork and diff plain SDK agent loops.",
      stack: ["Python", "SQLite", "sha256 replay", "Groq / Gemini / Ollama", "Next.js viewer", "pytest"],
      tldr: {
        problem: "Agents fail deep into a run, re-running costs tokens, and the bug may not reproduce.",
        built: "A recorder that wraps the model and tools, deterministic replay at zero tokens, fork-with-edit at any step, and a run diff.",
        result: "The diff’s first divergence was the mutated step in 10 of 10 seeded bugs; the 2× root-cause target was not met.",
      },
      problem: [
        "Agents fail deep into a run (step 14 of 30), and the evidence is a wall of JSON logs. Re-running from scratch costs tokens and time, and the bug may not reproduce because model outputs vary.",
        "Testing a fix (“what if the tool description were clearer?”) means re-running everything and hoping the earlier steps play out the same way.",
      ],
      who: [
        "Developers building tool-using agents directly on a model provider’s Python SDK.",
        "AI PMs who need to understand why an agent behaved the way it did.",
      ],
      steps: [
        { title: "Record", body: "Two lines wrap llm.complete and your tools; each step’s input, output, tokens and latency go to SQLite." },
        { title: "Replay", body: "A step whose type, name and input hash matches a recorded one is served from the record: zero tokens." },
        { title: "Fork", body: "Replay to step N, apply an edit there, and run live from that step onward." },
        { title: "Diff", body: "The first step where two runs differ, the paths that changed and the token delta, as JSON and a short report." },
      ],
      decisions: [
        {
          chose: "framework-agnostic recording of plain SDK loops",
          over: "a framework integration",
          because: "LangGraph already has checkpoint time travel for its own agents; plain SDK loops had nothing.",
        },
        {
          chose: "matching steps by a sha256 of their type, name and input",
          over: "matching by position",
          because: "replay then serves exactly what happened before, and any call that matches nothing raises ReplayDivergence instead of silently drifting.",
        },
        {
          chose: "never running side-effecting tools during replay",
          over: "re-executing every tool",
          because: "a fork must never repeat a call the original run already made.",
        },
        {
          chose: "a static, read-only site",
          over: "a live hosted debugger",
          because: "all model calls run locally, so the public site costs $0 and never calls a model.",
        },
      ],
      evidence: {
        stats: [
          { value: "10 of 10", label: "mutations where the diff’s first divergence was the mutated step" },
          { value: "8 vs 8", label: "root cause right from raw logs vs the diff report" },
          { value: "9 vs 10", label: "step right from raw logs vs the diff report" },
          { value: "0", label: "tokens to replay a recorded run" },
        ],
        body: [
          "A small mutation experiment: 10 seeded bugs in the demo agent, 2 for each of 5 bug types, one trial each, on groq/openai/gpt-oss-20b at temperature 0. The analyst model (gemini-3.5-flash-lite) got either both runs’ JSON logs or the diff report.",
        ],
      },
      didntWork: [
        "The PRD target (the diff report right at least twice as often as raw logs) was not met: 8 of 10 both ways.",
        "The demo runs are 3–8 steps, short enough to read whole, so the long-run case isn’t tested.",
        "Experiment A is easy by construction: steps before each bug come from the cache and are identical.",
        "Unstable inputs (a timestamp, a random ID) break replay; there’s no option yet to leave fields out of the hash.",
      ],
      next: [
        "Build R6, a local live UI with an edit-and-fork panel, and R8, export a failing step as a test.",
        "Run the PRD’s 50-run replay-fidelity measurement and test on long runs, where raw logs become unreadable.",
      ],
    },
  },
  {
    slug: "unmet",
    name: "Unmet",
    kind: "ai",
    status: "Live, updates daily",
    oneLiner:
      "What are people asking someone to build? Ranks the problems people publicly say they want solved, read from Hacker News and Stack Exchange.",
    problem: "Founders and PMs spend hours reading forums to find problems worth solving, then decide on gut feel.",
    role: SOLO,
    headline: { value: "Daily", label: "the site updates itself" },
    stats: [
      { value: "101", label: "posts read in the first 30-day run, 50 real needs" },
      { value: "Top 20", label: "ranked problems, refreshed every day" },
    ],
    tags: ["Market research", "LLM classification", "Data pipeline"],
    skills: ["Product discovery", "Data analysis", "LLM engineering"],
    liveUrl: "https://unmet-tau.vercel.app",
    githubUrl: "https://github.com/divyamunderconfident/unmet",
    tint: "#F2B7EF",
    signature: "ticker",
    caseStudy: {
      pitch: "A site that updates itself every day with the problems people publicly ask someone to build.",
      stack: ["Python", "Hacker News Algolia API", "Stack Exchange API", "gpt-oss-20b on Groq", "fastembed", "GitHub Actions", "Next.js"],
      tldr: {
        problem: "Founders and PMs spend hours reading forums to find problems worth solving, then still decide on gut feel.",
        built: "A daily pipeline that fetches posts with need phrases, classifies them, groups them into problems and ranks the top 20 on a static site.",
        result: "First 30-day run: 101 posts classified, 50 judged needs, 48 problems, top 20 shown.",
      },
      problem: [
        "Founders and PMs spend hours reading forums to find problems worth solving, then still decide on gut feel.",
        "“Voice of the market” research is a paid category. GummySearch, a popular paid tool for mining Reddit, closed on 30 November 2025 because Reddit’s API rules forbid commercial use.",
      ],
      who: [
        "Founders and PMs looking for problems with real demand behind them.",
        "Builders looking for a side project that people already want.",
      ],
      steps: [
        { title: "Fetch", body: "Posts containing a need phrase (“I wish there was”, “would pay for”…) from HN and Stack Exchange. Every response is cached." },
        { title: "Classify", body: "The model reads 20 posts per call and returns is_need, a one-line problem, pain 1–3 and a pay signal." },
        { title: "Group", body: "Problem lines are embedded locally; each need joins the closest group at cosine ≥ 0.6, else starts a new one." },
        { title: "Rank", body: "Distinct people × recency (halves every 14 days) × pain, × 1.5 if anyone would pay. The model names the top 20." },
        { title: "Publish", body: "A daily GitHub Actions run commits the new JSON; Vercel redeploys. The site never calls a model." },
      ],
      decisions: [
        {
          chose: "Hacker News and Stack Exchange",
          over: "Reddit",
          because: "Reddit’s API rules forbid commercial use (that is what closed GummySearch); these public APIs allow it.",
        },
        {
          chose: "exact need phrases",
          over: "broad keyword search",
          because: "they’re precise, at the cost of volume.",
        },
        {
          chose: "caching every model call on disk by a hash of its input",
          over: "calling live every run",
          because: "at the daily free quota the run stops cleanly and the next run resumes for free.",
        },
        {
          chose: "a static site that only reads one JSON file",
          over: "calling a model per visit",
          because: "it runs on its own for $0 once launched.",
        },
      ],
      evidence: {
        stats: [
          { value: "101", label: "posts fetched and classified (25 Oct 2026, last 30 days)" },
          { value: "50", label: "judged to be needs" },
          { value: "48", label: "problems after grouping" },
          { value: "Top 20", label: "shown on the site" },
        ],
        body: [
          "Numbers from site/public/data/problems.json for the first run. Short quotes are kept with a link and the author’s name.",
        ],
      },
      didntWork: [
        "Precision isn’t measured yet: no hand-labelled sample exists, and the site says so. Some “needs” are misreadings.",
        "Low volume: 101 posts in 30 days, so nearly every problem is raised by one person and ranking is driven mostly by recency and pain.",
        "Stack Exchange adds little: its search doesn’t support exact phrases; only 2 of the 50 needs came from it.",
        "Grouping is greedy and order-dependent; the 0.6 threshold wasn’t tuned against labels.",
      ],
      next: [
        "Label 50 random classified posts and publish the precision on the site.",
        "Add the planned RSS feed, trend lines and a backtest.",
      ],
    },
  },
  {
    slug: "feedback-to-roadmap",
    name: "Feedback to Roadmap",
    kind: "ai",
    status: "Live",
    oneLiner:
      "Turns a CSV of reviews, tickets or survey answers into ranked problems, each backed by quotes checked word for word against the source.",
    problem: "PMs either read thousands of comments by hand or skim them, and chatbot summaries invent themes.",
    role: SOLO,
    headline: { value: "3,542", label: "real App Store reviews in the demo" },
    stats: [
      { value: "3,542", label: "real App Store reviews in the demo" },
      { value: "$0", label: "to host: the heavy work runs in your browser" },
    ],
    tags: ["Embeddings in the browser", "Clustering", "Grounded LLM output"],
    skills: ["Product discovery", "LLM engineering", "Evals", "Data analysis"],
    liveUrl: "https://feedback-to-roadmap-three.vercel.app",
    githubUrl: "https://github.com/divyamunderconfident/feedback-to-roadmap",
    tint: "#A9DDD3",
    signature: "clusters",
    caseStudy: {
      pitch: "From messy feedback to ranked problems, with a receipt for every claim.",
      stack: ["Next.js", "transformers.js", "all-MiniLM-L6-v2", "Ward clustering", "Gemini / Groq", "Python eval"],
      tldr: {
        problem: "PMs read thousands of comments by hand or skim them; a quick chatbot summary often invents themes.",
        built: "A browser app that groups feedback into themes, names them with your own key, and hides any claim whose quote isn’t found word for word.",
        result: "A demo on 3,542 real App Store reviews of 12 apps; 39.7% macro precision against the AWARE labels at 20 themes.",
      },
      problem: [
        "Feedback piles up in reviews, tickets and survey answers. PMs either read thousands of comments by hand or skim them, and a quick “paste it all into a chatbot” summary often invents themes and misses small but painful ones.",
        "AI feedback analysis is an active paid market (Dovetail, Enterpret, Unwrap and others). Feedback to Roadmap does the core job for $0, with a receipt behind every claim.",
      ],
      who: [
        "PMs and founders at small startups with no budget for paid feedback tools.",
        "UX researchers who need a quick first pass over open-text answers.",
      ],
      steps: [
        { title: "Upload", body: "Drop a CSV and pick the text column, plus optional rating, date and segment. The file never leaves your browser." },
        { title: "Group", body: "Sentences of 5+ words are embedded in a Web Worker, split into 40 small groups and merged step by step (Ward linkage)." },
        { title: "Name", body: "With your own key, a model gets up to 30 sentences per theme and returns a name, a problem statement and up to 3 quoted claims." },
        { title: "Check", body: "Every quote must appear word for word in the review it cites; claims that fail are hidden and counted." },
        { title: "Size and rank", body: "Share, average rating, segments and trend are computed in code, never by the model. Export as Markdown or CSV." },
      ],
      decisions: [
        {
          chose: "a slider for the number of themes",
          over: "one fixed number",
          because: "there is no single right level of detail, so the PM picks it. The AWARE labels favoured 20 over 12, so 20 is the default.",
        },
        {
          chose: "counting only sentences that match the theme’s problem statement (similarity ≥ 0.30)",
          over: "counting every sentence in the cluster",
          because: "it keeps the sizes honest; the rest are shown as “loosely related”.",
        },
        {
          chose: "running embeddings in the browser with the visitor’s own key",
          over: "a hosted backend",
          because: "it costs $0 to host and the file never leaves the browser.",
        },
        {
          chose: "keeping the threshold at 0.30",
          over: "the 0.25 that scored best on F1",
          because: "macro precision barely moved between 0.25 and 0.40, so F1 mostly rewarded recall, and a hand check found sentences near 0.30 mostly off-topic already.",
        },
      ],
      evidence: {
        stats: [
          { value: "3,542", label: "real App Store reviews of 12 apps in the demo" },
          { value: "39.7%", label: "macro precision at 20 themes (36.2% at 12)" },
          { value: "5,853", label: "of 21,761 sentences link to an AWARE label" },
          { value: "4.6%", label: "macro recall at 20 themes (3.8% at 12)" },
        ],
        body: [
          "One run on the demo data, themes named by gemini-3.5-flash-lite, scored against the AWARE aspect labels at the site’s threshold of 0.30.",
          "AWARE’s categories are broad (usability, cost, security…), so these numbers measure agreement with that classification, not whether a theme is right. With 20 themes the biggest mixed themes split into narrower ones, for example “Pricing and subscription models” (63.4% cost at 0.25).",
        ],
      },
      didntWork: [
        "Similarity is a weak filter: an earlier hand check found sentences near the 0.30 threshold mostly off-topic.",
        "The quote check proves a quote exists, not that it supports the claim. The share of claims that pass hasn’t been measured yet.",
        "Some themes are generic (praise, “I’ve used this app for years”), and naming is not deterministic between runs.",
        "Embedding about 22,000 demo sentences takes a few minutes in the browser, so the demo is precomputed.",
      ],
      next: [
        "Run the hand-labelling tool to check the 0.30 threshold on a labelled sample.",
        "Measure the share of claims that pass the quote check.",
      ],
    },
  },
  {
    slug: "panel-check",
    name: "Panel Check",
    kind: "ai",
    status: "Live",
    oneLiner: "A synthetic user panel, validated against real survey results. [ONE-LINE DESCRIPTION]",
    problem: "Can AI personas predict real survey answers? A pre-registered test against the Stack Overflow Developer Survey.",
    role: SOLO,
    headline: { value: "[N]", label: "[RESULT 1 CAPTION]" },
    stats: [
      { value: "[N]", label: "[RESULT 1 CAPTION]" },
      { value: "[N]", label: "[RESULT 2 CAPTION]" },
    ],
    tags: ["Synthetic users", "Survey validation", "User research"],
    skills: ["Research design", "Evals", "Product discovery"],
    liveUrl: null,
    githubUrl: null,
    tint: "#55555B",
    dark: true,
    signature: "panel",
    hidden: true,
  },
];

export const projects = allProjects.filter((p) => !p.hidden);
export const aiProjects = projects.filter((p) => p.kind === "ai");
export const ventures = projects.filter((p) => p.kind === "venture");
export const caseStudies = projects.filter((p) => p.caseStudy);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const skillId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
