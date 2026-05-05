// src/hooks/useFonts.js

import { useEffect } from "react"
import { FONT_URLS } from "../data/backgrounds"

export function useFonts() {
  useEffect(() => {
    async function loadAll() {
      const entries = Object.entries(FONT_URLS)
      await Promise.allSettled(
        entries.flatMap(([familyName, variants]) =>
          variants.map(async ({ url, style, weight }) => {
            // Skip if already loaded
            if (document.fonts.check(`${style === "italic" ? "italic " : ""}400 16px "${familyName}"`)) return
            try {
              const face = new FontFace(familyName, `url(${url})`, { style, weight })
              const loaded = await face.load()
              document.fonts.add(loaded)
            } catch {
              // Individual font failure shouldn't break anything
            }
          })
        )
      )
    }
    loadAll()
  }, [])
}