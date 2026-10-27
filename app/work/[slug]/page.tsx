import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getProject } from "@/content/projects";
import { Contact } from "@/components/chrome";
import { Progress } from "@/components/Motion";
import { Button, Corner, Text } from "@/components/ui";
import { BrowserFrame } from "@/components/work";

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p?.caseStudy) return {};
  const description = `${p.oneLiner} Case study: problem, decisions, and evidence with real numbers.`;
  return {
    title: `${p.name} case study`,
    description,
    openGraph: { title: `${p.name} — case study by Divyam Saini`, description, url: `/work/${p.slug}` },
  };
}

const sectionTitle = "m-0 font-sora text-[clamp(28px,3.4vw,44px)] leading-[1.02] font-semibold tracking-[-0.035em]";

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  const cs = project?.caseStudy;
  if (!project || !cs) notFound();
  const i = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <>
      <Progress />
      <main id="main" className="mx-auto flex max-w-[1200px] flex-col gap-20 px-4 pt-6 pb-12 sm:px-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 font-sora text-sm font-semibold">
          <Link href="/" className="rounded-full py-2 no-underline hover:text-accent-ink">← Divyam Saini</Link>
          <Link href="/#ai-products" className="rounded-full py-2 no-underline hover:text-accent-ink">All work</Link>
        </nav>

        <header className="flex flex-wrap gap-8">
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-5">
            <span className="self-start rounded-full bg-chip px-3 py-1 text-[13px] font-semibold">Case study · {project.status}</span>
            <h1 className="line-reveal m-0 font-sora text-[clamp(48px,7vw,96px)] leading-[0.95] font-bold tracking-[-0.045em]">
              <span>{project.name}</span>
            </h1>
            <p className="m-0 max-w-[36ch] font-sora text-[clamp(20px,2.2vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em] text-pretty">{cs.pitch}</p>
            <p className="m-0 font-mono text-[13px] text-grey">Role · {project.role}</p>
            <ul aria-label="Stack" className="m-0 flex list-none flex-wrap gap-2 p-0">
              {cs.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-[13px]">{s}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && <Button href={project.liveUrl} external>Live</Button>}
              {project.githubUrl && (
                <Button href={project.githubUrl} external variant="outline">GitHub</Button>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_380px] self-center rounded-[28px] p-4 sm:p-6" style={{ background: project.tint }}>
            <BrowserFrame project={project} big />
          </div>
        </header>

        <section aria-label="TL;DR" className="reveal on-dark relative rounded-[28px] border border-white/10 bg-[#16161A] p-[clamp(20px,3.5vw,40px)] text-white">
          <Corner color="#FFFFFF" />
          <h2 className="m-0 mb-5 font-mono text-sm font-medium text-sun">TL;DR</h2>
          <dl className="m-0 grid gap-5 md:grid-cols-3">
            {(
              [
                ["Problem", cs.tldr.problem],
                ["What I built", cs.tldr.built],
                ["Headline result", cs.tldr.result],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5">
                <dt className="font-mono text-xs text-[#C4C4CC]">{k}</dt>
                <dd className="m-0 text-[17px] leading-snug text-pretty">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="problem" className="reveal flex flex-wrap gap-8">
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4">
            <h2 id="problem" className={sectionTitle}>The problem</h2>
            {cs.problem.map((t) => (
              <p key={t} className="m-0 max-w-[62ch] text-[17px] leading-relaxed">{t}</p>
            ))}
          </div>
          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 self-start rounded-3xl bg-mint p-6 text-[#16161A]">
            <h3 className="m-0 font-sora text-xl font-semibold">Who has it</h3>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
              {cs.who.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="how" className="reveal flex flex-col gap-6">
          <h2 id="how" className={sectionTitle}>How it works</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-3 p-0">
            {cs.steps.map((s, k) => (
              <li key={s.title} className="relative flex flex-col gap-2 rounded-3xl border border-line bg-surface p-5">
                <span className="flex items-center gap-2 font-mono text-xs text-grey">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">{k + 1}</span>
                  {k < cs.steps.length - 1 ? "→" : ""}
                </span>
                <h3 className="m-0 font-sora text-lg font-semibold">{s.title}</h3>
                <p className="m-0 text-[15px] leading-normal">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="decisions" className="reveal flex flex-col gap-6">
          <h2 id="decisions" className={sectionTitle}>Key decisions and trade-offs</h2>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4 p-0">
            {cs.decisions.map((d, k) => (
              <li key={d.chose} className={`flex flex-col gap-2 rounded-3xl p-6 text-[#16161A] ${["bg-violet", "bg-sun", "bg-pink", "bg-lav2"][k % 4]}`}>
                <span className="font-mono text-xs">Decision 0{k + 1}</span>
                <p className="m-0 text-[17px] leading-snug">
                  I chose <strong>{d.chose}</strong> over {d.over} because {d.because}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="evidence" className="reveal flex flex-col gap-6">
          <h2 id="evidence" className={sectionTitle}>Evidence</h2>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
            {cs.evidence.stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-3xl border border-line bg-surface p-5">
                <dt className="order-2 text-sm leading-snug text-grey">{s.label}</dt>
                <dd className="m-0 font-sora text-[clamp(30px,3vw,40px)] font-semibold tracking-[-0.03em]">{s.value}</dd>
              </div>
            ))}
          </dl>
          {cs.evidence.body.map((t) => (
            <p key={t} className="m-0 max-w-[68ch] text-[17px] leading-relaxed">{t}</p>
          ))}
          <div className="flex flex-col gap-3 rounded-3xl border-2 border-dashed border-line p-6">
            <h3 className="m-0 font-sora text-xl font-semibold">What didn’t work</h3>
            <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[16px] leading-relaxed">
              {cs.didntWork.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="next-steps" className="reveal flex flex-col gap-4">
          <h2 id="next-steps" className={sectionTitle}>What I’d do next</h2>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[17px] leading-relaxed">
            {cs.next.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          className="reveal lift relative flex flex-wrap items-end justify-between gap-4 rounded-[28px] p-[clamp(24px,4vw,44px)] text-[#16161A] no-underline"
          style={{ background: next.tint }}
        >
          <span className="flex flex-col gap-2">
            <span className="font-mono text-xs">Next project</span>
            <span className="font-sora text-[clamp(36px,5vw,64px)] leading-none font-bold tracking-[-0.04em]">{next.name}</span>
            <span className="max-w-[48ch] text-base"><Text>{next.oneLiner}</Text></span>
          </span>
          <span aria-hidden="true" className="font-sora text-4xl">→</span>
        </Link>

        <Contact />
      </main>
    </>
  );
}
