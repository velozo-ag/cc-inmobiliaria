import Link from "next/link";
import {
  PiArrowUpRight,
  PiClockLight,
  PiMapPinLight,
  PiShieldCheckLight,
  PiStarFill,
} from "react-icons/pi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ValuationFunnelForm from "@/components/valuation/ValuationFunnelForm";
import { FAQS, SITE_CONFIG, VALUATION_PHASES } from "@/data/properties";

export const metadata = {
  title: "Tasaciones y Venta de Propiedades MP 20",
  description:
    "Tasación profesional en 24 horas en Corrientes Capital basada en cierres reales en USD, auditoría documental y estrategia de lanzamiento.",
};

export default function SellPage() {
  const reviewsLabel =
    SITE_CONFIG.googleReviewsCount === "1" ? "1 reseña" : `${SITE_CONFIG.googleReviewsCount} reseñas`;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312]">
      <Navbar />

      <main id="contenido-principal" className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-14 lg:py-20 border-b border-[#D5D0C5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5A5852]">
                <Link href="/" className="hover:text-[#121312] hover:underline">
                  Inicio
                </Link>
                <span>/</span>
                <span className="text-[#121312]">Tasaciones y Venta</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-[1.08] text-balance">
                Vendé tu propiedad en Corrientes con criterio real de cierre.
              </h1>

              <p className="text-base text-[#5A5852] leading-relaxed max-w-[52ch]">
                Tasar bien desde el primer día evita meses de publicación sin visitas. Combinamos auditoría documental previa, fotografía editorial limpia y presentación directa a nuestra cartera activa en USD.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D5D0C5] text-xs">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiShieldCheckLight className="w-4 h-4 text-[var(--brand-accent)]" />
                    Respaldo profesional
                  </span>
                  <p className="text-[#5A5852]">{SITE_CONFIG.brandTagline}</p>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiClockLight className="w-4 h-4 text-[var(--brand-accent)]" />
                    Respuesta ágil
                  </span>
                  <p className="text-[#5A5852]">Informe comparativo inicial en 24 horas hábiles.</p>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiMapPinLight className="w-4 h-4 text-[var(--brand-accent)]" />
                    Oficina presencial
                  </span>
                  <p className="text-[#5A5852]">{SITE_CONFIG.addressDisplay}</p>
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#121312]">
                    <PiStarFill className="w-3.5 h-3.5 text-amber-500" />
                    Calificación verificada
                  </span>
                  <p className="font-mono text-[#5A5852]">
                    {SITE_CONFIG.googleRating} en Google Maps ({reviewsLabel})
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ValuationFunnelForm />
            </div>
          </div>
        </section>

        <section className="bg-[#ECE8DF] border-b border-[#D5D0C5] py-20 lg:py-24 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-3 max-w-2xl">
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--brand-accent)]">
                Estrategia en 3 fases
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight leading-tight text-balance">
                Cómo comercializamos cada inmueble para defender su valor en USD
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[#D5D0C5] divide-y md:divide-y-0 md:divide-x divide-[#D5D0C5]">
              {VALUATION_PHASES.map((step) => (
                <div key={step.phase} className="py-8 md:px-7 first:md:pl-0 last:md:pr-0 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--brand-accent)]">
                    {step.phase}
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-[#121312] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#5A5852] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-20 lg:py-24 space-y-10">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-serif font-medium tracking-tight">
              Preguntas frecuentes de propietarios
            </h2>
            <p className="text-sm md:text-base text-[#5A5852] leading-relaxed">
              Transparencia sobre valuación, documentación y costos antes de poner tu propiedad en venta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-[#D5D0C5] pt-10">
            {FAQS.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <h3 className="text-lg font-serif font-medium text-[#121312]">{faq.question}</h3>
                <p className="text-sm text-[#5A5852] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] hover:underline"
            >
              <span>Ver propiedades activas en cartera</span>
              <PiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}