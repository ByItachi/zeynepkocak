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
import { LocaleProvider } from "@/components/LocaleProvider";

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zeynepkocak-ecru.vercel.app";
  return {
    title: settings.site_title,
    description: settings.site_tagline,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: "/favicon.png",
    },
    openGraph: {
      title: settings.site_title,
      description: settings.site_tagline,
      url: siteUrl,
      siteName: settings.site_title,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: settings.site_title }],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.site_title,
      description: settings.site_tagline,
      images: ["/og-image.png"],
    },
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
        <LocaleProvider>
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
        </LocaleProvider>
      </body>
    </html>
  );
}
