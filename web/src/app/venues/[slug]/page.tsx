import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Train } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { mockVenues } from "@/lib/mock-data";

interface VenuePageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return mockVenues.map((venue) => ({ slug: venue.slug }));
}

const SALA_DE_DESPECHO_MAY_EVENTS = [
  {
    day: 4,
    weekday: "Lun",
    dateLabel: "Lunes, 4 May",
    title: "SALA DE DESPECHO by Madrid No Descansa",
    time: "07:00 PM → 02:00 AM",
    href: "https://site.fourvenues.com/en/isabela-rosa/events/sala-de-despecho-by-madrid-no-descansa--04-05-2026-FVJW",
  },
  {
    day: 11,
    weekday: "Lun",
    dateLabel: "Lunes, 11 May",
    title: "SALA DE DESPECHO by Madrid No Descansa",
    time: "07:00 PM → 02:00 AM",
    href: "https://site.fourvenues.com/en/isabela-rosa/events/sala-de-despecho-by-madrid-no-descansa--11-05-2026-ROU4",
  },
  {
    day: 18,
    weekday: "Lun",
    dateLabel: "Lunes, 18 May",
    title: "SALA DE DESPECHO by Madrid No Descansa",
    time: "07:00 PM → 02:00 AM",
    href: "https://site.fourvenues.com/en/isabela-rosa/events/sala-de-despecho-by-madrid-no-descansa--18-05-2026-R9A8",
  },
  {
    day: 25,
    weekday: "Lun",
    dateLabel: "Lunes, 25 May",
    title: "SALA DE DESPECHO by Madrid No Descansa",
    time: "07:00 PM → 02:00 AM",
    href: "https://site.fourvenues.com/en/isabela-rosa/events/sala-de-despecho-by-madrid-no-descansa--25-05-2026-YQ74",
  },
];

const MAY_2026_DAYS = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  const date = new Date(2026, 4, day);
  const weekday = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date);
  const dateLabel = `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${day} May`;
  return {
    day,
    dateLabel,
    event: SALA_DE_DESPECHO_MAY_EVENTS.find((item) => item.day === day),
  };
});

const salaTitleClass =
  "font-sans font-black tracking-[0.06em] text-[#007C72] drop-shadow-[4px_4px_0_rgba(17,45,75,0.95)]";
const salaHeadingClass =
  "font-sans font-black uppercase tracking-[0.08em] text-[#007C72] drop-shadow-[2px_2px_0_rgba(17,45,75,0.95)]";

export default function VenuePage({ params }: VenuePageProps) {
  const venue = mockVenues.find((item) => item.slug === params.slug);

  if (!venue) {
    notFound();
  }

  if (venue.slug === "sala-de-despecho") {
    return <SalaDeDespechoPage />;
  }

  const photo = venue.photo_urls?.[0];

  return (
    <>
      <Navbar />

      <section className="relative min-h-[72vh] overflow-hidden pt-16 grain">
        {photo ? (
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-elevated)]" />
        )}
        <div className="absolute inset-0 bg-[var(--color-base)]/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)] via-[var(--color-base)]/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(72vh-4rem)] max-w-7xl items-end px-4 pb-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--color-champagne)]">
              {venue.type}
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-none tracking-display text-[var(--color-champagne)] sm:text-6xl">
              {venue.name}
            </h1>
            {venue.description && (
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
                {venue.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <section>
          <h2 className="font-display text-3xl font-bold tracking-display text-[var(--color-champagne)]">
            Detalles del venue
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <MapPin size={17} className="text-[var(--color-gold)]" />
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{venue.address}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">{venue.neighborhood}</p>
            </div>
            <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <Train size={17} className="text-[var(--color-gold)]" />
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                Metro {venue.metro_station ?? "Centro"}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">Madrid</p>
            </div>
            <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <CalendarDays size={17} className="text-[var(--color-gold)]" />
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">Fechas semanales</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">Sujeto a disponibilidad</p>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
            ¿No ves tu fecha?
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-display text-[var(--color-champagne)]">
            Te ayudamos a organizarlo.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            Dinos el dia, tamano del grupo y estilo de noche. Buscamos la mejor opcion disponible.
          </p>
          <Link
            href="/reservations"
            className="mt-6 inline-flex w-full items-center justify-center rounded-[8px] bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-text-inverse)] hover:bg-[var(--color-champagne)] transition-colors"
          >
            Contactarnos
          </Link>
        </aside>
      </main>

      <Footer />
    </>
  );
}

function SalaDeDespechoPage() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-[56vh] overflow-hidden pt-16 grain">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/venues/sala-de-despecho.png"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        >
          <source src="/videos/madrid-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--color-base)]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(125,31,53,0.22)_0%,rgba(11,11,15,0.28)_42%,rgba(11,11,15,0.72)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-base)]/35 via-transparent to-[var(--color-base)]/70" />

        <div className="relative z-10 mx-auto flex min-h-[calc(56vh-4rem)] max-w-7xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex rounded-full border border-[#007C72]/45 bg-[var(--color-base)]/45 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
              Sala de Despecho
            </span>
            <h1 className={`mt-5 text-4xl leading-none sm:text-6xl ${salaTitleClass}`}>
              (DES)AhogoDePenas
            </h1>
            <p className="mt-5 font-sans text-sm font-black uppercase tracking-[0.24em] text-[#007C72] drop-shadow-[2px_2px_0_rgba(17,45,75,0.95)] sm:text-base">
              Y ROLONES QUE PEGAN
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="mb-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl sm:text-4xl ${salaHeadingClass}`}>
              El Plan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
              Elige el día que quieres ir, compra tu entrada o reservado, y listo. El Plan esta
              armado.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-[var(--color-text-muted)]">
              Disclaimer: todas las compras son através de Fourvenues, una plataforma segura y
              validada.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {MAY_2026_DAYS.map((item) => {
              const activeEvent = item.event;
              const card = (
                <div
                  className={[
                    "group h-full overflow-hidden rounded-[8px] border bg-[var(--color-surface)] transition-colors",
                    activeEvent
                      ? "border-[var(--color-border)] hover:border-[var(--color-gold)]/50"
                      : "border-[var(--color-border)]/70 opacity-55",
                  ].join(" ")}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-elevated)]">
                    <img
                      src="/venues/sala-de-despecho.png"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-black uppercase leading-snug tracking-[0.04em] text-[var(--color-text-primary)]">
                      {activeEvent
                        ? activeEvent.title
                        : "SALA DE DESPECHO"}
                    </h3>
                    <span className="mt-3 inline-flex rounded-[4px] bg-[var(--color-elevated)] px-2 py-1 text-[11px] font-semibold text-[var(--color-champagne)]">
                      {activeEvent?.dateLabel ?? item.dateLabel}
                    </span>
                    <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                      {activeEvent?.time ?? "Fecha sin venta activa"}
                    </p>
                    <span
                      className={[
                        "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-3 py-2.5 text-sm font-black uppercase tracking-[0.04em] transition-colors",
                        activeEvent
                          ? "bg-[var(--color-gold)] text-[var(--color-text-inverse)] group-hover:bg-[var(--color-champagne)]"
                          : "bg-[var(--color-elevated)] text-[var(--color-text-muted)]",
                      ].join(" ")}
                    >
                      {activeEvent ? "Comprar" : "Próximamente"}
                      {activeEvent && <ArrowUpRight size={14} />}
                    </span>
                  </div>
                </div>
              );

              return activeEvent ? (
                <a
                  key={item.day}
                  href={activeEvent.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Comprar evento de Sala de Despecho ${activeEvent.dateLabel}`}
                >
                  {card}
                </a>
              ) : (
                <div key={item.day}>{card}</div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 border-t border-[var(--color-border)] pt-12 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <h2 className={`text-3xl sm:text-4xl ${salaHeadingClass}`}>
              ¿Qué es Sala De Despecho?
            </h2>
            <div
              className="mt-6 max-w-3xl space-y-5 text-base leading-8 sm:text-lg"
              style={{ color: "var(--color-text-primary)" }}
            >
              <p>
                Sala de Despecho es donde la noche empieza a las 7:00 PM con copas, tacos y
                pizzas, y termina a las 2:00 AM cantando a todo pulmón esos rolones que el corazón
                no supera.
              </p>
              <p>
                El plan arranca más casual, perfecto para tomar algo, picar y entrar en ambiente. A
                medida que avanza la noche, la energía va subiendo hasta convertirse en una fiesta
                completa, con música para cantar, bailar y desahogarse hasta el cierre.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className={`text-2xl sm:text-3xl ${salaHeadingClass}`}>
              Dirección y Horario
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-6 text-[var(--color-text-secondary)]">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-[#007C72]" />
                <div>
                  <p className="font-black uppercase tracking-[0.08em] text-[var(--color-champagne)]">
                    Dirección
                  </p>
                  <p className="mt-1">P.º de Recoletos, 18, Salamanca, 28001 Madrid</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-[#007C72]" />
                <div>
                  <p className="font-black uppercase tracking-[0.08em] text-[var(--color-champagne)]">
                    Horario
                  </p>
                  <p className="mt-1">7pm-2am</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
