import Link from "next/link";
import { Music, Theater, Moon, Trophy, Palette, Sparkles } from "lucide-react";

const categories = [
  { label: "After Work", href: "/eventos", Icon: Trophy, color: "var(--color-teal-soft)" },
  { label: "Clubs", href: "/eventos", Icon: Moon, color: "var(--color-garnet-soft)" },
  { label: "Tardeos", href: "/eventos", Icon: Music, color: "var(--color-gold)" },
  { label: "Dinner Parties", href: "/eventos", Icon: Theater, color: "var(--color-champagne)" },
  { label: "Casual Drinks", href: "/eventos", Icon: Palette, color: "var(--color-teal-soft)" },
  { label: "Concierge", href: "/reservations", Icon: Sparkles, color: "var(--color-gold)" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="font-display text-2xl font-semibold text-[var(--color-text-primary)] mb-8 tracking-display">
        Explorar por categoría
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map(({ label, href, Icon, color }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center gap-3 rounded-[8px] bg-[var(--color-surface)] p-4 sm:p-5 border border-transparent hover:border-[var(--color-border)] transition-colors duration-200"
          >
            <div
              className="rounded-full p-3 transition-colors duration-200"
              style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
            >
              <Icon size={20} style={{ color }} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 text-center">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
