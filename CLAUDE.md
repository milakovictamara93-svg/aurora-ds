# Scaler Design System Website

## Project Goal
Build a polished, navigable design system documentation website for Scaler Global. This is an internal + team-facing reference site — think Linear Docs or Vercel Design System in quality and feel.

## Source Files
All content comes from these two files. Read them fully before writing any code:
- `design-system-skill.md` — All tokens, components, patterns, QA rules (primary source)
- `scaler-brand-identity.md` — Brand voice, logo usage, color naming, design language rules

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS with custom design tokens
- **Font:** Manrope (load from Google Fonts)
- **Icons:** Hero Icons (primary), Lucide (secondary)
- **Deployment-ready for:** Vercel (free tier)

## Site Structure

### 1. Landing Page `/`
- Hero section: "Scaler Design System" — bold, minimal, on-brand
- Live color palette preview (all token swatches with hex values, copyable on click)
- Typography scale demo (rendered at real sizes using Manrope)
- Component highlight strip (3–4 key components as live previews)
- Quick navigation cards to each section

### 2. Foundations `/foundations`
Subpages:
- `/foundations/colors` — All color tokens with swatches, hex codes, WCAG contrast badges, usage rules. Group by: Brand (Sky, Emerald), Primary (Blue), Neutrals (Grey), ESG Aspects (Energy/GHG/Water/Certifications/Engagement/ESG Risk/Waste), Semantic (Error/Warning/Success/AI)
- `/foundations/typography` — Full type scale rendered live. Show size, weight, line-height, letter-spacing for each style
- `/foundations/spacing` — Visual spacing scale (4px base unit), grid system, breakpoints
- `/foundations/icons` — Icon library browser for Hero Icons + Lucide, with size variants (16/20/24/32/48px)
- `/foundations/borders-shadows` — Border radius values (2/4/6/8/12/16px), shadow levels

### 3. Components `/components`
Each component page must show:
- Live rendered preview
- All variants (primary/secondary/tertiary)
- All sizes
- All states (default/hover/active/disabled/error/loading)
- Copy-ready code snippet

Components to build:
- `/components/buttons` — 3 variants × 3 sizes × all states
- `/components/inputs` — Text, email, number; with label, helper text, error state, focus ring
- `/components/cards` — Flat and elevated; with header/body/footer structure
- `/components/tables` — With sticky header, sortable columns, hover/selected row states, empty state
- `/components/modals` — Small/medium/large; with overlay
- `/components/toasts` — Success/error/warning/info variants; with auto-dismiss demo
- `/components/badges-tags` — All semantic color variants
- `/components/navigation` — Top nav + sidebar nav patterns

### 4. Patterns `/patterns`
- `/patterns/esg-data` — How to display Energy/GHG/Water/Waste/Certifications data with correct aspect colors
- `/patterns/data-visualization` — Chart color usage, axis labels, empty states for charts
- `/patterns/empty-states` — Templates for no-data, error, loading states
- `/patterns/loading-states` — Skeleton screens, button spinners, progress indicators
- `/patterns/brand-voice` — UX writing rules, capitalization, button label guidelines, error message patterns
- `/patterns/accessibility` — WCAG rules, keyboard nav, focus indicators, contrast checker

## Design Tokens (implement as CSS variables)

### Primary
```css
--brand-blue-600: #1258F8;
```

### Greys
```css
--grey-0: #FFFFFF;
--grey-50: #F7F8F8;
--grey-100: #EDEEF1;
--grey-200: #D7DAE0;
--grey-600: #505867;
--grey-900: #1F2430;
--grey-950: #111827;
```

### Semantic
```css
--color-error: #F87171;
--color-warning: #FB7D3C;
--color-success: #22C55E;
--color-ai: #653FFF;
```

## Design Rules (strictly follow these)

**Typography**
- Font: Manrope only
- H1: 28px, H2: 24px, H3: 20px — all at 140% line-height
- Body: 16px minimum, 145% line-height, 1.5% letter-spacing
- NO all caps, NO italics, NO underlines for emphasis — bold only
- Sentence case everywhere in UI

**Spacing**
- Base unit: 4px — all spacing must be multiples of 4
- Component padding: 8/12/16/24px
- Section gaps: 24/32/40px
- Card padding: 24px

**Border radius**
- UI components: 4px (inputs, badges)
- Cards: 6–8px
- Never use arbitrary values

**Colors**
- Primary actions/buttons: Blue 600 (#1258F8)
- Body text: Grey 600 (#505867)
- Backgrounds: Grey 50 (#F7F8F8)
- ESG aspect colors: Always use the designated spectrum per category

**Icons**
- Default: 24px, outline style, Hero Icons
- Button icons: 20px
- Inline text icons: 16px
- Icon-to-text gap: 8px

## Navigation Structure
- Sticky top nav with Scaler logo (text-based if no SVG available) + section links
- Left sidebar within each section for subpage navigation
- Breadcrumbs on all subpages
- "Copy hex" / "Copy token" buttons on color swatches
- Dark mode toggle (implement from day one — use CSS variables throughout)

## Figma Integration
The Figma design system file is at:
https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system

Use the Figma MCP to:
1. Pull component screenshots for the component preview pages
2. Extract any design tokens not already in this file
3. Verify visual accuracy of rendered components

## Quality Checklist (run before considering any section complete)
- [ ] All colors match tokens exactly — no approximations
- [ ] Font is Manrope throughout
- [ ] All spacing uses 4px multiples
- [ ] Border radius values are from the approved set
- [ ] WCAG contrast ratio 4.5:1 minimum on all text
- [ ] All interactive elements have hover + focus + active states
- [ ] Dark mode works on every page
- [ ] Mobile-responsive (375px breakpoint minimum)
- [ ] Color swatches are copyable (click to copy hex)
- [ ] Code snippets are copyable

## Start Here
1. Read both source files completely
2. Set up the Next.js project with Tailwind + design tokens as CSS variables
3. Build the Landing page first — this sets the visual tone for everything else
4. Then Foundations/Colors (most referenced section)
5. Then Foundations/Typography
6. Then Components in order: Buttons → Inputs → Cards → rest
7. Run the quality checklist on each section before moving on
