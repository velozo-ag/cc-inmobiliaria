import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiCheckLight,
  PiCompassLight,
  PiMapPinLight,
  PiShieldCheckLight,
} from "react-icons/pi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInquiryForm from "@/components/property/PropertyInquiryForm";
import PropertyActionsBar from "@/components/property/PropertyActionsBar";
import LocationMap3D from "@/components/property/LocationMap3D";
import { PROPERTIES, SITE_CONFIG, getPropertyBySlug } from "@/data/properties";

export function generateStaticParams() {
  return PROPERTIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getPropertyBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const item = getPropertyBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedItems = PROPERTIES.filter((other) => other.slug !== item.slug).slice(0, 2);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312]">
      <Navbar />

      <main id="contenido-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 sm:pt-10 pb-16 sm:pb-24">
        <nav
          aria-label="Ruta de navegación"
          className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-[#D5D0C5] text-xs font-mono text-[#5A5852]"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#121312] hover:underline">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/catalogo" className="hover:text-[#121312] hover:underline">
                {SITE_CONFIG.unitPlural}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/catalogo?categoria=${encodeURIComponent(item.category)}`}
                className="hover:text-[#121312] hover:underline"
              >
                {item.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#121312]">{item.neighborhood}</li>
          </ol>

          <span>
            Ref. {item.code} · {item.updatedLabel}
          </span>
        </nav>

        <div className="mb-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--brand-accent)]">
              <PiMapPinLight className="w-4 h-4 shrink-0" />
              <span>{item.location}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#121312]">
              <PiShieldCheckLight className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>{item.legalStatus}</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight max-w-3xl leading-[1.1] text-balance">
              {item.title}
            </h1>

            <div className="flex items-baseline gap-3 shrink-0">
              <span className="text-2xl md:text-3xl font-mono font-semibold tabular-nums">
                {item.priceLabel}
              </span>
            </div>
          </div>

          <div className="pt-1">
            <PropertyActionsBar item={item} />
          </div>
        </div>

        <PropertyGallery
          item={item}
          title={item.title}
          gallery={item.gallery}
          primaryImage={item.image}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-5 border-y border-[#D5D0C5] text-sm font-medium tabular-nums">
              <span>{item.primaryMetric}</span>
              <span className="text-[#D5D0C5]">|</span>
              <span>{item.secondaryMetric}</span>
              <span className="text-[#D5D0C5]">|</span>
              <span>{item.tertiaryMetric}</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-medium tracking-tight">
                Memoria descriptiva
              </h2>
              <p className="text-base text-[#5A5852] leading-relaxed max-w-[60ch]">
                {item.summary}
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-serif font-medium tracking-tight">
                Especificaciones técnicas
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#D5D0C5] border border-[#D5D0C5]">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="bg-[#F4F1EA] p-4 space-y-1">
                    <dt className="text-[11px] font-mono uppercase tracking-wider text-[#5A5852]">
                      {spec.label}
                    </dt>
                    <dd className="text-base font-semibold text-[#121312] tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-5">
              <h3 className="text-2xl font-serif font-medium tracking-tight">
                Equipamiento y terminaciones
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8">
                {item.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-start gap-2.5 text-sm">
                    <PiCheckLight className="w-4 h-4 shrink-0 mt-1 text-[var(--brand-accent)]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {item.nearbyHighlights?.length > 0 && (
              <div className="space-y-5 pt-6 border-t border-[#D5D0C5]">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-medium tracking-tight">
                    Entorno y conectividad en {item.neighborhood}
                  </h3>
                  <p className="text-xs text-[#5A5852]">
                    Referencia urbana directa en {SITE_CONFIG.locationLabel}.
                  </p>
                </div>
                <ul className="space-y-3">
                  {item.nearbyHighlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#121312]">
                      <PiCompassLight className="w-4 h-4 shrink-0 mt-1 text-[var(--brand-accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t border-[#D5D0C5] text-xs text-[#5A5852] flex flex-wrap items-center justify-between gap-3">
              <span>
                Corredora responsable: <strong className="text-[#121312]">{SITE_CONFIG.brandTagline}</strong>
              </span>
              <span className="font-mono">{SITE_CONFIG.addressDisplay}</span>
            </div>
          </div>

          <PropertyInquiryForm item={item} />
        </div>

        <section
          id="ubicacion-propiedad"
          className="mt-20 pt-14 border-t border-[#D5D0C5] scroll-mt-24 space-y-5"
        >
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-[#121312]">
              Ubicación en {item.neighborhood}
            </h2>
            <p className="text-sm text-[#5A5852]">
              Referencia exacta sobre calle real en {SITE_CONFIG.locationLabel}.
            </p>
          </div>
          <LocationMap3D activeSlug={item.slug} />
        </section>

        {relatedItems.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 sm:pt-14 border-t border-[#D5D0C5]">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-tight">
                Más opciones en {SITE_CONFIG.brandName}
              </h2>
              <Link
                href="/catalogo"
                className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)] hover:underline whitespace-nowrap"
              >
                Ver todo ({PROPERTIES.length})
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center"
                >
                  <div className="sm:col-span-5 relative aspect-[16/10] overflow-hidden rounded-none bg-black/5">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </div>
                  <div className="sm:col-span-7 space-y-1.5">
                    <span className="text-xs font-mono font-semibold text-[var(--brand-accent)]">
                      {rel.priceLabel}
                    </span>
                    <h3 className="text-lg font-serif font-normal tracking-tight group-hover:underline">
                      {rel.title}
                    </h3>
                    <p className="text-xs font-mono text-[#5A5852]">{rel.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
