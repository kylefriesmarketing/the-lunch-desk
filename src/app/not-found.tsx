import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="dot-grid">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center sm:px-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-500 text-white shadow-lift">
          <Icon name="bag" className="h-8 w-8" />
        </span>
        <p className="mt-8 font-display text-6xl font-bold tracking-tight text-brand-600">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          This plate came back empty
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-600">
          The page you&apos;re looking for isn&apos;t on the menu — but your next office lunch can
          be. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">
            Back to Home <Icon name="arrow" className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Plan an Office Lunch
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
