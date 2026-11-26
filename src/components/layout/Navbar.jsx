"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PiArrowUpRight } from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

function getNavLinks(pathname, isMapQuery) {
  const isHome = pathname === "/";
  const isSell = pathname.startsWith("/vender");
  const isCatalogPath = pathname.startsWith("/catalogo");
  const isMapActive = isCatalogPath && isMapQuery;
  const isPropertiesActive = (isCatalogPath && !isMapQuery) || (!isHome && !isSell && !isCatalogPath);

  return [
    { label: "Propiedades", href: "/catalogo", active: isPropertiesActive },
    { label: "Mapa", href: "/catalogo?vista=mapa", active: isMapActive },
    { label: "Vender", href: "/vender", active: isSell },
  ];
}

function NavLinksInner({ mobile = false }) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const isMapQuery = searchParams?.get("vista") === "mapa";
  const isHome = pathname === "/";
  const navLinks = getNavLinks(pathname, isMapQuery);

  if (mobile) {
    return (
      <>
        <Link
          href="/"
          className={`whitespace-nowrap ${
            isHome ? "text-[var(--brand-accent)] font-semibold underline" : "text-[#5A5852]"
          }`}
        >
          Portada
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap ${
              link.active
                ? "text-[var(--brand-accent)] font-semibold underline"
                : "text-[#5A5852]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  }

  return navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`whitespace-nowrap py-1 transition-colors duration-200 ${
        link.active
          ? "text-[#121312] font-semibold border-b-2 border-[var(--brand-accent)]"
          : "text-[#5A5852] hover:text-[#121312]"
      }`}
    >
      {link.label}
    </Link>
  ));
}

function NavLinksFallback({ mobile = false }) {
  const links = [
    { label: "Propiedades", href: "/catalogo" },
    { label: "Mapa", href: "/catalogo?vista=mapa" },
    { label: "Vender", href: "/vender" },
  ];

  if (mobile) {
    return (
      <>
        <Link href="/" className="whitespace-nowrap text-[#5A5852]">
          Portada
        </Link>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap text-[#5A5852]">
            {link.label}
          </Link>
        ))}
      </>
    );
  }

  return links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="whitespace-nowrap py-1 text-[#5A5852] hover:text-[#121312] transition-colors duration-200"
    >
      {link.label}
    </Link>
  ));
}

export default function Navbar() {
  const whatsappUrl = buildWhatsAppUrl(
    `Hola ${SITE_CONFIG.brandName}, quisiera coordinar una visita presencial por una propiedad.`
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#D5D0C5]">
      <nav
        aria-label="Navegación principal"
        className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4"
      >
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-[#D5D0C5] bg-white p-0.5 overflow-hidden shrink-0">
            <Image
              src={SITE_CONFIG.logoUrl}
              alt={SITE_CONFIG.brandName}
              fill
              priority
              className="object-contain"
              sizes="44px"
            />
          </div>
          <div className="flex items-baseline gap-2.5 min-w-0">
            <span className="font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-[#121312] truncate">
              {SITE_CONFIG.brandName}
            </span>
            <span className="hidden xl:inline-block text-xs text-[#5A5852] whitespace-nowrap">
              / {SITE_CONFIG.locationLabel}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium shrink-0">
          <Suspense fallback={<NavLinksFallback />}>
            <NavLinksInner />
          </Suspense>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-[11px] sm:text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap shrink-0"
        >
          <span className="hidden min-[380px]:inline">{SITE_CONFIG.primaryCtaLabel}</span>
          <span className="min-[380px]:hidden">Visitar</span>
          <PiArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </nav>

      <div className="flex md:hidden items-center justify-between sm:justify-start gap-4 sm:gap-6 px-4 py-2.5 border-t border-[#D5D0C5] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-xs font-medium bg-[#ECE8DF]">
        <Suspense fallback={<NavLinksFallback mobile />}>
          <NavLinksInner mobile />
        </Suspense>
      </div>
    </header>
  );
}
