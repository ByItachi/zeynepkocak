import Link from "next/link";
import { getAllSettings } from "@/lib/settings";

export const metadata = {
  title: "Expat Psychologist | Zeynep Koçak",
  description: "Türkiye'de yaşayan yabancı danışanlar için İngilizce psikolojik destek.",
};

export default async function ExpatPage() {
  const settings = await getAllSettings();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/calisma-alanlarim" className="text-[#5e6b52] text-sm hover:underline mb-4 inline-block">
            ← Çalışma Alanlarım
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-[#2f332e]">
            Expat Psychologist
          </h1>
          <p className="text-lg text-[#5b5f58] leading-relaxed">
            A thoughtful space to explore your experiences, relationships and transitions.
          </p>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">About This Service</h2>
            <p className="text-[#5b5f58] mb-8 leading-relaxed">
              I offer therapy sessions in English for expats living in Turkey. Whether you're navigating cultural transitions, managing homesickness, building new relationships, or exploring your identity in a new country, I'm here to provide professional psychological support.
            </p>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Who Is This For?</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Expats experiencing cultural adjustment challenges</li>
              <li>• Individuals navigating identity and belonging questions</li>
              <li>• People managing relationships across cultures</li>
              <li>• Those experiencing homesickness or isolation</li>
              <li>• Couples where one or both partners are expats</li>
              <li>• Teenagers growing up in a foreign country</li>
              <li>• Anyone seeking therapy in English</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Topics We Can Explore</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• Cultural adjustment and adaptation</li>
              <li>• Identity and belonging</li>
              <li>• Relationships and communication</li>
              <li>• Anxiety, stress, and emotional well-being</li>
              <li>• Life transitions and major changes</li>
              <li>• Career and professional development</li>
              <li>• Family dynamics and long-distance relationships</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Session Format</h2>
            <ul className="text-[#5b5f58] mb-8 leading-relaxed space-y-3">
              <li>• <strong>Session Duration:</strong> 50 minutes</li>
              <li>• <strong>Frequency:</strong> Weekly (flexible based on your needs)</li>
              <li>• <strong>Location:</strong> Bağdat Cad., Istanbul (in-person) or online</li>
              <li>• <strong>Language:</strong> English</li>
              <li>• <strong>Confidentiality:</strong> Completely confidential and secure</li>
            </ul>

            <h2 className="font-serif text-3xl mb-6 text-[#2f332e]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Is therapy in English as effective as in my native language?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Yes. While language can be a factor, what matters most is having a safe space to express yourself and work with a professional therapist. Many expats find that therapy in English works well for them.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Can I do online sessions?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Absolutely. Online sessions are available for those who prefer them or cannot meet in person.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2 text-[#2f332e]">Is everything confidential?</h3>
                <p className="text-[#5b5f58] leading-relaxed">
                  Yes. All information shared in therapy is completely confidential and protected by professional ethics standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İLETİŞİM CTA */}
      <section className="bg-[#5e6b52] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Ready to Start?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            I'm here to support you on your journey. Please reach out to discuss how I can help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={settings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#5e6b52] px-8 py-3 rounded hover:bg-[#f1ece2] transition-colors font-medium"
            >
              WhatsApp
            </a>
            <Link
              href="/iletisim"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded hover:bg-[#4c5742] transition-colors font-medium"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
