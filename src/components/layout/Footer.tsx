import Link from "next/link";
import { InstagramLogo, PhoneCall, MapPin, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/ui/Marquee";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

const SITEMAP = [
  {
    heading: "Shop",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/order", label: "Order online" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    heading: "Bakery",
    links: [
      { href: "/story", label: "Our story" },
      { href: "/visit", label: "Visit us" },
      { href: "/menu?filter=fusion", label: "Fusion line" },
    ],
  },
  {
    heading: "Direct",
    links: [
      { href: "tel:+911724197326", label: "+91 172 419 7326" },
      { href: "mailto:hello@sweetescape.in", label: "hello@sweetescape.in" },
      { href: "https://instagram.com/sweetescape.ch", label: "@sweetescape.ch" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      data-theme="dark"
      className="relative z-10 mt-32 bg-[var(--color-espresso)] text-[var(--color-cream)]"
    >
      <Marquee
        speed={40}
        className="border-y border-[color-mix(in_oklab,var(--color-cream),transparent_80%)] py-6 text-[var(--color-cream)]"
        reverseOnScroll={false}
      >
        <span className="flex items-center gap-10 px-6 font-display text-3xl sm:text-4xl md:text-7xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              Baked at 5am
              <span aria-hidden className="text-[var(--color-terracotta)]">✦</span>
              Sector 35-B
              <span aria-hidden className="text-[var(--color-honey)]">✦</span>
              Since &apos;22
              <span aria-hidden className="text-[var(--color-butter)]">✦</span>
            </span>
          ))}
        </span>
      </Marquee>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-[1.3fr_repeat(3,1fr)] md:px-10">
        <div>
          <Link href="/" className="font-display text-3xl leading-none">
            Sweet<span className="text-[var(--color-honey)]">Escape</span>
          </Link>
          <p className="mt-5 max-w-sm text-[color-mix(in_oklab,var(--color-cream),transparent_25%)]">
            Fusion viennoiserie baked every morning on Sector 35-B. Come early — the kouign-amann
            usually sells out by noon.
          </p>
          <address className="mt-6 flex flex-col gap-2 not-italic text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} weight="duotone" />
              SCO 114, Sector 35-B, Chandigarh 160022
            </span>
            <a href="tel:+911724197326" className="inline-flex items-center gap-2 hover:text-[var(--color-honey)]">
              <PhoneCall size={16} weight="duotone" />
              +91 172 419 7326
            </a>
            <a
              href="mailto:hello@sweetescape.in"
              className="inline-flex items-center gap-2 hover:text-[var(--color-honey)]"
            >
              <EnvelopeSimple size={16} weight="duotone" />
              hello@sweetescape.in
            </a>
          </address>
          <a
            href="https://instagram.com/sweetescape.ch"
            aria-label="SweetEscape on Instagram"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-cream),transparent_78%)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-honey)] hover:text-[var(--color-honey)]"
          >
            <InstagramLogo size={16} weight="duotone" />
            Follow on Instagram
          </a>
        </div>

        {SITEMAP.map((col) => (
          <div key={col.heading}>
            <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-honey)]">
              {col.heading}
            </h4>
            <ul className="mt-4 flex flex-col gap-2 text-[1rem]">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block transition-colors hover:text-[var(--color-honey)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[color-mix(in_oklab,var(--color-cream),transparent_85%)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
          <NewsletterSignup />
          <div className="text-[0.8rem] text-[color-mix(in_oklab,var(--color-cream),transparent_35%)]">
            <span className="block">© {new Date().getFullYear()} SweetEscape Bakery. All flours reserved.</span>
            <span className="mt-1 block font-mono">
              Designed in Chandigarh. Built with Next.js, Three.js, GSAP.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
