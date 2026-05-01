import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

interface TonightStripProps {
  count?: number;
}

export function TonightStrip({ count = 0 }: TonightStripProps) {
  return (
    <div className="border-y border-[var(--color-garnet)]/40 bg-[var(--color-garnet)]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[var(--color-garnet-soft)]" fill="currentColor" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Esta noche en Madrid —{" "}
              <span className="text-[var(--color-text-primary)] font-semibold">
                {count > 0 ? `${count} eventos disponibles` : "cargando..."}
              </span>
            </span>
          </div>
          <Link
            href="/tonight"
            className="flex items-center gap-1 text-xs font-medium text-[var(--color-garnet-soft)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
          >
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
