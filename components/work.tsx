import Image from "next/image";
import Link from "next/link";
import { projects, skills, skillId, type Project } from "@/content/projects";
import { internships, tech } from "@/content/site";
import { Signature } from "./Signature";
import { Arrow, Button, Corner, Pill, Text } from "./ui";

const tagInk: Record<string, string> = {
  "#A9DDD3": "#24423D",
  "#FFC66E": "#4A3613",
  "#B9B1EE": "#2E2858",
  "#F2B7EF": "#4F2350",
};

const host = (url: string) => url.replace(/^https?:\/\//, "");

export function BrowserFrame({ project, big = false }: { project: Project; big?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#16161A24] bg-white text-[#16161A]">
      <div className="flex items-center gap-1.5 border-b border-[#16161A1A] bg-[#F1F1F3] px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} aria-hidden="true" className="h-2 w-2 rounded-full bg-[#C9C9D1]" />
        ))}
        <span className="ml-1.5 min-w-0 flex-1 truncate font-mono text-[11px] text-[#55555B]">
          {project.liveUrl ? host(project.liveUrl) : <Text>[LINK COMING]</Text>}
        </span>
        <span className="text-[11px] font-semibold">{big ? "Signature" : "Preview"}</span>
      </div>
      <Signature kind={project.signature} className={`aspect-video ${project.dark ? "bg-[#1E1E24]" : "bg-[#FAFAFB]"}`} />
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const dark = project.dark;
  const caseHref = project.caseStudy ? `/work/${project.slug}` : null;
  return (
    <article
      data-card
      data-cursor={caseHref ? "view" : undefined}
      className={`reveal lift relative flex flex-col gap-[18px] rounded-[28px] p-6 sm:p-[30px] ${dark ? "on-dark text-white" : "text-[#16161A]"}`}
      style={{ background: project.tint }}
    >
      <Corner size={14} color={dark ? "#FFFFFF" : "#16161A"} className="absolute top-[22px] right-[22px]" />
      <span className={`self-start rounded-full px-3 py-1 text-[13px] font-semibold ${dark ? "bg-white/15" : "bg-white/60"}`}>
        {String(index).padStart(2, "0")} · {project.status}
      </span>
      <BrowserFrame project={project} />
      <h4 className="m-0 font-sora text-[clamp(28px,3vw,36px)] leading-[1.02] font-semibold tracking-[-0.035em]">{project.name}</h4>
      <p className="m-0 max-w-[40ch] text-base text-pretty">
        <Text>{project.oneLiner}</Text>
      </p>
      <dl className="m-0 grid grid-cols-2 gap-3">
        {project.stats.map((s) => (
          <div key={s.label} className={`flex flex-col rounded-[18px] p-4 ${dark ? "bg-white/12" : "bg-white/55"}`}>
            <dt className="order-2 text-[13px] leading-[1.35]">
              <Text>{s.label}</Text>
            </dt>
            <dd className="m-0 font-sora text-[30px] font-semibold tracking-[-0.03em]">
              <Text>{s.value}</Text>
            </dd>
          </div>
        ))}
      </dl>
      <p className="m-0 text-[13px]" style={{ color: dark ? "#E2E2E8" : tagInk[project.tint] }}>
        {project.tags.join(" · ")}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2.5">
        {caseHref && (
          <Link
            href={caseHref}
            className="stretch magnetic inline-flex min-h-11 items-center gap-2 rounded-full bg-[#16161A] px-5 text-sm font-semibold text-white no-underline hover:bg-accent"
            data-magnetic
          >
            Read case study <span aria-hidden="true">→</span>
            <span className="sr-only">: {project.name}</span>
          </Link>
        )}
        {project.liveUrl ? (
          <Button href={project.liveUrl} external variant={caseHref ? "outline" : "solid"} label={`${project.name} live site (opens in a new tab)`}>
            Live
          </Button>
        ) : (
          <span className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold ${dark ? "bg-white text-[#16161A]" : "bg-[#16161A] text-white"}`}>
            Live demo <Text>{" [LINK]"}</Text>
          </span>
        )}
        {project.githubUrl && (
          <Button href={project.githubUrl} external variant="outline" label={`${project.name} on GitHub (opens in a new tab)`}>
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}

export function VentureCard({ project }: { project: Project }) {
  const tints = ["bg-mint", "bg-sun", "bg-lav"];
  return (
    <article
      id="venture"
      data-card
      data-cursor="view"
      className="on-dark reveal relative flex scroll-mt-6 flex-wrap gap-10 rounded-[28px] border border-white/10 bg-[#16161A] p-[clamp(20px,3.5vw,44px)] text-white"
    >
      <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <Pill className="bg-sun font-semibold text-[#16161A]">Venture</Pill>
          <Pill className="border border-[#8A8A93]">Co-founder</Pill>
          <Pill className="border border-[#8A8A93]"><Text>{project.status}</Text></Pill>
        </div>
        <h3 className="m-0 font-sora text-[clamp(40px,5vw,76px)] leading-[0.95] font-bold tracking-[-0.04em]">{project.name}</h3>
        <p className="m-0 max-w-[48ch] text-[clamp(17px,1.4vw,19px)] leading-[1.45] text-pretty">{project.oneLiner}</p>
        <p className="m-0 max-w-[54ch] text-base leading-normal text-pretty text-[#C4C4CC]">
          Growth came from partnerships with travel creators on a commission model: they earned a cut of every rental they brought in. My role: product, operations, customer acquisition and creator partnerships.
        </p>
        <div className="max-w-[420px] overflow-hidden rounded-2xl bg-[#1E1E24]">
          <Signature kind={project.signature} className="aspect-[16/7]" />
        </div>
        <ul aria-label="Tags" className="m-0 flex list-none flex-wrap gap-2 p-0">
          {project.tags.map((t) => (
            <li key={t} className="rounded-full bg-[#2A2A30] px-3 py-1 text-[13px]">{t}</li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <a
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="stretch magnetic inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white px-[22px] text-[15px] font-semibold text-white no-underline hover:bg-white hover:text-[#16161A]"
            data-magnetic
          >
            trido.in <Arrow />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Image src="/trido-logo.png" alt="Trido Rentals logo" width={44} height={44} className="rounded-full" />
        </div>
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 text-[#16161A]">
        {project.stats.map((s, i) => (
          <div key={s.label} className={`flex min-h-[116px] flex-1 flex-wrap items-end justify-between gap-x-4 gap-y-1 rounded-[22px] px-[26px] py-[22px] ${tints[i]}`}>
            <span className="font-sora text-[clamp(36px,3.6vw,52px)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap">{s.value}</span>
            <span className="max-w-[14ch] text-right text-[15px] leading-[1.3]">
              {s.label}
              <br />
              <span className="font-mono text-[11px] opacity-75">0{i + 1} / {["traction", "revenue", "speed"][i]}</span>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

// Hover or focus a skill to light up the projects that show it, and the other way round.
// Pure CSS (:has), generated from content/projects.ts.
export function SkillsTile() {
  const hl = "background:#16161A;color:#fff;border-color:#16161A";
  const on = (sel: string) => `.skills:has(${sel}:hover, ${sel}:focus, ${sel}:active)`;
  const css = [
    ...skills.map((s) => {
      const ps = projects.filter((p) => p.skills.includes(s)).map((p) => `[data-p="${p.slug}"]`);
      return ps.length ? `${on(`[data-s="${skillId(s)}"]`)} :is(${ps.join(",")}){${hl}}` : "";
    }),
    ...projects.map((p) => `${on(`[data-p="${p.slug}"]`)} :is(${p.skills.map((s) => `[data-s="${skillId(s)}"]`).join(",")}){${hl}}`),
  ].join("\n");
  const chip = "rounded-full border border-[#16161A40] px-3 py-1.5 text-[13px] font-medium transition-colors text-left";
  return (
    <div className="skills relative flex flex-col gap-4 rounded-3xl bg-violet p-6 text-[#16161A] @min-[540px]:col-span-2 @min-[820px]:col-span-3">
      <style>{css}</style>
      <Corner color="#16161A" />
      <div className="flex flex-wrap items-baseline justify-between gap-2 pr-6">
        <h2 className="m-0 font-sora text-2xl font-semibold tracking-[-0.03em]">Skills, with proof</h2>
        <span className="font-mono text-[11px]">hover or tap a skill or project</span>
      </div>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Skills">
        {skills.map((s) => (
          <li key={s}>
            <button type="button" data-s={skillId(s)} className={chip} aria-describedby={`skill-${skillId(s)}`}>
              {s}
            </button>
            <span id={`skill-${skillId(s)}`} className="sr-only">
              Shown in: {projects.filter((p) => p.skills.includes(s)).map((p) => p.name).join(", ")}
            </span>
          </li>
        ))}
      </ul>
      <ul className="m-0 flex list-none flex-wrap gap-2 border-t border-dashed border-[#16161A40] p-0 pt-4" aria-label="Projects">
        {projects.map((p) => (
          <li key={p.slug}>
            <a href={p.caseStudy ? `/work/${p.slug}` : p.kind === "venture" ? "#venture" : "#ai-products"} data-p={p.slug} className={`${chip} inline-block bg-white/60 no-underline`}>
              {p.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 border-t border-dashed border-[#16161A40] pt-4">
        <h3 className="m-0 font-sora text-lg font-semibold tracking-[-0.02em]">Tech I build with</h3>
        <div className="marquee -mx-6 overflow-hidden px-6">
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} aria-label={copy ? undefined : "Tech"} className="m-0 flex list-none gap-3 p-0 pr-3">
                {tech.map((t) => (
                  <li key={t.title} className="flex h-[92px] w-[92px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl bg-white p-2 text-center">
                    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill={`#${t.hex}`}>
                      <path d={t.path} />
                    </svg>
                    <span className="text-[11px] leading-tight font-medium">{t.title}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InternshipCards() {
  const tints = ["bg-violet", "bg-mint"];
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-5">
      {internships.map((e, i) => (
        <article key={e.org} className={`reveal relative flex flex-col gap-4 rounded-[28px] p-6 text-[#16161A] sm:p-[30px] ${tints[i % 2]}`}>
          <Corner size={14} color="#16161A" className="absolute top-[22px] right-[22px]" />
          <span className="self-start rounded-full bg-white/60 px-3 py-1 font-mono text-[12px]">{e.dates}</span>
          <div>
            <h4 className="m-0 font-sora text-[clamp(26px,2.6vw,32px)] leading-[1.05] font-semibold tracking-[-0.035em]">{e.org}</h4>
            <p className="m-0 mt-1 text-base font-medium">{e.role}</p>
          </div>
          {e.stat && (
            <div className="flex items-baseline gap-3 rounded-[18px] bg-white/55 p-4">
              <span className="font-sora text-[30px] font-semibold tracking-[-0.03em]">{e.stat.value}</span>
              <span className="text-[13px] leading-[1.35]">{e.stat.label}</span>
            </div>
          )}
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-normal">
            {e.highlights!.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
