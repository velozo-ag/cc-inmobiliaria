"use client";

import { useState } from "react";
import {
  PiArrowLeftLight,
  PiArrowRightLight,
  PiLockSimpleLight,
  PiMapPinLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

const PROPERTY_TYPES = ["Departamento", "Casa", "Terreno / Lote", "Local / Oficina"];
const CONTACT_CHANNELS = ["WhatsApp", "Llamada telefónica", "Correo electrónico"];

export default function ValuationFunnelForm() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [roomsOrArea, setRoomsOrArea] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [preferredChannel, setPreferredChannel] = useState(CONTACT_CHANNELS[0]);
  const [schedule, setSchedule] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setErrorMsg("Ingresá la dirección o barrio aproximado para continuar.");
      return;
    }
    setErrorMsg("");
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerName.trim()) {
      setErrorMsg("Ingresá tu nombre y apellido para coordinar la tasación.");
      return;
    }
    setErrorMsg("");

    const message = [
      `Hola ${SITE_CONFIG.brandName}, solicito una tasación profesional MP 20 desde el sitio web.`,
      `---`,
      `Dirección / Barrio: ${address}`,
      `Tipología: ${propertyType}`,
      roomsOrArea ? `Ambientes / Superficie: ${roomsOrArea}` : null,
      `Propietario: ${ownerName}`,
      `Canal preferido: ${preferredChannel}`,
      schedule ? `Disponibilidad: ${schedule}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-[#D5D0C5] bg-white p-5 sm:p-7 md:p-9 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#D5D0C5] pb-4">
        <div className="space-y-1 min-w-0">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)]">
            Tasación MP 20 en 24 horas
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#121312]">
            {step === 1 ? "Ubicación de tu propiedad" : "Cómo preferís recibir tu informe"}
          </h2>
        </div>
        <span className="font-mono text-xs text-[#5A5852] shrink-0">Paso {step} de 2</span>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="val-address" className="block text-xs font-medium text-[#5A5852]">
              Dirección o barrio en Corrientes Capital
            </label>
            <div className="relative">
              <PiMapPinLight className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A5852]" />
              <input
                id="val-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Belgrano al 1400, B° Libertad"
                className="w-full h-11 pl-10 pr-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#5A5852]">Tipología del inmueble</span>
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-2.5 px-3 text-xs font-medium border transition-colors cursor-pointer ${
                    propertyType === type
                      ? "bg-[#121312] text-white border-[#121312]"
                      : "bg-[#F4F1EA]/60 text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="val-area" className="block text-xs font-medium text-[#5A5852]">
              Dormitorios, cochera o superficie aproximada (opcional)
            </label>
            <input
              id="val-area"
              type="text"
              value={roomsOrArea}
              onChange={(e) => setRoomsOrArea(e.target.value)}
              placeholder="Ej: 2 dormitorios, 65 m², con cochera"
              className="w-full h-11 px-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
          </div>

          {errorMsg && <p className="text-xs font-medium text-[var(--brand-accent)]">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <span>Continuar con tasación</span>
            <PiArrowRightLight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-3.5 bg-[#F4F1EA] border border-[#D5D0C5] flex items-center justify-between gap-3 text-xs">
            <span className="text-[#121312] font-medium truncate">
              {propertyType} · {address}
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 text-[var(--brand-accent)] font-semibold hover:underline shrink-0 cursor-pointer"
            >
              <PiArrowLeftLight className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="val-owner" className="block text-xs font-medium text-[#5A5852]">
              Nombre y apellido
            </label>
            <input
              id="val-owner"
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="Ej: María Laura Gómez"
              className="w-full h-11 px-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#5A5852]">Canal de respuesta preferido</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CONTACT_CHANNELS.map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => setPreferredChannel(channel)}
                  className={`py-2.5 px-3 text-xs font-medium border transition-colors cursor-pointer ${
                    preferredChannel === channel
                      ? "bg-[#121312] text-white border-[#121312]"
                      : "bg-[#F4F1EA]/60 text-[#121312] border-[#D5D0C5] hover:border-[#121312]"
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="val-schedule" className="block text-xs font-medium text-[#5A5852]">
              Franja horaria conveniente (opcional)
            </label>
            <input
              id="val-schedule"
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="Ej: Lunes a viernes por la tarde"
              className="w-full h-11 px-3.5 rounded-none border border-[#D5D0C5] bg-transparent text-sm text-[#121312] placeholder:text-[#5A5852]/70 focus:outline-none focus:border-[var(--brand-accent)]"
            />
          </div>

          {errorMsg && <p className="text-xs font-medium text-[var(--brand-accent)]">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <PiWhatsappLogoLight className="w-5 h-5" />
            <span>Solicitar tasación por WhatsApp</span>
          </button>
        </form>
      )}

      <p className="flex items-start gap-2 text-[11px] text-[#5A5852] leading-relaxed pt-2 border-t border-[#D5D0C5]">
        <PiLockSimpleLight className="w-4 h-4 shrink-0 mt-0.5 text-[#121312]" />
        <span>
          Solo usamos esta información para responder tu consulta de tasación. Sin envíos masivos ni llamadas no solicitadas.
        </span>
      </p>
    </div>
  );
}