import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-lift hover:shadow-lift-lg",
  secondary:
    "bg-ink-900 text-cream hover:bg-ink-800 shadow-lift",
  outline:
    "border-2 border-ink-900/15 bg-white/70 text-ink-900 hover:border-brand-500 hover:text-brand-600",
  ghost: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline",
} as const;

export type ButtonVariant = keyof typeof styles;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
