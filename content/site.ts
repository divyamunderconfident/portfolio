import {
  siGithubactions, siGooglegemini, siHuggingface, siJavascript, siModelcontextprotocol, siNextdotjs,
  siNodedotjs, siOllama, siPython, siReact, siRust, siSqlite, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";

// Personal details. `null` = not provided yet; the site shows a clearly marked placeholder.
export const site = {
  name: "Divyam Saini",
  url: "https://divyams-portfolio.vercel.app",
  email: null as string | null, // e.g. "you@example.com"
  linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/…"
  github: "https://github.com/divyamunderconfident",
  resume: "/resume.pdf", // placeholder PDF until the real one replaces public/resume.pdf
  photo: "/photo.png" as string | null, // background-removed cutout; null shows the placeholder
  roles: ["AI Engineer", "Product Manager", "Product Strategist", "AI Researcher", "Founder", "Builder"],
  bio: "I build AI products end to end and measure whether they work. Co-founder of Trido Rentals. IIT Roorkee ’28.",
};

export const steps = [
  { title: "PRD", body: "I write down who it’s for, what it must do, and how I’ll know it worked." },
  { title: "Design", body: "I sketch the screens and flows before building, so the scope stays honest." },
  { title: "Build", body: "I build it end to end myself, from the data pipeline to the live site." },
  { title: "Measure", body: "I test against real labels and report what didn’t work." },
  { title: "Ship", body: "It goes live for anyone to try, with its limits written down." },
];

export const writing = [
  { title: "Product requirement docs for 6 AI products", kind: "PRDs", href: null as string | null },
  { title: "Beginner notes: Karpathy’s Deep Dive into LLMs", kind: "Notes", href: null as string | null },
  { title: "Beginner notes: How I use LLMs", kind: "Notes", href: null as string | null },
];

// Internship details and numbers are from Divyam's resume. Entries with `highlights` also show as cards under Work.
type Experience = { role: string; org: string; dates: string; stat?: { value: string; label: string }; highlights?: string[] };
export const experience: Experience[] = [
  { role: "Convener, E-Summit ’27", org: "Entrepreneurship Cell, IIT Roorkee", dates: "[DATES]" },
  {
    role: "Founders’ Office Intern",
    org: "HeadsUp AI",
    dates: "May 2026 – June 2026",
    stat: { value: "10,000+", label: "users on the app I led product strategy for" },
    highlights: [
      "Built niche SaaS products, owning product development, GTM strategy and growth across 5+ AI products.",
      "Led product strategy for the highest-performing app, driving user research and growth to 10,000+ users.",
      "Directed go-to-market through competitor benchmarking and content strategy across 4+ product launches.",
      "Ran monetization and growth initiatives with other teams to speed up product adoption.",
    ],
  },
  {
    role: "Market Research Intern",
    org: "DGTLmart",
    dates: "July 2025 – September 2025",
    stat: { value: "10,000+", label: "creators on the influencer marketing platform" },
    highlights: [
      "Helped brands discover and collaborate with 10,000+ creators through a centralized influencer marketing platform.",
      "Researched creator-economy trends and 15+ competitors to design brand funnels with 20+ product initiatives.",
      "Developed a 90-day GTM roadmap and monetization strategy across SaaS, API and commission-based revenue models.",
    ],
  },
];
export const internships = experience.filter((e) => e.highlights);

// Captions describe only what is visible in each photo; [CAPTION] slots are still to be filled.
const photos = [
  { src: "/gallery/tech-gc.jpg", alt: "Divyam with four teammates holding trophies and Tech GC 2025–26 medals", caption: "Tech GC 2025–26" },
  { src: "/gallery/srcc-case.jpg", alt: "Divyam's team on stage receiving a certificate at the SRCC Case Championship", caption: "Case Championship, SRCC" },
  { src: "/gallery/metro.jpg", alt: "Divyam and two teammates in suits on the metro, one holding a laptop", caption: "On the way, in suits" },
];
export const gallery = ["#A9DDD3", "#FFC66E", "#B9B1EE", "#F2B7EF", "#D9D7E6", "#A9DDD3"].map((tint, i) => ({
  tint,
  src: photos[i]?.src ?? null,
  alt: photos[i]?.alt ?? "",
  caption: photos[i]?.caption ?? "[CAPTION]",
}));

// Tech marquee in the skills tile. Logos: Simple Icons (CC0).
export const tech = [
  siTypescript, siJavascript, siPython, siRust, siNodedotjs, siModelcontextprotocol, siNextdotjs, siReact,
  siTailwindcss, siSqlite, siHuggingface, siGooglegemini, siOllama, siGithubactions, siVercel,
].map(({ title, path, hex }) => ({ title: title === "Model Context Protocol" ? "MCP" : title, path, hex }));
