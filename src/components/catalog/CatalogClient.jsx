"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PiArrowCounterClockwiseLight,
  PiArrowUpRight,
  PiListLight,
  PiMagnifyingGlassLight,
  PiMapPinLight,
  PiMapTrifoldLight,
  PiStarFill,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import LocationMap3D from "@/components/property/LocationMap3D";
import { PROPERTIES, SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

function matchesFilter(value, selected) {
  if (!selected || selected === "Todas") return true;
  const val = String(value || "").toLowerCase();
  const sel = selected.toLowerCase();
  if (val === sel) return true;
  return val.split(/\s*[\/·,|]\s*/).some((part) => part.trim() === sel);
}

export default function CatalogClient({ initialFilters = {} }) {
  const { searchLabels } = SITE_CONFIG.hero;
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.categoria || "Todas");
  const [selectedZone, setSelectedZone] = useState(initialFilters.zona || "Todas");
  const [selectedType, setSelectedType] = useState(initialFilters.tipo || "Todas");
  const [onlyGarage, setOnlyGarage] = useState(Boolean(initialFilters.cochera));
  const [onlyOutdoor, setOnlyOutdoor] = useState(false);
  const [under100k, setUnder100k] = useState(Boolean(initialFilters.max));
  const [sortOrder, setSortOrder] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertWish, setAlertWish] = useState("");
  const [viewMode, setViewMode] = useState(initialFilters.vista === "mapa" ? "mapa" : "lista");

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PROPERTIES.filter((item) => {
      const matchCat = matchesFilter(item.category, selectedCategory);
      const matchZone = matchesFilter(item.zoneFilter, selectedZone);
      const matchType = matchesFilter(item.typeFilter, selectedType);
      const matchGarage = !onlyGarage || item.hasGarage;
      const matchOutdoor = !onlyOutdoor || item.hasOutdoor;
      const matchPriceCap = !under100k || item.priceValue <= 100000;
      const matchQuery =
        !query ||
        item.code.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.neighborhood.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query);

      return (
        matchCat &&
        matchZone &&
        matchType &&
        matchGarage &&
        matchOutdoor &&
        matchPriceCap &&
        matchQuery
      );
    });

    if (sortOrder === "price-asc") {
      return [...list].sort((a, b) => a.priceValue - b.priceValue);
    }
    if (sortOrder === "price-desc") {
      return [...list].sort((a, b) => b.priceValue - a.priceValue);
    }
    return list;
  }, [
    selectedCategory,
    selectedZone,
    selectedType,
    onlyGarage,
    onlyOutdoor,
    under100k,
    sortOrder,
    searchQuery,
  ]);

  const handleReset = () => {
    setSelectedCategory("Todas");
    setSelectedZone("Todas");
    setSelectedType("Todas");
    setOnlyGarage(false);
    setOnlyOutdoor(false);
    setUnder100k(false);
    setSortOrder("featured");
    setSearchQuery("");
  };

  const handleCustomAlertSubmit = (e) => {
    e.preventDefault();
    const text = [
      `Hola ${SITE_CONFIG.brandName}, quiero dejar registrada una búsqueda activa para que me avisen cuando ingrese una propiedad compatible.`,
      alertWish.trim()
        ? `Qué estoy buscando: ${alertWish.trim()}`
        : `Preferencia actual: ${selectedCategory}, zona ${selectedZone}, rango ${selectedType}.`,
    ].join("\n");
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <main id="contenido-principal" className="flex-1 max-w-7xl w-full mx-auto px-4 pt-8 pb-24">
      <div className="pb-6 mb-10 border-b border-[#D5D0C5] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <div className="sm:col-span-2 lg:col-span-4 space-y-1">
            <label htmlFor="catalog-search" className="block text-[11px] font-mono text-[#5A5852]">
              Código, calle o barrio
            </label>
            <div className="relative">
              <PiMagnifyingGlassLight className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5852]" />
              <input
                id="catalog-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej: CC-03, Belgrano, Santa Rita..."
                className="w-full h-10 pl-9 pr-3 rounded-none border border-[#D5D0C5] bg-white text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label htmlFor="catalog-category" className="block text-[11px] font-mono text-[#5A5852]">
              {searchLabels.field1Label}
            </label>
            <select
              id="catalog-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 px-3 rounded-none border border-[#D5D0C5] bg-white text-sm font-medium text-[#121312] focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer"
            >
              {searchLabels.field1Options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label htmlFor="catalog-zone" className="block text-[11px] font-mono text-[#5A5852]">
              {searchLabels.field2Label}
            </label>
            <select
              id="catalog-zone"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full h-10 px-3 rounded-none border border-[#D5D0C5] bg-white text-sm font-medium text-[#121312] focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer"
            >
              {searchLabels.field2Options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label htmlFor="catalog-type" className="block text-[11px] font-mono text-[#5A5852]">
              {searchLabels.field3Label}
            </label>
            <select
              id="catalog-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-10 px-3 rounded-none border border-[#D5D0C5] bg-white text-sm font-medium text-[#121312] focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer"
            >
              {searchLabels.field3Options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2 space-y-1">
            <label htmlFor="catalog-sort" className="block text-[11px] font-mono text-[#5A5852]">
              Ordenar
            </label>
            <select
              id="catalog-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full h-10 px-3 rounded-none border border-[#D5D0C5] bg-white text-sm font-medium text-[#121312] focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer"
            >
              <option value="featured">Destacadas</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setOnlyGarage((prev) => !prev)}
              className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                onlyGarage
                  ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]"
                  : "bg-white/80 text-[#5A5852] border-[#D5D0C5] hover:border-[#121312] hover:text-[#121312]"
              }`}
            >
              Con cochera
            </button>
            <button
              type="button"
              onClick={() => setOnlyOutdoor((prev) => !prev)}
              className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                onlyOutdoor
                  ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]"
                  : "bg-white/80 text-[#5A5852] border-[#D5D0C5] hover:border-[#121312] hover:text-[#121312]"
              }`}
            >
              Balcón o patio
            </button>
            <button
              type="button"
              onClick={() => setUnder100k((prev) => !prev)}
              className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                under100k
                  ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)]"
                  : "bg-white/80 text-[#5A5852] border-[#D5D0C5] hover:border-[#121312] hover:text-[#121312]"
              }`}
            >
              Hasta USD 100.000
            </button>
            {(selectedCategory !== "Todas" ||
              selectedZone !== "Todas" ||
              selectedType !== "Todas" ||
              onlyGarage ||
              onlyOutdoor ||
              under100k ||
              searchQuery) && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2 py-1.5 font-semibold text-[var(--brand-accent)] hover:underline cursor-pointer"
              >
                <PiArrowCounterClockwiseLight className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-[#5A5852]">
              <strong className="text-[#121312]">{filteredItems.length}</strong> de{" "}
              {PROPERTIES.length} {SITE_CONFIG.unitPlural.toLowerCase()}
            </span>

            <div className="inline-flex border border-[#D5D0C5]" role="group" aria-label="Vista del catálogo">
              <button
                type="button"
                onClick={() => setViewMode("lista")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  viewMode === "lista"
                    ? "bg-[#121312] text-white"
                    : "bg-white text-[#5A5852] hover:text-[#121312]"
                }`}
              >
                <PiListLight className="w-3.5 h-3.5" />
                <span>Lista</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("mapa")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors cursor-pointer ${
                  viewMode === "mapa"
                    ? "bg-[#121312] text-white"
                    : "bg-white text-[#5A5852] hover:text-[#121312]"
                }`}
              >
                <PiMapTrifoldLight className="w-3.5 h-3.5" />
                <span>Mapa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "mapa" && filteredItems.length > 0 ? (
        <LocationMap3D properties={filteredItems} tall />
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center space-y-4 border-b border-[#D5D0C5]">
          <p className="text-2xl font-serif font-medium">
            No hay {SITE_CONFIG.unitPlural.toLowerCase()} que coincidan con esa combinación
          </p>
          <p className="text-sm text-[#5A5852] max-w-md mx-auto">
            Pruebe quitando alguno de los filtros o déjenos abajo qué propiedad busca para avisarle en cuanto ingrese.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors"
          >
            Ver todas las opciones
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {filteredItems.map((item, idx) => {
            const itemWaUrl = buildWhatsAppUrl(
              `Hola ${SITE_CONFIG.brandName}, consulto por: ${item.title} (${item.code}).`
            );
            const photoCount = item.gallery?.length || 1;

            return (
              <article key={item.slug} className="group flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <Link
                    href={`/${item.slug}`}
                    className="relative aspect-[16/10] overflow-hidden rounded-none block bg-[#ECE8DF]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={idx < 2}
                      quality={95}
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>

                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#D5D0C5] pb-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[#5A5852]">
                      {item.pinned && (
                        <PiStarFill
                          className="w-3.5 h-3.5 text-amber-500 shrink-0"
                          aria-label="Propiedad destacada"
                        />
                      )}
                      <span>
                        {item.code} · {item.category} ({photoCount} fotos)
                      </span>
                    </span>
                    <span className="font-mono font-semibold text-sm text-[#121312] tabular-nums">
                      {item.priceLabel}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="inline-flex items-center gap-1.5 text-xs text-[#5A5852]">
                      <PiMapPinLight className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
                      <span>{item.location}</span>
                    </p>

                    <Link href={`/${item.slug}`} className="block">
                      <h2 className="text-2xl font-serif font-medium tracking-tight group-hover:underline">
                        {item.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-[#5A5852] leading-relaxed">{item.summary}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D5D0C5] space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium tabular-nums">
                    <span>{item.primaryMetric}</span>
                    <span className="text-[#D5D0C5]">|</span>
                    <span>{item.secondaryMetric}</span>
                    <span className="text-[#D5D0C5]">|</span>
                    <span>{item.tertiaryMetric}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={itemWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A5852] hover:text-[#121312] hover:underline"
                    >
                      <PiWhatsappLogoLight className="w-4 h-4 shrink-0" />
                      <span>WhatsApp directo</span>
                    </a>

                    <Link
                      href={`/${item.slug}`}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] text-white text-xs font-medium transition-all duration-200 whitespace-nowrap"
                    >
                      <span>{SITE_CONFIG.detailCtaLabel}</span>
                      <PiArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <section className="mt-16 sm:mt-20 border border-[#D5D0C5] bg-[#ECE8DF] p-5 sm:p-7 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)]">
              Acceso anticipado a ingresos
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight">
              Decinos qué propiedad estás buscando
            </h2>
            <p className="text-sm text-[#5A5852] leading-relaxed">
              Si todavía no encontraste la unidad exacta, anotamos tus parámetros y te avisamos por WhatsApp antes de publicarla en portales. Sin contraseñas ni spam.
            </p>
          </div>

          <form onSubmit={handleCustomAlertSubmit} className="lg:col-span-7 flex flex-col sm:flex-row gap-3">
            <label htmlFor="custom-alert-input" className="sr-only">
              Describí qué propiedad buscás
            </label>
            <input
              id="custom-alert-input"
              type="text"
              value={alertWish}
              onChange={(e) => setAlertWish(e.target.value)}
              placeholder="Ej: Depto 2 dormitorios con cochera en B° Libertad hasta USD 120.000"
              className="flex-1 min-w-0 h-12 px-4 rounded-none border border-[#D5D0C5] bg-white text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
            <button
              type="submit"
              className="h-12 px-5 sm:px-6 w-full sm:w-auto rounded-none bg-[#121312] hover:bg-[var(--brand-accent)] active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <PiWhatsappLogoLight className="w-4 h-4 shrink-0" />
              <span>Avisarme por WhatsApp</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
