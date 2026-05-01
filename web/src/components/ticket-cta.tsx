import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketCTAProps {
  href: string;
  label?: string;
  className?: string;
}

export function TicketCTA({ href, label = "Comprar entradas", className }: TicketCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-[8px] bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-text-inverse)]",
        "hover:bg-[var(--color-champagne)] transition-colors duration-200",
        className
      )}
    >
      {label}
      <ExternalLink size={14} />
    </a>
  );
}
