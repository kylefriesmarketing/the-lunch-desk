/** Small inline SVG icon set — no external icon dependency. */

import type { JSX } from "react";

export type IconName =
  | "calendar"
  | "heart"
  | "users"
  | "presentation"
  | "handshake"
  | "pill"
  | "chart"
  | "party"
  | "boxes"
  | "repeat"
  | "phone"
  | "clipboard"
  | "utensils"
  | "check"
  | "bag"
  | "menu"
  | "close"
  | "arrow";

const paths: Record<IconName, JSX.Element> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  heart: (
    <path d="M12 20.5S4 15.3 4 9.8C4 7 6.2 5 8.7 5c1.4 0 2.6.7 3.3 1.7C12.7 5.7 14 5 15.3 5 17.8 5 20 7 20 9.8c0 5.5-8 10.7-8 10.7Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="16.8" cy="9.5" r="2.5" />
      <path d="M16.2 14.6c2.2.2 4 1.8 4.4 4.4" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="11" rx="1.8" />
      <path d="M12 15v3.5M8.5 21l3.5-2.5 3.5 2.5M7.5 11l2.5-2.5 2 1.8L16.5 7" />
    </>
  ),
  handshake: (
    <path d="M3 11l4-4 4.5 1.5L15 5l6 6-3 3.5m-2.5 2.5L13 19.5 6.5 14M8.5 16.5l3 2.8M11 12.5l2.5 2.3" />
  ),
  pill: (
    <>
      <rect x="3.5" y="9" width="17" height="7" rx="3.5" transform="rotate(-35 12 12.5)" />
      <path d="M9.2 8.2l5 6.5" />
    </>
  ),
  chart: (
    <path d="M4 20V4m0 16h16M8 16v-5m4 5V8m4 8v-3" />
  ),
  party: (
    <path d="M6 14l-2.5 7L11 18.5M6 14l5 4.5M6 14l6-6m2-2.5L15.5 4M18 8.5l1.5-1M17 13l2 .5M9.5 4.5l.5 2" />
  ),
  boxes: (
    <>
      <rect x="4" y="12" width="7" height="7" rx="1" />
      <rect x="13" y="12" width="7" height="7" rx="1" />
      <rect x="8.5" y="4" width="7" height="7" rx="1" />
    </>
  ),
  repeat: (
    <path d="M17 3l3 3-3 3M4 10V8.5A2.5 2.5 0 0 1 6.5 6H20M7 21l-3-3 3-3m13-1v1.5a2.5 2.5 0 0 1-2.5 2.5H4" />
  ),
  phone: (
    <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3.5A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5v1M9 10h6M9 13.5h6M9 17h4" />
    </>
  ),
  utensils: (
    <path d="M7 2.5v8M4.5 2.5V7a2.5 2.5 0 0 0 5 0V2.5M7 10.5V21.5M16.5 2.5c-1.7 1-2.5 3.2-2.5 5.5 0 2 1 3.5 2.5 3.5v10M16.5 2.5c1.2.8 2 3 2 5.5" />
  ),
  check: <path d="M4.5 12.5l5 5L19.5 7" />,
  bag: (
    <>
      <path d="M5.5 8.5h13l-1 12h-11l-1-12Z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
