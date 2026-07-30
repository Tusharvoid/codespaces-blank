# Plan: De-slop the Ellora Tours site — proper light theme redesign

## Context
The current build looks like textbook AI slop. Every section follows the same pattern:
`UPPERCASE LABEL → H2 → body text → 3-equal-column amber card grid`. The entire palette is just `amber-X` at varying opacities stacked on white — no real visual identity, no personality, no craft. The rounded-2xl white cards with amber-200 borders are among the most generic components on the internet right now. The user is right to be frustrated.

**Root problems to fix:**
1. Every section has the same layout rhythm — the reader's eye never has reason to stop
2. "Amber everything" — zero colour variety, every element competes equally for attention
3. Cards feel assembled, not designed — same radius, same shadow, same border, everywhere
4. Sections alternate white ↔ amber-50 — the most boring possible treatment
5. Hero is the standard "photo + dark gradient + centered h1 + search bar" — zero originality
6. The stats strip is just "4 numbers on amber-500" — a placeholder, not a design decision
7. Inputs, labels, and secondary text all use the same amber opacity stack — visual mud

---

## Approach: Editorial travel magazine aesthetic

A proper premium Indian travel site. Think **Condé Nast Traveller India** meeting a boutique Aurangabad agency — warm, rich, confident.

### Palette (2 colours, not 12 shades of one)
- **Page ground:** Warm cream `#FDFAF3`
- **Primary brand:** Rich saffron amber `#D4820A` — used sparingly (CTAs, prices, active states only)
- **Secondary:** Deep forest green `#1B4332` — section backgrounds, footer, contrast surfaces
- **Text:** Near-black brown `#1A1108`
- **Card:** Pure white with very subtle `rgba(0,0,0,0.06)` shadow — no amber borders on cards
- **Border (structural):** `#E8E0D0` — warm stone, not amber

### Typography — be more expressive
- Keep Playfair Display + Nunito Sans pairing
- Headings need to be **bigger and bolder** — 5xl–6xl on desktop sections, not just 3xl
- Mix italic Playfair with regular weight for tension
- Drop the `UPPERCASE LABEL → H2` pattern from 5 of the 7 sections

### Layout — break the grid
- **Home hero:** Split canvas — left 55% is the Kashmir photo, right 45% is a deep green panel with headline + CTA. Not centered.
- **Tour cards:** Editorial mix — first card is a wide horizontal hero card spanning 2 columns, rest are vertical portrait cards (masonry-ish)
- **Why Choose Us:** A large left-aligned stat callout (`15+ years`) with editorial copy — not 3 equal icon cards
- **Fixed Departures:** Clean list with a left accent line — not a full table with headers
- **Testimonials:** One large featured quote, two smaller ones below — not 3 equal cards
- **Services strip:** A horizontal scrolling row of pill tags — not a 6-column grid of icon boxes

### Key component changes
- **Nav:** Logo left, nav right — remove the Book Now button from nav (feels salesy). Use text links only. On scroll: add a bottom border in amber.
- **Tour cards:** Full-bleed image (no top badge cluttering), destination text overlaid at bottom with gradient. Price moved to a clean tag bottom-right inside the card.
- **Footer:** Deep green `#1B4332` with cream text — rich, grounded, not dark-amber-900 which looks like a burnt mess.
- **Stats:** Not a colored bar. A full-width section with 4 large numbers in dark green left half, and an Ellora cave image filling the right half.
- **Hero CTA button:** Saffron amber on dark panel — this is the ONLY place primary amber appears above the fold.

---

## Files to modify

| File | Changes |
|---|---|
| `src/styles/theme.css` | Update `--background`, `--primary`, `--card`, `--border`, `--secondary`, `--muted-foreground` tokens |
| `src/styles/fonts.css` | No change to fonts, possibly add font-display: swap hint |
| `src/app/App.tsx` | Full redesign of all page components and shared design tokens |

### Token updates (theme.css)
```css
--background: #fdfaf3;
--foreground: #1a1108;
--card: #ffffff;
--card-foreground: #1a1108;
--primary: #d4820a;
--primary-foreground: #ffffff;
--secondary: #1b4332;
--secondary-foreground: #fdfaf3;
--muted: #f4ede0;
--muted-foreground: #7a6248;
--border: #e8e0d0;
--radius: 0.5rem;
```

### Shared design token constants (App.tsx, replacing the `card`, `cardHover`, etc.)
```ts
const card = "bg-white shadow-[0_1px_6px_rgba(0,0,0,0.07)]";
const section = "max-w-7xl mx-auto px-4 sm:px-6";
const serif = { fontFamily: "'Playfair Display', serif" };
```

No amber borders on cards. Shadow only — cleaner, less cluttered.

---

## Section-by-section layout plan

### Navbar
- White bg / transparent on hero
- Logo: "ET" in saffron circle, name in forest green `text-[#1b4332]`
- Nav links: dark brown, hover underline in amber (not bg pill)
- Right: single "Plan Your Trip →" text link only — no pill button
- On scroll: 1px bottom border `#e8e0d0`, white bg

### Hero (split canvas, NOT centered)
```
[photo, left 55%] | [deep green panel, right 45%]
                    Explore
                    Happiness
                    —
                    15 years · 50 destinations
                    [amber CTA button]
                    [search bar, white on green]
```
On mobile: stacks (photo top, green panel below)

### Stats — image + numbers
```
[Ellora cave photo, left 40%] | [cream bg, right 60%]
                                  15+     10,000+
                                  Years   Travellers
                                  50+     500+
                                  Destinations  Tours
```
No colored bar. Feels premium.

### Featured Tours — editorial grid
- Row 1: 1 wide card (spans 2 cols, horizontal layout — image left, text right)
- Row 2: 3 portrait cards
- Row 3: 2 portrait cards
- NOT a uniform 3-column grid

### Why Choose Us — editorial copy, not icon cards
Large left-column headline: *"We have been doing this since 2009."* Right column: 3 short paragraphs with a thin amber left-border rule. No icon boxes.

### Fixed Departures — minimal list
Each departure: destination name (bold), date and duration inline, seats badge, price right-aligned. Left accent = a 2px amber vertical bar. Clean, typographic — not a heavy table.

### Testimonials — asymmetric
Featured quote fills 60% width with large quotation mark glyph, author below. Two smaller quotes stack on the right 40%.

### Services — pill row
Horizontal flex-wrap of `border border-[#e8e0d0] rounded-full px-4 py-2` pills. Each has a small icon inline. Feels like tags, not a grid of boxes.

### Footer — deep green
Background: `#1b4332`. Text: cream `#fdfaf3`. Link hover: amber `#d4820a`. Clean column layout. No rounded containers inside the footer.

---

## Verification
- Preview all 6 pages (Home, Tours, Tour Detail, Services, About, Contact)
- Check that amber only appears on: CTA buttons, price text, active nav state, departure accent bars, and the brand logo circle
- Confirm no section uses the same layout as an adjacent section
- Confirm cards have no amber borders
- Mobile check: hero split collapses correctly, nav hamburger works
