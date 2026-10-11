import Image from "next/image";
import { getAllSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function HakkimdaPage() {
  const settings = await getAllSettings();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={settings.profile_image_url}
          alt={settings.hero_heading}
          width={72}
          height={72}
          className="rounded-full object-cover w-18 h-18 border-2 border-white shadow"
        />
        <h1 className="font-serif text-3xl">Hakkımda</h1>
      </div>
      <p className="text-[#5b5f58] whitespace-pre-line mb-6">{settings.about_text}</p>
      <ul className="flex flex-wrap gap-2 text-sm text-[#5b5f58]">
        {[
          "Yetişkin",
          "Ergen",
          "Çift",
          "Yüz yüze & Online",
          "Co-Psychodramatist",
          "Expat Psychologist",
          "Transformational Breath® Practitioner",
        ].map(
          (tag) => (
            <li key={tag} className="border border-[#e2dccd] rounded-full px-4 py-1.5 bg-white">
              {tag}
            </li>
          )
        )}
      </ul>
      <p className="text-sm text-[#5b5f58] mt-8">Konum: {settings.location}</p>
    </div>
  );
}
