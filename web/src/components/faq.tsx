const faqs = [
  {
    question: "¿Tengo que pagar para ver los planes?",
    answer:
      "No. Puedes explorar eventos y venues gratis. Solo pagas cuando reservas una entrada, mesa o experiencia.",
  },
  {
    question: "¿Las reservas son confirmadas al momento?",
    answer:
      "Algunas son inmediatas y otras dependen del venue. Si hace falta confirmacion, te avisamos antes de cerrar el plan.",
  },
  {
    question: "¿Puedo organizar una noche para grupo?",
    answer:
      "Si. Para cumpleanos, despedidas, equipos o visitas a Madrid, el concierge ayuda a elegir zona, venue y acceso.",
  },
  {
    question: "¿Los planes cambian cada semana?",
    answer:
      "Si. Madrid se mueve rapido, asi que la seleccion se actualiza para mostrar lo que realmente merece la pena.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
      {faqs.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="font-display text-lg font-semibold tracking-display text-[var(--color-text-primary)]">
              {item.question}
            </span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-gold)] transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
