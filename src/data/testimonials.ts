/**
 * Customer testimonials.
 *
 * ⚠️ Intentionally EMPTY — do not add fake testimonials. When real customers
 * provide quotes, add them here and the testimonial section will render
 * automatically on the home page.
 */

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [];
