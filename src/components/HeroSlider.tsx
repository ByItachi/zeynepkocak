"use client";

import { useEffect, useRef, useState } from "react";

export type HeroSlide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

/**
 * Anasayfa banner'ı için otomatik kayan slider.
 * Görsel ve video karışık slaytları saniye bazlı döndürür, noktalarla manuel geçişe izin verir.
 */
export default function HeroSlider({
  slides,
  intervalMs = 5000,
  className = "",
  mediaClassName = "",
  showDots = true,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  className?: string;
  mediaClassName?: string;
  showDots?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return;
      if (Number(i) === index) {
        el.muted = true;
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [index]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (slides.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={i}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                  if (el) el.muted = true;
                }}
                src={slide.src}
                poster={slide.poster}
                autoPlay={active}
                muted
                loop
                playsInline
                className={`h-full w-full object-cover ${mediaClassName}`}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.src}
                alt={slide.alt}
                className={`h-full w-full object-cover ${mediaClassName}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        );
      })}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}. slayta geç`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-tan" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
