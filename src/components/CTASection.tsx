import { ButtonLink } from "@/components/Button";

interface Props {
  title: string;
  lead?: string;
  buttonLabel: string;
  buttonHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** The big warm call-to-action band used near the bottom of most pages. */
export function CTASection({
  title,
  lead,
  buttonLabel,
  buttonHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  return (
    <section className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
      <div className="dot-grid relative overflow-hidden rounded-[2.5rem] bg-ink-900 px-8 py-16 text-center shadow-lift-lg sm:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-fresh-500/20 blur-3xl"
        />
        <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {lead && (
          <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-200">
            {lead}
          </p>
        )}
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={buttonHref}>{buttonLabel}</ButtonLink>
          {secondaryLabel && secondaryHref && (
            <ButtonLink
              href={secondaryHref}
              variant="outline"
              className="border-white/25 bg-white/10 text-white hover:border-brand-300 hover:text-brand-200"
            >
              {secondaryLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
