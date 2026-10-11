import Image from "next/image";
import { prisma } from "@/lib/prisma";

/**
 * Editör ile eklenen bölümleri yayında render eder.
 * Admin /admin/editor üzerinden eklenen PageSection kayıtlarını,
 * her bir sayfanın ilgili yerinde gösterir.
 */

interface PSection {
  id: string;
  blockType: string;
  title: string | null;
  content: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  style: string | null;
}

function parseStyle(s: string | null) {
  try {
    return JSON.parse(s || "{}");
  } catch {
    return {};
  }
}

export default async function PublicEditorSections({ pageSlug }: { pageSlug: string }) {
  let sections: PSection[];
  try {
    sections = await prisma.pageSection.findMany({
      where: { pageSlug, isPublished: true },
      orderBy: { position: "asc" },
    });
  } catch {
    return null;
  }

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((s) => {
        const st = parseStyle(s.style);
        const align = st.align ?? "left";
        return (
          <section
            key={s.id}
            className="py-12"
            style={{
              backgroundColor: st.bg && st.bg !== "transparent" ? st.bg : undefined,
              textAlign: align as React.CSSProperties["textAlign"],
            }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {s.blockType === "divider" ? (
                <hr className="border-[var(--border-color)]" />
              ) : (
                <>
                  {s.title && (
                    <h2 className="text-center font-serif text-3xl md:text-4xl text-[var(--foreground)] mb-4">
                      {s.title}
                    </h2>
                  )}
                  {s.content && (
                    <div
                      className="prose prose-lg mx-auto max-w-none text-[var(--muted)]"
                      dangerouslySetInnerHTML={{ __html: s.content.replace(/\n/g, "<br/>") }}
                    />
                  )}
                  {s.imageUrl && (
                    <div className="relative mx-auto mt-4 w-full max-w-4xl aspect-video overflow-hidden rounded bg-zinc-100">
                      <Image src={s.imageUrl} alt={s.imageAlt ?? ""} fill className="object-cover" sizes="900px" unoptimized />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
