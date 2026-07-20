interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, lead, align = "center" }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-600">{lead}</p>}
    </div>
  );
}
