"use client";

import Image from "next/image";
import { useState } from "react";

type Post = { image: string; href: string; alt: string };

export default function InstagramGallery({
  posts,
  instagramUrl,
}: {
  posts: Post[];
  instagramUrl: string;
}) {
  const [count, setCount] = useState(6);
  const visible = posts.slice(0, count);
  const hasMore = count < posts.length;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {visible.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-square overflow-hidden rounded-lg border border-[#e2dccd] dark:border-[#2f332e] group"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </a>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setCount((c) => c + 6)}
            className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] dark:text-[#8b9a7a] dark:border-[#8b9a7a] px-8 py-3 rounded hover:bg-[#f1ece2] dark:hover:bg-[#2f332e] transition-colors font-medium text-sm"
          >
            Devamını Yükle
          </button>
        </div>
      )}
      {!hasMore && posts.length > 6 && (
        <div className="text-center mt-6">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5e6b52] dark:text-[#8b9a7a] font-medium hover:underline text-sm"
          >
            Tüm gönderileri Instagram&apos;da gör →
          </a>
        </div>
      )}
    </div>
  );
}
