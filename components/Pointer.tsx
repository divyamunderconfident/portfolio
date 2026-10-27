"use client";

import { useEffect, useRef } from "react";

// Custom cursor + magnetic buttons. Fine pointers only, off under reduced motion.
// Without JS (or on touch) the `has-cursor` class is never added, so the native cursor stays.
export function Pointer() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    const r = root.current!;
    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let magnet: HTMLElement | null = null;
    let frame = 0;

    const stateFor = (t: Element | null): string => {
      if (!t) return "default";
      if (t.closest("input, textarea, select, [contenteditable]")) return "text";
      const tagged = t.closest("[data-cursor]") as HTMLElement | null;
      const link = t.closest("a, button, summary, label, [role=button]");
      // a link inside a "view" tile still shows the link state
      if (link && !(tagged && (link === tagged || (tagged.contains(link) && link.classList.contains("stretch"))))) return "link";
      if (tagged) {
        label.current!.textContent = tagged.dataset.cursor === "pause" ? "Pause" : "View →";
        return tagged.dataset.cursor!;
      }
      if (t.closest("p, li, dd, dt, blockquote, figcaption, h1, h2, h3, h4, td")) return "text";
      return "default";
    };

    const move = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      r.dataset.hidden = "false";
      r.dataset.state = stateFor(e.target as Element);

      const m = (e.target as Element).closest?.("[data-magnetic]") as HTMLElement | null;
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const b = m.getBoundingClientRect();
        const dx = (e.clientX - (b.left + b.width / 2)) * 0.25;
        const dy = (e.clientY - (b.top + b.height / 2)) * 0.25;
        const c = (v: number) => Math.max(-6, Math.min(6, v));
        m.style.transform = `translate(${c(dx)}px, ${c(dy)}px)`;
      }
    };
    const tick = () => {
      lag.x += (pos.x - lag.x) * 0.18;
      lag.y += (pos.y - lag.y) * 0.18;
      const p = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const l = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      dot.current!.style.transform = p;
      ring.current!.style.transform = l;
      fill.current!.style.transform = l;
      label.current!.style.transform = l;
      frame = requestAnimationFrame(tick);
    };
    const leave = (e: MouseEvent) => {
      if (!e.relatedTarget) r.dataset.hidden = "true";
    };
    const down = () => (r.dataset.down = "true");
    const up = () => (r.dataset.down = "false");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseout", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    frame = requestAnimationFrame(tick);
    return () => {
      html.classList.remove("has-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseout", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={root} className="cursor" data-hidden="true" data-state="default" aria-hidden="true">
      <div ref={fill} className="cursor-fill" />
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
      <div ref={label} className="cursor-label" />
    </div>
  );
}
