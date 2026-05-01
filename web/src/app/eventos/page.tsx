"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilterBar } from "@/components/filter-bar";
import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/lib/mock-data";
import type { EventCategory } from "@/types";

const CATEGORIES: EventCategory[] = [
  "After Work",
  "Clubs",
  "Tardeos",
  "Dinner Parties",
  "Casual Drinks",
];

export default function EventosPage() {
  const [active, setActive] = useState("Todos");
  const [visible, setVisible] = useState(6);

  const filtered = mockEvents.filter(
    (e) => active === "Todos" || e.category === active
  );
  const shown = filtered.slice(0, visible);

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="pt-28 pb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[var(--color-champagne)] tracking-display mb-3">
          Todos los eventos
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Lo mejor de Madrid, curado cada semana.
        </p>
      </div>

      <FilterBar categories={CATEGORIES} onCategoryChange={(cat) => { setActive(cat); setVisible(6); }} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            {filtered.length} eventos
          </span>
        </div>

        {shown.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {visible < filtered.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisible((v) => v + 6)}
                  className="inline-flex items-center gap-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-gold)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  Cargar más eventos
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[var(--color-text-muted)]">No hay eventos en esta categoría aún.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
