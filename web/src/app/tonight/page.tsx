import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EventCard } from "@/components/event-card";
import { TonightStrip } from "@/components/tonight-strip";
import { NewsletterBanner } from "@/components/newsletter-banner";
import { mockTonightEvents } from "@/lib/mock-data";
import { Zap } from "lucide-react";

export default function TonightPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="relative pt-28 pb-12 grain overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, var(--color-garnet), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-garnet)]/30 bg-[var(--color-garnet)]/10 px-4 py-1.5 mb-6">
            <Zap size={12} className="text-[var(--color-garnet-soft)]" fill="currentColor" />
            <span className="text-xs font-medium text-[var(--color-garnet-soft)]">En vivo esta noche</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[var(--color-champagne)] tracking-display mb-3">
            ¿Qué hacer esta noche en Madrid?
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            {mockTonightEvents.length} eventos disponibles ahora mismo.
          </p>
        </div>
      </div>

      <TonightStrip count={mockTonightEvents.length} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {mockTonightEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTonightEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[var(--color-text-muted)]">No hay eventos esta noche. Vuelve más tarde.</p>
          </div>
        )}
      </main>

      <NewsletterBanner />
      <Footer />
    </>
  );
}
