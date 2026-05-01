"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Loader2 } from "lucide-react";
import type { Event, Venue } from "@/types";

interface EventsByDateResponse {
  date: string;
  events: Event[];
  venues: Venue[];
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00`));
}

export function DaySelector() {
  const [selectedDate, setSelectedDate] = useState(todayIso());
  const [data, setData] = useState<EventsByDateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    fetch(`/api/events?date=${selectedDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("No pudimos cargar los eventos.");
        return res.json();
      })
      .then((nextData: EventsByDateResponse) => {
        if (active) setData(nextData);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedDate]);

  const venues = useMemo(() => {
    const venueMap = new Map<string, { venue: Venue; events: Event[] }>();
    for (const event of data?.events ?? []) {
      const venue = data?.venues.find((item) => item.id === event.venue_id || item.name === event.venue_name);
      if (!venue) continue;
      const existing = venueMap.get(venue.slug) ?? { venue, events: [] };
      existing.events.push(event);
      venueMap.set(venue.slug, existing);
    }
    return Array.from(venueMap.values());
  }, [data]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
            <CalendarDays size={15} />
            Buscar por fecha
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="mt-3 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]"
          />
        </div>
        <p className="text-sm capitalize text-[var(--color-text-secondary)]">{formatLongDate(selectedDate)}</p>
      </div>

      {loading && (
        <div className="mt-10 flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
          <Loader2 size={16} className="animate-spin text-[var(--color-gold)]" />
          Cargando venues disponibles...
        </div>
      )}

      {error && !loading && (
        <div className="mt-8 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-text-secondary)]">
          {error}
        </div>
      )}

      {!loading && !error && venues.length === 0 && (
        <div className="mt-8 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-text-secondary)]">
          No hay eventos sincronizados para esta fecha todavía.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {venues.map(({ venue, events }) => (
          <Link key={venue.slug} href={`/venues/${venue.slug}?date=${selectedDate}`} className="group">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-300 group-hover:border-[var(--color-gold)]/40"
              style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(196,151,63,0.08)" }}
            >
              {venue.photo_urls?.[0] && (
                <img
                  src={venue.photo_urls[0]}
                  alt={venue.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-[var(--color-base)]/28 transition-colors duration-300 group-hover:bg-[var(--color-base)]/52" />
              <div className="grain pointer-events-none absolute inset-0" />

              <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ArrowUpRight size={16} className="text-[var(--color-gold)]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0B0F]/95 via-[#0B0B0F]/70 to-transparent p-4">
                <p className="font-display text-base font-semibold leading-tight tracking-display text-[var(--color-champagne)]">
                  {venue.name}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gold)]">
                  {events.length} {events.length === 1 ? "evento" : "eventos"} disponible{events.length === 1 ? "" : "s"}
                </p>
                <p className="mt-2 line-clamp-2 text-sm leading-snug text-[var(--color-text-secondary)]">
                  {events[0]?.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
