import Link from "next/link";
import type { ReactNode } from "react";

// Renders text, marking any [PLACEHOLDER] so it is easy to spot and fill later.
export function Text({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <span key={i} className="ph" title="Placeholder: to be filled in">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function Corner({ size = 12, color = "currentColor", className = "absolute top-4 right-4" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M1 1h10v10" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 10L10 4M5 4h5v5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Heading({ id, children, size = "lg" }: { id?: string; children: ReactNode; size?: "lg" | "md" }) {
  const cls =
    size === "lg"
      ? "text-[clamp(48px,7vw,104px)] tracking-[-0.045em] leading-[0.95]"
      : "text-[clamp(40px,5vw,72px)] tracking-[-0.04em] leading-[0.98]";
  return (
    <h2 id={id} className={`m-0 flex items-start gap-1.5 font-sora font-bold ${cls}`}>
      <span>{children}</span>
      <Corner size={22} className="mt-[0.12em] flex-none" />
    </h2>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "outline" | "light" | "accent"; external?: boolean; className?: string; label?: string };
export function Button({ href, children, variant = "solid", external, className = "", label }: BtnProps) {
  const styles = {
    solid: "bg-[#16161A] text-white hover:bg-accent dark:bg-[#F1F1F3] dark:text-[#16161A] dark:hover:bg-[#D9D4FB]",
    accent: "bg-accent text-white hover:bg-[#16161A]",
    outline: "border border-current hover:bg-white/10",
    light: "bg-white text-[#16161A] hover:bg-[#D9D4FB]",
  }[variant];
  const cls = `magnetic above inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold no-underline transition-colors ${styles} ${className}`;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-magnetic aria-label={label}>
        {children}
        <Arrow size={12} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} className={cls} data-magnetic aria-label={label}>
      {children}
    </Link>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-block rounded-full px-3 py-1 text-[13px] ${className}`}>{children}</span>;
}
