import Image from "next/image";
import { site } from "@/content/site";
import { Text } from "./ui";

const links = [
  { href: "/#venture", label: "Venture" },
  { href: "/#ai-products", label: "AI products" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <nav aria-label="Main" className="-ml-2.5 flex w-full flex-wrap gap-0.5 lg:ml-0 lg:w-auto lg:flex-col lg:justify-around lg:gap-6 lg:py-6">
      {links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          className={`rounded-full px-2.5 py-2.5 font-sora text-[13px] font-semibold sm:px-3 sm:text-sm no-underline hover:text-accent-ink lg:[writing-mode:vertical-rl] lg:rotate-180 lg:px-2 lg:py-3 ${i === links.length - 1 ? "bg-ink text-bg hover:bg-accent hover:text-white lg:bg-transparent lg:text-ink" : ""}`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

export function Photo({ round = false }: { round?: boolean }) {
  if (site.photo)
    return (
      <Image
        src={site.photo}
        alt="Divyam Saini"
        width={640}
        height={800}
        className={`h-full w-full object-cover ${round ? "rounded-full" : ""}`}
      />
    );
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-[#F2A9F0] text-center text-[13px] font-semibold text-[#2A1F4A] ${round ? "rounded-full" : "rounded-[22px]"}`}
    >
      <Text>[YOUR PHOTO]</Text>
    </div>
  );
}

export function Contact() {
  const pill = "magnetic inline-flex min-h-12 items-center gap-2 rounded-full px-[22px] text-[15px] font-semibold no-underline";
  return (
    <footer
      id="contact"
      className="reveal flex scroll-mt-6 flex-wrap items-end justify-between gap-8 rounded-[28px] bg-accent p-[clamp(24px,4vw,56px)] text-white"
    >
      <div className="flex min-w-0 flex-col gap-4">
        <p className="m-0 max-w-[40ch] text-[17px] text-[#F1F0FF]">
          Hiring for an AI PM or AI product engineer intern? I’d like to hear about it.
        </p>
        <h2 className="m-0 font-sora text-[clamp(44px,5.5vw,80px)] leading-none font-bold tracking-[-0.04em]">
          {site.email ? (
            <a href={`mailto:${site.email}`} className="text-white no-underline hover:underline">Let’s talk</a>
          ) : (
            "Let’s talk"
          )}
        </h2>
        <span className="self-start border-b border-dashed border-white/70 pb-2 text-base [overflow-wrap:anywhere]">
          {site.email ?? <Text>[YOUR EMAIL]</Text>}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        <a href={site.github} target="_blank" rel="noopener noreferrer" className={`${pill} bg-white text-[#16161A] hover:bg-[#D9D4FB]`} data-magnetic>
          GitHub<span className="sr-only"> (opens in a new tab)</span>
        </a>
        {site.linkedin ? (
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`${pill} border border-white text-white hover:bg-white/10`} data-magnetic>
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <span className={`${pill} border border-white text-white`}>
            LinkedIn <Text>[LINK]</Text>
          </span>
        )}
      </div>
      <p className="m-0 w-full font-mono text-xs text-[#F1F0FF]">© 2026 Divyam Saini · made in Roorkee</p>
    </footer>
  );
}
