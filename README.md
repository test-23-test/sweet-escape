# SweetEscape

Immersive bakery website for **SweetEscape** — an artisanal fusion bakery at SCO 114, Sector 35-B, Chandigarh. Editorial layout, scroll-driven motion, procedural 3D pastries, kinetic typography, and a tightly locked design system tuned for a warm cafe-boutique aesthetic.

> _Classical French technique, Indian-ingredient flourishes. Baked by Ishaan Sood & Niharika Bhardwaj._

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run typecheck` | `tsc --noEmit` |

---

## Tech stack

- **Framework** — Next.js 15 (App Router, RSC, React 19), TypeScript 5
- **Styling** — Tailwind CSS v4 (`@theme inline`), locked palette + type scale, no Inter
- **Fonts** — self-hosted variable fonts via `@fontsource-variable` (Fraunces, DM Sans, Caveat, JetBrains Mono) to stay independent of Google Fonts fetches
- **3D** — Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`, all procedural meshes (no GLB assets)
- **Animation** — GSAP (+ ScrollTrigger, Draggable, Inertia), `motion/react` (Framer Motion v12 API), Lenis smooth scroll
- **State** — Zustand + `persist` middleware for the cart
- **Icons** — `@phosphor-icons/react`

---

## Project layout

```
src/
├── app/
│   ├── layout.tsx              – root layout + providers + nav/footer/overlays
│   ├── page.tsx                – / home
│   ├── menu/page.tsx           – /menu
│   ├── story/page.tsx          – /story
│   ├── order/page.tsx          – /order
│   ├── gallery/page.tsx        – /gallery
│   ├── visit/page.tsx          – /visit
│   ├── not-found.tsx           – 404 with 3D croissant
│   └── globals.css             – Tailwind v4 theme + palette + utilities
├── components/
│   ├── layout/                 – Navbar, Footer, Providers, SmoothScroll, ScrollProgress
│   ├── ui/                     – Button, MagneticLink, TextReveal, TiltCard, Marquee, SectionHeading, GrainOverlay
│   ├── three/                  – Canvas wrapper, Lights, FlourParticles, 6 procedural pastries + PastryPreview
│   ├── home/                   – Hero, StoryTeaser, SignatureBakes, ProcessScrolly, VisitTeaser, Testimonials, ContactTeaser
│   ├── menu/                   – CategoryFilter, ProductCard, MenuGrid, SearchPalette, MenuPageClient
│   ├── story/                  – Chapter, DoughMorph, TimelineSVG
│   ├── order/                  – ProductGrid, CartDrawer, CartBadge, CheckoutStub
│   ├── gallery/                – DragGrid, GalleryTileSVG
│   └── visit/                  – ChandigarhMap, LocationPin, HoursTable, ContactForm
├── data/                       – menu.ts, testimonials.ts, processSteps.ts, storyChapters.ts, hours.ts, gallery.ts
├── hooks/                      – useReducedMotion, useMagnetic
├── lib/                        – fonts.ts, gsap.ts, cn.ts
└── stores/                     – cart.ts  (Zustand)
```

---

## Design system (locked in `.impeccable.md`)

### Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--color-cream` | `#F7EFE2` | page surface |
| `--color-linen` | `#EFE6D6` | secondary surface |
| `--color-butter` | `#F9E3B3` | soft accent |
| `--color-honey` | `#E8A345` | highlight / glow |
| `--color-terracotta` | `#C8553D` | primary accent / CTA |
| `--color-sage` | `#7A8471` | savoury / fusion tag |
| `--color-ink` | `#2F1F14` | body text |
| `--color-espresso` | `#1A0F08` | contrast panels / dark sections |

### Type

- **Display**: Fraunces Variable (warm serif, optical sizing on)
- **Body**: DM Sans Variable (geometric sans)
- **Script**: Caveat Variable (handwritten moments, signature stamps)
- **Mono**: JetBrains Mono Variable (prices, addresses, timecodes)

### Banned (per `design-taste-frontend`)

- No Inter / Roboto / Poppins / system default
- No purple–indigo gradient; no dark-mode toggle by default
- No `h-screen` (use `min-h-[100dvh]`)
- No stock photos of smiling chefs; no generic "our story"
- No generic names — only realistic Chandigarh personas and dishes
- No animating layout properties; only `transform` + `opacity`

---

## Pages & motion recipes

### `/` Home
Seven sections in order:

1. **Hero** — kinetic text reveal, 3D layered cake (procedural, auto-tilt, dripping glaze), drifting flour particles
2. **StoryTeaser** — kinetic marquee pair running opposite directions on scroll
3. **SignatureBakes** — horizontal scroll-hijack with 6 R3F pastry cards
4. **ProcessScrolly** — pinned 5-stage scrollytelling with a morphing SVG `DoughMorph`
5. **VisitTeaser** — stylized Chandigarh grid with a self-drawing route and pulsing pin
6. **Testimonials** — 3D coverflow carousel with snap + motion-animated quotes
7. **ContactTeaser** — kinetic CTA with a magnetic button

### `/menu`
Zustand-less client: `CategoryFilter` with `layoutId` morphing pills, masonry `MenuGrid` with `AnimatePresence` layout transitions, `ProductCard` with tilt + mini R3F canvas, `⌘K` / `/` `SearchPalette`.

### `/story`
Six pinned chapters with text reveals + `DoughMorph` shape tween. `TimelineSVG` draws itself on scroll.

### `/order`
Reuses the menu grid wired to the Zustand cart. `CartDrawer` (right-side slide, spring physics), badge with count bump in the nav, `CheckoutStub` with form and success toast.

### `/gallery`
`DragGrid` — GSAP `Draggable` + Inertia, 20 tiles (mix of Picsum placeholders and procedural SVG illustrations), RGB-glitch hover, lightbox with `layoutId` shared-element transition.

### `/visit`
Stylized Chandigarh SVG map with self-drawing route to SCO 114, `LocationPin` ripple, `HoursTable` with staggered reveal and today-highlight, 3-column info cards, OpenStreetMap embed, full `ContactForm` with inline validation and success morph.

### `/` 404
Giant spinning 3D croissant + editorial messaging + dual CTAs.

---

## Motion & accessibility

- `prefers-reduced-motion` is respected in every component that animates: `useReducedMotion()` hook + CSS media query. When reduced, 3D auto-rotation, scroll-hijacks, kinetic reveals, Lenis, drag-grid inertia, shape tweens, and ripple pulses all fall back to static layout.
- Focus states use a solid terracotta outline; active pill uses `layoutId` with a spring.
- Lenis smooth scroll is disabled under reduced motion.
- The R3F `Canvas` wrapper clamps DPR to `[1, 1.8]` and suspends on mount; procedural geometries and single-light rigs keep frame cost low.
- All hot zones (`<Canvas>`, marquees, drag grid) clean up via `gsap.context()` / `ScrollTrigger.refresh()` on unmount.

---

## Skills referenced (from `.cursor/skills/`)

Design direction, coding standards, and motion choices in this project draw from the following installed skills:

- `impeccable` — senior review + taste guardrails
- `design-taste-frontend` — banned patterns, editorial typography, anti-AI-slop rules
- `typeui-cafe` + `typeui-artistic` — blended into the "Chandigarh Cafe Boutique" aesthetic
- `canvas-design`, `layout`, `typeset`, `colorize` — layout & type rhythm
- `animate`, `delight`, `polish`, `overdrive` — interaction and motion craft
- `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins` — scroll-hijacks, pinned scenes, drag + inertia
- `scrollytelling` — the process & story sections
- `r3f-best-practices`, `three-best-practices` — procedural pastries, canvas setup, DPR clamp, cleanup
- `frontend-design`, `algorithmic-art`, `adapt`, `distill`, `clarify` — information architecture and micro-copy
- `webapp-testing`, `audit`, `harden`, `optimize` — readiness & performance gates

Each skill's `SKILL.md` lives under `.cursor/skills/<slug>/` and was loaded automatically by Cursor while this project was built.

---

## Content notes

- Menu (`src/data/menu.ts`) — 18 items with fusion detail (`Kesar-pista croissant`, `Masala chai babka`, `Ras malai tart`, etc.), pricing in ₹ between 120 and 980.
- Testimonials (`src/data/testimonials.ts`) — real-feeling Chandigarh personas (e.g. _Ishita D., Panchkula_).
- Story (`src/data/storyChapters.ts`) — Ishaan Sood & Niharika Bhardwaj narrative across six chapters.
- Hours (`src/data/hours.ts`) — closed Mondays, late bakes Fri/Sat till 11 pm.
- Address lives only in `src/data/hours.ts`; update there to propagate across Navbar, Footer, VisitTeaser, and /visit.

---

## Known notes

- **Fonts**: Google Fonts is intentionally not used. Fonts are bundled via `@fontsource-variable/*` packages to survive corporate proxy / self-signed-cert environments.
- **Images**: gallery photos are placeholders from `picsum.photos` (allowed via `next.config.mjs` remote patterns) — swap in real photography in `src/data/gallery.ts`.
- **Checkout**: `/order` is a stub. No payment integration.
