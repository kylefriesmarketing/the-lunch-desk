import type { Service } from "@/data/services";
import { Icon } from "@/components/icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      {/* Warm corner wash that blooms on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cream-deep transition-transform duration-500 group-hover:scale-150"
      />
      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="relative mt-5 font-display text-lg font-bold text-ink-900">{service.title}</h3>
      <p className="relative mt-2 text-[15px] leading-relaxed text-ink-600">{service.blurb}</p>
    </div>
  );
}
