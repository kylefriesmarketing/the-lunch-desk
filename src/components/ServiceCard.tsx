import type { Service } from "@/data/services";
import { Icon } from "@/components/icons";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group rounded-3xl border border-ink-900/8 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{service.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{service.blurb}</p>
    </div>
  );
}
