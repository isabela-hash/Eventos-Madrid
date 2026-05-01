"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-gold)]/10 mb-6">
            <Mail size={20} className="text-[var(--color-gold)]" strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-3xl font-bold text-[var(--color-champagne)] tracking-display mb-3">
            Quédate en la lista
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm mb-8">
            Los mejores eventos de Madrid, antes que nadie. Sin spam, solo lo que importa.
          </p>

          {submitted ? (
            <div className="rounded-[8px] border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-6 py-4">
              <p className="text-[var(--color-champagne)] font-medium">
                ¡Estás dentro! Te escribimos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-gold)] transition-colors duration-200"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-[8px] bg-[var(--color-gold)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-inverse)] hover:bg-[var(--color-champagne)] transition-colors duration-200 flex-shrink-0"
              >
                Suscribirse <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
