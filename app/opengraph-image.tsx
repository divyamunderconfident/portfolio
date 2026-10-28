import { ImageResponse } from "next/og";
import { aiProjects, ventures } from "@/content/projects";

export const alt = "Divyam Saini — products, built and proven";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const tile = (bg: string, w: number, h: number) => (
    <div style={{ background: bg, width: w, height: h, borderRadius: 32, display: "flex" }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F1F1F3", display: "flex", padding: 56, gap: 32, color: "#16161A" }}>
        <div style={{ flex: 1, background: "#6560CF", borderRadius: 40, padding: 48, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#fff" }}>
          <div style={{ fontSize: 30, opacity: 0.9 }}>Divyam Saini</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3, marginTop: 12 }}>I build products and prove they work.</div>
        </div>
        <div style={{ width: 330, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -3 }}>Portfolio</div>
          <div style={{ display: "flex", gap: 24 }}>
            {tile("#A9DDD3", 153, 140)}
            {tile("#FFC66E", 153, 140)}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {tile("#B9B1EE", 153, 140)}
            {tile("#F2B7EF", 153, 140)}
          </div>
          <div style={{ fontSize: 22, color: "#55555B" }}>{`${ventures.length} venture · ${aiProjects.length} projects`}</div>
        </div>
      </div>
    ),
    size,
  );
}
