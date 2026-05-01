import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EventCard } from "@/components/event-card";
import { EventHero } from "@/components/event-hero";
import { TicketPurchase } from "@/components/ticketing/ticket-purchase";
import { getEventBySlug, getEvents } from "@/lib/airtable";
import { mockEvents } from "@/lib/mock-data";

interface EventPageProps {
  params: {
    slug: string;
  };
}

const categoryPages: Record<string, { title: string; category: string; description: string }> = {
  clubs: {
    title: "Clubs",
    category: "Clubs",
    description: "Noches, listas, entradas y mesas en los clubs que mueven Madrid.",
  },
  "dinner-parties": {
    title: "Dinner Parties",
    category: "Dinner Parties",
    description: "Cenas con ambiente, sobremesa larga y plan listo para seguir la noche.",
  },
  afterwork: {
    title: "Afterwork",
    category: "After Work",
    description: "Planes despues de oficina: copas, rooftops y cenas faciles de coordinar.",
  },
  tardeos: {
    title: "Tardeos",
    category: "Tardeos",
    description: "El punto dulce entre tarde, musica y noche sin improvisar demasiado.",
  },
  "casual-social-drinks": {
    title: "Casual / Social Drinks",
    category: "Casual Drinks",
    description: "Copas relajadas, bares con energia y sitios para quedar sin hacerlo complicado.",
  },
};

export function generateStaticParams() {
  return [
    ...mockEvents.map((event) => ({ slug: event.slug })),
    ...Object.keys(categoryPages).map((slug) => ({ slug })),
  ];
}

export default async function EventPage({ params }: EventPageProps) {
  const categoryPage = categoryPages[params.slug];

  if (categoryPage) {
    const allEvents = await getEvents();
    const events = allEvents.filter((item) => item.category === categoryPage.category);

    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <Link
            href="/eventos"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
          >
            <ArrowLeft size={15} />
            All events
          </Link>

          <div className="mb-10 max-w-3xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
              Eventos
            </p>
            <h1 className="font-display text-5xl font-black leading-none tracking-display text-[var(--color-champagne)] sm:text-6xl">
              {categoryPage.title}
            </h1>
            <p className="mt-5 text-[var(--color-text-secondary)]">{categoryPage.description}</p>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-[var(--color-text-secondary)]">
              More plans coming soon.
            </div>
          )}
        </main>

        <Footer />
      </>
    );
  }

  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <EventHero event={event} />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/eventos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
        >
          <ArrowLeft size={15} />
          Volver a eventos
        </Link>

        <h2 className="font-display text-3xl font-bold tracking-display text-[var(--color-champagne)]">
          Sobre este plan
        </h2>
        <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
          {event.description ?? event.short_description}
        </p>

        <div className="mt-8 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
            Compra interna
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-display text-[var(--color-champagne)]">
            Elige entrada y continua al pago seguro
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
            La seleccion ocurre aqui. El pago final lo procesa {event.provider === "fourvenues" ? "Fourvenues" : event.provider === "xceed" ? "Xceed" : "el proveedor"}.
          </p>
          <div className="mt-5">
            <TicketPurchase event={event} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
