import { getAllSettings } from "@/lib/settings";
import ContactForm from "./_ContactForm";

export const dynamic = "force-dynamic";

export default async function IletisimPage() {
  const settings = await getAllSettings();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">İletişim</h1>
      <p className="text-[#5b5f58] mb-8">Konum: {settings.location}</p>
      <ContactForm />
    </div>
  );
}
