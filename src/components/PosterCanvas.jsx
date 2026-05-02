// src/components/PosterCanvas.jsx
// The actual poster — used in Editor, PosterView, and for PNG download.
// Accepts a `style` object and `verse` object as props so it can be
// used standalone on the share page without needing PosterContext.

import { forwardRef } from "react"
import { BACKGROUNDS, TEMPLATES, POSTER_FONTS } from "../data/backgrounds"

const PosterCanvas = forwardRef(function PosterCanvas({ verse, style, className = "" }, ref) {
  const {
    bgIndex      = 0,
    templateIndex = 0,
    fontIndex    = 0,
    fontSize     = 20,
    textAlign    = "center",
  } = style ?? {}

  const bg       = BACKGROUNDS[bgIndex]    ?? BACKGROUNDS[0]
  const template = TEMPLATES[templateIndex] ?? TEMPLATES[0]
  const font     = POSTER_FONTS[fontIndex]  ?? POSTER_FONTS[0]

  // bg.style can be a gradient or a solid hex — both work as CSS background
  const isGradient = bg.style.startsWith("linear") || bg.style.startsWith("radial")
  const bgCss = isGradient ? { background: bg.style } : { backgroundColor: bg.style }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        aspectRatio: "3 / 4",
        borderRadius: "12px",
        ...bgCss,
      }}
    >
      {/* Overlay layer */}
      {template.overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: template.overlay }}
        />
      )}

      {/* Border frame */}
      {template.border && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "20px",
            border: `1px solid rgba(255,255,255,0.45)`,
            borderRadius: "6px",
          }}
        />
      )}

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        style={{ padding: template.border ? "52px" : "36px" }}
      >
        {/* Decorative top mark */}
        <div
          className="mb-5 opacity-60"
          style={{ color: bg.textColor, fontFamily: font.css, fontSize: "18px" }}
        >
          ✦
        </div>

        {/* Verse text */}
        <p
          style={{
            fontFamily:  font.css,
            fontSize:    `${fontSize}px`,
            color:       bg.textColor,
            textAlign:   textAlign,
            lineHeight:  1.65,
            fontStyle:   "italic",
            fontWeight:  400,
          }}
        >
          {verse?.verseText
            ? `"${verse.verseText}"`
            : <span style={{ opacity: 0.35 }}>Your verse will appear here</span>
          }
        </p>

        {/* Reference */}
        {verse?.verseRef && (
          <p
            className="mt-5"
            style={{
              fontFamily:    font.css,
              fontSize:      `${Math.max(fontSize - 6, 11)}px`,
              color:         bg.textColor,
              textAlign:     textAlign,
              opacity:       0.75,
              letterSpacing: "0.08em",
              fontStyle:     "normal",
              fontWeight:    500,
            }}
          >
            — {verse.verseRef}
          </p>
        )}

        {/* Translation badge */}
        {verse?.translationName && (
          <p
            className="mt-2"
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      "10px",
              color:         bg.textColor,
              textAlign:     textAlign,
              opacity:       0.45,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {verse.translationName}
          </p>
        )}

        {/* PostVerse watermark */}
        <div
          className="absolute bottom-4 right-5 opacity-30"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      "9px",
            color:         bg.textColor,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          PostVerse
        </div>
      </div>
    </div>
  )
})

export default PosterCanvas