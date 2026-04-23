"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

const OCCASIONS = ["Birthday", "Anniversary", "Corporate hamper", "Wedding", "Just saying hi"];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: OCCASIONS[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = (): Errors => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "A name, please.";
    if (!/^[0-9+\s-]{10,}$/.test(form.phone)) e.phone = "10 digits or more, incl. +91.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "We'll reply here.";
    if (form.message.trim().length < 8) e.message = "Tell us a bit more.";
    return e;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    window.setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", phone: "", email: "", occasion: OCCASIONS[0], message: "" });
    }, 3200);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-cream)] p-6 md:p-10"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          label="Your name"
          error={errors.name}
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          placeholder="Niharika B."
          required
        />
        <Field
          label="Phone"
          type="tel"
          error={errors.phone}
          value={form.phone}
          onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
          placeholder="+91 98 710 00000"
          required
        />
        <Field
          label="Email"
          type="email"
          error={errors.email}
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          placeholder="hello@…"
          required
        />
        <label className="block">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
            Occasion
          </span>
          <select
            value={form.occasion}
            onChange={(e) => setForm((f) => ({ ...f, occasion: e.target.value }))}
            className="mt-1 w-full rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
          >
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
          What are you thinking?
        </span>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={4}
          placeholder="Anniversary, cake for 8, no nuts. Pickup Saturday around 5pm."
          className="mt-1 w-full resize-y rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
        />
        <AnimatePresence>
          {errors.message ? (
            <m.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
            >
              {errors.message}
            </m.p>
          ) : null}
        </AnimatePresence>
      </label>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={status !== "idle"}
          icon={
            status === "sent" ? (
              <CheckCircle size={18} weight="duotone" />
            ) : (
              <PaperPlaneTilt size={18} weight="duotone" />
            )
          }
        >
          {status === "idle" && "Send the note"}
          {status === "sending" && "Flying to Ishaan…"}
          {status === "sent" && "Caught — we'll reply shortly"}
        </Button>
        <p className="max-w-xs font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
          Ishaan replies most days within an hour. Never later than the same evening.
        </p>
      </div>

      <AnimatePresence>
        {status === "sent" ? (
          <m.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--color-cream),transparent_15%)] backdrop-blur-sm"
          >
            <div className="rounded-full bg-[var(--color-espresso)] px-6 py-3 text-center text-[var(--color-cream)] shadow-lift">
              <p className="font-display text-xl">Note received.</p>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-cream),transparent_35%)]">
                We&apos;ll be in touch.
              </p>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "tel" | "email";
};

function Field({ label, value, onChange, placeholder, required, error, type = "text" }: FieldProps) {
  return (
    <label className="block">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "mt-1 w-full rounded-2xl border bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors",
          error
            ? "border-[var(--color-terracotta)]"
            : "border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] focus:border-[var(--color-terracotta)]",
        ].join(" ")}
      />
      <AnimatePresence>
        {error ? (
          <m.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
          >
            {error}
          </m.p>
        ) : null}
      </AnimatePresence>
    </label>
  );
}
