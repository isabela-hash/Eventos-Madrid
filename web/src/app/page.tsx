import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DaySelector } from "@/components/day-selector";
import { Faq } from "@/components/faq";

const CIBELES_HERO_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Fuente_de_Cibeles_%28Madrid%29_15.jpg?width=2200";

const MADRID_HERO_VIDEO =
  "/videos/madrid-hero.mp4";

const galleryItems = [
  {
    label: "Clubs",
    title: "Viernes en Madrid",
    image: "https://images.unsplash.com/photo-1571266752726-f4d4d9c91b0a?w=1200&q=80",
    featured: true,
  },
  {
    label: "After Work",
    title: "Jueves despues de las 18h",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=900&q=80",
  },
  {
    label: "Tardeos",
    title: "El domingo tiene su propio ritmo",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
  },
  {
    label: "Dinner Parties",
    title: "Cena con ambiente",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80",
  },
  {
    label: "Casual Drinks",
    title: "Copas sin complicaciones",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden grain sm:min-h-[68vh]">
        <img
          src={CIBELES_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={CIBELES_HERO_IMAGE}
          className="absolute inset-0 h-full w-full object-cover opacity-68"
        >
          <source src={MADRID_HERO_VIDEO} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(125,31,53,0.36) 0%, transparent 62%), radial-gradient(ellipse 55% 45% at 80% 20%, rgba(168,50,82,0.18) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-base)]/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-base)]/82 via-[var(--color-base)]/56 to-[var(--color-garnet)]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-base)]/30 via-transparent to-[var(--color-base)]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <h1 className="font-display mb-4 max-w-full text-[clamp(1.55rem,5.4vw,4rem)] font-black leading-none tracking-display text-[var(--color-text-primary)] sm:whitespace-nowrap">
              MADRID SIEMPRE TIENE PLAN.
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
              Tu Próximo Plan Empieza Aquí
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#day-selector"
                className="inline-flex items-center gap-2 rounded-[8px] bg-[var(--color-garnet)] px-7 py-3.5 text-base font-semibold text-[var(--color-text-primary)] shadow-[0_18px_45px_rgba(125,31,53,0.35)] transition-colors duration-200 hover:bg-[var(--color-garnet-soft)]"
              >
                Explora el Plan <ArrowRight size={16} />
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-[8px] border border-[var(--color-garnet-soft)]/70 bg-[var(--color-garnet)]/12 px-7 py-3.5 text-base font-semibold text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-garnet)]/22"
                aria-label="Ver video: Como Funciona"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-garnet-soft)] text-[var(--color-text-primary)]">
                  <Play size={15} fill="currentColor" />
                </span>
                Como Funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Day Selector ─── */}
      <section
        id="day-selector"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--color-border)] scroll-mt-20"
      >
        <div className="mb-10">
          <p className="text-xs font-mono text-[var(--color-gold)] tracking-widest uppercase mb-3">
            Explora por día
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-champagne)] tracking-display leading-tight">
            Elige el día de la semana{" "}
            <span className="text-[var(--color-text-secondary)] font-normal">
              y explora el plan.
            </span>
          </h2>
        </div>

        <DaySelector />
      </section>

      {/* ─── Photos / Videos gallery ─── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--color-border)]">
        <div className="mb-10">
          <p className="text-xs font-mono text-[var(--color-gold)] tracking-widest uppercase mb-3">
            Madrid de noche
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-champagne)] tracking-display">
            Así se vive.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className={[
                "relative rounded-[8px] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]",
                item.featured ? "col-span-2 lg:col-span-1 lg:row-span-2 min-h-[320px]" : "aspect-video",
              ].join(" ")}
            >
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--color-base)]/25" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B0B0F]/90 to-transparent">
                <span className="text-xs font-mono text-[var(--color-gold)] uppercase tracking-widest">{item.label}</span>
                <p className="font-display text-sm sm:text-xl font-semibold text-[var(--color-champagne)] tracking-display mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-mono text-[var(--color-gold)] tracking-widest uppercase mb-3">
              Concierge
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--color-champagne)] tracking-display">
              ¿Quieres organizar un plan privado?
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
              Mesas, cumpleaños, grupos grandes y noches a medida con acceso cuidado de principio a fin.
            </p>
          </div>
          <Link
            href="/reservations"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-text-inverse)] hover:bg-[var(--color-champagne)] transition-colors duration-200"
          >
            Hablar con concierge <Sparkles size={15} />
          </Link>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--color-border)]">
        <div className="mb-10">
          <p className="text-xs font-mono text-[var(--color-gold)] tracking-widest uppercase mb-3">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-champagne)] tracking-display">
            Preguntas frecuentes.
          </h2>
        </div>
        <Faq />
      </section>

      <Footer />
    </>
  );
}
