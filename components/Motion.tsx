"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Fades `.reveal` elements in once as they enter the viewport.
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}

// Thin reading-progress line for case studies.
export function Progress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current!.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => (frame ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-accent motion-reduce:hidden"
    />
  );
}

// "Divyam is a [role]" — slot-rolls every 2.5s, pauses on hover/touch, static list under reduced motion.
export function RotatingRole({ roles }: { roles: string[] }) {
  const [{ i, prev }, setRoll] = useState({ i: 0, prev: -1 });
  const [paused, setPaused] = useState(false);
  const still = useSyncExternalStore(subscribeRM, () => matchMedia(RM).matches, () => false);

  useEffect(() => {
    if (paused || still) return;
    const t = setInterval(() => {
      setRoll(({ i }) => ({ prev: i, i: (i + 1) % roles.length }));
    }, 2500);
    return () => clearInterval(t);
  }, [paused, still, roles.length]);

  const list = roles.join(" · ");
  return (
    <div className="@container flex flex-col gap-2">
      <p className="m-0 font-sora font-bold tracking-[-0.04em]">
        <span className="block text-[20px] font-semibold tracking-[-0.02em] text-accent-ink md:text-[28px]">Divyam is a</span>
        <span className="sr-only">{roles.join(", ")}</span>
        {still ? (
          <span aria-hidden="true" className="mt-1.5 block text-[clamp(24px,4.4cqi,44px)] leading-[1.2]">
            {list}
          </span>
        ) : (
          <span
            aria-hidden="true"
            data-cursor="pause"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused((p) => !p)}
            className="mt-1.5 grid overflow-hidden pb-[0.1em] text-[clamp(40px,9.5cqi,104px)] leading-[1.04]"
          >
            {roles.map((r, k) => (
              <span
                key={r}
                className={`role-word block [grid-area:1/1] [overflow-wrap:break-word] ${k === i || k === prev ? "" : "!transition-none"}`}
                style={{ transform: k === i ? "translateY(0)" : k === prev ? "translateY(-105%)" : "translateY(105%)" }}
              >
                {r}
              </span>
            ))}
          </span>
        )}
      </p>
      {!still && (
        <span aria-hidden="true" className="font-mono text-[13px] text-grey">
          {String(i + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
          {paused && " · paused"}
        </span>
      )}
    </div>
  );
}
