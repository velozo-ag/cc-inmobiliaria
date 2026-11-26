import Image from "next/image";
import Link from "next/link";
import {
  PiClockLight,
  PiMapPinLight,
  PiPhoneLight,
  PiStarFill,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    `Hola ${SITE_CONFIG.brandName}, quisiera recibir información y disponibilidad de propiedades.`
  );
  const reviewsLabel =
    SITE_CONFIG.googleReviewsCount === "1" ? "1 reseña" : `${SITE_CONFIG.googleReviewsCount} reseñas`;

  return (
    <footer className="border-t border-[#D5D0C5] bg-[#ECE8DF]/60 py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#D5D0C5]">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl border border-[#D5D0C5] bg-white p-0.5 overflow-hidden shrink-0">
              <Image
                src={SITE_CONFIG.logoUrl}
                alt={SITE_CONFIG.brandName}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <span className="font-serif font-medium tracking-tight text-lg text-[#121312]">
              {SITE_CONFIG.brandName}
            </span>
          </div>
          <p className="text-sm text-[#5A5852] max-w-sm leading-relaxed">
            {SITE_CONFIG.brandTagline}. Atención directa en {SITE_CONFIG.locationLabel}.
          </p>
          <div className="pt-1 inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-none bg-white border border-[#D5D0C5]">
            <PiStarFill className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[#121312]">
              {SITE_CONFIG.googleRating} en Google Maps ({reviewsLabel})
            </span>
          </div>
        </div>

        <div className="md:col-span-3 space-y-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-wider text-[#5A5852]">
            Cartera y Estudio
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/catalogo" className="text-[#121312] hover:underline">
                Propiedades en venta
              </Link>
            </li>
            <li>
              <Link href="/catalogo?vista=mapa" className="text-[#121312] hover:underline">
                Mapa de propiedades
              </Link>
            </li>
            <li>
              <Link
                href="/vender"
                className="text-[var(--brand-accent)] font-medium hover:underline"
              >
                Vender / Tasar MP 20
              </Link>
            </li>
            <li>
              <Link href="/#barrios" className="text-[#121312] hover:underline">
                Barrios de Corrientes
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-wider text-[#5A5852]">
            Oficina y Contacto
          </p>
          <div className="space-y-2 text-[#5A5852]">
            <p className="flex items-center gap-2">
              <PiMapPinLight className="w-4 h-4 shrink-0 text-[#121312]" />
              <span>{SITE_CONFIG.addressDisplay}</span>
            </p>
            <p className="flex items-center gap-2 font-mono">
              <PiPhoneLight className="w-4 h-4 shrink-0 text-[#121312]" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </p>
            <p className="flex items-center gap-2 text-xs">
              <PiClockLight className="w-4 h-4 shrink-0 text-[#121312]" />
              <span>{SITE_CONFIG.officeHours}</span>
            </p>
          </div>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-xs font-medium transition-all duration-200"
            >
              <PiWhatsappLogoLight className="w-4 h-4" />
              <span>Abrir WhatsApp directo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A5852]">
        <span>
          {SITE_CONFIG.brandName}. Canal oficial de comercialización y tasaciones en Corrientes.
        </span>
        <span className="font-mono">{SITE_CONFIG.locationLabel}, Argentina</span>
      </div>
    </footer>
  );
}
