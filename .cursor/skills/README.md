# Sweet-Escape Skill Library

A project-level library of 38 design, 3D, animation, and quality-control skills for building a premium **Next.js + React Three Fiber** bakery website. All skills live under `.cursor/skills/` and are auto-discovered by Cursor on launch — no installation needed.

## Quick map

| Group | Skills | Auto-fires when… |
|---|---|---|
| **Foundation** | `frontend-design`, `design-taste-frontend`, `impeccable` (+ 7 reference docs) | You ask to build any UI, page, component, or "make this look better" |
| **3D** | `three-best-practices`, `r3f-best-practices` | You mention 3D, models, GLTF, shaders, `<Canvas>`, useFrame, drei |
| **Motion** | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `scrollytelling` | You mention scroll-driven, parallax, timeline, "as you scroll" |
| **Creative** | `algorithmic-art`, `canvas-design` | You ask for generative patterns, illustrations, posters, or background art |
| **Quality** | `webapp-testing` | You mention testing, Playwright, screenshots, regression |
| **Themes** (TypeUI) | `typeui-cafe`, `typeui-paper`, `typeui-artistic`, `typeui-claymorphism`, `typeui-perspective`, `typeui-glassmorphism`, `typeui-neumorphism`, `typeui-neobrutalism`, `typeui-bold` | You request that aesthetic by name, OR the agent picks one to commit to a direction |
| **Impeccable commands** (16) | `audit`, `polish`, `animate`, `bolder`, `quieter`, `delight`, `overdrive`, `critique`, `distill`, `clarify`, `optimize`, `harden`, `colorize`, `adapt`, `typeset`, `layout` | You explicitly invoke `/audit`, `/polish`, `/animate`, etc. — also auto-fire on relevant phrases |

## Example prompts → skills that fire

### "Build a hero with a 3D cake that rotates as I scroll"
- `r3f-best-practices` (Canvas setup, useFrame, drei `<Float>`, GLTF loading)
- `gsap-scrolltrigger` (scroll-linked rotation, scrub)
- `typeui-cafe` (warm palette, soft shadows for the surrounding UI)
- `frontend-design` + `design-taste-frontend` (typography, anti-AI-slop guardrails)

### "The menu page should feel like a vintage handwritten recipe card"
- `typeui-paper` (paper-textured tokens, serif/handwritten typography)
- `frontend-design` (commit to bold direction)
- `algorithmic-art` *(optional — for generated flour-dust background pattern)*

### "Make our cakes look soft and tactile, like fondant"
- `typeui-claymorphism` (puffy 3D shapes, soft shadows)
- `r3f-best-practices` (if real 3D models needed)
- `frontend-design`

### "Build a scroll-story showing the croissant baking process: dough → fold → bake → done"
- `scrollytelling` (the 5-stage technique selection: graphic-sequence vs moviescroller)
- `gsap-scrolltrigger` + `gsap-timeline` (pinning, scrub, sequencing)
- `r3f-best-practices` *(if 3D scene per stage)*
- `typeui-cafe` (ambient palette)

### "Run /polish on the checkout page"
- `polish` (impeccable's final-pass checklist)
- `audit` (auto-recommended after polish if issues found)

### "Audit the whole site for accessibility and AI slop"
- `audit` → produces P0–P3 scored report → recommends specific other commands to run

### "Make this hero feel like Airbnb but warmer"
- `frontend-design` reads `.cursor/design-inspiration/airbnb.DESIGN.md` for tokens/hierarchy
- `typeui-cafe` overlays warmth-specific tokens
- `bolder` *(optional — if hero feels timid)*

## Layered architecture

```
        ┌──────────────────────────────────────────┐
        │  YOUR PROMPT                             │
        └────────────────┬─────────────────────────┘
                         │
        ┌────────────────▼─────────────────────────┐
        │  Foundation                               │
        │  frontend-design + design-taste-frontend │
        │  + impeccable (7 reference docs)         │
        │  → enforces typography, palette,         │
        │    no-AI-slop, accessibility             │
        └────────────────┬─────────────────────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
    ┌─────────────┐ ┌──────────┐ ┌──────────┐
    │ TypeUI      │ │ 3D Stack │ │ Motion   │
    │ themes      │ │ Three.js │ │ GSAP +   │
    │ (cafe,      │ │ + R3F    │ │ scrolly  │
    │  paper, …)  │ │          │ │          │
    └─────────────┘ └──────────┘ └──────────┘
                         │
        ┌────────────────▼─────────────────────────┐
        │  Creative Tools                          │
        │  algorithmic-art (p5.js generative)      │
        │  canvas-design   (composed PDFs/PNGs)    │
        └────────────────┬─────────────────────────┘
                         │
        ┌────────────────▼─────────────────────────┐
        │  Quality Loop                            │
        │  /audit → /polish → /critique → /harden  │
        │  webapp-testing (Playwright)             │
        └──────────────────────────────────────────┘
```

## Reference material (not skills)

- [`.cursor/design-inspiration/`](../design-inspiration/README.md) — 5 hand-picked DESIGN.md files (Airbnb, Apple, Vercel, Linear, Stripe). Reference these by name in your prompts.

## Notes

- All skill files were fetched once and committed locally; no runtime network calls.
- TypeUI theme skill names are prefixed `typeui-` to avoid colliding with future skills.
- `normalize` was deprecated upstream and folded into `polish`; `teach` / `craft` / `extract` are subcommands of the `impeccable` skill itself (call `impeccable teach`, etc.).
- To enable skills in Cursor: Settings → Beta → switch to Nightly channel, then Settings → Rules → enable Agent Skills.

## Recommended first runs

When you're ready to start the bakery build:

1. `impeccable teach` — capture the bakery's brand context (voice, audience, tone) into `.impeccable.md`
2. *"Scaffold a Next.js 15 app with Tailwind and React Three Fiber"* — bootstrap the stack
3. *"Build a homepage hero with a hand-painted feel and a slowly rotating 3D layered cake"* — first real build
4. `audit` after the first page lands → fix anything red → `polish` to ship
