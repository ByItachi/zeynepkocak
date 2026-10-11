import Image from "next/image";

interface Section {
  id: string;
  blockType: string;
  title: string | null;
  content: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  layout: string | null;
  style: string | null;
  position: number;
  isPublished: boolean;
}

function parseStyle(s: string | null) {
  try {
    return JSON.parse(s || "{}");
  } catch {
    return {};
  }
}

export default function PageRenderer({ sections }: { sections: Section[] }) {
  const published = sections.filter((s) => s.isPublished);

  return (
    <div className="bg-white border border-[#e2dccd] rounded-lg overflow-hidden">
      <div className="px-3 py-2 bg-[#f7f4ec] border-b border-[#e2dccd] text-xs text-[#5b5f58]">
        Canlı Önizleme ({published.length} yayında)
      </div>
      <div className="space-y-8">
        {published.length === 0 && (
          <p className="text-sm text-[#5b5f58] p-4">Yayındaki bölüm yok.</p>
        )}
        {published.map((s) => {
          const st = parseStyle(s.style);
          const align = st.align ?? "left";
          return (
            <section key={s.id} className="px-4 py-2" style={{ backgroundColor: st.bg && st.bg !== "transparent" ? st.bg : undefined }}>
              <div style={{ textAlign: align }} className={st.size === "lg" ? "text-2xl" : st.size === "sm" ? "text-sm" : "text-lg"}>
                {s.title && <h2 className="font-serif mb-1">{s.title}</h2>}
                {s.content && <p className="text-sm whitespace-pre-wrap">{s.content}</p>}
                {s.imageUrl && (
                  <div className="relative w-full max-w-full aspect-video rounded mt-2 bg-[#f1ece2]">
                    <Image src={s.imageUrl} alt={s.imageAlt ?? ""} fill className="object-cover rounded" sizes="300px" unoptimized />
                  </div>
                )}
                {s.blockType === "quote" && s.content && (
                  <blockquote className="border-l-4 border-[var(--primary)] pl-3 italic">
                    {s.content}
                  </blockquote>
                )}
                {s.blockType === "divider" && <hr className="my-2 border-[var(--border-color)]" />}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
