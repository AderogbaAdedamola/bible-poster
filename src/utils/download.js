

import { BACKGROUNDS, TEMPLATES, POSTER_FONTS } from "../data/backgrounds"

const W = 900
const H = 1200

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ")
  const lines = []
  let line = ""
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
  const bg       = BACKGROUNDS[state.bgIndex]      ?? BACKGROUNDS[0]
  const template = TEMPLATES[state.templateIndex]  ?? TEMPLATES[0]
  const fontDef  = POSTER_FONTS[state.fontIndex]   ?? POSTER_FONTS[0]
  const fontSize = state.fontSize  ?? 20
  const align    = state.textAlign ?? "center"

  // Wait for all Google Fonts to finish loading
  await document.fonts.ready

  const scaledSize = Math.round(fontSize * 2.1)
  const familyName = fontDef.css.replace(/['"]/g, "").split(",")[0].trim()

  const canvas  = document.createElement("canvas")
  canvas.width  = W
  canvas.height = H
  const ctx     = canvas.getContext("2d")

  // Background 
  const isGradient = bg.style.startsWith("linear") || bg.style.startsWith("radial")
  if (isGradient) {
    const stops = bg.style.match(/#[0-9a-fA-F]{3,8}/g) ?? ["#000", "#333"]
    const grad  = ctx.createLinearGradient(0, 0, W * 0.7, H)
    stops.forEach((color, i) => grad.addColorStop(i / (stops.length - 1), color))
    ctx.fillStyle = grad
  } else {
    ctx.fillStyle = bg.style
  }
  ctx.fillRect(0, 0, W, H)

  //  Overlay 
  if (template.overlay) {
    const match = template.overlay.match(/rgba\([^)]+\)/)
    if (match) {
      ctx.fillStyle = match[0]
      ctx.fillRect(0, 0, W, H)
    }
  }

  // Border frame
  const PAD = template.border ? 90 : 64
  if (template.border) {
    ctx.strokeStyle = "rgba(255,255,255,0.45)"
    ctx.lineWidth   = 2
    ctx.strokeRect(PAD - 10, PAD - 10, W - (PAD - 10) * 2, H - (PAD - 10) * 2)
  }

  const textColor = bg.textColor ?? "#fff"
  const textX = align === "left" ? PAD : align === "right" ? W - PAD : W / 2

  // Decorative mark
  ctx.fillStyle   = textColor
  ctx.globalAlpha = 0.55
  ctx.font        = `${Math.round(scaledSize * 0.65)}px "${familyName}", serif`
  ctx.textAlign   = "center"
  ctx.fillText("✦", W / 2, PAD + 48)
  ctx.globalAlpha = 1

  // Verse text 
  const verseText = `"${state.verseText}"`
  const maxWidth  = W - PAD * 2
  ctx.font        = `italic ${scaledSize}px "${familyName}", serif`
  ctx.fillStyle   = textColor
  ctx.textAlign   = align === "left" ? "left" : align === "right" ? "right" : "center"

  const lines  = wrapText(ctx, verseText, maxWidth)
  const lineH  = scaledSize * 1.65
  const totalH = lines.length * lineH
  let textY    = (H - totalH) / 2 - scaledSize * 0.5

  lines.forEach((line) => {
    ctx.fillText(line, textX, textY)
    textY += lineH
  })

  // Reference 
  if (state.verseRef) {
    const refSize = Math.round(scaledSize * 0.52)
    ctx.font        = `500 ${refSize}px "${familyName}", serif`
    ctx.fillStyle   = textColor
    ctx.globalAlpha = 0.78
    ctx.textAlign   = align === "left" ? "left" : align === "right" ? "right" : "center"
    ctx.fillText(`— ${state.verseRef}`, textX, textY + 32)
    ctx.globalAlpha = 1
  }

  // Translation 
  if (state.translationName) {
    ctx.font        = `${Math.round(scaledSize * 0.36)}px "Inter", sans-serif`
    ctx.fillStyle   = textColor
    ctx.globalAlpha = 0.42
    ctx.textAlign   = align === "left" ? "left" : align === "right" ? "right" : "center"
    ctx.fillText(state.translationName.toUpperCase(), textX, textY + 32 + Math.round(scaledSize * 0.52) + 24)
    ctx.globalAlpha = 1
  }

  //  Watermark
  ctx.font        = "22px 'Inter', sans-serif"
  ctx.fillStyle   = textColor
  ctx.globalAlpha = 0.28
  ctx.textAlign   = "right"
  ctx.fillText("POSTVERSE", W - 40, H - 36)
  ctx.globalAlpha = 1

  // Download 
  const filename = `postverse-${(state.verseRef ?? "poster").replace(/[^a-z0-9]/gi, "-").toLowerCase()}.png`
  const link     = document.createElement("a")
  link.download  = filename
  link.href      = canvas.toDataURL("image/png")
  link.click()
}