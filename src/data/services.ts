/** Business situations The Lunch Desk helps with — rendered on /services. */

export interface Service {
  title: string;
  blurb: string;
  icon:
    | "calendar"
    | "heart"
    | "users"
    | "presentation"
    | "handshake"
    | "pill"
    | "chart"
    | "party"
    | "boxes"
    | "repeat";
}

export const SERVICES: Service[] = [
  {
    title: "Weekly Office Lunches",
    blurb:
      "A standing lunch day your team can count on — we keep the rotation fresh and the ordering painless.",
    icon: "calendar",
  },
  {
    title: "Employee Appreciation Meals",
    blurb:
      "Say thank you with a great meal instead of another email. We handle the coordination end to end.",
    icon: "heart",
  },
  {
    title: "Staff Meetings",
    blurb:
      "Food arrives organized and on schedule so the meeting starts on time — not twenty minutes into a sandwich count.",
    icon: "users",
  },
  {
    title: "Training Sessions",
    blurb:
      "All-day trainings need reliable food. Tell us the headcount and budget; we'll line up options that work.",
    icon: "presentation",
  },
  {
    title: "Client Meetings",
    blurb:
      "Impress clients with a well-planned lunch that looks effortless — because for you, it was.",
    icon: "handshake",
  },
  {
    title: "Pharmaceutical Lunches",
    blurb:
      "Reps: coordinate office lunches across your territory through one contact instead of a dozen restaurant calls.",
    icon: "pill",
  },
  {
    title: "Sales Presentations",
    blurb:
      "Lunch-and-learns run smoother when someone else owns the food logistics. That someone is us.",
    icon: "chart",
  },
  {
    title: "Corporate Events",
    blurb:
      "Office parties, milestones and celebrations — we coordinate group orders sized for the occasion.",
    icon: "party",
  },
  {
    title: "Large Group Orders",
    blurb:
      "Big headcount? We organize the order, confirm it with the restaurant, and coordinate pickup details.",
    icon: "boxes",
  },
  {
    title: "Recurring Lunch Programs",
    blurb:
      "Weekly, monthly, or on your schedule — recurring office meals kept organized without re-planning every time.",
    icon: "repeat",
  },
];
