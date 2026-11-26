"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  PiArrowClockwiseLight,
  PiArrowCounterClockwiseLight,
  PiArrowUpRight,
  PiCornersOutLight,
  PiCubeLight,
  PiMapPinLight,
  PiMapTrifoldLight,
  PiSpinnerGapLight,
  PiSquareLight,
} from "react-icons/pi";
import { PROPERTIES, SITE_CONFIG } from "@/data/properties";

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
const DEFAULT_CITY_CENTER = [-58.8385, -27.4765];

function formatShortUsd(value) {
  if (!value) return "USD";
  return `USD ${Math.round(value / 1000)}k`;
}

function applyMarkerStyle(wrap, prop, isSelected, isMuted) {
  const badge = wrap.querySelector('[data-role="badge"]');
  const accent = wrap.querySelector('[data-role="accent"]');
  const tip = wrap.querySelector('[data-role="tip"]');
  if (!badge || !accent || !tip) return;

  wrap.style.zIndex = isSelected ? "30" : "10";
  wrap.style.opacity = isMuted ? "0.6" : "1";

  badge.className = isSelected
    ? "inline-flex items-stretch bg-[#121312] text-white font-mono text-[11px] font-semibold tracking-tight border border-[#121312] shadow-[0_6px_16px_rgba(18,19,18,0.28)] whitespace-nowrap transition-transform duration-200 -translate-y-0.5"
    : "inline-flex items-stretch bg-[#F4F1EA] text-[#121312] font-mono text-[10px] font-semibold tracking-tight border border-[#121312]/75 shadow-[0_4px_10px_rgba(18,19,18,0.14)] whitespace-nowrap hover:bg-[#121312] hover:text-white hover:-translate-y-0.5 transition-all duration-200";

  accent.className = isSelected ? "w-1.5 bg-[#A80038] shrink-0" : "w-1 bg-[#A80038] shrink-0";
  tip.style.borderTop = isSelected ? "6px solid #121312" : "5px solid #121312";
}

function buildMarkerNode(prop, isSelected, isMuted, onSelect, onHoverStart, onHoverEnd) {
  const wrap = document.createElement("button");
  wrap.type = "button";
  wrap.setAttribute("aria-label", `Ver ${prop.title}`);
  wrap.style.cursor = "pointer";
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  wrap.style.alignItems = "center";
  wrap.style.background = "transparent";
  wrap.style.border = "0";
  wrap.style.padding = "0";

  const badge = document.createElement("span");
  badge.dataset.role = "badge";

  const accent = document.createElement("span");
  accent.dataset.role = "accent";

  const label = document.createElement("span");
  label.className = "px-2 py-1";
  label.textContent = `${prop.code} · ${formatShortUsd(prop.priceValue)}`;

  badge.appendChild(accent);
  badge.appendChild(label);

  const tip = document.createElement("span");
  tip.dataset.role = "tip";
  tip.style.width = "0";
  tip.style.height = "0";
  tip.style.borderLeft = "5px solid transparent";
  tip.style.borderRight = "5px solid transparent";

  wrap.appendChild(badge);
  wrap.appendChild(tip);
  wrap.addEventListener("click", onSelect);
  wrap.addEventListener("mouseenter", onHoverStart);
  wrap.addEventListener("mouseleave", onHoverEnd);

  applyMarkerStyle(wrap, prop, isSelected, isMuted);
  return wrap;
}

export default function LocationMap3D({
  activeSlug = "",
  properties = PROPERTIES,
  tall = false,
}) {
  const isSingleMode = Boolean(activeSlug);
  const [zoneFilter, setZoneFilter] = useState("Todos");
  const [is3D, setIs3D] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(
    activeSlug || properties[0]?.slug || ""
  );
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const maplibreglRef = useRef(null);
  const markersRef = useRef(new Map());
  const auto3DTriggeredRef = useRef(false);
  const manual2DOverrideRef = useRef(false);

  const neighborhoods = useMemo(() => {
    const unique = Array.from(new Set(properties.map((p) => p.neighborhood).filter(Boolean)));
    return ["Todos", ...unique];
  }, [properties]);

  const visibleProperties = useMemo(() => {
    if (isSingleMode || zoneFilter === "Todos") return properties;
    return properties.filter((p) => p.neighborhood === zoneFilter);
  }, [isSingleMode, zoneFilter, properties]);

  const propsKey = visibleProperties.map((p) => p.slug).join(",");

  const selectedProperty =
    visibleProperties.find((p) => p.slug === selectedSlug) ||
    properties.find((p) => p.slug === activeSlug) ||
    visibleProperties[0] ||
    null;

  const activate3D = (mapInstance, duration = 1050) => {
    const map = mapInstance || mapRef.current;
    if (!map) return;
    if (map.getLayer("building-3d")) {
      map.setLayoutProperty("building-3d", "visibility", "visible");
    }
    setIs3D(true);
    map.easeTo({
      pitch: 48,
      bearing: -16,
      duration,
    });
  };

  const fitBoundsForList = (list, instant = false, pitchVal = 0) => {
    const map = mapRef.current;
    const ml = maplibreglRef.current;
    if (!map || !ml) return;

    const coordsList = list
      .map((p) => p.mapCoords)
      .filter((c) => c && typeof c.lng === "number" && typeof c.lat === "number");

    if (coordsList.length === 0) return;

    if (coordsList.length === 1) {
      map.flyTo({
        center: [coordsList[0].lng, coordsList[0].lat],
        zoom: 16,
        pitch: pitchVal,
        bearing: pitchVal > 0 ? -16 : 0,
        duration: instant ? 0 : 800,
      });
      return;
    }

    const bounds = new ml.LngLatBounds();
    coordsList.forEach((c) => bounds.extend([c.lng, c.lat]));
    if (zoneFilter === "Todos") {
      bounds.extend([SITE_CONFIG.officeCoords.lng, SITE_CONFIG.officeCoords.lat]);
    }

    map.fitBounds(bounds, {
      padding: { top: 68, right: 68, bottom: 68, left: 68 },
      maxZoom: 15.2,
      pitch: pitchVal,
      bearing: pitchVal > 0 ? -16 : 0,
      duration: instant ? 0 : 850,
    });
  };

  const flyToProperty = (prop, enable3DAuto = true) => {
    const map = mapRef.current;
    if (!map || !prop?.mapCoords) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldUse3D = enable3DAuto && !manual2DOverrideRef.current ? true : is3D;

    if (shouldUse3D && map.getLayer("building-3d")) {
      map.setLayoutProperty("building-3d", "visibility", "visible");
      setIs3D(true);
    }

    const opts = {
      center: [prop.mapCoords.lng, prop.mapCoords.lat],
      zoom: 16.3,
      pitch: shouldUse3D ? 48 : 0,
      bearing: shouldUse3D ? -16 : 0,
    };
    if (reduced) map.jumpTo(opts);
    else map.flyTo({ ...opts, duration: 900, essential: true });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let map = null;
    let resizeObserver = null;
    let rafId = 0;
    const markerMap = new Map();
    auto3DTriggeredRef.current = false;

    import("maplibre-gl")
      .then((maplibregl) => {
        if (cancelled) return;
        maplibreglRef.current = maplibregl;

        if (typeof maplibregl.setWorkerUrl === "function") {
          maplibregl.setWorkerUrl(`${window.location.origin}/maplibre-gl-worker.js`);
        }

        const focusProp =
          properties.find((p) => p.slug === activeSlug) || visibleProperties[0] || null;
        const startCenter =
          isSingleMode && focusProp?.mapCoords
            ? [focusProp.mapCoords.lng, focusProp.mapCoords.lat]
            : DEFAULT_CITY_CENTER;

        map = new maplibregl.Map({
          container,
          style: MAP_STYLE_URL,
          center: startCenter,
          zoom: isSingleMode ? 16.2 : 13.6,
          pitch: 0,
          bearing: 0,
          maxPitch: 60,
          scrollZoom: tall,
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

        const markLoaded = () => {
          if (cancelled || !map) return;
          map.resize();
          setMapReady(true);
        };

        map.on("style.load", () => {
          if (cancelled || !map) return;
          if (map.getLayer("building-3d")) {
            map.setLayoutProperty("building-3d", "visibility", "none");
          }
          map.resize();
          if (!isSingleMode) {
            fitBoundsForList(visibleProperties, true, 0);
          }
        });

        map.on("load", markLoaded);
        map.once("idle", markLoaded);
        map.on("movestart", () => setHoveredCard(null));

        rafId = requestAnimationFrame(() => {
          if (map) map.resize();
        });

        const officeEl = document.createElement("div");
        officeEl.className =
          "px-2 py-0.5 bg-[#121312] text-white font-mono text-[10px] tracking-tight border border-white/50 whitespace-nowrap pointer-events-none";
        officeEl.textContent = "Oficina · Don Bosco 1180";

        new maplibregl.Marker({ element: officeEl, anchor: "bottom" })
          .setLngLat([SITE_CONFIG.officeCoords.lng, SITE_CONFIG.officeCoords.lat])
          .addTo(map);

        visibleProperties.forEach((prop) => {
          if (!prop.mapCoords) return;
          const isSel = prop.slug === (activeSlug || selectedSlug || visibleProperties[0]?.slug);
          const isMuted = isSingleMode && !isSel;

          const node = buildMarkerNode(
            prop,
            isSel,
            isMuted,
            () => {
              setSelectedSlug(prop.slug);
              setHoveredCard(null);
              const use3D = !manual2DOverrideRef.current;
              if (use3D && map.getLayer("building-3d")) {
                map.setLayoutProperty("building-3d", "visibility", "visible");
                setIs3D(true);
              }
              map.flyTo({
                center: [prop.mapCoords.lng, prop.mapCoords.lat],
                zoom: 16.3,
                pitch: use3D ? 48 : 0,
                bearing: use3D ? -16 : 0,
                duration: 900,
                essential: true,
              });
            },
            () => {
              if (!map) return;
              const point = map.project([prop.mapCoords.lng, prop.mapCoords.lat]);
              const rect = container.getBoundingClientRect();
              const clampedX = Math.min(Math.max(point.x, 128), Math.max(128, rect.width - 128));
              const clampedY = Math.max(point.y - 36, 170);
              setHoveredCard({ prop, x: clampedX, y: clampedY });
            },
            () => {
              setHoveredCard((curr) => (curr?.prop?.slug === prop.slug ? null : curr));
            }
          );

          const marker = new maplibregl.Marker({ element: node, anchor: "bottom" })
            .setLngLat([prop.mapCoords.lng, prop.mapCoords.lat])
            .addTo(map);

          markerMap.set(prop.slug, { marker, element: node, prop });
        });

        markersRef.current = markerMap;

        resizeObserver = new ResizeObserver(() => {
          if (map) map.resize();
        });
        resizeObserver.observe(container);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      markerMap.clear();
      if (map) map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug, propsKey, tall]);

  useEffect(() => {
    if (!mapReady || auto3DTriggeredRef.current || manual2DOverrideRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targetEl = wrapperRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !auto3DTriggeredRef.current) {
          auto3DTriggeredRef.current = true;
          window.setTimeout(() => {
            if (!manual2DOverrideRef.current) {
              activate3D(mapRef.current, 1150);
            }
          }, 350);
          observer.disconnect();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(targetEl);
    return () => observer.disconnect();
  }, [mapReady]);

  useEffect(() => {
    markersRef.current.forEach(({ element, prop }, slug) => {
      const isSelected = slug === selectedProperty?.slug;
      applyMarkerStyle(element, prop, isSelected, isSingleMode && !isSelected);
    });
  }, [selectedProperty?.slug, isSingleMode, mapReady]);

  const handleToggle3D = () => {
    const next3D = !is3D;
    manual2DOverrideRef.current = !next3D;
    setIs3D(next3D);
    const map = mapRef.current;
    if (!map) return;

    if (map.getLayer("building-3d")) {
      map.setLayoutProperty("building-3d", "visibility", next3D ? "visible" : "none");
    }

    map.easeTo({
      pitch: next3D ? 48 : 0,
      bearing: next3D ? -16 : 0,
      duration: 650,
    });
  };

  const handleRotate = (delta) => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ bearing: map.getBearing() + delta, duration: 400 });
  };

  const handleZoneChange = (hood) => {
    if (hood === zoneFilter) return;
    setMapReady(false);
    setHoveredCard(null);
    setZoneFilter(hood);
  };

  const googleMapsUrl = selectedProperty?.mapCoords
    ? `https://www.google.com/maps/search/?api=1&query=${selectedProperty.mapCoords.lat},${selectedProperty.mapCoords.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.addressDisplay)}`;

  const loadingOverlay = (
    <div
      aria-live="polite"
      className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#ECE8DF] transition-opacity duration-400 ${
        mapReady ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(to right, #D5D0C5 1px, transparent 1px), linear-gradient(to bottom, #D5D0C5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2.5 px-6 py-5 bg-[#F4F1EA]/95 border border-[#D5D0C5] text-center">
        <PiSpinnerGapLight className="w-6 h-6 text-[var(--brand-accent)] animate-spin" />
        <p className="text-xs font-mono uppercase tracking-wider text-[#121312]">
          Cargando mapa callejero
        </p>
        <p className="text-[11px] text-[#5A5852]">
          {selectedProperty?.location || SITE_CONFIG.locationLabel}
        </p>
      </div>
    </div>
  );

  const hoverPreviewCard = hoveredCard && (
    <div
      className="pointer-events-none absolute z-40 w-60 -translate-x-1/2 -translate-y-full bg-[#F4F1EA] border border-[#121312] shadow-[0_14px_30px_rgba(18,19,18,0.24)] overflow-hidden"
      style={{ left: hoveredCard.x, top: hoveredCard.y }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE8DF]">
        <Image
          src={hoveredCard.prop.image}
          alt={hoveredCard.prop.title}
          fill
          quality={75}
          className="object-cover"
          sizes="240px"
        />
        <span
          aria-hidden="true"
          className="absolute top-3 -left-8 w-28 py-0.5 bg-[#A80038] text-white font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-center -rotate-45 shadow-sm"
        >
          Venta
        </span>
      </div>
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--brand-accent)] font-semibold">
            {hoveredCard.prop.code} · {hoveredCard.prop.neighborhood}
          </span>
          <span className="text-[#121312] font-semibold tabular-nums">
            {hoveredCard.prop.priceLabel}
          </span>
        </div>
        <p className="font-serif text-sm font-medium text-[#121312] leading-snug line-clamp-1">
          {hoveredCard.prop.title}
        </p>
        <p className="text-[11px] text-[#5A5852] truncate">{hoveredCard.prop.primaryMetric}</p>
      </div>
    </div>
  );

  return (
    <div ref={wrapperRef} className="border border-[#D5D0C5] bg-white">
      <div className="px-5 py-4 border-b border-[#D5D0C5] flex flex-wrap items-center justify-between gap-3">
        {isSingleMode ? (
          <p className="inline-flex items-center gap-2 text-xs font-medium text-[#121312]">
            <PiMapPinLight className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
            <span>{selectedProperty?.location}</span>
          </p>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrar mapa por barrio">
            {neighborhoods.map((hood) => (
              <button
                key={hood}
                type="button"
                onClick={() => handleZoneChange(hood)}
                className={`px-2.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                  zoneFilter === hood
                    ? "bg-[#121312] text-white border-[#121312]"
                    : "bg-[#F4F1EA] text-[#5A5852] border-[#D5D0C5] hover:text-[#121312]"
                }`}
              >
                {hood}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {!isSingleMode && (
            <button
              type="button"
              onClick={() => fitBoundsForList(visibleProperties, false, is3D ? 48 : 0)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D5D0C5] bg-[#F4F1EA] hover:border-[#121312] text-xs font-medium text-[#121312] transition-colors cursor-pointer"
            >
              <PiCornersOutLight className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>Encuadrar</span>
            </button>
          )}

          {isSingleMode && selectedProperty && (
            <button
              type="button"
              onClick={() => flyToProperty(selectedProperty, true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D5D0C5] bg-[#F4F1EA] hover:border-[#121312] text-xs font-medium text-[#121312] transition-colors cursor-pointer"
            >
              <PiMapPinLight className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
              <span>Centrar</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggle3D}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono transition-colors cursor-pointer ${
              is3D
                ? "bg-[#121312] text-white border-[#121312]"
                : "bg-white text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
            }`}
          >
            {is3D ? (
              <>
                <PiSquareLight className="w-3.5 h-3.5" />
                <span>2D</span>
              </>
            ) : (
              <>
                <PiCubeLight className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <span>3D</span>
              </>
            )}
          </button>

          {is3D && (
            <div className="inline-flex border border-[#D5D0C5]">
              <button
                type="button"
                onClick={() => handleRotate(-30)}
                aria-label="Rotar a la izquierda"
                className="p-1.5 bg-white hover:bg-[#F4F1EA] text-[#121312] cursor-pointer transition-colors"
              >
                <PiArrowCounterClockwiseLight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRotate(30)}
                aria-label="Rotar a la derecha"
                className="p-1.5 border-l border-[#D5D0C5] bg-white hover:bg-[#F4F1EA] text-[#121312] cursor-pointer transition-colors"
              >
                <PiArrowClockwiseLight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isSingleMode && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#121312] bg-white hover:bg-[#121312] hover:text-white text-xs font-medium text-[#121312] transition-colors"
            >
              <PiMapTrifoldLight className="w-3.5 h-3.5" />
              <span>Google Maps</span>
              <PiArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {isSingleMode ? (
        <div className="relative w-full h-[420px] sm:h-[460px] bg-[#ECE8DF] overflow-hidden">
          {mapError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <p className="text-sm text-[#121312]">
                No se pudo iniciar el mapa interactivo en este navegador.
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#121312] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Abrir en Google Maps
              </a>
            </div>
          ) : (
            <>
              <div ref={containerRef} className="w-full h-full" />
              {hoverPreviewCard}
              {loadingOverlay}
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D5D0C5]">
          <div
            className={`lg:col-span-8 relative w-full bg-[#ECE8DF] overflow-hidden ${
              tall ? "h-[500px] lg:h-[600px]" : "h-[430px] sm:h-[480px]"
            }`}
          >
            {mapError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <p className="text-sm text-[#121312]">
                  No se pudo iniciar el mapa interactivo en este navegador.
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#121312] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Abrir en Google Maps
                </a>
              </div>
            ) : (
              <>
                <div ref={containerRef} className="w-full h-full" />
                {hoverPreviewCard}
                {loadingOverlay}
              </>
            )}
          </div>

          <div className="lg:col-span-4 p-5 md:p-6 flex flex-col justify-between gap-5 bg-[#F4F1EA]/45">
            {selectedProperty ? (
              <div className="space-y-4">
                <Link
                  href={`/${selectedProperty.slug}`}
                  className="relative aspect-[16/10] block overflow-hidden bg-[#ECE8DF]"
                >
                  <Image
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    fill
                    quality={75}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 -left-8 w-28 py-0.5 bg-[#A80038] text-white font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-center -rotate-45 shadow-sm"
                  >
                    Venta
                  </span>
                </Link>

                <div className="flex items-center justify-between border-b border-[#D5D0C5] pb-2 text-xs font-mono">
                  <span className="text-[var(--brand-accent)] font-semibold">
                    {selectedProperty.code} · {selectedProperty.neighborhood}
                  </span>
                  <span className="text-[#121312] font-semibold tabular-nums">
                    {selectedProperty.priceLabel}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-serif font-medium text-[#121312] leading-snug">
                    {selectedProperty.title}
                  </h4>
                  <p className="text-xs text-[#5A5852]">{selectedProperty.location}</p>
                  <p className="text-xs font-medium text-[#121312] tabular-nums">
                    {selectedProperty.primaryMetric} · {selectedProperty.secondaryMetric}
                  </p>
                </div>

                <div className="pt-1 flex flex-wrap gap-1.5">
                  {visibleProperties.map((prop) => (
                    <button
                      key={prop.slug}
                      type="button"
                      onClick={() => {
                        setSelectedSlug(prop.slug);
                        flyToProperty(prop, true);
                      }}
                      className={`px-2 py-1 text-[11px] font-mono border transition-colors cursor-pointer ${
                        selectedProperty.slug === prop.slug
                          ? "bg-[#121312] text-white border-[#121312]"
                          : "bg-white text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
                      }`}
                    >
                      {prop.code}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#5A5852]">No hay unidades en esta selección.</p>
            )}

            <div className="space-y-2 pt-3 border-t border-[#D5D0C5]">
              {selectedProperty && (
                <Link
                  href={`/${selectedProperty.slug}`}
                  className="w-full py-3 px-4 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Abrir ficha técnica</span>
                  <PiArrowUpRight className="w-4 h-4" />
                </Link>
              )}

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-none border border-[#D5D0C5] bg-white hover:border-[#121312] text-[#121312] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors"
              >
                <PiMapTrifoldLight className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>Abrir en Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
