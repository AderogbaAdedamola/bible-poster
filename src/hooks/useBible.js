// src/hooks/useBible.js
// All fetches hit bible.helloao.org — free, no API key.
//
// CACHING STRATEGY:
//   Translations list → localStorage with a 24hr timestamp
//     (translations rarely change, no point re-fetching every session)
//   Chapter verses    → Map() in memory for the session
//     (small JSON files, fast to re-fetch, no need to persist)

const BASE = "https://bible.helloao.org/api"
const CACHE_KEY      = "postverse_translations"
const CACHE_DURATION = 24 * 60 * 60 * 1000  // 24 hours in ms

// In-memory cache for chapter verse arrays
// key: "translationId/bookId/chapter"  value: verse[]
const chapterCache = new Map()

// ── Translations ──────────────────────────────────────────────────────

/**
 * Fetch all available translations.
 * - Checks localStorage first; returns cached data if under 24hrs old.
 * - On cache miss or expiry: fetches fresh, saves to localStorage.
 * - Filters to full Bibles (66 books) with ltr text direction,
 *   so we don't show partial NT-only or RTL translations.
 */
export async function fetchTranslations() {
  // 1. Check localStorage
  try {
    const stored = localStorage.getItem(CACHE_KEY)
    if (stored) {
      const { timestamp, data } = JSON.parse(stored)
      const age = Date.now() - timestamp
      if (age < CACHE_DURATION) {
        return data  // still fresh — return immediately
      }
    }
  } catch (_) {
    // corrupted localStorage entry — fall through to fresh fetch
  }

  // 2. Fetch fresh from API
  const res = await fetch(`${BASE}/available_translations.json`)
  if (!res.ok) throw new Error(`Failed to fetch translations (${res.status})`)
  const json = await res.json()

  // 3. Filter: English, full 66-book Bibles, left-to-right only
  const filtered = json.translations.filter(
    (t) =>
      t.language === "eng" &&
      t.textDirection === "ltr" &&
      t.numberOfBooks === 66
  )

  // 4. Save to localStorage with current timestamp
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: filtered })
    )
  } catch (_) {
    // localStorage might be full or blocked — not a hard failure
  }

  return filtered
}

// ── Chapter + Verses ──────────────────────────────────────────────────

/**
 * Fetch all verses for a chapter.
 * Returns [{ number, text }]
 * Cached in memory for the session.
 */
export async function fetchChapter(translationId, bookId, chapter) {
  const key = `${translationId}/${bookId}/${chapter}`

  if (chapterCache.has(key)) return chapterCache.get(key)

  const res = await fetch(`${BASE}/${translationId}/${bookId}/${chapter}.json`)
  if (!res.ok) throw new Error(`Could not load ${bookId} ${chapter} (${res.status})`)

  const data = await res.json()

  // The API returns data.chapter.content — an array of content blocks.
  // Each block has a { type } field. We only want type "verse".
  // Verse blocks look like: { type: "verse", number: 1, content: ["text", ...] }
  // content is a mixed array of strings and inline objects (footnotes etc.)
  // We join only the string parts to get clean verse text.
  const verses = (data.chapter?.content ?? [])
    .filter((block) => block.type === "verse")
    .map((block) => ({
      number: block.number,
      text: (block.content ?? [])
        .map((c) => (typeof c === "string" ? c : c.text ?? ""))
        .join("")
        .trim(),
    }))

  chapterCache.set(key, verses)
  return verses
}

/**
 * Fetch a single verse by chapter + verse number.
 * Builds the human-readable ref string e.g. "John 3:16"
 */
export async function fetchVerse(translationId, bookId, bookName, chapter, verseNumber) {
  const verses = await fetchChapter(translationId, bookId, chapter)
  const verse  = verses.find((v) => v.number === verseNumber)
  if (!verse) throw new Error(`Verse ${verseNumber} not found in ${bookId} ${chapter}`)
  return {
    text: verse.text,
    ref:  `${bookName} ${chapter}:${verseNumber}`,
  }
}

/**
 * Pick a random verse from FEATURED_VERSES and fetch its text.
 */
export async function fetchRandomVerse(translationId, featuredVerses) {
  const pick   = featuredVerses[Math.floor(Math.random() * featuredVerses.length)]
  const result = await fetchVerse(
    translationId,
    pick.bookId,
    pick.display.replace(/\s+\d.*$/, ""), // "John 3:16" → "John"
    pick.chapter,
    pick.verse
  )
  return { ...result, bookId: pick.bookId, chapter: pick.chapter, verse: pick.verse }
}