// src/utils/download.js
// Draws the poster directly to an offscreen canvas — no html2canvas needed.
// Fonts are loaded via FontFace API before drawing so they always render.

import { BACKGROUNDS, TEMPLATES, POSTER_FONTS, FONT_URLS } from "../data/backgrounds"

const W = 900   // canvas width  (3:4)
const H = 1200  // canvas height

// Load a font into the document so the canvas can use it
async function loadFont(familyName) {
  // Already loaded — skip
  if (document.fonts.check(`16px "${familyName}"`)) return

  const urls = FONT_URLS[familyName]
  if (!urls) return

  await Promise.all(
    urls.map(async ({ url, style, weight }) => {
      const face = new FontFace(familyName, `url(${url})`, { style, weight })
      const loaded = await face.load()
      document.fonts.add(loaded)
    })
  )
}

// Word-wrap text to fit within maxWidth, returns array of lines
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ")
  const lines = []
  let line    = ""

  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function downloadPoster({ state }) {
  const bg       = BACKGROUNDS[state.bgIndex]       ?? BACKGROUNDS[0]
  const template = TEMPLATES[state.templateIndex]    ?? TEMPLATES[0]
  const fontDef  = POSTER_FONTS[state.fontIndex]     ?? POSTER_FONTS[0]
  const fontSize = state.fontSize ?? 20
  const align    = state.textAlign ?? "center"

  // Scale font size up proportionally for the 900px canvas
  const scale      = W / 380          // approx editor preview width
  const scaledSize = Math.round(fontSize * scale * 0.72)

  // Load the poster font
  const familyName = fontDef.css.replace(/['"]/g, "").split(",")[0].trim()
  await loadFont(familyName)

  // Create offscreen canvas
  const canvas  = document.createElement("canvas")
  canvas.width  = W
  canvas.height = H
  const ctx     = canvas.getContext("2d")

  // ── Background ────────────────────────────────────────────────────
  const isGradient = bg.style.startsWith("linear") || bg.style.startsWith("radial")
  if (isGradient) {
    // Parse gradient — extract color stops
    const stops = bg.style.match(/#[0-9a-fA-F]{3,8}/g) ?? ["#000", "#333"]
    const grad  = ctx.createLinearGradient(0, 0, W * 0.7, H)
    stops.forEach((color, i) => grad.addColorStop(i / (stops.length - 1), color))
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = bg.style
  }
  ctx.fillRect(0, 0, W, H)

  // ── Overlay ───────────────────────────────────────────────────────
  if (template.overlay && !template.overlay.startsWith("radial")) {
    // Simple rgba overlays only (radial gradients are decorative — skip for canvas)
    const match = template.overlay.match(/rgba\([^)]+\)/)
    if (match) {
      ctx.fillStyle = match[0]
      ctx.fillRect(0, 0, W, H)
    }
  }

  // ── Border frame ──────────────────────────────────────────────────
  const PAD = template.border ? 90 : 64
  if (template.border) {
    ctx.strokeStyle = "rgba(255,255,255,0.45)"
    ctx.lineWidth   = 2
    ctx.beginPath()
    ctx.roundRect(PAD - 10, PAD - 10, W - (PAD - 10) * 2, H - (PAD - 10) * 2, 8)
    ctx.stroke()
  }

  // ── Text color ────────────────────────────────────────────────────
  const textColor = bg.textColor ?? "#fff"

  // ── Decorative mark ───────────────────────────────────────────────
  ctx.fillStyle   = textColor
  ctx.globalAlpha = 0.6
  ctx.font        = `${Math.round(scaledSize * 0.7)}px serif`
  ctx.textAlign   = "center"
  ctx.fillText("✦", W / 2, PAD + 40)
  ctx.globalAlpha = 1

  // ── Verse text ────────────────────────────────────────────────────
  const verseText = state.verseText ? `"${state.verseText}"` : ""
  const maxWidth  = W - PAD * 2

  ctx.font      = `italic ${scaledSize}px "${familyName}", serif`
  ctx.fillStyle = textColor
  ctx.textAlign = align === "left" ? "left" : align === "right" ? "right" : "center"

  const lines    = wrapText(ctx, verseText, maxWidth)
  const lineH    = scaledSize * 1.65
  const totalH   = lines.length * lineH
  let   textY    = (H - totalH) / 2 - scaledSize  // center block vertically

  const textX = align === "left" ? PAD
              : align === "right" ? W - PAD
              : W / 2

  lines.forEach((line) => {
    ctx.fillText(line, textX, textY)
    textY += lineH
  })

  // ── Reference ─────────────────────────────────────────────────────
  if (state.verseRef) {
    const refSize = Math.round(scaledSize * 0.55)
    ctx.font        = `500 ${refSize}px "${familyName}", serif`
    ctx.fillStyle   = textColor
    ctx.globalAlpha = 0.8
    ctx.textAlign   = align === "left" ? "left" : align === "right" ? "right" : "center"
    ctx.fillText(`— ${state.verseRef}`, textX, textY + 28)
    ctx.globalAlpha = 1
  }

  // ── Translation name ──────────────────────────────────────────────
  if (state.translationName) {
    const tSize = Math.round(scaledSize * 0.38)
    ctx.font        = `${tSize}px 'Inter', sans-serif`
    ctx.fillStyle   = textColor
    ctx.globalAlpha = 0.45
    ctx.textAlign   = align === "left" ? "left" : align === "right" ? "right" : "center"
    ctx.fillText(state.translationName.toUpperCase(), textX, textY + 28 + Math.round(scaledSize * 0.55) + 22)
    ctx.globalAlpha = 1
  }

  // ── Watermark ─────────────────────────────────────────────────────
  ctx.font        = "24px 'Inter', sans-serif"
  ctx.fillStyle   = textColor
  ctx.globalAlpha = 0.3
  ctx.textAlign   = "right"
  ctx.fillText("POSTVERSE", W - 40, H - 36)
  ctx.globalAlpha = 1

  // ── Trigger download ──────────────────────────────────────────────
  const filename = `postverse-${(state.verseRef ?? "poster").replace(/[^a-z0-9]/gi, "-").toLowerCase()}.png`
  const link     = document.createElement("a")
  link.download  = filename
  link.href      = canvas.toDataURL("image/png")
  link.click()
}