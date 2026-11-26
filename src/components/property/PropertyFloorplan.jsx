"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PiArmchairLight,
  PiArrowsOutSimpleLight,
  PiCompassLight,
  PiMagnifyingGlassMinusLight,
  PiMagnifyingGlassPlusLight,
  PiPaletteLight,
  PiSunLight,
  PiWhatsappLogoLight,
} from "react-icons/pi";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/data/properties";

const KIND_STYLES = {
  social: { fill: "#EFECE3", label: "Área social" },
  private: { fill: "#E7E1D4", label: "Área privada" },
  service: { fill: "#DFD9CC", label: "Servicios" },
  exterior: { fill: "#DCE4DD", label: "Exterior / Cochera" },
};

function RoomFurniture({ room, stroke }) {
  const { x, y, w, h, furniture } = room;
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (furniture === "living") {
    const sw = Math.min(w * 0.42, 46);
    const sh = Math.min(h * 0.24, 16);
    return (
      <g stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.4" pointerEvents="none">
        <rect x={x + 10} y={y + 10} width={sw} height={sh} />
        <rect x={x + 10} y={y + 10 + sh + 6} width={sw * 0.65} height={10} />
        <circle cx={x + w - 22} cy={cy + 8} r={Math.min(11, h * 0.18)} />
      </g>
    );
  }

  if (furniture === "bed") {
    const bw = Math.min(w * 0.46, 36);
    const bh = Math.min(h * 0.52, 34);
    const bx = x + w - bw - 10;
    const by = y + 8;
    return (
      <g stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.4" pointerEvents="none">
        <rect x={bx} y={by} width={bw} height={bh} />
        <rect x={bx + 3} y={by + 3} width={bw / 2 - 4} height={7} />
        <rect x={bx + bw / 2 + 1} y={by + 3} width={bw / 2 - 4} height={7} />
        <line x1={bx} y1={by + 14} x2={bx + bw} y2={by + 14} />
      </g>
    );
  }

  if (furniture === "kitchen") {
    return (
      <g stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.4" pointerEvents="none">
        <rect x={x + 5} y={y + 5} width={w - 10} height={12} />
        <circle cx={x + 15} cy={y + 11} r="2.2" />
        <circle cx={x + 23} cy={y + 11} r="2.2" />
        <rect x={x + w - 24} y={y + 7} width={14} height={8} />
      </g>
    );
  }

  if (furniture === "bath") {
    return (
      <g stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.4" pointerEvents="none">
        <rect x={x + 5} y={y + 5} width={Math.min(20, w * 0.35)} height={Math.min(20, h * 0.35)} />
        <ellipse cx={x + w - 12} cy={y + h - 12} rx="5" ry="7" />
      </g>
    );
  }

  if (furniture === "garage") {
    const cw = Math.min(w * 0.56, 44);
    const ch = Math.min(h * 0.64, 52);
    return (
      <g stroke={stroke} strokeWidth="0.9" fill="none" opacity="0.38" pointerEvents="none">
        <rect x={cx - cw / 2} y={cy - ch / 2} width={cw} height={ch} rx="4" />
        <line x1={cx - cw / 2 + 4} y1={cy - ch * 0.18} x2={cx + cw / 2 - 4} y2={cy - ch * 0.18} />
        <line x1={cx - cw / 2 + 4} y1={cy + ch * 0.22} x2={cx + cw / 2 - 4} y2={cy + ch * 0.22} />
      </g>
    );
  }

  if (furniture === "balcony") {
    return (
      <g stroke={stroke} strokeWidth="0.8" fill="none" opacity="0.35" pointerEvents="none">
        <line x1={x + 6} y1={y + 6} x2={x + w - 6} y2={y + 6} />
        <line x1={x + 6} y1={y + h - 6} x2={x + w - 6} y2={y + h - 6} />
      </g>
    );
  }

  return null;
}

function BlueprintSvg({
  rooms,
  activeRoomId,
  onSelect,
  compact = false,
  showFurniture = true,
  showZones = true,
  showSunlight = false,
  orientation = "N",
}) {
  const sunAngle =
    orientation === "E" ? 18 : orientation === "NE" ? -25 : orientation === "NO" ? -145 : -90;

  return (
    <svg
      viewBox="0 -18 320 246"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full select-none"
      role="img"
      aria-label="Croquis esquemático de distribución de ambientes"
    >
      {showSunlight && !compact && (
        <g opacity="0.7" pointerEvents="none">
          <path
            d="M 18 10 Q 160 -10 302 10"
            fill="none"
            stroke="#A80038"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <g transform={`translate(160, 8) rotate(${sunAngle + 90})`}>
            <circle cx="0" cy="-6" r="4" fill="#A80038" />
            <line x1="0" y1="0" x2="0" y2="14" stroke="#A80038" strokeWidth="1.2" />
            <polyline points="-3,10 0,14 3,10" fill="none" stroke="#A80038" strokeWidth="1.2" />
          </g>
          <text
            x="160"
            y="-4"
            textAnchor="middle"
            fontSize="7"
            fontFamily="monospace"
            fill="#A80038"
          >
            INGRESO DE LUZ ({orientation})
          </text>
        </g>
      )}

      <g>
        {rooms.map((room) => {
          const isSelected = !compact && activeRoomId === room.id;
          const isExterior = room.kind === "exterior";
          const zoneFill = showZones ? KIND_STYLES[room.kind]?.fill || "#F4F1EA" : "#F4F1EA";
          const fill = isSelected ? "#A80038" : zoneFill;
          const stroke = isSelected ? "#FFFFFF" : "#121312";
          const cx = room.x + room.w / 2;
          const cy = room.y + room.h / 2;
          const doorSize = Math.min(room.w, room.h) * 0.22;

          return (
            <g
              key={room.id}
              onClick={onSelect ? () => onSelect(room.id) : undefined}
              onMouseEnter={onSelect ? () => onSelect(room.id) : undefined}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            >
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={fill}
                stroke="#121312"
                strokeWidth={isExterior ? 1.4 : 2.1}
                strokeDasharray={isExterior ? "4 3" : undefined}
              />

              {!isExterior && (
                <>
                  <line
                    x1={room.x + room.w * 0.28}
                    y1={room.y}
                    x2={room.x + room.w * 0.72}
                    y2={room.y}
                    stroke={isSelected ? "#FFD5E2" : "#F4F1EA"}
                    strokeWidth="2.8"
                  />
                  <line
                    x1={room.x + room.w * 0.28}
                    y1={room.y}
                    x2={room.x + room.w * 0.72}
                    y2={room.y}
                    stroke="#121312"
                    strokeWidth="0.8"
                  />
                  <path
                    d={`M ${room.x + 6} ${room.y + room.h} A ${doorSize} ${doorSize} 0 0 1 ${
                      room.x + 6 + doorSize
                    } ${room.y + room.h - doorSize}`}
                    fill="none"
                    stroke={stroke}
                    strokeOpacity={isSelected ? 0.65 : 0.26}
                    strokeWidth="1"
                  />
                </>
              )}

              {showFurniture && <RoomFurniture room={room} stroke={stroke} />}

              {!compact && (
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fontSize={room.w < 68 ? "7.2" : "8.5"}
                  fontFamily="monospace"
                  fontWeight={isSelected ? "700" : "600"}
                  fill={isSelected ? "#FFFFFF" : "#121312"}
                  pointerEvents="none"
                >
                  {room.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function PropertyFloorplanPreview({ item }) {
  const rooms = item?.floorplan?.rooms || [];
  if (rooms.length === 0) return null;

  return (
    <div className="w-full h-full bg-[#F4F1EA] p-3 flex flex-col justify-between gap-1.5 text-left">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#5A5852]">
        <span className="uppercase tracking-wider text-[#121312] font-semibold">
          Croquis · {rooms.length} amb.
        </span>
        <span>N {item.floorplan.orientation}</span>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex items-center justify-center py-0.5">
        <BlueprintSvg rooms={rooms} compact showFurniture showZones />
      </div>

      <div className="flex items-center justify-between pt-1.5 border-t border-[#D5D0C5] text-[10px] font-mono">
        <span className="text-[#5A5852] truncate">{item.primaryMetric}</span>
        <span className="text-[var(--brand-accent)] font-semibold shrink-0 inline-flex items-center gap-1">
          <span>Ampliar</span>
          <PiArrowsOutSimpleLight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

export default function PropertyFloorplan({ item, onOpenPhoto }) {
  const floorplan = item?.floorplan;
  const rooms = floorplan?.rooms || [];
  const gallery = item?.gallery?.length ? item.gallery : [item?.image].filter(Boolean);

  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id || "");
  const [showFurniture, setShowFurniture] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showSunlight, setShowSunlight] = useState(true);
  const [zoom, setZoom] = useState(1);

  if (!floorplan || rooms.length === 0) return null;

  const activeRoom = rooms.find((room) => room.id === activeRoomId) || rooms[0];
  const photoIdx =
    typeof activeRoom?.photoIndex === "number" && gallery[activeRoom.photoIndex]
      ? activeRoom.photoIndex
      : 0;
  const activePhoto = gallery[photoIdx] || gallery[0];

  const roomInquiryUrl = buildWhatsAppUrl(
    `Hola ${SITE_CONFIG.brandName}, estaba viendo el croquis de ${item.title} (${item.code}) y quisiera consultar medidas y detalles de: ${activeRoom.label}.`
  );

  return (
    <div className="bg-[#F4F1EA] border border-[#D5D0C5] w-full max-w-5xl mx-auto text-[#121312]">
      <div className="px-3.5 py-3 sm:px-5 sm:py-4 border-b border-[#D5D0C5] flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-[#ECE8DF]/75">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#5A5852]">
          <span className="font-semibold text-[#121312]">{floorplan.scaleLabel}</span>
          <span className="text-[#D5D0C5]">|</span>
          <span className="inline-flex items-center gap-1 font-mono">
            <PiCompassLight className="w-3.5 h-3.5 text-[var(--brand-accent)] shrink-0" />
            <span>Norte ref. {floorplan.orientation}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
          <button
            type="button"
            onClick={() => setShowFurniture((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border transition-colors cursor-pointer ${
              showFurniture
                ? "bg-[#121312] text-white border-[#121312]"
                : "bg-[#F4F1EA] text-[#5A5852] border-[#D5D0C5] hover:text-[#121312]"
            }`}
          >
            <PiArmchairLight className="w-3.5 h-3.5 shrink-0" />
            <span>Mobiliario</span>
          </button>

          <button
            type="button"
            onClick={() => setShowZones((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border transition-colors cursor-pointer ${
              showZones
                ? "bg-[#121312] text-white border-[#121312]"
                : "bg-[#F4F1EA] text-[#5A5852] border-[#D5D0C5] hover:text-[#121312]"
            }`}
          >
            <PiPaletteLight className="w-3.5 h-3.5 shrink-0" />
            <span>Zonas</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSunlight((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border transition-colors cursor-pointer ${
              showSunlight
                ? "bg-[#121312] text-white border-[#121312]"
                : "bg-[#F4F1EA] text-[#5A5852] border-[#D5D0C5] hover:text-[#121312]"
            }`}
          >
            <PiSunLight className="w-3.5 h-3.5 shrink-0" />
            <span>Luz natural</span>
          </button>

          <div className="inline-flex border border-[#D5D0C5] bg-[#F4F1EA]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
              aria-label="Alejar croquis"
              className="p-1.5 hover:bg-white text-[#121312] cursor-pointer"
            >
              <PiMagnifyingGlassMinusLight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="px-2 py-1 text-[11px] font-mono border-x border-[#D5D0C5] hover:bg-white cursor-pointer tabular-nums"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.45, Number((z + 0.15).toFixed(2))))}
              aria-label="Acercar croquis"
              className="p-1.5 hover:bg-white text-[#121312] cursor-pointer"
            >
              <PiMagnifyingGlassPlusLight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D5D0C5]">
        <div className="lg:col-span-8 flex flex-col bg-[#F4F1EA]">
          <div className="flex-1 min-h-[260px] sm:min-h-[380px] overflow-auto flex items-center justify-center p-4 sm:p-8">
            <div
              className="relative aspect-[320/246] mx-auto shrink-0 transition-[width,max-width] duration-300 ease-editorial"
              style={{
                width: `${Math.round(zoom * 100)}%`,
                maxWidth: `${Math.round(540 * zoom)}px`,
              }}
            >
              <BlueprintSvg
                rooms={rooms}
                activeRoomId={activeRoom?.id}
                onSelect={setActiveRoomId}
                showFurniture={showFurniture}
                showZones={showZones}
                showSunlight={showSunlight}
                orientation={floorplan.orientation}
              />
            </div>
          </div>

          <p className="px-4 py-2.5 border-t border-[#D5D0C5] bg-[#ECE8DF]/40 text-[10px] font-mono text-[#5A5852] leading-relaxed">
            Croquis esquemático orientativo sin escala métrica definitiva. Seleccioná un ambiente para ver su foto y consultar medidas.
          </p>
        </div>

        <div className="lg:col-span-4 p-4 sm:p-5 md:p-6 flex flex-col justify-between gap-5 bg-[#ECE8DF]/55">
          <div className="space-y-4">
            {activePhoto && (
              <div className="space-y-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#D5D0C5]">
                  <Image
                    src={activePhoto}
                    alt={`${item.title} - ${activeRoom.label}`}
                    fill
                    quality={80}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                  {onOpenPhoto && (
                    <button
                      type="button"
                      onClick={() => onOpenPhoto(photoIdx)}
                      className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#121312]/85 hover:bg-[var(--brand-accent)] text-white text-[10px] font-mono uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <PiArrowsOutSimpleLight className="w-3 h-3" />
                      <span>Ver foto</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--brand-accent)]">
                    {KIND_STYLES[activeRoom.kind]?.label || "Ambiente"}
                  </span>
                  <h4 className="text-lg font-serif font-medium text-[#121312]">
                    {activeRoom.label}
                  </h4>
                  <p className="text-xs text-[#5A5852] leading-relaxed">{activeRoom.detail}</p>
                </div>
              </div>
            )}

            <div className="divide-y divide-[#D5D0C5] border-y border-[#D5D0C5] max-h-40 sm:max-h-44 overflow-y-auto">
              {rooms.map((room) => {
                const active = activeRoom?.id === room.id;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveRoomId(room.id)}
                    className={`w-full py-2 px-2 flex items-center justify-between gap-2 text-left text-xs transition-colors cursor-pointer ${
                      active
                        ? "bg-[#121312] text-white font-semibold"
                        : "text-[#121312] hover:bg-[#F4F1EA]"
                    }`}
                  >
                    <span className="truncate">{room.label}</span>
                    <span
                      className={`font-mono text-[10px] shrink-0 ${
                        active ? "text-white/80" : "text-[#5A5852]"
                      }`}
                    >
                      {KIND_STYLES[room.kind]?.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={roomInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-none bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-xs font-semibold uppercase tracking-wider text-center inline-flex items-center justify-center gap-2 transition-colors"
            >
              <PiWhatsappLogoLight className="w-4 h-4 shrink-0" />
              <span className="truncate">Consultar por {activeRoom.label}</span>
            </a>
            <p className="text-[11px] text-[#5A5852] leading-relaxed">
              Planos acotados conforme a escritura disponibles en {SITE_CONFIG.addressDisplay}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
