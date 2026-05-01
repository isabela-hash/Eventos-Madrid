import { Crown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function VipPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 px-4 py-1.5">
          <Crown size={13} className="text-[var(--color-gold)]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-champagne)]">
            VIP
          </span>
        </div>
        <h1 className="mt-6 font-display text-5xl font-black leading-none tracking-display text-[var(--color-champagne)] sm:text-6xl">
          Premium experiences in Madrid.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
          Private tables, hosted nights, birthdays, groups, brand events and custom concierge
          plans for Madrid.
        </p>
      </main>

      <Footer />
    </>
  );
}
