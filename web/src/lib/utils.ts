import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(from?: number, to?: number, currency = "€"): string {
  if (!from) return "Gratis";
  const fmt = (n: number) =>
    new Intl.NumberFormat("es-ES", { minimumFractionDigits: 0 }).format(n);
  if (to && to !== from) return `${fmt(from)}–${fmt(to)} ${currency}`;
  return `${fmt(from)} ${currency}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatDateTime(dateStr: string, timeStr: string): string {
  const date = new Date(dateStr);
  const formatted = new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  return `${formatted}, ${timeStr}`;
}
