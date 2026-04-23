"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "motion/react";
import { CheckCircle, Clock, Timer, CreditCard, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { useCart, formatRupees } from "@/stores/cart";
import { useLoyalty } from "@/stores/loyalty";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "processing" | "success";

const ALL_SLOTS = ["08:30", "10:00", "11:00", "13:00", "15:30", "18:00", "20:00"];

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function maxDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

function currentHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function CheckoutStub() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.items.reduce((a, i) => a + i.price * i.qty, 0));
  const clear = useCart((s) => s.clear);
  const addStamp = useLoyalty((s) => s.addStamp);
  const [status, setStatus] = useState<Status>("idle");
  const [advanceOrder, setAdvanceOrder] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: todayStr(),
    time: "11:00",
  });

  const packingFee = items.length > 0 ? 30 : 0;
  const total = subtotal + packingFee;

  const isToday = form.date === todayStr();
  const now = currentHHMM();

  const availableSlots = useMemo(() => {
    if (!isToday) return ALL_SLOTS;
    return ALL_SLOTS.filter((slot) => slot > now);
  }, [isToday, now]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 1600));
    setStatus("success");
    addStamp();
    window.setTimeout(() => {
      setForm({ name: "", phone: "", date: todayStr(), time: "11:00" });
      setAdvanceOrder(false);
    }, 2400);
    window.setTimeout(() => {
      clear();
      setStatus("idle");
    }, 3500);
  };

  const pickupLabel = isToday
    ? `${form.time} today`
    : `${form.time} on ${new Date(form.date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}`;

  return (
    <section id="checkout" className="relative mt-20 grid grid-cols-1 gap-10 rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-12">
      <div>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          Pickup details · we don&apos;t deliver
        </span>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
          Tell us who&apos;s coming by.
        </h2>
        <p className="mt-3 max-w-md text-sm text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
          We&apos;ll keep everything packed and warm. No online payment — settle at the counter.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <label className="block">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
              Name on pickup
            </span>
            <input
              required
              minLength={2}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
              placeholder="Niharika B."
            />
          </label>
          <label className="block">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
              Phone
            </span>
            <input
              required
              type="tel"
              pattern="[0-9+\s\-]{10,}"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
              placeholder="+91 98 710 00000"
            />
          </label>

          {/* Advance order toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={advanceOrder}
              onClick={() => {
                setAdvanceOrder((v) => !v);
                if (!advanceOrder) setForm((f) => ({ ...f, date: todayStr() }));
              }}
              className="group relative flex h-7 w-12 items-center rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] bg-[var(--color-cream)] p-0.5 transition-colors data-[state=on]:bg-[var(--color-terracotta)]"
              data-state={advanceOrder ? "on" : "off"}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-[var(--color-espresso)] shadow-sm transition-transform duration-300 ${advanceOrder ? "translate-x-5 bg-[var(--color-cream)]" : "translate-x-0"}`}
              />
            </button>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
              <CalendarBlank size={10} weight="bold" className="mr-1.5 inline-block align-[-1px]" />
              Advance order (pick a date)
            </span>
          </div>

          <AnimatePresence>
            {advanceOrder && (
              <m.label
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="block overflow-hidden"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
                  <CalendarBlank size={10} weight="bold" className="mr-2 inline-block align-[-1px]" />
                  Pickup date
                </span>
                <input
                  type="date"
                  value={form.date}
                  min={todayStr()}
                  max={maxDateStr()}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-1 w-full rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
                />
              </m.label>
            )}
          </AnimatePresence>

          <label className="block">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
              <Clock size={10} weight="bold" className="mr-2 inline-block align-[-1px]" />
              Pickup time
            </span>
            <select
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-4 py-3 text-[1rem] outline-none transition-colors focus:border-[var(--color-terracotta)]"
            >
              {availableSlots.length > 0 ? (
                availableSlots.map((t) => (
                  <option key={t} value={t}>
                    {t} {isToday ? "today" : ""}
                  </option>
                ))
              ) : (
                <option disabled>No slots available today</option>
              )}
            </select>
          </label>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={items.length === 0 || status !== "idle" || availableSlots.length === 0}
            icon={<CreditCard size={16} weight="duotone" />}
            className="mt-2 w-full justify-center"
          >
            {status === "idle" && (items.length === 0 ? "Bag is empty" : `Confirm pickup · ${formatRupees(total)}`)}
            {status === "processing" && "Reserving bakes…"}
            {status === "success" && "Reserved"}
          </Button>
          <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
            No card charged · settle at the counter
          </p>
        </form>
      </div>

      <aside className="rounded-3xl border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-cream)] p-6">
        <h3 className="font-display text-2xl">Order summary</h3>
        <ul className="mt-4 divide-y divide-[color-mix(in_oklab,var(--color-ink),transparent_92%)]">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <li className="py-6 text-center font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                Add something from above, we&apos;ll pack it.
              </li>
            ) : (
              items.map((item) => (
                <m.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-display text-base leading-tight">{item.name}</p>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                      ×{item.qty} · {formatRupees(item.price)}
                    </p>
                  </div>
                  <span className="font-mono text-sm tabular-nums">{formatRupees(item.price * item.qty)}</span>
                </m.li>
              ))
            )}
          </AnimatePresence>
        </ul>
        <dl className="mt-6 space-y-2 border-t border-[color-mix(in_oklab,var(--color-ink),transparent_90%)] pt-4 text-sm">
          <Row label="Subtotal" value={formatRupees(subtotal)} />
          <Row label="Box + tape" value={formatRupees(packingFee)} />
          <Row label="Total" value={formatRupees(total)} bold />
        </dl>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[color-mix(in_oklab,var(--color-honey),transparent_78%)] p-4">
          <Timer size={18} weight="duotone" className="mt-0.5 shrink-0 text-[var(--color-terracotta)]" />
          <p className="text-sm leading-snug">
            Ready 20 minutes after confirmation. If we&apos;re low on anything, we&apos;ll call
            you to swap it.
          </p>
        </div>
      </aside>

      <AnimatePresence>
        {status === "success" ? (
          <m.div
            role="alert"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            className="pointer-events-none fixed inset-x-4 bottom-6 z-[80] mx-auto max-w-md rounded-3xl bg-[var(--color-espresso)] px-5 py-4 text-[var(--color-cream)] shadow-lift"
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={22} weight="duotone" className="text-[var(--color-honey)]" />
              <div>
                <p className="font-display text-lg leading-tight">Pickup reserved.</p>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-cream),transparent_35%)]">
                  Come by at {pickupLabel} — we&apos;ll be ready.
                </p>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
        {label}
      </dt>
      <dd className={`font-mono tabular-nums ${bold ? "font-display text-xl" : "text-sm"}`}>
        {value}
      </dd>
    </div>
  );
}
