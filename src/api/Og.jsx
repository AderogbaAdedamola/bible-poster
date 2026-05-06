import { ImageResponse } from "@vercel/og"

export const config = { runtime: "edge" }

export default function handler(req) {
  const { searchParams } = new URL(req.url)
  const ref  = searchParams.get("ref")  ?? "Bible Verse"
  const text = searchParams.get("text") ?? ""
  const bg   = searchParams.get("bg")   ?? "linear-gradient(145deg,#2D1B69,#4A3394)"

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: bg, padding: "60px",
        fontFamily: "serif",
      }}>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 24, marginBottom: 24 }}>✦</div>
        <p style={{ color: "#fff", fontSize: 36, fontStyle: "italic", textAlign: "center", lineHeight: 1.6 }}>
          "{text}"
        </p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 20, marginTop: 24 }}>
          — {ref}
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginTop: 40, letterSpacing: "0.1em" }}>
          POSTVERSE
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}