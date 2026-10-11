"use client";

import { useState } from "react";

/**
 * Poster + oynat düğmesi ile başlayan video kartı.
 * Tıklandığında gerçek videoyu kontrollerle oynatır.
 */
export default function VideoCard({
  src,
  poster,
  label,
  sub,
  caption,
  aspect = "4/3",
  objectPosition = "center",
  className = "",
}: {
  src: string;
  poster: string;
  label?: string;
  sub?: string;
  caption?: string;
  /** CSS aspect-ratio; dikey (9:16) videolar için "3/4" gibi bir değer verin. */
  aspect?: string;
  /** object-position; alt tarafı siyah dolgu olan dikey videolarda "center top" önerilir. */
  objectPosition?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-[22px] bg-forest-deep shadow-[0_30px_70px_-40px_rgba(26,44,36,0.8)]">
        {playing ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            style={{ aspectRatio: aspect, objectPosition }}
            className="w-full bg-black object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block w-full cursor-pointer"
            aria-label={label ? `${label} videosunu oynat` : "Videoyu oynat"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={label ?? "Grup çalışması görseli"}
              style={{ aspectRatio: aspect, objectPosition }}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/60 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-tan group-hover:text-forest">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-white group-hover:text-forest">
                  <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11-6.86a1.03 1.03 0 0 0 0-1.76l-11-6.86A1.03 1.03 0 0 0 8 5.14Z" />
                </svg>
              </span>
            </span>
            {(label || sub) && (
              <span className="absolute bottom-5 left-5 rounded-full bg-paper px-4 py-2 text-left shadow-lg">
                {label && (
                  <span className="block text-[13px] font-semibold leading-tight text-forest">{label}</span>
                )}
                {sub && <span className="block text-[11px] leading-tight text-muted">{sub}</span>}
              </span>
            )}
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[12.5px] text-muted">{caption}</figcaption>}
    </figure>
  );
}
