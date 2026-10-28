import {
  siGithubactions, siGooglegemini, siHuggingface, siJavascript, siModelcontextprotocol, siNextdotjs,
  siNodedotjs, siOllama, siPython, siReact, siRust, siSqlite, siTailwindcss, siTypescript, siVercel,
} from "simple-icons";

// Personal details. `null` = not provided yet; the site shows a clearly marked placeholder.
export const site = {
  name: "Divyam Saini",
  url: "https://divyams-portfolio.vercel.app",
  email: "divyam_s1@ce.iitr.ac.in" as string | null,
  linkedin: "https://www.linkedin.com/in/divyamsaini2712/" as string | null,
  github: "https://github.com/divyamunderconfident",
  resume: "/resume.pdf",
  photo: "/profile.png" as string | null, // background-removed cutout; null shows the placeholder
  roles: ["AI Engineer", "Product Manager", "Product Strategist", "AI Researcher", "Founder", "Builder"],
  bio: "I build products end to end and measure whether they work. Co-founder of Trido Rentals. IIT Roorkee ’28.",
};

export const steps = [
  { title: "PRD", body: "I write down who it’s for, what it must do, and how I’ll know it worked." },
  { title: "Design", body: "I sketch the screens and flows before building, so the scope stays honest." },
  { title: "Build", body: "I build it end to end myself, from the data pipeline to the live site." },
  { title: "Measure", body: "I test against real labels and report what didn’t work." },
  { title: "Ship", body: "It goes live for anyone to try, with its limits written down." },
];

// Internship numbers are from Divyam's resume. Entries with `stats` also show as cards under Work.
type Experience = { role: string; org: string; dates: string; stats?: { value: string; label: string }[] };
export const experience: Experience[] = [
  { role: "Convener, E-Summit ’27", org: "Entrepreneurship Cell, IIT Roorkee", dates: "" },
  {
    role: "Founders’ Office Intern",
    org: "HeadsUp AI",
    dates: "May 2026 – June 2026",
    stats: [
      { value: "10,000+", label: "users on the top app I led" },
      { value: "5+", label: "products owned" },
      { value: "4+", label: "product launches" },
    ],
  },
  {
    role: "Market Research Intern",
    org: "DGTLmart",
    dates: "July 2025 – September 2025",
    stats: [
      { value: "10,000+", label: "creators on the platform" },
      { value: "15+", label: "competitors researched" },
      { value: "20+", label: "product initiatives" },
      { value: "90-day", label: "GTM roadmap" },
    ],
  },
];
export const internships = experience.filter((e) => e.stats);

// Captions describe only what is visible in each photo.
const photos = [
  { src: "/gallery/tech-gc.jpg", alt: "Divyam with four teammates holding trophies and Tech GC 2025–26 medals", caption: "Tech GC 2025–26" },
  { src: "/gallery/srcc-case.jpg", alt: "Divyam's team on stage receiving a certificate at the SRCC Case Championship", caption: "Case Championship, SRCC" },
  { src: "/gallery/metro.jpg", alt: "Divyam and two teammates in suits on the metro, one holding a laptop", caption: "On the way, in suits" },
];
// Add a photo to `photos` to add a slide.
export const gallery = photos.map((ph, i) => ({ ...ph, tint: ["#A9DDD3", "#FFC66E", "#B9B1EE", "#F2B7EF"][i % 4] }));

// Tech marquee in the skills tile. Logos: Simple Icons (CC0).
const brightness = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b;
};
export const tech = [
  siTypescript, siJavascript, siPython, siRust, siNodedotjs, siModelcontextprotocol, siNextdotjs, siReact,
  siTailwindcss, siSqlite, siHuggingface, siGooglegemini, siOllama, siGithubactions, siVercel,
].map(({ title, path, hex }) => ({
  title: title === "Model Context Protocol" ? "MCP" : title,
  path,
  fill: brightness(hex) < 70 ? "#FFFFFF" : `#${hex}`, // very dark logos would vanish on the dark tiles
}));
