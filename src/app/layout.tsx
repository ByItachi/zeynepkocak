import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getAllSettings } from "@/lib/settings";
import { getDesignSettings, designCssVariables } from "@/lib/design";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FloatingButtons from "@/components/FloatingButtons";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAllSettings();
  return {
    title: settings.site_title,
    description: settings.site_tagline,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAllSettings();
  const design = await getDesignSettings();
  const themeCss = designCssVariables(design);

  return (
    <html
      lang="tr"
      className={`h-full antialiased theme-applied ${inter.variable} ${playfair.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <GoogleAnalytics />
        <style id="theme-css" dangerouslySetInnerHTML={{ __html: themeCss }} />
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <SiteHeader
          brandName={settings.brand_name}
          instagramUrl={settings.instagram_url}
          profileImageUrl={settings.profile_image_url}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          brandName={settings.brand_name}
          instagramUrl={settings.instagram_url}
          whatsappUrl={settings.whatsapp_url}
          email={settings.contact_email}
          location={settings.location}
        />
        <FloatingButtons
          whatsappUrl={settings.whatsapp_url}
          instagramUrl={settings.instagram_url}
          phone="+905551234567"
        />
      </body>
    </html>
  );
}
