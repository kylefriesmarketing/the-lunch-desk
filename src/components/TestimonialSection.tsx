import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Renders nothing until real testimonials are added to src/data/testimonials.ts.
 * Deliberately no fake quotes — see the data file's warning comment.
 */
export function TestimonialSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
      <SectionHeading eyebrow="Word around town" title="What local offices say" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm"
          >
            <blockquote className="text-[15px] leading-relaxed text-ink-700">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-ink-900">
              {t.name} <span className="font-normal text-ink-500">· {t.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
