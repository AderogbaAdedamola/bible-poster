// src/hooks/useBible.js
// Wraps the api.bible REST API with simple fetch + in-memory cache

const BASE = "https://api.scripture.api.bible/v1"
const API_KEY = import.meta.env.VITE_BIBLE_API_KEY

// Simple in-memory cache so we don't re-fetch the same data
const cache = new Map()

async function apiFetch(path) {
  if (cache.has(path)) return cache.get(path)

  const res = await fetch(`${BASE}${path}`, {
    headers: { "api-key": API_KEY },
  })

  if (!res.ok) {
    throw new Error(`api.bible error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  cache.set(path, json.data)
  return json.data
}

// ─── Exported helpers ────────────────────────────────────────────────

/** Fetch all chapters for a given book in a given Bible version */
export async function fetchChapters(bibleId, bookId) {
  return apiFetch(`/bibles/${bibleId}/books/${bookId}/chapters`)
}

/** Fetch all verses for a given chapter */
export async function fetchVerses(bibleId, chapterId) {
  return apiFetch(`/bibles/${bibleId}/chapters/${chapterId}/verses`)
}

/**
 * Fetch the full text of a single verse.
 * Returns the verse object with a clean `text` field stripped of HTML/markup.
 */
export async function fetchVerseText(bibleId, verseId) {
  const data = await apiFetch(
    `/bibles/${bibleId}/verses/${verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`
  )
  return {
    ...data,
    text: data.content?.trim() ?? "",
  }
}

/**
 * Fetch a random featured verse.
 * Takes a bibleId and a list of FEATURED_VERSES refs, picks one at random.
 */
export async function fetchRandomVerse(bibleId, featuredVerses) {
  const pick = featuredVerses[Math.floor(Math.random() * featuredVerses.length)]
  const data = await fetchVerseText(bibleId, pick.ref)
  return { ...data, display: pick.display }
}