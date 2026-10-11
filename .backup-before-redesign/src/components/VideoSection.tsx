"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Clip {
  src: string;
  poster?: string;
  alt: string;
}

export default function VideoSection({
  id = "video-section",
  eyebrow = "Grup Çalışmalarından Kesitler",
  title = "Terapi Sürecinden Hareketli Anlar",
  description,
  clips = [],
  autoPlay = true,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  clips?: Clip[];
  autoPlay?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [failed, setFailed] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const go = useCallback((i: number) => {
    setActive(i);
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const hasFailedAll = clips.length > 0 && clips.every((_, i) => failed.has(i));
  const activeClip = clips[active];

  if (clips.length === 0 || hasFailedAll) {
    return null;
  }

  return (
    <section id={id} className="bg-[#1f231d] dark:bg-[#121512] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a87c] mb-3 font-medium">{eyebrow}</p>
          )}
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5f2ea] mb-4">{title}</h2>
          {description && (
            <p className="text-[#a8ad9f] leading-relaxed">{description}</p>
          )}
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-video max-w-5xl mx-auto">
          <video
            key={active}
            ref={videoRef}
            className={`w-full h-full object-cover ${playing ? "" : "opacity-0"} transition-opacity`}
            src={activeClip.src}
            poster={activeClip.poster}
            muted
            loop
            playsInline
            preload="none"
            autoPlay={autoPlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed((prev) => new Set(prev).add(active))}
            aria-label={activeClip.alt}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {!playing && (
            <button
              onClick={() => videoRef.current?.play().catch(() => {})}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Videoyu oynat"
            >
              <span className="w-16 h-16 rounded-full bg-white/90 text-[#2f332e] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {clips.length > 1 && (
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {clips.map((clip, i) => (
              <button
                key={clip.src + i}
                onClick={() => go(i)}
                aria-label={clip.alt}
                className={`w-3 h-3 rounded-full transition-all ${i === active ? "bg-[#c9a87c] w-8" : "bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
