// src/hooks/useBible.js
// Fetches from bible.helloao.org — completely free, no API key needed.
//
// API structure:
//   GET /api/{translationId}/{bookId}/{chapter}.json
//   → returns the full chapter with all verses as an array
//
// We always fetch a whole chapter at once (it's cheap — small JSON files
// served from AWS CDN), then pluck the verse we need from the array.
// This means selecting verse 5 after verse 3 costs zero extra requests.

const BASE = "https://bible.helloao.org/api"

// In-memory cache: key = "translationId/bookId/chapter"
const cache = new Map()

/**
 * Fetch all verses for a chapter.
 * Returns an array of verse objects: { number, text }
 */
export async function fetchChapter(translationId, bookId, chapter) {
  const key = `${translationId}/${bookId}/${chapter}`
  if (cache.has(key)) return cache.get(key)

  const res = await fetch(`${BASE}/${translationId}/${bookId}/${chapter}.json`)
  if (!res.ok) throw new Error(`Failed to fetch ${bookId} ${chapter} (${res.status})`)

  const data = await res.json()

  // helloao returns: data.verses = [{ number, text, ... }, ...]
  const verses = (data.verses ?? []).map((v) => ({
    number: v.number,
    text:   v.text?.trim() ?? "",
  }))

  cache.set(key, verses)
  return verses
}

/**
 * Fetch a single verse text.
 * bookName is used only for building the human-readable reference string.
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
  const pick = featuredVerses[Math.floor(Math.random() * featuredVerses.length)]
  const result = await fetchVerse(
    translationId,
    pick.bookId,
    // derive book name from display e.g. "John 3:16" → "John"
    pick.display.replace(/\s+\d.*$/, ""),
    pick.chapter,
    pick.verse
  )
  return { ...result, bookId: pick.bookId, chapter: pick.chapter, verse: pick.verse }
}