"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const eventLinks = [
  { href: "/eventos/clubs", label: "Clubs" },
  { href: "/eventos/dinner-parties", label: "Dinner Parties" },
  { href: "/eventos/afterwork", label: "Afterwork" },
  { href: "/eventos/tardeos", label: "Tardeos" },
  { href: "/eventos/casual-social-drinks", label: "Casual / Social Drinks" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-garnet-soft)]/35 bg-[var(--color-garnet)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-1 group shrink-0">
            <span className="font-display text-lg font-bold tracking-display text-[var(--color-champagne)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
              EVENTOS
            </span>
            <span className="font-display text-lg font-bold tracking-display text-[var(--color-text-primary)]/80">
              /MADRID
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Link
                href="/eventos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-primary)]/80 hover:text-[var(--color-text-primary)] transition-colors duration-200"
              >
                Eventos
                <ChevronDown size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:rotate-180" />
              </Link>

              <div className="invisible absolute left-0 top-full w-56 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-elevated)] p-2 shadow-card">
                  {eventLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-[6px] px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {[
              { href: "/vip", label: "VIP" },
              { href: "/about-us", label: "About Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-primary)]/80 hover:text-[var(--color-text-primary)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 text-xs font-mono text-[var(--color-text-primary)]/75">
              <button className="hover:text-[var(--color-gold)] transition-colors duration-200">EN</button>
              <span>/</span>
              <button className="hover:text-[var(--color-gold)] transition-colors duration-200">EN</button>
            </div>

            <button
              className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <button
              onClick={() => setEventsOpen((value) => !value)}
              className="flex items-center justify-between py-2.5 text-left text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
            >
              Eventos
              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={eventsOpen ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"}
              />
            </button>
            {eventsOpen && (
              <div className="mb-2 grid gap-1 border-l border-[var(--color-border)] pl-4">
                {eventLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {[
              { href: "/vip", label: "VIP" },
              { href: "/about-us", label: "About Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--color-border)]">
              <button className="text-xs font-mono text-[var(--color-gold)]">EN</button>
              <span className="text-xs text-[var(--color-text-muted)]">/</span>
              <button className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200">EN</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
