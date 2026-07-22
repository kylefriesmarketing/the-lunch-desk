"use client";

import { useEffect, useState } from "react";
import { CUISINES } from "@/data/restaurants";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  useLeadSubmit,
  SubmitFeedback,
  SubmitButton,
} from "@/components/forms/shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LunchRequestForm() {
  const { state, submit } = useLeadSubmit("lunch-request");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [restaurant, setRestaurant] = useState("");

  // Prefill "Preferred restaurant" from ?restaurant= (links on the Lunch Options page).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("restaurant");
    if (fromUrl) setRestaurant(fromUrl);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot: real users never fill this hidden field.
    if (data.website_hp) return;
    delete data.website_hp;

    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Please enter your name.";
    if (!data.company.trim()) errs.company = "Please enter your company.";
    if (!EMAIL_RE.test(data.email)) errs.email = "Please enter a valid email address.";
    if (!data.phone.trim()) errs.phone = "Please enter a phone number.";
    if (!data.date) {
      errs.date = "Please pick the date you need lunch.";
    } else {
      // Compare against today at midnight so "today" is always still valid.
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Parse as local time — `new Date("2026-08-03")` would be parsed as UTC
      // and can land on the previous day in western time zones.
      const [y, m, d] = data.date.split("-").map(Number);
      const picked = new Date(y, m - 1, d);
      if (picked < today) errs.date = "Please choose today or a future date.";
    }
    if (!data.people || Number(data.people) < 1)
      errs.people = "How many people are we feeding?";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    void submit(data);
  }

  const sent = state.phase === "sent" || state.phase === "preview";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — visually hidden from real users */}
      <input
        type="text"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          <TextInput name="name" autoComplete="name" placeholder="Jordan Smith" />
        </Field>
        <Field label="Company" required error={errors.company}>
          <TextInput name="company" autoComplete="organization" placeholder="Grand Strand Dental" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <TextInput name="email" type="email" autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <TextInput name="phone" type="tel" autoComplete="tel" placeholder="(843) 555-0123" />
        </Field>
        <Field label="Date needed" required error={errors.date}>
          <TextInput name="date" type="date" />
        </Field>
        <Field label="Desired pickup time">
          <TextInput name="pickupTime" type="time" />
        </Field>
        <Field label="Number of people" required error={errors.people}>
          <TextInput name="people" type="number" min={1} placeholder="12" />
        </Field>
        <Field label="Estimated budget">
          <TextInput name="budget" placeholder="$12–15 per person, or a total" />
        </Field>
        <Field label="Preferred cuisine">
          <Select
            name="cuisine"
            options={["No preference — surprise us", ...CUISINES]}
            defaultValue="No preference — surprise us"
          />
        </Field>
        <Field label="Preferred restaurant">
          <TextInput
            name="restaurant"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            placeholder="If you already have one in mind"
          />
        </Field>
      </div>

      <Field label="Individual meals or group-style meal?">
        <Select
          name="mealStyle"
          options={[
            "Not sure yet — help me decide",
            "Individual meals (everyone picks)",
            "Group-style (trays / shared)",
          ]}
          defaultValue="Not sure yet — help me decide"
        />
      </Field>

      <Field label="Dietary restrictions">
        <TextInput name="dietary" placeholder="Vegetarian ×2, one gluten-free, one nut allergy…" />
      </Field>

      <Field label="Additional details">
        <TextArea
          name="details"
          placeholder="Anything else we should know — recurring schedule, building access, past favorites…"
        />
      </Field>

      <SubmitFeedback
        state={state}
        sentMessage="The Lunch Desk will contact you to confirm availability, options, and details."
      />

      {!sent && (
        <div className="space-y-4">
          <SubmitButton sending={state.phase === "sending"}>Request Lunch Options</SubmitButton>
          <p className="max-w-xl text-sm leading-relaxed text-ink-500">
            Submitting a request does <strong>not</strong> automatically confirm an order. The Lunch
            Desk will contact you to confirm availability, pricing, and details before anything is
            placed.
          </p>
        </div>
      )}
    </form>
  );
}
