# PostVerse

Turn Scripture into beautiful posters. Pick any Bible verse, style it your way, and share it with the world.

## Features

- Browse all 66 books across 50+ Bible translations — no API key required
- Searchable translation picker with 24hr local cache
- Random verse generator from 20 popular verses
- Poster editor with gradient and solid color backgrounds, overlay templates, 10 serif fonts, font size control and text alignment
- Download poster as PNG at 900x1200px
- Shareable link with Open Graph meta tags for rich social previews
- Dark and light mode with no flash on refresh
- Fully responsive — works on mobile and desktop

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- react-helmet-async
- Lucide React
- Bible data from [bible.helloao.org](https://bible.helloao.org) — free, no API key

## Getting started

```bash
git clone https://github.com/yourusername/postverse.git
cd postverse
npm install
npm run dev
```

No `.env` file needed. The Bible API is completely free and open.

## Project structure

```
src/
├── components/
│   ├── Logo.jsx              # SVG brand mark + wordmark
│   ├── Navbar.jsx            # Sticky nav with mobile hamburger menu
│   ├── PosterCanvas.jsx      # Poster renderer — used in editor and share page
│   ├── TranslationPicker.jsx # Searchable Bible translation dropdown
│   ├── VersePicker.jsx       # Book / chapter / verse selector
│   └── ShareModal.jsx        # Share link + social buttons modal
├── context/
│   ├── ThemeContext.jsx       # Dark / light mode state
│   └── PosterContext.jsx      # Selected verse + poster style state
├── data/
│   ├── bibles.js             # Books, featured verses
│   └── backgrounds.js        # Backgrounds, templates, fonts
├── hooks/
│   └── useBible.js           # Bible API fetch helpers with caching
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Create.jsx            # Verse picker (step 1)
│   ├── Editor.jsx            # Poster editor (step 2)
│   ├── PosterView.jsx        # Share link landing page
│   └── NotFound.jsx          # 404
└── utils/
    └── download.js           # Canvas-based PNG export
```

## Bible API

All verse data is fetched from [bible.helloao.org](https://bible.helloao.org) — a free, open CDN-hosted Bible API with 1000+ translations. No account or API key required.

Endpoint used:
```
GET https://bible.helloao.org/api/{translation}/{book}/{chapter}.json
```

Translation list is fetched once and cached in localStorage for 24 hours.
Chapter verses are cached in memory for the session.

## Deployment

Works with any static host — Vercel, Netlify, Cloudflare Pages.

```bash
npm run build
```

For clean URL routing on Vercel, add a `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

For Netlify, add a `public/_redirects` file:
```
/*  /index.html  200
```
