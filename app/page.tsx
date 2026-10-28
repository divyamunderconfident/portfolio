import Image from "next/image";
import { aiProjects, projects, ventures } from "@/content/projects";
import { experience, internships, site, steps, writing } from "@/content/site";
import { Gallery } from "@/components/Gallery";
import { RotatingRole } from "@/components/Motion";
import { Button, Corner, Heading, Text } from "@/components/ui";
import { InternshipCards, ProjectCard, SkillsTile, VentureCard } from "@/components/work";
import { Contact, Photo, SiteNav } from "@/components/chrome";

export default function Home() {
  return (
    <main id="main" className="mx-auto flex max-w-[1360px] flex-col gap-24 px-4 pt-6 pb-12 sm:px-8 sm:pt-10">
      <Hero />

      <section id="work" aria-labelledby="work-title" className="flex scroll-mt-6 flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Heading id="work-title">Work</Heading>
          <span className="text-[15px] text-grey">
            {aiProjects.length} AI products · {ventures.length} venture · {internships.length} internships
          </span>
        </div>
        <div id="ai-products" className="flex scroll-mt-6 flex-wrap items-baseline justify-between gap-2">
          <h3 className="m-0 font-sora text-[32px] font-semibold tracking-[-0.03em]">AI products</h3>
          <span className="text-[15px] text-grey">Built solo · all live</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(390px,100%),1fr))] gap-5">
          {aiProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 1} />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-7">
          {ventures.map((p) => (
            <VentureCard key={p.slug} project={p} />
          ))}
        </div>
        <div id="internships" className="mt-5 flex scroll-mt-6 flex-wrap items-baseline justify-between gap-2">
          <h3 className="m-0 font-sora text-[32px] font-semibold tracking-[-0.03em]">Internships</h3>
          <span className="text-[15px] text-grey">Product, growth and GTM</span>
        </div>
        <InternshipCards />
      </section>

      <HowIWork />
      <Writing />
      <About />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section aria-label="Intro" className="flex flex-wrap gap-6">
      <SiteNav />

      <article className="relative flex min-h-[600px] flex-[1_1_320px] flex-col gap-5 overflow-hidden rounded-[28px] bg-accent px-6 pt-7 pb-8 text-white sm:px-8 lg:max-w-[460px] lg:min-h-[640px]">
        <span className="-mt-7 -ml-6 inline-flex items-center gap-2 self-start rounded-br-2xl bg-bg py-3.5 pr-[22px] pl-6 font-sora text-sm font-semibold text-ink sm:-ml-8 sm:pl-8">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          About me
        </span>
        <div className="h-[230px] w-[230px] self-center rounded-full border-[3px] border-white p-3">
          <Photo round />
        </div>
        <h1 className="line-reveal m-0 mt-auto font-sora text-[clamp(52px,6vw,64px)] leading-none font-medium tracking-[-0.03em]">
          <span>I’m,</span>
          <span>Divyam</span>
        </h1>
        <p className="m-0 max-w-[30ch] text-base leading-[1.45] text-[#F1F0FF]">{site.bio}</p>
        <div className="flex items-center justify-between gap-4 border-b border-dashed border-white/70 pb-2.5 text-sm">
          {site.email ? (
            <a href={`mailto:${site.email}`} className="text-white">{site.email}</a>
          ) : (
            <span><Text>[YOUR EMAIL]</Text></span>
          )}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <svg viewBox="0 0 104 104" aria-hidden="true" className="absolute top-[196px] right-4 w-[88px] sm:right-6 sm:w-[104px]">
          <circle cx="52" cy="52" r="51" fill="#16161A" />
          <defs>
            <path id="badge-ring" d="M52,52 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text fill="#FFFFFF" fontFamily="var(--font-sora)" fontSize="9.5" fontWeight="600" letterSpacing="2.2">
            <textPath href="#badge-ring">AI PRODUCT BUILDER · 2026 · </textPath>
          </text>
          <circle cx="52" cy="52" r="14" fill="#FFFFFF" />
          <circle cx="52" cy="52" r="5" fill="#16161A" />
        </svg>
      </article>

      <div className="@container flex min-w-0 flex-[999_1_560px] flex-col gap-5">
        <p className="line-reveal m-0 flex items-start gap-2 font-sora text-[clamp(56px,10vw,150px)] leading-[0.95] font-bold tracking-[-0.045em]">
          <span>
            Portfolio
          </span>
          <Corner size={28} className="mt-[0.12em] flex-none" />
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          <div className="relative flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-9 @min-[540px]:col-span-2 @min-[820px]:col-span-3">
            <RotatingRole roles={site.roles} />
            <p className="m-0 font-sora text-[clamp(20px,2.4vw,30px)] leading-[1.15] font-semibold tracking-[-0.025em]">
              I build AI products and prove they work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#work" variant="accent">See my work</Button>
              <a href={site.resume} className="magnetic inline-flex min-h-11 items-center gap-2 rounded-full bg-chip px-5 text-sm font-semibold no-underline hover:bg-violet hover:text-[#16161A]" data-magnetic>
                Resume <span className="font-mono text-[11px] text-grey">PDF</span>
              </a>
            </div>
          </div>

          <Gallery />

          <div className="flex min-h-[260px] flex-col overflow-hidden rounded-3xl text-[#16161A]">
            <div className="relative flex flex-1 flex-col justify-center bg-mint px-6 py-[22px]">
              <Corner color="#16161A" />
              <span className="font-sora text-[44px] leading-none font-semibold tracking-[-0.03em]">1,000+</span>
              <span>customers served</span>
            </div>
            <div className="flex flex-1 flex-col justify-center bg-lav px-6 py-[22px]">
              <span className="font-sora text-[44px] leading-none font-semibold tracking-[-0.03em]">{aiProjects.length}</span>
              <span>AI products shipped</span>
            </div>
          </div>

          <a href="#venture" className="on-dark relative flex min-h-[170px] flex-col items-center justify-center gap-2.5 rounded-3xl border border-white/10 bg-[#16161A] px-6 py-[22px] text-center text-white no-underline">
            <Corner color="#FFFFFF" />
            <Image src="/trido-logo.png" alt="Trido Rentals logo" width={72} height={72} className="rounded-full shadow-[0_0_0_6px_rgba(244,196,48,0.18)]" />
            <span className="text-[17px]">Co-founded a startup</span>
          </a>

          <div className="grid min-h-[170px] grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] overflow-hidden rounded-3xl @min-[540px]:col-span-2">
            <div className="flex items-center justify-center bg-[#0E0E10] p-5">
              <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="56" fill="none" stroke="#6560CF" strokeWidth="3" />
                <circle cx="60" cy="60" r="44" fill="none" stroke="#9C8FE0" strokeWidth="3" />
                <circle cx="60" cy="60" r="32" fill="none" stroke="#F2A9F0" strokeWidth="3" />
                <circle cx="60" cy="60" r="20" fill="none" stroke="#A9DDD3" strokeWidth="3" />
                <circle cx="60" cy="60" r="8" fill="#FFC66E" />
              </svg>
            </div>
            <div className="relative flex flex-col justify-center gap-1.5 bg-sun px-[26px] py-[22px] text-[#16161A]">
              <Corner color="#16161A" />
              <span className="font-sora text-[40px] leading-none font-semibold tracking-[-0.03em]">All live.</span>
              <span className="text-lg leading-tight">
                Real data,
                <br />
                not demos.
              </span>
            </div>
          </div>

          <SkillsTile />
        </div>
      </div>
    </section>
  );
}

const stepArt = [
  // PRD: a document
  <g key="prd"><rect x="9" y="5" width="22" height="30" rx="3" /><path d="M14 13h12M14 19h12M14 25h7" /></g>,
  // Design: a frame and pointer
  <g key="design"><rect x="5" y="7" width="30" height="22" rx="3" /><path d="M5 13h30M20 22l4 10 2-4 4-2z" /></g>,
  // Build: code brackets
  <g key="build"><path d="M14 11l-8 9 8 9M26 11l8 9-8 9M22 8l-4 24" /></g>,
  // Measure: bars with a check
  <g key="measure"><path d="M8 33V22M16 33V15M24 33V19M32 33V9M5 33h30" /></g>,
  // Ship: arrow out of a box
  <g key="ship"><path d="M8 20v12h24V20M20 26V6M13 13l7-7 7 7" /></g>,
];
const stepTints = ["bg-mint", "bg-violet", "bg-sun", "bg-lav2", "bg-pink"];

function HowIWork() {
  return (
    <section id="how" aria-labelledby="how-title" className="flex scroll-mt-6 flex-col gap-7">
      <Heading id="how-title" size="md">How I work</Heading>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 p-0">
        {steps.map((s, i) => (
          <li key={s.title} className={`reveal relative flex flex-col gap-3 rounded-3xl p-6 text-[#16161A] ${stepTints[i]}`}>
            <span className="font-mono text-xs">0{i + 1} {i < steps.length - 1 ? "→" : "✓"}</span>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#16161A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {stepArt[i]}
            </svg>
            <h3 className="m-0 font-sora text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
            <p className="m-0 text-[15px] leading-normal">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="flex scroll-mt-6 flex-col gap-7">
      <Heading id="writing-title" size="md">Writing &amp; notes</Heading>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4 p-0">
        {writing.map((w) => (
          <li key={w.title} className="reveal relative flex min-h-[180px] flex-col justify-between gap-6 rounded-3xl border border-line bg-surface p-6">
            <Corner />
            <span className="font-mono text-xs text-grey">{w.kind}</span>
            <h3 className="m-0 font-sora text-[22px] leading-tight font-semibold tracking-[-0.02em]">
              {w.href ? <a href={w.href} className="stretch no-underline hover:text-accent-ink">{w.title}</a> : w.title}
            </h3>
            {!w.href && (
              <span className="text-sm text-grey">
                Link coming <Text>{"[LINK]"}</Text>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="flex scroll-mt-6 flex-wrap gap-6">
      <figure className="reveal m-0 flex flex-[1_1_280px] flex-col gap-4 self-start rounded-[32px] bg-accent p-4 pb-5 text-white sm:max-w-[380px]">
        <div className="aspect-[4/5] overflow-hidden rounded-[22px]">
          <Photo />
        </div>
        <figcaption className="flex justify-between px-2 font-mono text-xs">
          <span>IIT Roorkee</span>
          <span>Civil Engineering ’28</span>
        </figcaption>
      </figure>
      <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-8">
        <div className="reveal flex flex-col gap-5">
          <span className="font-mono text-xs text-grey">About me</span>
          <h2 id="about-title" className="m-0 max-w-[20ch] font-sora text-[clamp(32px,4vw,56px)] leading-[1.02] font-semibold tracking-[-0.035em]">
            A civil engineer who got hooked on building AI products.
          </h2>
          <p className="m-0 max-w-[60ch] text-[17px] leading-relaxed">
            I study civil engineering at IIT Roorkee, and somewhere along the way I got hooked on building AI products. I learn by shipping: every project starts as a PRD and ends as a live site with real data behind it, and an honest list of what didn’t work.
          </p>
          <p className="m-0 max-w-[60ch] text-[17px] leading-relaxed">
            I’m the Convener of E-Summit ’27 at IIT Roorkee’s Entrepreneurship Cell, and I’ve interned in the Founders’ Office at HeadsUp AI and in market research at DGTLmart.
          </p>
        </div>
        <div id="experience" className="reveal flex flex-col gap-4">
          <h3 className="m-0 font-sora text-[28px] font-semibold tracking-[-0.03em]">Experience</h3>
          <ol className="m-0 list-none border-l-2 border-line p-0 pl-6">
            {[{ role: "Co-founder", org: projects[0].name, dates: "" }, ...experience].map((e) => (
              <li key={e.org} className="relative pb-6 last:pb-0">
                <span aria-hidden="true" className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                {e.dates && <span className="font-mono text-xs text-grey"><Text>{e.dates}</Text></span>}
                <p className="m-0 font-sora text-lg font-semibold">{e.role}</p>
                <p className="m-0 text-grey">{e.org}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
