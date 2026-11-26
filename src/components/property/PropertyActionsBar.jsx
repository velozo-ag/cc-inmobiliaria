"use client";

import { useState } from "react";
import {
  PiCheckLight,
  PiCopySimpleLight,
  PiMapPinLight,
  PiRulerLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

export default function PropertyActionsBar({ item }) {
  const [copied, setCopied] = useState(false);

  const openFloorplanModal = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("cc:open-floorplan"));
  };

  const scrollToMap = () => {
    if (typeof window === "undefined") return;
    const target = document.getElementById("ubicacion-propiedad");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleWhatsAppDirect = () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = [
      `Hola ${SITE_CONFIG.brandName}, consulto por esta propiedad:`,
      `${item.title} (${item.code})`,
      `${item.location}`,
      `Valor: ${item.priceLabel}`,
      currentUrl,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 pt-3 border-t border-[#D5D0C5]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
        <button
          type="button"
          onClick={openFloorplanModal}
          className="inline-flex items-center gap-1.5 text-[#121312] hover:text-[var(--brand-accent)] transition-colors cursor-pointer"
        >
          <PiRulerLight className="w-4 h-4 text-[var(--brand-accent)]" />
          <span>Croquis interactivo</span>
        </button>

        <button
          type="button"
          onClick={scrollToMap}
          className="inline-flex items-center gap-1.5 text-[#121312] hover:text-[var(--brand-accent)] transition-colors cursor-pointer"
        >
          <PiMapPinLight className="w-4 h-4 text-[var(--brand-accent)]" />
          <span>Ver en el mapa</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A5852]">
        <button
          type="button"
          onClick={handleWhatsAppDirect}
          className="inline-flex items-center gap-1.5 hover:text-[#121312] transition-colors cursor-pointer"
        >
          <PiWhatsappLogoLight className="w-4 h-4 text-[var(--brand-accent)]" />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 hover:text-[#121312] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <PiCheckLight className="w-4 h-4 text-[var(--brand-accent)]" />
              <span className="text-[#121312] font-medium">Copiado</span>
            </>
          ) : (
            <>
              <PiCopySimpleLight className="w-4 h-4" />
              <span>Copiar enlace</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
