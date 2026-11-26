"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PiArrowsOutSimpleLight,
  PiCaretLeftLight,
  PiCaretRightLight,
  PiRulerLight,
  PiXLight,
} from "react-icons/pi";
import PropertyFloorplan, { PropertyFloorplanPreview } from "@/components/property/PropertyFloorplan";

export default function PropertyGallery({ item, title, gallery = [], primaryImage }) {
  const images = gallery.length > 0 ? gallery : [primaryImage].filter(Boolean);
  const hasFloorplan = Boolean(item?.floorplan?.rooms?.length);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxMode, setLightboxMode] = useState(null);
  const scrollTrackRef = useRef(null);

  const visibleThumbs = images.slice(0, 4);
  const overflowCount = Math.max(0, images.length - 4);
  const activeImage = images[activeIndex] || images[0] || "";

  const scrollToSlide = (idx) => {
    const clamped = (idx + images.length) % images.length;
    setActiveIndex(clamped);
    const track = scrollTrackRef.current;
    if (track) {
      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleTrackScroll = () => {
    const track = scrollTrackRef.current;
    if (!track || track.clientWidth === 0) return;
    const nextIdx = Math.round(track.scrollLeft / track.clientWidth);
    if (nextIdx !== activeIndex && nextIdx >= 0 && nextIdx < images.length) {
      setActiveIndex(nextIdx);
    }
  };

  useEffect(() => {
    const openFloorplanHandler = () => {
      if (hasFloorplan) setLightboxMode("floorplan");
    };
    window.addEventListener("cc:open-floorplan", openFloorplanHandler);
    return () => window.removeEventListener("cc:open-floorplan", openFloorplanHandler);
  }, [hasFloorplan]);

  useEffect(() => {
    if (!lightboxMode) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxMode(null);
      } else if (lightboxMode === "photo" && e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (lightboxMode === "photo" && e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxMode, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="mb-10 sm:mb-14 space-y-2.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:items-stretch">
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#ECE8DF] group">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-3.5 -left-10 sm:top-4 sm:-left-9 z-20 w-36 py-1 bg-[#A80038] text-white text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-center -rotate-45 shadow-sm"
            >
              Venta
            </div>

            <div
              ref={scrollTrackRef}
              onScroll={handleTrackScroll}
              className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((imgUrl, idx) => (
                <button
                  key={imgUrl}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setLightboxMode("photo");
                  }}
                  aria-label={`Ampliar fotografía ${idx + 1} de ${title}`}
                  className="relative w-full h-full shrink-0 snap-center cursor-zoom-in block"
                >
                  <Image
                    src={imgUrl}
                    alt={`${title} vista ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </button>
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeIndex - 1)}
                  aria-label="Foto anterior"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 bg-[#121312]/70 hover:bg-[#121312] text-white border border-white/20 opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <PiCaretLeftLight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeIndex + 1)}
                  aria-label="Foto siguiente"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 bg-[#121312]/70 hover:bg-[#121312] text-white border border-white/20 opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <PiCaretRightLight className="w-4 h-4" />
                </button>
              </>
            )}

            <span className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-20 px-2.5 py-1 bg-[#121312]/75 text-white font-mono text-[11px] tabular-nums">
              {activeIndex + 1} / {images.length}
            </span>
          </div>

          <div className="lg:col-span-4 lg:relative">
            <div className="lg:absolute lg:inset-0 flex flex-col gap-3">
              <div
                className={`grid grid-cols-2 gap-2.5 lg:flex-[3] lg:min-h-0 ${
                  visibleThumbs.length <= 2
                    ? "grid-rows-1 h-[120px] sm:h-[160px] lg:h-auto"
                    : "grid-rows-2 h-[210px] sm:h-[260px] lg:h-auto"
                }`}
              >
                {visibleThumbs.map((imgUrl, idx) => {
                  const isLastWithOverflow = idx === 3 && overflowCount > 0;
                  const isFullSpanThird = visibleThumbs.length === 3 && idx === 2;

                  return (
                    <button
                      key={imgUrl}
                      type="button"
                      onClick={() => {
                        if (isLastWithOverflow) {
                          setActiveIndex(4);
                          setLightboxMode("photo");
                        } else {
                          scrollToSlide(idx);
                        }
                      }}
                      aria-label={
                        isLastWithOverflow
                          ? `Ver ${overflowCount} fotografías más de ${title}`
                          : `Ir a fotografía ${idx + 1} de ${title}`
                      }
                      className={`relative w-full h-full overflow-hidden rounded-none transition-all cursor-pointer bg-[#ECE8DF] ${
                        isFullSpanThird ? "col-span-2" : ""
                      } ${
                        activeIndex === idx && !isLastWithOverflow
                          ? "ring-2 ring-[var(--brand-accent)] opacity-100"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${title} miniatura ${idx + 1}`}
                        fill
                        quality={75}
                        className="object-cover"
                        sizes="(max-width: 1024px) 50vw, 18vw"
                      />

                      {isLastWithOverflow && (
                        <span className="absolute inset-0 bg-[#121312]/65 flex items-center justify-center font-mono text-lg font-semibold text-white">
                          +{overflowCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {hasFloorplan && (
                <button
                  type="button"
                  onClick={() => setLightboxMode("floorplan")}
                  aria-label={`Abrir croquis interactivo de ${title}`}
                  className="h-[175px] sm:h-[200px] lg:h-auto lg:flex-[2] lg:min-h-0 w-full overflow-hidden rounded-none border border-[#D5D0C5] hover:border-[#121312] transition-colors cursor-pointer bg-[#F4F1EA]"
                >
                  <PropertyFloorplanPreview item={item} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs font-mono text-[#5A5852]">
          <span>Deslizá o usá las flechas ({images.length} fotos)</span>
          <div className="flex flex-wrap items-center gap-4">
            {hasFloorplan && (
              <button
                type="button"
                onClick={() => setLightboxMode("floorplan")}
                className="inline-flex items-center gap-1.5 text-[#121312] hover:text-[var(--brand-accent)] transition-colors cursor-pointer"
              >
                <PiRulerLight className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                <span>Croquis interactivo</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setLightboxMode("photo")}
              className="inline-flex items-center gap-1.5 text-[#121312] hover:text-[var(--brand-accent)] transition-colors cursor-pointer"
            >
              <PiArrowsOutSimpleLight className="w-3.5 h-3.5" />
              <span>Ampliar</span>
            </button>
          </div>
        </div>
      </div>

      {lightboxMode && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            lightboxMode === "floorplan"
              ? `Croquis interactivo de ${title}`
              : `Galería de ${title}`
          }
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxMode(null);
          }}
          className="fixed inset-0 z-50 bg-[#121312]/78 backdrop-blur-md text-white flex flex-col p-3 sm:p-6 md:p-8 overflow-y-auto"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 border-b border-white/15 pb-3 sm:pb-4 shrink-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono min-w-0">
              <button
                type="button"
                onClick={() => setLightboxMode("photo")}
                className={`px-2.5 sm:px-3 py-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                  lightboxMode === "photo"
                    ? "bg-white text-[#121312] border-white font-semibold"
                    : "border-white/25 text-white/85 hover:text-white"
                }`}
              >
                Fotos ({activeIndex + 1}/{images.length})
              </button>
              {hasFloorplan && (
                <button
                  type="button"
                  onClick={() => setLightboxMode("floorplan")}
                  className={`px-2.5 sm:px-3 py-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                    lightboxMode === "floorplan"
                      ? "bg-white text-[#121312] border-white font-semibold"
                      : "border-white/25 text-white/85 hover:text-white"
                  }`}
                >
                  Croquis
                </button>
              )}
              <span className="hidden lg:inline text-white/75 truncate max-w-md">{title}</span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxMode(null)}
              aria-label="Cerrar visor"
              className="p-2 border border-white/25 hover:bg-white hover:text-[#121312] transition-colors cursor-pointer shrink-0"
            >
              <PiXLight className="w-5 h-5" />
            </button>
          </div>

          {lightboxMode === "photo" ? (
            <div className="relative flex-1 my-auto py-4 flex items-center justify-center min-h-[260px]">
              <div className="relative w-full max-w-5xl h-[62dvh] sm:h-[74dvh]">
                <Image
                  src={activeImage}
                  alt={`${title} vista ampliada ${activeIndex + 1}`}
                  fill
                  quality={95}
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
                    }
                    aria-label="Imagen anterior"
                    className="absolute left-0 sm:left-3 p-2.5 sm:p-3 bg-[#121312]/80 border border-white/25 hover:bg-white hover:text-[#121312] transition-colors cursor-pointer"
                  >
                    <PiCaretLeftLight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
                    aria-label="Siguiente imagen"
                    className="absolute right-0 sm:right-3 p-2.5 sm:p-3 bg-[#121312]/80 border border-white/25 hover:bg-white hover:text-[#121312] transition-colors cursor-pointer"
                  >
                    <PiCaretRightLight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full my-auto py-3 sm:py-5 flex items-start justify-center">
              <PropertyFloorplan
                item={item}
                onOpenPhoto={(idx) => {
                  setActiveIndex(idx);
                  setLightboxMode("photo");
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
