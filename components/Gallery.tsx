"use client";

import Image from "next/image";
import { useRef } from "react";
import { gallery } from "@/content/site";
import { Text } from "./ui";

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const item = el.firstElementChild;
    const step = item ? item.getBoundingClientRect().width + 10 : el.clientWidth * 0.8;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: smooth ? "smooth" : "auto" });
  };
  const btn =
    "magnetic flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#16161A]";
  return (
    <div role="region" aria-label="Photo gallery" className="on-dark relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl bg-tile-dark @min-[540px]:col-span-2">
      <div
        ref={ref}
        tabIndex={0}
        aria-label="Photos, scroll sideways"
        className="flex flex-1 snap-x snap-mandatory scroll-px-3 gap-2.5 overflow-x-auto p-3 [scrollbar-width:none]"
      >
        {gallery.map((ph, i) => (
          <figure
            key={i}
            className="relative m-0 flex aspect-[4/3] max-h-[236px] shrink-0 snap-start flex-col items-start gap-1.5 overflow-hidden rounded-2xl p-3.5 text-[#16161A]"
            style={{ background: ph.tint }}
          >
            {ph.src && <Image src={ph.src} alt={ph.alt} fill sizes="320px" className="object-cover object-[50%_30%]" />}
            <span className={`relative self-start font-mono text-[11px] ${ph.src ? "rounded-full bg-white/85 px-2 py-0.5" : ""}`}>{String(i + 1).padStart(2, "0")} / 06</span>
            <figcaption className={`relative self-start text-[13px] ${ph.src ? "rounded-full bg-white/90 px-2.5 py-1 font-medium" : ""}`}><Text>{ph.caption}</Text></figcaption>
            {!ph.src && <span className="m-auto text-sm font-semibold"><Text>[PHOTO]</Text></span>}
          </figure>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-[22px] flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#16161Ad1] px-3 py-1.5 font-mono text-[11px] text-white">Gallery · scroll →</span>
        <span className="pointer-events-auto flex gap-2">
          <button type="button" aria-label="Previous photo" onClick={() => scroll(-1)} className={btn} data-magnetic>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" /></svg>
          </button>
          <button type="button" aria-label="Next photo" onClick={() => scroll(1)} className={btn} data-magnetic>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" /></svg>
          </button>
        </span>
      </div>
    </div>
  );
}
