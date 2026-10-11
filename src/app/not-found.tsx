import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-8">
          <Logo className="w-16 h-16 opacity-30" />
        </div>
        <h1 className="font-serif text-6xl text-[#5e6b52] dark:text-[#8b9a7a] mb-4">404</h1>
        <h2 className="font-serif text-2xl text-[#2f332e] dark:text-[#e8e4dc] mb-3">
          Sayfa Bulunamadı
        </h2>
        <p className="text-[#5b5f58] dark:text-[#9a9e95] mb-8 leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. Ana sayfaya dönerek
          yolculuğunuza devam edebilirsiniz.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-block bg-[#5e6b52] text-white px-6 py-2.5 rounded hover:bg-[#4c5742] transition-colors font-medium text-sm"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/iletisim"
            className="inline-block border-2 border-[#5e6b52] text-[#5e6b52] dark:text-[#8b9a7a] dark:border-[#8b9a7a] px-6 py-2.5 rounded hover:bg-[#f1ece2] dark:hover:bg-[#2f332e] transition-colors font-medium text-sm"
          >
            İletişim
          </Link>
        </div>
      </div>
    </div>
  );
}
