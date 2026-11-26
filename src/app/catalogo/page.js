import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CatalogClient from "@/components/catalog/CatalogClient";
import { PROPERTIES, SITE_CONFIG } from "@/data/properties";

export const metadata = {
  title: SITE_CONFIG.catalogTitle,
  description: SITE_CONFIG.catalogSubtitle,
};

export default async function CatalogPage({ searchParams }) {
  const resolvedSearch = await searchParams;
  const initialFilters = {
    categoria: resolvedSearch?.categoria || "Todas",
    zona: resolvedSearch?.zona || "Todas",
    tipo: resolvedSearch?.tipo || "Todas",
    cochera: resolvedSearch?.cochera === "1",
    max: resolvedSearch?.max === "100000",
    vista: resolvedSearch?.vista === "mapa" ? "mapa" : "lista",
  };

  const catalogKey = [
    initialFilters.categoria,
    initialFilters.zona,
    initialFilters.tipo,
    initialFilters.cochera ? "1" : "0",
    initialFilters.max ? "1" : "0",
    initialFilters.vista,
  ].join("|");

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F4F1EA] text-[#121312]">
      <Navbar />

      <section className="bg-[#ECE8DF] border-b border-[#D5D0C5] py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#5A5852]">
              <Link href="/" className="hover:text-[#121312] hover:underline">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-[#121312]">{SITE_CONFIG.unitPlural}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.08]">
              {SITE_CONFIG.catalogTitle}
            </h1>
            <p className="text-sm md:text-base text-[#5A5852] max-w-2xl leading-relaxed">
              {SITE_CONFIG.catalogSubtitle}
            </p>
          </div>

          <div className="shrink-0 border-l border-[#D5D0C5] pl-5 py-1 text-xs space-y-1">
            <span className="block font-mono text-[#5A5852]">Cartera activa</span>
            <span className="block font-mono text-base font-semibold text-[#121312] tabular-nums">
              {PROPERTIES.length} propiedades en USD
            </span>
          </div>
        </div>
      </section>

      <CatalogClient key={catalogKey} initialFilters={initialFilters} />

      <Footer />
    </div>
  );
}
