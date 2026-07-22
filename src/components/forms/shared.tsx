"use client";

/** Shared field components + submit plumbing for both lead forms. */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SITE } from "@/data/site";

const inputCls =
  "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3 text-[15px] text-ink-900 shadow-sm placeholder:text-ink-300 focus:border-brand-500";

export function Field({
  label,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold text-ink-800 ${className}`}>
      <span>
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={inputCls} />;
}

export function Select({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) {
  return (
    <select {...props} className={inputCls}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export type SubmitState =
  | { phase: "idle" }
  | { phase: "sending" }
  | { phase: "sent" }
  /** No form endpoint configured — offer to send the details by email instead. */
  | { phase: "fallback"; mailto: string }
  | { phase: "error"; message: string };

/** "pickupTime" -> "Pickup Time" — makes the emailed summary readable. */
const labelize = (k: string) =>
  k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

/**
 * Composes a mailto: link containing everything the visitor typed, so a lead
 * is never lost just because the form endpoint isn't wired up yet.
 */
function buildMailto(kind: LeadKind, data: Record<string, string>) {
  const subject =
    kind === "lunch-request"
      ? `Office lunch request — ${data.company || data.name || "New enquiry"}`
      : `Restaurant partner inquiry — ${data.restaurantName || "New enquiry"}`;
  const body = Object.entries(data)
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${labelize(k)}: ${v}`)
    .join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type LeadKind = "lunch-request" | "restaurant-partner";

/**
 * Sends the lead to the configured endpoint (Formspree / CRM webhook /
 * automation). With no endpoint configured, reports honest preview mode.
 */
export function useLeadSubmit(kind: LeadKind) {
  const [state, setState] = useState<SubmitState>({ phase: "idle" });

  async function submit(data: Record<string, string>) {
    if (!SITE.formEndpoint) {
      // No endpoint wired yet — hand the visitor a prefilled email instead of
      // dropping the lead on the floor.
      setState({ phase: "fallback", mailto: buildMailto(kind, data) });
      return;
    }
    setState({ phase: "sending" });
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kind,
          ...data,
          receivedAt: new Date().toISOString(),
          source: SITE.url,
        }),
      });
      if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
      setState({ phase: "sent" });
    } catch {
      setState({
        phase: "error",
        message:
          "Something went wrong sending your request. Please try again" +
          (SITE.email ? ` or email us directly at ${SITE.email}.` : "."),
      });
    }
  }

  return { state, submit };
}

export function SubmitFeedback({ state, sentMessage }: { state: SubmitState; sentMessage: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // On a result, move focus + scroll to the message so screen-reader and
  // keyboard users are taken straight to the confirmation.
  useEffect(() => {
    if (state.phase === "sent" || state.phase === "fallback" || state.phase === "error") {
      ref.current?.focus();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.phase]);

  if (state.phase === "sent") {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-fresh-500/30 bg-fresh-100 p-5 text-[15px] leading-relaxed text-fresh-700"
      >
        <strong className="font-display">Request received!</strong> {sentMessage}
      </div>
    );
  }
  if (state.phase === "fallback") {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-brand-300 bg-brand-50 p-5 text-[15px] leading-relaxed text-brand-800"
      >
        <strong className="font-display">Almost there — one last tap.</strong>
        <p className="mt-2">
          We&apos;ve put your details into an email. Press send and we&apos;ll get straight back to
          you to confirm availability and options.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={state.mailto}
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 font-display font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-600"
          >
            Send my request
          </a>
          {SITE.phone && (
            <span className="text-sm">
              or call{" "}
              <a
                href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                className="font-semibold underline underline-offset-4"
              >
                {SITE.phone}
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }
  if (state.phase === "error") {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        className="rounded-2xl border border-red-300 bg-red-50 p-5 text-[15px] text-red-700"
      >
        {state.message}
      </div>
    );
  }
  return null;
}

export const SubmitButton = ({ sending, children }: { sending: boolean; children: ReactNode }) => (
  <button
    type="submit"
    disabled={sending}
    className="inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-3.5 font-display text-base font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-wait disabled:opacity-60"
  >
    {sending ? "Sending…" : children}
  </button>
);
