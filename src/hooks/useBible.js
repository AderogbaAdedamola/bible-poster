
const BASE = "https://bible.helloao.org/api"
const CACHE_KEY      = "postverse_translations"
const CACHE_DURATION = 24 * 60 * 60 * 1000  

// In-memory cache for chapter verse arrays
// key: "translationId/bookId/chapter"  value: verse[]
const chapterCache = new Map()



export async function fetchTranslations() {

  try {
    const stored = localStorage.getItem(CACHE_KEY)
    if (stored) {
      const { timestamp, data } = JSON.parse(stored)
      const age = Date.now() - timestamp
      if (age < CACHE_DURATION) {
        return data  
      }
    }
  } catch (_) {

  }

  const res = await fetch(`${BASE}/available_translations.json`)
  if (!res.ok) throw new Error(`Failed to fetch translations (${res.status})`)
  const json = await res.json()

  //  Filter: English, full 66-book Bibles, left-to-right only
  const filtered = json.translations.filter(
    (t) =>
      t.language === "eng" &&
      t.textDirection === "ltr" &&
      t.numberOfBooks === 66
  )

  // Save to localStorage with current timestamp
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: filtered })
    )
  } catch (_) {
    
  }

  return filtered
}



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
    pick.display.replace(/\s+\d.*$/, ""), 
    pick.chapter,
    pick.verse
  )
  return { ...result, bookId: pick.bookId, chapter: pick.chapter, verse: pick.verse }
}