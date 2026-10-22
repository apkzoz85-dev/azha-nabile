import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { site, tracking, launch } from "@/lib/config";
import { UIProvider } from "@/components/ui-state";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "فيلات أزها العين السخنة | Azha Ain Sokhna — الطرح الأول من مدار",
  description:
    "فيلات مستقلة على جزيرة داخل أزها العين السخنة من مدار للتطوير العقاري، إطلالة مباشرة على اللاجون وعلى بُعد 500 متر من البحر، تشطيب كامل بالمطبخ والتكييفات. عدد محدود في الطرح الأول.",
  keywords: [
    "ازها العين السخنة",
    "فيلات ازها السخنة",
    "Azha Ain Sokhna",
    "Azha Sokhna villas",
    "مدار للتطوير العقاري",
    "فيلا على اللاجون العين السخنة",
    "اسعار ازها السخنة",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${launch.headline} | ${launch.projectEn}`,
    description: launch.subheadline,
    locale: "ar_EG",
    type: "website",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2433",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasGtag = !tracking.gtagId.includes("XXXX");
  return (
    <html lang="ar" dir="rtl" className={`${arabic.variable} ${serif.variable}`}>
      <body className="font-sans">
        {hasGtag && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${tracking.gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${tracking.gtagId}');`}
            </Script>
          </>
        )}
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
