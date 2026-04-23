# Design Inspiration — DESIGN.md Reference Library

Curated `DESIGN.md` files extracted from real, well-loved product websites. These are **not** auto-applied skills — they exist as reference material the agent (and you) can point to when describing what a section should *feel like*.

## How to Use

When prompting the agent, reference one of these files explicitly:

> *"Build the hero in the warmth of `airbnb.DESIGN.md` but use our cafe palette."*
>
> *"Apply `linear.DESIGN.md`'s sophisticated dark hierarchy to the admin dashboard."*
>
> *"The pricing page should feel like `stripe.DESIGN.md` — gradient-driven and trustworthy."*

The agent will read the referenced file and adopt its tokens, hierarchy, and tone — combined with whichever TypeUI theme skill is active.

## Files in this folder

| File | Vibe | Best for which Sweet-Escape page |
|---|---|---|
| [`airbnb.DESIGN.md`](airbnb.DESIGN.md) | Warm coral, photography-driven, rounded, hospitable | Home hero, "Visit us" location section, cake gallery |
| [`apple.DESIGN.md`](apple.DESIGN.md) | Premium minimal, full-bleed product shots, generous whitespace | Signature-cake landing pages, special-order showcase |
| [`vercel.DESIGN.md`](vercel.DESIGN.md) | Clean monochrome with sharp accents, technical typography | Online-ordering checkout, account/dashboard |
| [`linear.DESIGN.md`](linear.DESIGN.md) | Sophisticated dark-first, dense-but-readable, Inter/Berkeley Mono | Admin / kitchen-side order management |
| [`stripe.DESIGN.md`](stripe.DESIGN.md) | Confident gradient backgrounds, Sohne typography, professional | Pricing tiers, gift-card / catering quote pages |

## Refreshing or adding more

These files were generated with VoltAgent's `getdesign` CLI:

```bash
npx getdesign@latest add <brand-slug>
```

Browse all 68+ available brands at [getdesign.md](https://getdesign.md). After running the command in a temp folder, copy the produced `DESIGN.md` here and rename to `<brand>.DESIGN.md`.

For a custom DESIGN.md from a specific URL (e.g. a competitor bakery), use [design-extractor.com](https://design-extractor.com) and drop the result here.

## Relationship to skills

| `.cursor/design-inspiration/*.DESIGN.md` | `.cursor/skills/typeui-*` |
|---|---|
| Reference material — only used when explicitly cited | Auto-discovered by the agent based on context |
| Describes one specific website's vibe | Describes a generalized aesthetic system (cafe, paper, glassmorphism, etc.) |
| Concrete tokens (Airbnb's exact `#FF385C`) | Abstract design language (warm pastels, soft shadows) |

Use the inspiration files as *prompts* ("make it feel like X") and let the TypeUI skills enforce the *system* (tokens, components, accessibility).
