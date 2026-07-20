/** Frequently asked questions — rendered on the home page and reused in GBP content. */

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is The Lunch Desk?",
    a: "The Lunch Desk is an office lunch coordination service that helps businesses organize and place group food orders from local restaurants.",
  },
  {
    q: "Do you deliver the food?",
    a: "The Lunch Desk primarily coordinates orders and restaurant pickup arrangements. Delivery availability may depend on the restaurant or specific order.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing may vary depending on the order and services required. Contact The Lunch Desk with your lunch details for more information.",
  },
  {
    q: "Can you help with recurring office lunches?",
    a: "Yes. The Lunch Desk can help businesses organize recurring weekly, monthly, or scheduled office meals.",
  },
  {
    q: "Can employees order different meals?",
    a: "Depending on the restaurant and size of the order, The Lunch Desk can help coordinate individual meal selections or group-style meals.",
  },
  {
    q: "Do you work with restaurants?",
    a: "Yes. Local restaurants interested in receiving additional business and group orders can contact The Lunch Desk about becoming a restaurant partner.",
  },
];
