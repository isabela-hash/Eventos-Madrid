"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FilterBar } from "@/components/filter-bar";
import { VenueCard } from "@/components/venue-card";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { mockVenues } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

const CATEGORIES = ["After Work", "Clubs", "Tardeos", "Dinner Parties", "Casual Drinks"];

const VENUE_CTA: Record<string, string> = {
  Nightclub: "Entrar en la lista",
  Tardeo: "Reservar mesa",
  "Dinner & Show": "Reservar",
  Rooftop: "Ver rooftop",
  Bar: "Reservar",
};

export default function NightlifePage() {
  const [active, setActive] = useState("Todos");

  const filtered = mockVenues.filter((v) => {
    if (active === "Todos") return true;
    const map: Record<string, string[]> = {
      "After Work": ["Tardeo", "Bar"],
      Clubs: ["Nightclub"],
      Tardeos: ["Tardeo"],
      "Dinner Parties": ["Dinner & Show"],
      "Casual Drinks": ["Bar", "Rooftop"],
    };
    return map[active]?.includes(v.type);
  });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end grain overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571266752726-f4d4d9c91b0a?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-base)]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)] via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1.5 mb-6">
            <Sparkles size={12} className="text-[var(--color-gold)]" />
            <span className="text-xs font-medium text-[var(--color-champagne)]">
              La guía definitiva de Madrid
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-champagne)] tracking-display leading-tight mb-4 max-w-3xl">
            Curando el pulso{" "}
            <em className="font-normal text-[var(--color-text-secondary)]">de la ciudad.</em>
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl">
            Acceso exclusivo a los mejores clubs, tardeos, restaurantes y rooftops de Madrid.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <FilterBar categories={CATEGORIES} onCategoryChange={setActive} />

      {/* Venue grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)] tracking-display">
            Trending en Madrid
          </h2>
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            {filtered.length} lugares
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              ctaLabel={VENUE_CTA[venue.type] ?? "Ver venue"}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[var(--color-text-muted)]">No hay venues en esta categoría aún.</p>
          </div>
        )}
      </main>

      <NewsletterBanner />
      <Footer />
    </>
  );
}
