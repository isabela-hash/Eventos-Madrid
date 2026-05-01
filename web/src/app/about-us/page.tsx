import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
          About Us
        </p>
        <h1 className="mt-6 font-display text-5xl font-black leading-none tracking-display text-[var(--color-champagne)] sm:text-6xl">
          Madrid plans, curated with taste.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
          Eventos Madrid helps locals, visitors and groups find the right nightlife, dinner and
          social plans without scrolling through noise.
        </p>
      </main>

      <Footer />
    </>
  );
}
