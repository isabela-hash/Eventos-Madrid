import Link from "next/link";
import { Camera, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-base font-bold tracking-display text-[var(--color-champagne)]">
              EVENTOS
            </span>
            <span className="font-display text-base font-bold tracking-display text-[var(--color-text-muted)]">
              /MADRID
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-text-secondary)]">
            El directorio premium para encontrar la noche correcta en Madrid: clubs, tardeos,
            cenas con ambiente y copas bien elegidas.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
            Explorar
          </h3>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/eventos" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Eventos
            </Link>
            <Link href="/nightlife" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Nightlife
            </Link>
            <Link href="/reservations" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              Reservas
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
            Social
          </h3>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://instagram.com/eventosmadrid"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
              aria-label="Instagram"
            >
              <Camera size={17} strokeWidth={1.5} />
            </a>
            <a
              href="https://tiktok.com/@eventosmadrid"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
              aria-label="TikTok"
            >
              <Music2 size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Eventos Madrid. Todos los derechos reservados.</p>
          <p>Hero media: Madrid drone footage by Ignacio Pereira; Cibeles by Kadellar.</p>
        </div>
      </div>
    </footer>
  );
}
