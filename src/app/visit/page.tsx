import type { Metadata } from "next";
import { ChandigarhMap } from "@/components/visit/ChandigarhMap";
import { HoursTable } from "@/components/visit/HoursTable";
import { ContactForm } from "@/components/visit/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { ADDRESS } from "@/data/hours";
import { ArrowUpRight, Phone, EnvelopeSimple, Compass } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Visit us",
  description:
    "Come find SweetEscape at SCO 114, Sector 35-B, Chandigarh. Directions, hours, parking, and a note form to write to Ishaan directly.",
};

const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=76.7480%2C30.7230%2C76.7690%2C30.7355&layer=mapnik&marker=${ADDRESS.coords.lat}%2C${ADDRESS.coords.lng}`;

export default function VisitPage() {
  return (
    <div className="relative">
      <section className="mx-auto max-w-[1400px] px-6 pt-32 md:px-10 md:pt-40">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          Visit · Sector 35-B · Chandigarh
        </span>
        <TextReveal
          as="h1"
          className="mt-4 max-w-[18ch] font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9]"
        >
          Turn right at the gulmohar. You&apos;ll smell us first.
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]"
        >
          We&apos;re tucked behind the banyan on the Inner Market corner of 35-B —
          between a tailor who&apos;s been there since 1974 and a kulfi stall with
          no signboard. You&apos;ll know you&apos;re close when the air turns to
          butter.
        </TextReveal>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-10 px-6 pt-20 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <ChandigarhMap />
        <HoursTable />
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-24 md:grid-cols-3 md:px-10">
        <InfoCard icon={<Compass size={22} weight="duotone" />} label="Address">
          <p className="font-display text-2xl leading-tight">
            {ADDRESS.line1}
            <br />
            {ADDRESS.line2}
          </p>
          <a
            href={ADDRESS.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-terracotta)] underline-offset-4 hover:underline"
          >
            Open in maps <ArrowUpRight size={14} weight="bold" />
          </a>
        </InfoCard>
        <InfoCard icon={<Phone size={22} weight="duotone" />} label="Phone">
          <a
            href={`tel:${ADDRESS.phone.replace(/\s/g, "")}`}
            className="font-display text-2xl leading-tight underline-offset-4 hover:underline"
          >
            {ADDRESS.phone}
          </a>
          <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
            Call before 6pm for custom cakes
          </p>
        </InfoCard>
        <InfoCard icon={<EnvelopeSimple size={22} weight="duotone" />} label="Email">
          <a
            href={`mailto:${ADDRESS.email}`}
            className="font-display text-2xl leading-tight underline-offset-4 hover:underline"
          >
            {ADDRESS.email}
          </a>
          <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
            Hampers, weddings, corporate · reply within a day
          </p>
        </InfoCard>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20 md:px-10">
        <div className="overflow-hidden rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-cream)]">
          <iframe
            title="SweetEscape on OpenStreetMap"
            src={OSM_EMBED}
            className="block h-[250px] w-full sm:h-[340px] md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color-mix(in_oklab,var(--color-ink),transparent_90%)] px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            <span className="text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
              © OpenStreetMap contributors
            </span>
            <a
              href={`https://www.openstreetmap.org/?mlat=${ADDRESS.coords.lat}&mlon=${ADDRESS.coords.lng}#map=18/${ADDRESS.coords.lat}/${ADDRESS.coords.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--color-terracotta)]"
            >
              View larger map <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-32 md:px-10">
        <SectionHeading
          eyebrow="Write to us"
          title="Tell us what you're dreaming up."
          description="Birthday cake for eight? Wedding tablescape for two hundred? Corporate hamper with the team's names piped on each tag? Drop a note — Ishaan reads every one."
        />
        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function InfoCard({ icon, label, children }: InfoCardProps) {
  return (
    <div className="rounded-[28px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)] p-6">
      <div className="flex items-center gap-2 text-[var(--color-terracotta)]">
        {icon}
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em]">{label}</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
