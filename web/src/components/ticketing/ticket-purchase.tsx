"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Loader2, X } from "lucide-react";
import type { Event, TicketOffer } from "@/types";
import { formatPrice } from "@/lib/utils";

interface TicketPurchaseProps {
  event: Event;
  triggerClassName?: string;
  triggerLabel?: string;
}

export function TicketPurchase({ event, triggerClassName, triggerLabel = "Comprar" }: TicketPurchaseProps) {
  const offers = useMemo(() => event.ticket_offers?.filter((offer) => offer.status === "active") ?? [], [event]);
  const [open, setOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(offers[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId) ?? offers[0];
  const checkoutUrl = selectedOffer?.checkout_url ?? event.checkout_url ?? event.ticket_url;

  function clampQuantity(nextQuantity: number, offer?: TicketOffer) {
    const min = offer?.min_quantity ?? 1;
    const max = offer?.max_quantity ?? 10;
    return Math.max(min, Math.min(max, nextQuantity));
  }

  async function startFourvenuesCheckout() {
    if (!selectedOffer) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/checkout/fourvenues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_slug: event.slug,
        offer_id: selectedOffer.id,
        quantity,
        full_name: fullName,
        email,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { payment_url?: string; error?: string };

    setLoading(false);
    if (!res.ok || !data.payment_url) {
      setError(data.error ?? "No pudimos iniciar el checkout. Intentalo de nuevo.");
      return;
    }

    window.location.href = data.payment_url;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={event.status === "sold_out"}
        className={
          triggerClassName ??
          "inline-flex items-center justify-center rounded-[8px] bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-champagne)] disabled:cursor-not-allowed disabled:bg-[var(--color-elevated)] disabled:text-[var(--color-text-muted)]"
        }
      >
        {event.status === "sold_out" ? "Agotado" : triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-base)]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl sm:rounded-[8px] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
                  {event.provider === "fourvenues" ? "Fourvenues" : event.provider === "xceed" ? "Xceed" : "Eventos Madrid"}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-display text-[var(--color-champagne)]">
                  {event.name}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {event.venue_name} · {event.date_start} · {event.time_start}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-[6px] border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                aria-label="Cerrar compra"
              >
                <X size={16} />
              </button>
            </div>

            {offers.length > 0 ? (
              <div className="mt-6 space-y-3">
                {offers.map((offer) => (
                  <label
                    key={offer.id}
                    className={[
                      "flex cursor-pointer items-start justify-between gap-4 rounded-[8px] border p-4 transition-colors",
                      selectedOffer?.id === offer.id
                        ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                        : "border-[var(--color-border)] bg-[var(--color-elevated)]/45",
                    ].join(" ")}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-[var(--color-text-primary)]">{offer.name}</span>
                      {offer.includes && (
                        <span className="mt-1 block text-xs text-[var(--color-text-muted)]">{offer.includes}</span>
                      )}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-sm text-[var(--color-champagne)]">
                        {formatPrice(offer.price, undefined, offer.currency)}
                      </span>
                      <input
                        type="radio"
                        name={`offer-${event.id}`}
                        checked={selectedOffer?.id === offer.id}
                        onChange={() => {
                          setSelectedOfferId(offer.id);
                          setQuantity(clampQuantity(quantity, offer));
                        }}
                      />
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-4 text-sm text-[var(--color-text-secondary)]">
                Este evento todavia no tiene entradas sincronizadas.
              </div>
            )}

            {event.provider === "fourvenues" && selectedOffer ? (
              <div className="mt-6 grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nombre completo"
                    className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm text-[var(--color-text-secondary)]">
                    Cantidad
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(clampQuantity(Number(e.target.value), selectedOffer))}
                      min={selectedOffer.min_quantity}
                      max={selectedOffer.max_quantity}
                      type="number"
                      className="ml-3 w-20 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-gold)]"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={startFourvenuesCheckout}
                    disabled={loading || !fullName || !email}
                    className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[var(--color-gold)] px-5 py-3 text-sm font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-champagne)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    Continuar al pago
                  </button>
                </div>
                {error && <p className="text-sm text-[var(--color-garnet-soft)]">{error}</p>}
              </div>
            ) : checkoutUrl ? (
              <div className="mt-6">
                <iframe
                  src={checkoutUrl}
                  title={`Checkout ${event.name}`}
                  className="h-[440px] w-full rounded-[8px] border border-[var(--color-border)] bg-[var(--color-base)]"
                />
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-gold)] hover:text-[var(--color-champagne)]"
                >
                  Abrir checkout seguro <ExternalLink size={14} />
                </a>
              </div>
            ) : (
              <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                Checkout pendiente de configurar para este proveedor.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
