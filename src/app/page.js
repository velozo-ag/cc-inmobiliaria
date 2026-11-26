import Image from "next/image";
import Link from "next/link";
import {
  PiArrowUpRight,
  PiBuildingsLight,
  PiCarLight,
  PiClockLight,
  PiKeyLight,
  PiMapPinLight,
  PiPhoneLight,
  PiShieldCheckLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import HeroVideo from "@/components/home/HeroVideo";
import LocationMap3D from "@/components/property/LocationMap3D";
import { NEIGHBORHOODS, PROPERTIES, SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

const HIGHLIGHT_ICONS = {
  buildings: PiBuildingsLight,
  key: PiKeyLight,
  shield: PiShieldCheckLight,
  car: PiCarLight,
};

export default function HomePage() {
  const { hero, highlightsSection, ctaBanner } = SITE_CONFIG;
  const featuredProperty =
    PROPERTIES.find((item) => item.slug === "edificio_jen_belgrano_200_cochera") || PROPERTIES[0];
  const orderedRest = [
    PROPERTIES.find((item) => item.slug === "casa_venta_av_3_de_abril_1000"),
    PROPERTIES.find((item) => item.slug === "depto_torre_santa_rita_b_la_cruz"),
    PROPERTIES.find((item) => item.slug === "depto_belgrano_2000_b_libertad"),
    PROPERTIES.find((item) => item.slug === "depto_madariaga_900_3_dorm_cochera"),
    PROPERTIES.find((item) => item.slug === "depto_madariaga_900_piso_5_frente"),
    PROPERTIES.find((item) => item.slug === "casa_doctor_bonastre_3_dormitorios"),
  ].filter(Boolean);
  const gridProperties =
    orderedRest.length === PROPERTIES.length - 1
      ? orderedRest
      : PROPERTIES.filter((item) => item.slug !== featuredProperty.slug);

  const bentoSpans = [
    "lg:col-span-7",
    "lg:col-span-5",
    "lg:col-span-6",
    "lg:col-span-6",
    "lg:col-span-5",
    "lg:col-span-7",
  ];

  const whatsappDirectUrl = buildWhatsAppUrl(
    `Hola ${SITE_CONFIG.brandName}, me contacto desde su web para consultar por propiedades disponibles.`
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312]">
      <Navbar />

      <main id="contenido-principal" className="flex-1 overflow-x-clip">
        <section className="relative w-full min-h-[calc(100dvh-6.75rem)] md:min-h-[calc(100dvh-5rem)] flex flex-col justify-end overflow-hidden bg-[#1D1E1C] text-white pt-10 sm:pt-16 pb-8 md:pb-12">
          <HeroVideo
            poster={hero.image}
            desktopSrc={hero.videoDesktopUrl}
            mobileSrc={hero.videoMobileUrl}
            alt={hero.featuredCaption}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#121312]/85 via-[#121312]/30 to-[#121312]/10"
          />

          <div className="relative z-10 max-w-7xl w-full mx-auto px-4 space-y-5 sm:space-y-6">
            <div className="max-w-4xl space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/85">
                {hero.eyebrow}
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.08] text-balance [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
                {hero.titleMain}{" "}
                <span className="italic font-normal text-[#F4F1EA] inline-block pb-1">
                  {hero.titleItalic}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-[48ch] leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                {hero.subtitle}
              </p>
            </div>

            <form
              action="/catalogo"
              method="GET"
              className="bg-[#D5D0C5] text-[#121312] border border-[#D5D0C5] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-px"
            >
              <div className="lg:col-span-3 p-3.5 lg:p-4 bg-[#F4F1EA]">
                <label
                  htmlFor="hero-categoria"
                  className="block text-[11px] font-mono text-[#5A5852] mb-1"
                >
                  {hero.searchLabels.field1Label}
                </label>
                <select
                  id="hero-categoria"
                  name="categoria"
                  className="w-full bg-transparent text-sm font-semibold text-[#121312] focus:outline-none cursor-pointer"
                >
                  {hero.searchLabels.field1Options.map((opt) => (
                    <option key={opt} value={opt === "Todas" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-4 p-3.5 lg:p-4 bg-[#F4F1EA]">
                <label htmlFor="hero-zona" className="block text-[11px] font-mono text-[#5A5852] mb-1">
                  {hero.searchLabels.field2Label}
                </label>
                <select
                  id="hero-zona"
                  name="zona"
                  className="w-full bg-transparent text-sm font-semibold text-[#121312] focus:outline-none cursor-pointer"
                >
                  {hero.searchLabels.field2Options.map((opt) => (
                    <option key={opt} value={opt === "Todas" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 p-3.5 lg:p-4 bg-[#F4F1EA]">
                <label htmlFor="hero-tipo" className="block text-[11px] font-mono text-[#5A5852] mb-1">
                  {hero.searchLabels.field3Label}
                </label>
                <select
                  id="hero-tipo"
                  name="tipo"
                  className="w-full bg-transparent text-sm font-semibold text-[#121312] focus:outline-none cursor-pointer"
                >
                  {hero.searchLabels.field3Options.map((opt) => (
                    <option key={opt} value={opt === "Todas" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2 flex bg-[var(--brand-accent)]">
                <button
                  type="submit"
                  className="w-full px-5 py-4 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>{hero.searchLabels.submitLabel}</span>
                  <PiArrowUpRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/90">
              <Link
                href="/catalogo?vista=mapa"
                className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
              >
                <PiMapPinLight className="w-4 h-4" />
                <span>Explorar en el mapa</span>
              </Link>
              <Link
                href="/vender"
                className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
              >
                <span>¿Vendés tu propiedad? Pedir tasación</span>
                <PiArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="space-y-4 pb-8 sm:pb-10 border-b border-[#D5D0C5] max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] text-balance">
              {SITE_CONFIG.catalogTitle}
            </h2>
            <p className="text-sm md:text-base text-[#5A5852] leading-relaxed max-w-[58ch]">
              {SITE_CONFIG.catalogSubtitle}
            </p>
            <div className="pt-1">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] hover:underline whitespace-nowrap"
              >
                <span>Ver cartera completa ({PROPERTIES.length})</span>
                <PiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal className="py-10 sm:py-12 border-b border-[#D5D0C5]">
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center group">
              <Link
                href={`/${featuredProperty.slug}`}
                className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-none bg-[#ECE8DF] block"
              >
                <Image
                  src={featuredProperty.image}
                  alt={featuredProperty.title}
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </Link>

              <div className="lg:col-span-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#D5D0C5] pb-3 text-xs">
                  <span className="font-mono text-[#5A5852]">
                    Destacada · {featuredProperty.code}
                  </span>
                  <span className="font-mono font-semibold text-base text-[#121312] tabular-nums">
                    {featuredProperty.priceLabel}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A5852]">
                    <PiMapPinLight className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
                    <span>{featuredProperty.location}</span>
                  </p>
                  <Link href={`/${featuredProperty.slug}`} className="block">
                    <h3 className="text-2xl md:text-4xl font-serif font-medium leading-[1.15] group-hover:underline">
                      {featuredProperty.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#5A5852] leading-relaxed max-w-[48ch]">
                    {featuredProperty.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-[#D5D0C5] text-xs tabular-nums">
                  <div>
                    <span className="block text-[11px] text-[#5A5852]">Escala</span>
                    <span className="font-semibold">{featuredProperty.primaryMetric}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5A5852]">Programa</span>
                    <span className="font-semibold">{featuredProperty.secondaryMetric}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#5A5852]">Estado</span>
                    <span className="font-semibold">{featuredProperty.tertiaryMetric}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/${featuredProperty.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                  >
                    <span>{SITE_CONFIG.detailCtaLabel}</span>
                    <PiArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 grid-flow-dense gap-x-8 gap-y-12 sm:gap-y-14 pt-12 sm:pt-14">
            {gridProperties.map((item, idx) => (
              <Reveal key={item.slug} delay={(idx % 2) * 80} className={bentoSpans[idx % bentoSpans.length]}>
                <article className="group flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-4">
                    <Link
                      href={`/${item.slug}`}
                      className="relative aspect-[16/10] overflow-hidden rounded-none block bg-[#ECE8DF]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        quality={95}
                        className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#D5D0C5] pb-2.5 text-xs">
                      <span className="font-mono text-[#5A5852]">
                        {item.code} · {item.neighborhood}
                      </span>
                      <span className="font-mono font-semibold text-sm text-[#121312] tabular-nums">
                        {item.priceLabel}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Link href={`/${item.slug}`} className="block">
                        <h3 className="text-xl sm:text-2xl font-serif font-medium leading-snug group-hover:underline">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-[#5A5852] leading-relaxed max-w-[54ch]">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D5D0C5] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
                    <span className="font-medium text-[#121312] tabular-nums">
                      {item.primaryMetric}
                    </span>
                    <Link
                      href={`/${item.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[var(--brand-accent)] hover:underline shrink-0 whitespace-nowrap"
                    >
                      <span>{SITE_CONFIG.detailCtaLabel}</span>
                      <PiArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="barrios"
          className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-28 border-t border-[#D5D0C5]"
        >
          <div className="space-y-3 max-w-2xl pb-8 sm:pb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight leading-tight text-balance">
              Ubicación de nuestra cartera en Corrientes Capital
            </h2>
            <p className="text-sm md:text-base text-[#5A5852] leading-relaxed">
              Filtrá por barrio sobre el mapa callejero real para comparar ubicaciones, precios en USD y cercanía a nuestra oficina en Don Bosco 1180.
            </p>
          </div>

          <div className="mb-8 sm:mb-10">
            <LocationMap3D />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D5D0C5] border border-[#D5D0C5]">
            {NEIGHBORHOODS.map((hood) => {
              const unitCount = PROPERTIES.filter((p) => p.neighborhood === hood.name).length;
              return (
                <Link
                  key={hood.name}
                  href={`/catalogo?zona=${encodeURIComponent(hood.zoneFilter)}`}
                  className="bg-[#F4F1EA] p-5 sm:p-6 flex flex-col justify-between gap-4 group hover:bg-[#ECE8DF] transition-colors duration-200"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#5A5852]">
                      <span>{hood.priceRange}</span>
                      <span>
                        {unitCount} {unitCount === 1 ? "unidad" : "unidades"}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-medium text-[#121312] group-hover:text-[var(--brand-accent)] transition-colors">
                      {hood.name}
                    </h3>
                    <p className="text-xs text-[#5A5852] leading-relaxed">{hood.character}</p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)]">
                    <span>Ver zona</span>
                    <PiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          id="tasaciones"
          className="bg-[#ECE8DF] border-t border-[#D5D0C5] py-16 sm:py-24 lg:py-32 px-4"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--brand-accent)]">
                {highlightsSection.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight leading-tight text-balance">
                {highlightsSection.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5A5852] leading-relaxed max-w-[44ch]">
                {highlightsSection.subtitle}
              </p>
              <div className="pt-2">
                <Link
                  href="/vender"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-none bg-[#121312] hover:bg-[var(--brand-accent)] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200"
                >
                  <span>{highlightsSection.valuationCtaLabel}</span>
                  <PiArrowUpRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#D5D0C5] border-y border-[#D5D0C5]">
              {highlightsSection.items.map((item) => {
                const IconComponent = HIGHLIGHT_ICONS[item.iconKey] || PiBuildingsLight;
                return (
                  <div key={item.title} className="py-6 sm:py-7 flex items-start gap-4 sm:gap-5">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5 text-[var(--brand-accent)]" />
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#121312]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#5A5852] leading-relaxed max-w-[54ch]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--brand-accent)] block">
                {ctaBanner.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] text-balance">
                {ctaBanner.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5A5852] leading-relaxed max-w-[46ch]">
                {ctaBanner.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#D5D0C5] text-xs text-[#5A5852]">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiMapPinLight className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                    Oficina comercial
                  </span>
                  <p>{SITE_CONFIG.addressDisplay}</p>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiClockLight className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                    Horarios y teléfono
                  </span>
                  <p className="inline-flex items-center gap-1.5 font-mono">
                    <PiPhoneLight className="w-3.5 h-3.5 shrink-0" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-5 sm:px-7 py-4 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200"
                >
                  <PiWhatsappLogoLight className="w-5 h-5 shrink-0" />
                  <span>{ctaBanner.buttonLabel}</span>
                  <PiArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden rounded-none bg-[#ECE8DF]">
              <Image
                src={ctaBanner.image}
                alt={ctaBanner.title}
                fill
                quality={95}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
