"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] as const;
type Day = (typeof DAYS)[number];

interface Venue {
  name: string;
  slug: string;
  accent: string;
  image: string;
  detail: string;
}

const VENUES_BY_DAY: Record<Day, Venue[]> = {
  Lunes: [
    { name: "Sala de Despecho", slug: "sala-de-despecho", accent: "#C4973F", image: "/venues/sala-de-despecho.png", detail: "Copas, música española y plan casual." },
    { name: "Panthera", slug: "panthera", accent: "#7D1F35", image: "/venues/panthera.png", detail: "Cena, cocktails y noche elegante." },
  ],
  Martes: [
    { name: "Salvaje", slug: "salvaje", accent: "#C4973F", image: "/venues/salvaje.png", detail: "Dinner party con ambiente premium." },
    { name: "Houdinni", slug: "houdinni", accent: "#7D1F35", image: "/venues/houdinni.png", detail: "From the streets to the beats." },
    { name: "Sala de Despecho", slug: "sala-de-despecho", accent: "#C4973F", image: "/venues/sala-de-despecho.png", detail: "Copas, música española y plan casual." },
    { name: "Istar", slug: "istar", accent: "#C4973F", image: "/venues/istar.png", detail: "Ambiente cálido, late dinner y copas." },
    { name: "Los Amantes", slug: "los-amantes", accent: "#7D1F35", image: "/venues/los-amantes.png", detail: "Flores, cocktails y noche íntima." },
  ],
  Miércoles: [
    { name: "Gunilla", slug: "gunilla", accent: "#7D1F35", image: "/venues/gunilla.png", detail: "Miércoles de club con puesta roja." },
    { name: "Houdinni", slug: "houdinni", accent: "#7D1F35", image: "/venues/houdinni.png", detail: "From the streets to the beats." },
    { name: "Sala de Despecho", slug: "sala-de-despecho", accent: "#C4973F", image: "/venues/sala-de-despecho.png", detail: "Copas, música española y plan casual." },
    { name: "Istar", slug: "istar", accent: "#C4973F", image: "/venues/istar.png", detail: "Ambiente cálido, late dinner y copas." },
    { name: "Los Amantes", slug: "los-amantes", accent: "#7D1F35", image: "/venues/los-amantes.png", detail: "Flores, cocktails y noche íntima." },
  ],
  Jueves: [
    { name: "Fenómeno", slug: "fenomeno", accent: "#C4973F", image: "/venues/fenomeno.png", detail: "Cena, música y ambiente retro." },
    { name: "Todos Santos", slug: "todos-santos", accent: "#7D1F35", image: "/venues/todos-santos.png", detail: "Urbano, desenfadado y social." },
    { name: "Houdinni", slug: "houdinni", accent: "#7D1F35", image: "/venues/houdinni.png", detail: "From the streets to the beats." },
    { name: "Sala de Despecho", slug: "sala-de-despecho", accent: "#C4973F", image: "/venues/sala-de-despecho.png", detail: "Copas, música española y plan casual." },
    { name: "Istar", slug: "istar", accent: "#C4973F", image: "/venues/istar.png", detail: "Ambiente cálido, late dinner y copas." },
    { name: "Los Amantes", slug: "los-amantes", accent: "#7D1F35", image: "/venues/los-amantes.png", detail: "Flores, cocktails y noche íntima." },
    { name: "Panthera", slug: "panthera", accent: "#7D1F35", image: "/venues/panthera.png", detail: "Cena, cocktails y noche elegante." },
    { name: "Victoria", slug: "victoria", accent: "#C4973F", image: "/venues/victoria.png", detail: "Club elegante con luz dorada." },
  ],
  Viernes: [
    { name: "Teatro Magno", slug: "teatro-magno", accent: "#C4973F", image: "/venues/teatro-magno.png", detail: "Teatro, club y noche de gran formato." },
    { name: "Babylon", slug: "babylon", accent: "#7D1F35", image: "/venues/babylon.png", detail: "Ambiente rojo, mesas y noche social." },
    { name: "Casa Pepa", slug: "casa-pepa", accent: "#7D1F35", image: "/venues/casa-pepa.png", detail: "Fiesta grande, luces y baile." },
    { name: "Houdinni", slug: "houdinni", accent: "#7D1F35", image: "/venues/houdinni.png", detail: "From the streets to the beats." },
    { name: "Istar", slug: "istar", accent: "#C4973F", image: "/venues/istar.png", detail: "Ambiente cálido, late dinner y copas." },
    { name: "Todos Santos", slug: "todos-santos", accent: "#7D1F35", image: "/venues/todos-santos.png", detail: "Urbano, desenfadado y social." },
    { name: "Los Amantes", slug: "los-amantes", accent: "#7D1F35", image: "/venues/los-amantes.png", detail: "Flores, cocktails y noche íntima." },
    { name: "Rubicon", slug: "rubicon", accent: "#7D1F35", image: "/venues/rubicon.png", detail: "Club rojo, noche intensa y electrónica." },
    { name: "Victoria", slug: "victoria", accent: "#C4973F", image: "/venues/victoria.png", detail: "Club elegante con luz dorada." },
  ],
  Sábado: [
    { name: "Teatro Magno", slug: "teatro-magno", accent: "#C4973F", image: "/venues/teatro-magno.png", detail: "Teatro, club y noche de gran formato." },
    { name: "Babylon", slug: "babylon", accent: "#7D1F35", image: "/venues/babylon.png", detail: "Ambiente rojo, mesas y noche social." },
    { name: "Perreo Lab", slug: "perreolab", accent: "#7D1F35", image: "/venues/perreolab.png", detail: "Reggaeton, baile y energía alta." },
    { name: "Tardeo Madrid", slug: "tardeo-madrid", accent: "#7D1F35", image: "/venues/tardeo-madrid.png", detail: "Tardeo, música y pista llena." },
    { name: "Houdinni", slug: "houdinni", accent: "#7D1F35", image: "/venues/houdinni.png", detail: "From the streets to the beats." },
    { name: "Istar", slug: "istar", accent: "#C4973F", image: "/venues/istar.png", detail: "Ambiente cálido, late dinner y copas." },
    { name: "Los Amantes", slug: "los-amantes", accent: "#7D1F35", image: "/venues/los-amantes.png", detail: "Flores, cocktails y noche íntima." },
    { name: "Victoria", slug: "victoria", accent: "#C4973F", image: "/venues/victoria.png", detail: "Club elegante con luz dorada." },
  ],
  Domingo: [
    { name: "Sala de Despecho", slug: "sala-de-despecho", accent: "#C4973F", image: "/venues/sala-de-despecho.png", detail: "Copas, música española y plan casual." },
    { name: "Calle 365", slug: "calle-365", accent: "#2A5F6B", image: "/venues/calle-365.png", detail: "Botillería del mundo, copas y plan fácil." },
  ],
};

export function DaySelector() {
  const [selectedDay, setSelectedDay] = useState<Day>("Viernes");
  const venues = VENUES_BY_DAY[selectedDay];

  return (
    <div>
      {/* Day tabs */}
      <div className="flex gap-1 overflow-x-auto scroll-hide pb-4 border-b border-[var(--color-border)]">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={[
              "shrink-0 px-4 py-2 text-sm font-medium rounded-[4px] transition-colors duration-200 border",
              selectedDay === day
                ? "text-[var(--color-gold)] bg-[var(--color-gold)]/10 border-[var(--color-gold)]/30"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] border-transparent",
            ].join(" ")}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Venue grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {venues.map((venue) => (
          <Link
            key={`${venue.slug}-${selectedDay}`}
            href={`/venues/${venue.slug}`}
            className="group"
          >
            <div
              className="relative aspect-[4/3] rounded-[8px] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-[var(--color-gold)]/40 transition-colors duration-300"
              style={{
                boxShadow: "0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(196,151,63,0.08)",
              }}
            >
              <img
                src={venue.image}
                alt={venue.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[var(--color-base)]/20 transition-colors duration-300 group-hover:bg-[var(--color-base)]/48" />

              <div
                className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at 30% 80%, ${venue.accent}50, transparent 65%)`,
                }}
              />

              {/* Grain */}
              <div className="absolute inset-0 grain pointer-events-none" />

              {/* Arrow icon on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight size={16} className="text-[var(--color-gold)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B0B0F]/95 via-[#0B0B0F]/70 to-transparent">
                <p className="font-display text-base font-semibold text-[var(--color-champagne)] tracking-display leading-tight">
                  {venue.name}
                </p>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-snug text-[var(--color-text-secondary)] opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                  {venue.detail}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
