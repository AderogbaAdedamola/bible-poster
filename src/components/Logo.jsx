// src/components/Logo.jsx
// PostVerse logo — a stylised open book whose pages form a subtle "V"
// Works on both light and dark backgrounds via currentColor

export default function Logo({ size = 32, showText = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Book spine (center line) */}
        <rect x="19" y="7" width="2" height="26" rx="1" fill="currentColor" opacity="0.9" />

        {/* Left page — slightly angled, warm cream fill in light, soft in dark */}
        <path
          d="M19 8 C14 8 6 10 5 14 L5 32 C6 29 13 27 19 27 Z"
          fill="currentColor"
          opacity="0.13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right page — the "V" sweep */}
        <path
          d="M21 8 C26 8 34 10 35 14 L35 32 C34 29 27 27 21 27 Z"
          fill="currentColor"
          opacity="0.13"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Left page lines (text lines) */}
        <line x1="9"  y1="15" x2="17" y2="14.5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.45" />
        <line x1="8"  y1="19" x2="17" y2="18.5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.35" />
        <line x1="8"  y1="23" x2="17" y2="22.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />

        {/* Right page lines */}
        <line x1="23" y1="14.5" x2="31" y2="15"  stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.45" />
        <line x1="23" y1="18.5" x2="32" y2="19"  stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.35" />
        <line x1="23" y1="22.5" x2="32" y2="23"  stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.25" />

        {/* Small accent dot at top of spine */}
        <circle cx="20" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className="font-display tracking-tight leading-none">
          <span className="text-stone-900 dark:text-stone-100 font-semibold">Post</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">Verse</span>
        </span>
      )}
    </span>
  )
}