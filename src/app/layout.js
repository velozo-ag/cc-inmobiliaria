import localFont from "next/font/local";
import "./globals.css";
import { SITE_CONFIG } from "@/data/properties";

const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

const newsreader = localFont({
  src: [
    {
      path: "./fonts/Newsreader-Variable.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/Newsreader-Italic-Variable.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: {
    template: `%s | ${SITE_CONFIG.brandName}`,
    default: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.brandTagline}`,
  },
  description: SITE_CONFIG.hero.subtitle,
  openGraph: {
    title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.brandTagline}`,
    description: SITE_CONFIG.hero.subtitle,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${newsreader.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312] antialiased selection:bg-[#A80038]/15"
      >
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#121312] focus:text-white focus:text-xs focus:font-semibold"
        >
          Saltar al contenido principal
        </a>
        <div className="paper-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
