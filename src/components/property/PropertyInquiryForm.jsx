"use client";

import { useState } from "react";
import {
  PiCalendarBlankLight,
  PiLockSimpleLight,
  PiMapPinLight,
  PiUserLight,
  PiVideoCameraLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

export default function PropertyInquiryForm({ item }) {
  const { bookingFormConfig } = SITE_CONFIG;
  const [visitMode, setVisitMode] = useState("Presencial");
  const [clientName, setClientName] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [selectedOption, setSelectedOption] = useState(bookingFormConfig.selectOptions[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      `Hola ${SITE_CONFIG.brandName}, les escribo desde su sitio web.`,
      `Me interesa: *${item.title}* (Ref: ${item.code})`,
      `Ubicación: ${item.location}`,
      `Valor publicado: ${item.priceLabel}`,
      `Modalidad preferida: ${visitMode}`,
      `---`,
      clientName ? `Nombre: ${clientName}` : null,
      date1 ? `${bookingFormConfig.date1Label}: ${date1}` : null,
      date2 ? `${bookingFormConfig.date2Label}: ${date2}` : null,
      `${bookingFormConfig.selectLabel}: ${selectedOption}`,
      notes ? `Comentario: ${notes}` : null,
    ].filter(Boolean);

    const url = buildWhatsAppUrl(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="lg:col-span-5 lg:sticky lg:top-28">
      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-7 md:p-8 rounded-none border border-[#D5D0C5] bg-white space-y-5"
      >
        <div className="pb-4 border-b border-[#D5D0C5] space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)]">
            {SITE_CONFIG.brandTagline}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight">
            {bookingFormConfig.panelTitle}
          </h2>
          <p className="text-xs text-[#5A5852]">{bookingFormConfig.panelSubtitle}</p>
        </div>

        <div className="space-y-1.5">
          <span className="block text-xs font-medium text-[#5A5852]">Modalidad de recorrido</span>
          <div
            className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2"
            role="group"
            aria-label="Modalidad de recorrido"
          >
            <button
              type="button"
              onClick={() => setVisitMode("Presencial")}
              className={`py-2.5 px-2.5 sm:px-3 text-xs font-medium border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                visitMode === "Presencial"
                  ? "bg-[#121312] text-white border-[#121312]"
                  : "bg-[#F4F1EA]/60 text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
              }`}
            >
              <PiMapPinLight className="w-4 h-4 shrink-0" />
              <span>Visita presencial</span>
            </button>
            <button
              type="button"
              onClick={() => setVisitMode("Videollamada en vivo")}
              className={`py-2.5 px-2.5 sm:px-3 text-xs font-medium border inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                visitMode === "Videollamada en vivo"
                  ? "bg-[#121312] text-white border-[#121312]"
                  : "bg-[#F4F1EA]/60 text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
              }`}
            >
              <PiVideoCameraLight className="w-4 h-4 shrink-0" />
              <span>Videollamada</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="inquiry-name" className="block text-xs font-medium text-[#5A5852]">
            Nombre y apellido
          </label>
          <div className="relative">
            <PiUserLight className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A5852]" />
            <input
              id="inquiry-name"
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full min-w-0 h-11 pl-10 pr-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5 min-w-0">
            <label htmlFor="inquiry-date" className="block text-xs font-mono text-[#5A5852]">
              {bookingFormConfig.date1Label}
            </label>
            <div className="relative">
              <PiCalendarBlankLight className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A5852] pointer-events-none" />
              <input
                id="inquiry-date"
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full min-w-0 appearance-none h-11 pl-10 pr-3 rounded-none border border-[#D5D0C5] bg-transparent text-xs font-mono text-[#121312] focus:outline-none focus:border-[var(--brand-accent)]"
              />
            </div>
          </div>

          <div className="space-y-1.5 min-w-0">
            <label htmlFor="inquiry-time" className="block text-xs font-mono text-[#5A5852]">
              {bookingFormConfig.date2Label}
            </label>
            <input
              id="inquiry-time"
              type="text"
              placeholder="Ej: 17:00 hs"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full min-w-0 h-11 px-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-xs font-mono text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="inquiry-reason" className="block text-xs font-mono text-[#5A5852]">
            {bookingFormConfig.selectLabel}
          </label>
          <select
            id="inquiry-reason"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full h-11 px-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm font-medium text-[#121312] focus:outline-none focus:border-[var(--brand-accent)] cursor-pointer"
          >
            {bookingFormConfig.selectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="inquiry-notes" className="block text-xs font-mono text-[#5A5852]">
            Notas adicionales (opcional)
          </label>
          <textarea
            id="inquiry-notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Consulte por disponibilidad, cochera o formas de pago..."
            className="w-full p-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.99] text-white text-sm font-medium inline-flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <PiWhatsappLogoLight className="w-5 h-5" />
          <span>{bookingFormConfig.submitLabel}</span>
        </button>

        <p className="flex items-start gap-2 text-[11px] text-[#5A5852] leading-relaxed">
          <PiLockSimpleLight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#121312]" />
          <span>
            Abre WhatsApp con la referencia {item.code}. Solo usamos tus datos para responder esta consulta, sin envíos masivos.
          </span>
        </p>
      </form>
    </aside>
  );
}
