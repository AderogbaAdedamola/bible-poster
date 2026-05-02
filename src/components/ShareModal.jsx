// src/components/ShareModal.jsx
import { useState } from "react"
import { X, Copy, Check, MessageCircle, Send } from "lucide-react"
import { SiFacebook, SiX, SiInstagram } from '@icons-pack/react-simple-icons';

export default function ShareModal({ verse, style, onClose }) {
  const [copied, setCopied] = useState(false)

  // Build share URL with all poster state encoded in query params
  const params = new URLSearchParams({
    ref:   verse.verseRef   ?? "",
    text:  verse.verseText  ?? "",
    trans: verse.translationName ?? "",
    bg:    style.bgIndex       ?? 0,
    tmpl:  style.templateIndex ?? 0,
    font:  style.fontIndex     ?? 0,
    size:  style.fontSize      ?? 20,
    align: style.textAlign     ?? "center",
  })
  const shareUrl = `${window.location.origin}/v?${params.toString()}`

  const shareText = `"${verse.verseText}" — ${verse.verseRef}`

  function copyLink() {
    navigator.clipboard?.writeText(shareUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const SOCIALS = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    },
    {
      label: "Twitter / X",
      icon: SiX,
      color: "bg-stone-900 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n`)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: SiFacebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Telegram",
      icon: Send,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ]

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
          <h2 className="font-medium text-stone-900 dark:text-stone-100 text-sm">
            Share your poster
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Verse preview */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700">
            <p className="font-display text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3">
              "{verse.verseText}"
            </p>
            <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
              — {verse.verseRef} · {verse.translationName}
            </p>
          </div>

          {/* Copy link */}
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2">
              Copy link
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 truncate font-mono">
                {shareUrl}
              </div>
              <button
                onClick={copyLink}
                className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>

          {/* Social share */}
          <div>
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3">
              Share on
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SOCIALS.map(({ label, icon: Icon, color, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-150 ${color}`}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* OG note */}
          <p className="text-xs text-stone-400 dark:text-stone-500 text-center leading-relaxed">
            When shared on social media, the link will show a rich preview card with your verse and style.
          </p>
        </div>
      </div>
    </div>
  )
}