"use client";

import { useState } from "react";
import {
  Field,
  TextInput,
  TextArea,
  useLeadSubmit,
  SubmitFeedback,
  SubmitButton,
} from "@/components/forms/shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PartnerForm() {
  const { state, submit } = useLeadSubmit("restaurant-partner");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    if (data.website_hp) return;
    delete data.website_hp;

    const errs: Record<string, string> = {};
    if (!data.restaurantName.trim()) errs.restaurantName = "Please enter your restaurant's name.";
    if (!data.contactName.trim()) errs.contactName = "Please enter a contact name.";
    if (!data.phone.trim()) errs.phone = "Please enter a phone number.";
    if (!EMAIL_RE.test(data.email)) errs.email = "Please enter a valid email address.";
    if (!data.location.trim()) errs.location = "Where is the restaurant located?";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    void submit(data);
  }

  const sent = state.phase === "sent" || state.phase === "fallback";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="website_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Restaurant name" required error={errors.restaurantName}>
          <TextInput name="restaurantName" placeholder="Your restaurant" />
        </Field>
        <Field label="Contact name" required error={errors.contactName}>
          <TextInput name="contactName" autoComplete="name" placeholder="Owner or manager" />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <TextInput name="phone" type="tel" autoComplete="tel" placeholder="(843) 555-0123" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <TextInput name="email" type="email" autoComplete="email" placeholder="you@restaurant.com" />
        </Field>
        <Field label="Location" required error={errors.location}>
          <TextInput name="location" placeholder="Myrtle Beach, Conway…" />
        </Field>
        <Field label="Website">
          <TextInput name="website" type="url" placeholder="https://" />
        </Field>
      </div>

      <Field label="Type of cuisine">
        <TextInput name="cuisine" placeholder="BBQ, deli, Mexican, seafood…" />
      </Field>

      <Field label="Message">
        <TextArea
          name="message"
          placeholder="Tell us about your kitchen — group order capacity, catering options, pickup logistics…"
        />
      </Field>

      <SubmitFeedback
        state={state}
        sentMessage="Thanks for your interest in partnering — The Lunch Desk will reach out to talk details."
      />

      {!sent && (
        <SubmitButton sending={state.phase === "sending"}>Become a Restaurant Partner</SubmitButton>
      )}
    </form>
  );
}
