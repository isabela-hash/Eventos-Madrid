import Link from "next/link";
import { MapPin, Train } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Venue } from "@/types";

interface VenueCardProps {
  venue: Venue;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function VenueCard({ venue, ctaLabel = "Ver venue", ctaHref, className }: VenueCardProps) {
  const photo = venue.photo_urls?.[0];

  return (
    <div
      className={cn(
        "group rounded-[8px] overflow-hidden bg-[var(--color-surface)] border border-transparent",
        "hover:border-[var(--color-gold)] transition-colors duration-300 shadow-card hover:shadow-card-hover",
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-elevated)]">
        {photo ? (
          <img
            src={photo}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/80 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--color-elevated)]/80 text-[var(--color-text-secondary)] backdrop-blur-sm">
            {venue.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base mb-2 group-hover:text-[var(--color-champagne)] transition-colors duration-200">
          {venue.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin size={12} className="text-[var(--color-text-muted)] flex-shrink-0" />
          <span className="text-xs text-[var(--color-text-muted)] line-clamp-1">{venue.neighborhood}</span>
        </div>

        {venue.metro_station && (
          <div className="flex items-center gap-1.5 mb-3">
            <Train size={12} className="text-[var(--color-text-muted)] flex-shrink-0" />
            <span className="text-xs text-[var(--color-text-muted)]">Metro {venue.metro_station}</span>
          </div>
        )}

        {venue.description && (
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-4">
            {venue.description}
          </p>
        )}

        <Link
          href={ctaHref ?? `/venues/${venue.slug}`}
          className="block w-full text-center rounded-[8px] bg-[var(--color-gold)] px-4 py-2 text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-champagne)] transition-colors duration-200"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
