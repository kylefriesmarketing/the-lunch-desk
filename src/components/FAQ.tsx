import type { Faq } from "@/data/faqs";

/** Accessible accordion built on native <details>/<summary>. */
export function FAQList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-ink-900/8 bg-white shadow-sm transition-shadow open:shadow-lift"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4.5 font-display text-base font-semibold text-ink-900">
            {f.q}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="faq-chevron h-5 w-5 shrink-0 text-brand-500 transition-transform duration-200"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="px-6 pb-5 leading-relaxed text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
