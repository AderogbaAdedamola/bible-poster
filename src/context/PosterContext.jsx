// src/context/PosterContext.jsx
import { createContext, useContext, useReducer } from "react"
import { BIBLE_VERSIONS } from "../data/bibles"

const PosterContext = createContext(null)

const initialState = {
  // Verse selection
  bibleId:    BIBLE_VERSIONS[0].id,  // default: KJV
  bibleName:  BIBLE_VERSIONS[0].name,
  bookId:     null,
  bookName:   null,
  chapterId:  null,
  verseId:    null,
  verseRef:   null,   // e.g. "John 3:16"
  verseText:  null,   // the actual verse content

  // Poster style (set in Editor step)
  bgIndex:       0,
  templateIndex: 0,
  fontIndex:     0,
  fontSize:      20,
  textAlign:     "center",
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_BIBLE":
      return {
        ...state,
        bibleId:   action.bibleId,
        bibleName: action.bibleName,
        // reset downstream selections when version changes
        bookId: null, bookName: null,
        chapterId: null, verseId: null,
        verseRef: null, verseText: null,
      }
    case "SET_BOOK":
      return {
        ...state,
        bookId: action.bookId, bookName: action.bookName,
        chapterId: null, verseId: null,
        verseRef: null, verseText: null,
      }
    case "SET_CHAPTER":
      return {
        ...state,
        chapterId: action.chapterId,
        verseId: null, verseRef: null, verseText: null,
      }
    case "SET_VERSE":
      return {
        ...state,
        verseId:  action.verseId,
        verseRef: action.verseRef,
        verseText: action.verseText,
      }
    case "SET_RANDOM_VERSE":
      return {
        ...state,
        verseId:   action.verseId,
        verseRef:  action.verseRef,
        verseText: action.verseText,
        bookId: null, bookName: null, chapterId: null,
      }
    case "SET_STYLE":
      return { ...state, ...action.style }
    default:
      return state
  }
}

export function PosterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PosterContext.Provider value={{ state, dispatch }}>
      {children}
    </PosterContext.Provider>
  )
}

export function usePoster() {
  const ctx = useContext(PosterContext)
  if (!ctx) throw new Error("usePoster must be used inside PosterProvider")
  return ctx
}