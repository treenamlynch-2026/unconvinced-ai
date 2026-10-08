# Design — Unconvinced.

Locked design system. Every page reads this before changing visuals. Tokens live in `src/tokens.css`; reference them by name, never inline colour or font values.

## Genre
Editorial, manifesto voice. Warm paper, rust, restrained teal. Weathered-workshop details (paper grain, riveted plate) used sparingly.

## Macrostructure family
- Marketing (Home): **Manifesto**. Ink bleed declaration, short claims, ruled lists, rust block CTA set far down.
- Index (Apps): ruled list rows, one per app. No card grids.
- Content (App detail, About, Contact, cases/museum/lab): single column, display-caps title, ruled section breaks.

## Brand
- Wordmark: "Unconvinced" in Barlow Condensed 800 + rusted square dot (`.uc-dot`, 0.17em, stroke weight).
- Logo plate tagline: "Prove it."
- Hal character art: none finalized in repo. Do not invent or use old poses.

## Theme (OKLCH)
- paper `oklch(95.3% 0.012 80)` · paper-2 `oklch(91.5% 0.018 80)` · ink `oklch(25% 0.01 230)`
- rust (accent) `oklch(48% 0.13 45)` · teal-2 (links, secondary) `oklch(42% 0.07 200)`
- No pure white or black. No gradients except the rust dot and plate metal.

## Typography
- Display: Barlow Condensed 800, roman only, caps for page titles.
- Body: Source Serif 4, 400/600.
- UI (nav, labels, buttons): Barlow 600/700.
- Hand accent: Caveat, max one line per page.

## Chrome
- Nav: N6 newspaper masthead (tagline line, centred wordmark, link row, double rule). Not sticky.
- Footer: Ft5 statement ("We don't trust confidence. We collect evidence.") + wordmark, links, email.

## Rules
- No eyebrow labels. No equal-card feature grids.
- Clickable text never wraps (`white-space: nowrap`).
- `overflow-x: clip` on html/body. Verify at 320/375/414/768px.
- Honest copy only: no invented metrics, testimonials, or results. Play/store links render only when real.
