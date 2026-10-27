"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Signature as Kind } from "@/content/projects";

// Plays on hover/focus of the surrounding card on fine pointers, while in view on touch; paused otherwise.
export function Signature({ kind, className = "" }: { kind: Kind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const card = (el.closest("[data-card]") as HTMLElement) ?? el;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const on = () => setPlay(true);
      const off = () => setPlay(false);
      const blur = () => !card.contains(document.activeElement) && setPlay(false);
      card.addEventListener("mouseenter", on);
      card.addEventListener("mouseleave", off);
      card.addEventListener("focusin", on);
      card.addEventListener("focusout", blur);
      return () => {
        card.removeEventListener("mouseenter", on);
        card.removeEventListener("mouseleave", off);
        card.removeEventListener("focusin", on);
        card.removeEventListener("focusout", blur);
      };
    }
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Art = arts[kind];
  return (
    <div ref={ref} className={`sig ${className}`} data-play={play} aria-hidden="true">
      <Art />
    </div>
  );
}

const ink = "#16161A";

function Clusters() {
  // dots start scattered (--fx/--fy) and settle into three groups; bars rank them; ticks = verified quotes
  const groups = [
    { cx: 60, cy: 52, c: "#6560CF" },
    { cx: 112, cy: 120, c: "#16161A" },
    { cx: 50, cy: 130, c: "#9C8FE0" },
  ];
  const offsets = [
    [-14, -8], [10, -12], [16, 6], [-6, 14], [2, -2], [-16, 4],
  ];
  const scatter = [
    [70, -30], [-40, 60], [120, 40], [-30, -50], [90, 70], [20, -60],
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      {groups.map((g, gi) =>
        offsets.map(([dx, dy], i) => (
          <circle
            key={`${gi}-${i}`}
            className="a-cluster"
            cx={g.cx + dx}
            cy={g.cy + dy}
            r="5"
            fill={g.c}
            style={{ "--fx": `${scatter[(i + gi * 2) % 6][0]}px`, "--fy": `${scatter[(i + gi) % 6][1]}px` } as CSSProperties}
          />
        )),
      )}
      {[0.92, 0.66, 0.44].map((w, i) => (
        <g key={i} transform={`translate(176 ${40 + i * 44})`}>
          <rect width="112" height="14" rx="7" fill="#E4E4E9" />
          <rect className="a-bar" width={112 * w} height="14" rx="7" fill={groups[i].c} />
          <g className="a-tick" style={{ transformOrigin: "128px 7px" }}>
            <circle cx="128" cy="7" r="8" fill="#A9DDD3" />
            <path d="M124 7l3 3 5-6" stroke={ink} strokeWidth="1.8" fill="none" />
          </g>
        </g>
      ))}
    </svg>
  );
}

function Tokens() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-[7%] font-mono text-[11px]" style={{ color: ink }}>
      <span className="font-semibold">Tamil · cl100k_base</span>
      <div>
        <span>estimate (4 chars ≈ 1 token)</span>
        <div className="mt-1 h-4 rounded-full bg-[#E4E4E9]">
          <div className="h-4 rounded-full bg-[#9C8FE0]" style={{ width: "17.5%" }} />
        </div>
      </div>
      <div>
        <span>real tokens</span>
        <div className="mt-1 flex h-4 items-center gap-2">
          <div className="a-bar h-4 rounded-full bg-[#16161A]" style={{ width: "86%" }} />
          <span className="a-tick shrink-0 font-semibold">5.35×</span>
        </div>
      </div>
    </div>
  );
}

function Fork() {
  const xs = [30, 70, 110, 150, 190, 230, 270];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <line x1="30" y1="70" x2="270" y2="70" stroke={ink} strokeWidth="2.5" />
      <path className="a-draw" pathLength={1} d="M150 70 C175 70 170 125 200 125 L270 125" stroke="#6560CF" strokeWidth="2.5" fill="none" />
      {xs.map((x, i) => (
        <circle key={x} cx={x} cy="70" r="7" fill={i < 3 ? "#A9DDD3" : "#FFFFFF"} stroke={ink} strokeWidth="2" />
      ))}
      {[230, 270].map((x) => (
        <circle key={x} className="a-tick" style={{ transformOrigin: `${x}px 125px` }} cx={x} cy="125" r="7" fill="#F2B7EF" stroke={ink} strokeWidth="2" />
      ))}
      <circle className="a-pulse" cx="150" cy="70" r="11" fill="none" stroke="#6560CF" strokeWidth="2" />
      <text x="30" y="40" fontFamily="var(--font-plex-mono)" fontSize="11" fill={ink}>replayed · 0 tokens</text>
      <text x="196" y="156" fontFamily="var(--font-plex-mono)" fontSize="11" fill={ink}>fork @ step 3</text>
    </svg>
  );
}

function Ticker() {
  const rows = [0.8, 0.62, 0.9, 0.55];
  const all = [...rows, ...rows];
  return (
    <div className="relative h-full overflow-hidden px-[6%]" style={{ color: ink }}>
      <div className="a-ticker h-[200%]">
        {all.map((w, i) => (
          <div key={i} className="flex h-[12.5%] items-center gap-3 border-b border-[#16161A1A]">
            <span className="font-mono text-[11px]">#{String((i % 4) + 1).padStart(2, "0")}</span>
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="block h-2 rounded-full bg-[#16161A]" style={{ width: `${w * 100}%` }} />
              <span className="block h-1.5 rounded-full bg-[#D9D7E6]" style={{ width: `${w * 70}%` }} />
            </span>
            <span className="rounded-full bg-[#F2B7EF] px-2 py-0.5 font-mono text-[10px]">need</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel() {
  const real = [0.9, 0.55, 0.35, 0.7, 0.45];
  const persona = [0.8, 0.6, 0.3, 0.75, 0.5];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      {real.map((h, i) => (
        <g key={i} transform={`translate(${40 + i * 52} 0)`}>
          <rect className="a-grow-y" x="0" y={150 - h * 110} width="16" height={h * 110} rx="4" fill="#F1F1F3" />
          <rect className="a-grow-y" x="20" y={150 - persona[i] * 110} width="16" height={persona[i] * 110} rx="4" fill="#9C8FE0" />
        </g>
      ))}
      <line x1="30" y1="150" x2="296" y2="150" stroke="#F1F1F3" strokeWidth="1.5" />
      <text x="40" y="170" fontFamily="var(--font-plex-mono)" fontSize="10" fill="#F1F1F3">■ survey  ■ personas · illustrative</text>
    </svg>
  );
}

function Route() {
  const d = "M10 150 C60 150 50 90 110 95 S170 40 210 60 S260 20 310 25";
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <path d="M0 180 L60 90 L105 135 L170 50 L235 120 L280 70 L320 110 L320 180 Z" fill="#2A2A30" />
      <path d={d} stroke="#55555B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path className="a-draw" pathLength={1} d={d} stroke="#FFC66E" strokeWidth="2.5" fill="none" strokeDasharray="1" strokeLinecap="round" />
      <circle className="a-move" r="7" fill="#FFC66E" style={{ offsetPath: `path("${d}")` } as CSSProperties} />
    </svg>
  );
}

const arts: Record<Kind, () => React.ReactElement> = {
  clusters: Clusters,
  tokens: Tokens,
  fork: Fork,
  ticker: Ticker,
  panel: Panel,
  route: Route,
};
