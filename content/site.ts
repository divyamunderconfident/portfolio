// Personal details. `null` = not provided yet; the site shows a clearly marked placeholder.
export const site = {
  name: "Divyam Saini",
  url: "https://divyam-saini-portfolio.vercel.app",
  email: null as string | null, // e.g. "you@example.com"
  linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/…"
  github: "https://github.com/divyamunderconfident",
  resume: "/resume.pdf", // placeholder PDF until the real one replaces public/resume.pdf
  photo: null as string | null, // set to "/photo.jpg" once public/photo.jpg exists
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

export const experience = [
  { role: "Convener, E-Summit ’27", org: "Entrepreneurship Cell, IIT Roorkee", dates: "[DATES]" },
  { role: "Founders’ Office Intern", org: "HeadsUp AI", dates: "[DATES]" },
  { role: "Intern", org: "DGTLmart", dates: "[DATES]" },
];

export const gallery = ["#A9DDD3", "#FFC66E", "#B9B1EE", "#F2B7EF", "#D9D7E6", "#A9DDD3"].map((tint) => ({
  tint,
  src: null as string | null,
  caption: "[CAPTION]",
}));
