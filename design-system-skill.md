---
name: design-system
description: Scaler Design System
---

# Scaler Design System

Comprehensive design system documentation for Scaler's ESG data collection and analytics platform. This document serves as the single source of truth for design decisions, component specifications, and implementation guidelines.

---

## 1. Foundations

### 1.1 Color System

#### Brand Colors

**Sky (Primary Brand)**
- 50: #EEF8FF
- 100: #D9EFFF
- 200: #BCE4FF
- 300: #8ED5FF
- 400: #59BBFF
- 500: #2295FF (Base)
- 600: #1B7EF5
- 700: #1467E1
- 800: #1752B6
- 900: #19488F
- 950: #142C57

**Emerald (Secondary Brand)**
- 50: #E9FFF7
- 100: #CBFFEA
- 200: #9BFFDA
- 300: #43F9C2 (Base)
- 400: #1BECB4
- 500: #00D39E
- 600: #00AC82
- 700: #008A6C
- 800: #006D56
- 900: #005948
- 950: #00332A

#### Primary Colors

**Blue (Primary Interactions)**
- 50: #EEF6FF
- 100: #D9EAFF
- 200: #BBDAFF
- 300: #8CC4FF
- 400: #56A3FF
- 500: #2F7DFF
- 600: #1258F8 (Base)
- 700: #1146E4
- 800: #143AB9
- 900: #173691
- 950: #132258

#### Neutral Colors

**Grey (UI Structure)**
- 0: #FFFFFF (White)
- 50: #F7F8F8 (Background)
- 100: #EDEEF1
- 200: #D7DAE0
- 300: #B4BAC5
- 400: #8C96A4
- 500: #6D788A
- 600: #505867 (Dark Grey)
- 700: #484F5C
- 800: #3E434E
- 900: #1F2430
- 950: #111827 (Black)

#### ESG Aspect Colors

**Energy (Red spectrum)**
- 50: #FFF0F1
- 100: #FFE2E4
- 200: #FFCACF
- 300: #FF9FA8
- 400: #FF697A
- 500: #FF455F (Base)
- 600: #ED113A
- 700: #C80831
- 800: #A80930
- 900: #8F0C30
- 950: #500115

**GHG (Orange spectrum)**
- 50: #FFF7EB
- 100: #FFEAC6
- 200: #FFD188
- 300: #FFB246 (Base)
- 400: #FF9820
- 500: #F97307
- 600: #DD4F02
- 700: #B73306
- 800: #94260C
- 900: #7A210D
- 950: #460E02

**Water (Cyan spectrum)**
- 50: #ECFEFF
- 100: #CFFBFE
- 200: #A5F5FC
- 300: #67EBF9
- 400: #1FD7EE (Base)
- 500: #06BAD4
- 600: #0895B2
- 700: #0E7790
- 800: #156075
- 900: #165063
- 950: #083444

**Certifications (Blue spectrum)**
- 50: #F1F6FD
- 100: #DFEAFA
- 200: #C5DAF8
- 300: #9EC3F2
- 400: #70A2EA
- 500: #4E81E3 (Base)
- 600: #3964D7
- 700: #2F4FC0
- 800: #2D43A0
- 900: #293B7F
- 950: #1D264E

**Tenant Engagement (Orange spectrum)**
- 50: #FEF8EE
- 100: #FDF0D7
- 200: #FBDDAD
- 300: #F8C479
- 400: #F4A043 (Base)
- 500: #F1841E
- 600: #D76513
- 700: #BB5113
- 800: #954017
- 900: #783616
- 950: #411909

**ESG Risk (Green spectrum)**
- 50: #ECFDF5
- 100: #D0FBE5
- 200: #A6F4D0
- 300: #6CE9B7
- 400: #39D79D
- 500: #0DBC82 (Base)
- 600: #03986A
- 700: #027A58
- 800: #056047
- 900: #054F3C
- 950: #012D22

**Waste (Teal spectrum)**
- 50: #F1F8F5
- 100: #DEEDE4
- 200: #BEDCCD
- 300: #93C2AD
- 400: #65A289 (Base)
- 500: #44856C
- 600: #2F6451
- 700: #285446
- 800: #214438
- 900: #1C3830
- 950: #0F1F1A

#### Semantic Colors

**Error/Destructive (Red)**
- 50: #FEF2F2
- 100: #FEE2E2
- 200: #FECACA
- 300: #FCA5A5
- 400: #F87171 (Base)
- 500: #EF4444
- 600: #DC2626
- 700: #B91C1C
- 800: #991B1B
- 900: #7F1D1D
- 950: #450A0A

**Warning (Orange)**
- 50: #FFF3ED
- 100: #FFE3D5
- 200: #FEC7AA
- 300: #FDA374
- 400: #FB7D3C (Base)
- 500: #F96416
- 600: #EA580C
- 700: #C24A0C
- 800: #9A4112
- 900: #7C3612
- 950: #431C07

**Missing Info (Yellow)**
- 50: #FEF9E8
- 100: #FEF0C3
- 200: #FFEAA8
- 300: #FDD147
- 400: #FAC215 (Base)
- 500: #EAB308
- 600: #CA9A04
- 700: #A17C07
- 800: #85680E
- 900: #715A12
- 950: #423306

**Success (Green)**
- 50: #F0FDF5
- 100: #DCFCE8
- 200: #BBF7D1
- 300: #86EFAD
- 400: #4ADE81
- 500: #22C55E (Base)
- 600: #16A34A
- 700: #15803C
- 800: #166533
- 900: #14532B
- 950: #052E14

**AI Features (Purple)**
- 50: #F4F2FF
- 100: #EAE8FF
- 200: #D6D4FF
- 300: #BAB1FF
- 400: #9785FF
- 500: #653FFF (Base)
- 600: #6430F7
- 700: #561EE3
- 800: #4718BF
- 900: #3C169C
- 950: #230B6A

#### Color Usage Rules

**Accessibility Requirements:**
- Normal text (below 18pt): Minimum contrast ratio 4.5:1
- Large text (18pt+ or 14pt+ bold): Minimum contrast ratio 3:1
- Use WCAG AAA standards where possible

**Color Application:**
- Sky 500: Primary actions, links, focus states
- Blue 600: Primary buttons (base state)
- Grey 600: Dark grey for body text on light backgrounds
- Grey 50: Light backgrounds, subtle surfaces
- Emerald 300: Success states, positive indicators
- Aspect colors: Data visualization, category-specific components
- Semantic colors: System feedback (errors, warnings, success)

**Contrast Validation:**
All color swatches show WCAG AAA/AA compliance badges indicating which text colors meet accessibility standards on each background.

---

### 1.2 Typography

#### Font Family
- Primary: **Manrope** (for all UI and content)
- Fallback: system-ui, -apple-system, sans-serif

#### Type Scale

**Headings**

**H1 (Display)**
- Size: 28px
- Line Height: 140% (39.2px)
- Letter Spacing: 0%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), SemiBold (600), Bold (700)

**H2 (Section Heading)**
- Size: 24px
- Line Height: 140% (33.6px)
- Letter Spacing: 0%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), SemiBold (600), Bold (700)

**H3 (Subsection Heading)**
- Size: 20px
- Line Height: 140% (28px)
- Letter Spacing: 0%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), SemiBold (600), Bold (700)

**Paragraphs/Body Text**

**Paragraph XLarge**
- Size: 21px
- Line Height: 145% (30.45px)
- Letter Spacing: 1.5%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

**Paragraph Large**
- Size: 18px
- Line Height: 145% (26.1px)
- Letter Spacing: 1.5%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

**Paragraph Medium (Default Body)**
- Size: 16px
- Line Height: 145% (23.2px)
- Letter Spacing: 1.5%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

**Paragraph Small**
- Size: 14px
- Line Height: 145% (20.3px)
- Letter Spacing: 1.5%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

**Paragraph XSmall**
- Size: 12px
- Line Height: 145% (17.4px)
- Letter Spacing: 1.5%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

**Paragraph Caption**
- Size: 14px, 12px, 10px
- Line Height: 120% (varies)
- Letter Spacing: 16%
- Paragraph Spacing: 0px
- Weight: Regular (400), Medium (500), Bold (700)

#### Typography Usage Guidelines

**Minimum Font Size:**
- Body text minimum: 16px for readability
- Smaller sizes (14px, 12px) only for secondary/meta information

**Text Alignment:**
- Left-aligned for most body content to improve readability
- Center-aligned for headers only when appropriate

**Line Spacing:**
- Predefined to 1.5x (145% for body, 140% for headings)
- Improves readability for users with dyslexia or visual impairments

**Formatting Restrictions:**
- Avoid All Caps (reduces readability)
- Avoid Italics and Underlines (use sparingly, prefer bold for emphasis)

**Capitalization Rules:**
- Navigation (side nav, top nav, tabs): Title Casing
- Titles, descriptions, body text: Sentence casing
- CTAs (buttons): Sentence casing
- Avoid acronyms unless relevant certifications (e.g., NABERS)

---

### 1.3 Spacing System

**Base Unit:** 4px

**Spacing Scale:**
- 4px (1 unit)
- 8px (2 units)
- 12px (3 units)
- 16px (4 units)
- 20px (5 units)
- 24px (6 units)
- 32px (8 units)
- 40px (10 units)
- 48px (12 units)
- 64px (16 units)
- 80px (20 units)
- 96px (24 units)

**Usage:**
- Component internal spacing: 8px, 12px, 16px
- Section spacing: 24px, 32px
- Page layout spacing: 40px, 48px, 64px
- Large breakpoints: 80px, 96px

---

### 1.4 Layout & Grid

**Container Max-Widths:**
- Desktop: 1440px
- Tablet: 1024px
- Mobile: 375px minimum

**Grid System:**
- 12-column grid
- Gutter: 24px (desktop), 16px (tablet/mobile)
- Margin: 24px (desktop), 16px (mobile)

**Breakpoints:**
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Wide Desktop: 1440px+

---

### 1.5 Border Radius

**Standard Values:**
- 2px: Small elements (tags, badges)
- 4px: Inputs, small buttons
- 6px: Cards, medium components
- 8px: Large buttons, panels
- 12px: Modal containers
- 16px: Large cards, feature sections

---

### 1.6 Elevation (Shadows)

**Shadow Scale:**
- Level 1 (Subtle): 0 1px 2px rgba(0,0,0,0.05)
- Level 2 (Low): 0 2px 4px rgba(0,0,0,0.08)
- Level 3 (Medium): 0 4px 8px rgba(0,0,0,0.12)
- Level 4 (High): 0 8px 16px rgba(0,0,0,0.16)
- Level 5 (Modal): 0 16px 32px rgba(0,0,0,0.20)

**Usage:**
- Level 1: Hover states, subtle depth
- Level 2: Cards, dropdowns
- Level 3: Floating elements, tooltips
- Level 4: Sticky elements, important overlays
- Level 5: Modals, critical dialogs

---

### 1.7 Icons

#### Icon Libraries

**Primary Libraries:**

**Hero Icons**
- Library: https://heroicons.com/
- Styles: Outline (24x24), Solid (20x20), Mini (16x16)
- Usage: Primary icon library for UI elements
- Figma: https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system?node-id=41-9621

**Lucide Icons**
- Library: https://lucide.dev/icons/
- Style: Outline only
- Size: 24x24 (default), scalable
- Usage: Secondary library, fills gaps not covered by Hero Icons
- Figma: https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system?node-id=2017-44377

**Custom Icons**
- Location: Figma - https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system?node-id=42-13267
- Usage: Brand-specific icons, ESG-specific symbols not available in standard libraries
- Style: Match Hero Icons outline style for consistency

#### Icon Sizes

**Standard Sizes:**
- 16px (Mini): Inline with text, compact UI
- 20px (Small): Buttons, form inputs, tight spaces
- 24px (Base): Default size, most common usage
- 32px (Large): Headers, empty states, prominent actions
- 48px (XLarge): Marketing, landing pages, feature callouts

**Implementation:**
```tsx
// Hero Icons - Outline (24x24)
import { CheckIcon } from '@heroicons/react/24/outline'

// Hero Icons - Solid (20x20)
import { CheckIcon } from '@heroicons/react/20/solid'

// Hero Icons - Mini (16x16)
import { CheckIcon } from '@heroicons/react/16/solid'

// Lucide Icons
import { Check } from 'lucide-react'
```

#### Icon Colors

**Default Colors:**
- Primary actions: `--brand-sky-500` (#2295FF)
- Secondary/neutral: `--primitive-grey-600` (#505867)
- Success: `--primitive-green-500` (#22C55E)
- Error: `--primitive-red-400` (#F87171)
- Warning: `--primitive-orange-400` (#FB7D3C)
- Disabled: `--primitive-grey-400` (#8C96A4) at 50% opacity

**Inherit from parent:**
Most icons should inherit color from their parent element for flexibility.

#### Usage Guidelines

**Library Selection:**
1. **Check Hero Icons first** - Primary library, most comprehensive
2. **Use Lucide if not in Hero** - Good alternative with similar style
3. **Create custom icon only if neither has it** - Maintain consistency

**Icon Style Consistency:**
- Use Outline style by default (cleaner, lighter visual weight)
- Use Solid style for:
  - Active/selected states
  - High-emphasis actions
  - Badges and indicators
- Use Mini (16px) style only when space is extremely limited

**Accessibility:**
- Always provide aria-label for icon-only buttons
- Don't rely on color alone to convey meaning
- Pair with text labels when possible
- Use appropriate aria-hidden="true" for decorative icons

**Spacing:**
- Leading icon: 8px gap from text
- Trailing icon: 8px gap from text
- Icon-only buttons: 8px padding around icon

#### Common Icon Patterns

**Buttons:**
- Leading icon: Enhance action clarity (e.g., + icon before "Add")
- Trailing icon: Indicate dropdown, external link, or next step
- Icon-only: Use 20px or 24px with appropriate padding

**Form Inputs:**
- Leading icon: Indicate input type (search, email, lock)
- Trailing icon: Actions (clear, show/hide password, calendar picker)
- Size: 20px inside input field

**Navigation:**
- Side nav: 24px icons (collapsed state)
- Top nav: 24px icons
- Breadcrumbs: 16px chevron separators

**Status Indicators:**
- Success: CheckCircle (solid, green)
- Error: XCircle (solid, red)
- Warning: ExclamationTriangle (solid, orange)
- Info: InformationCircle (outline, blue)

**Data Tables:**
- Sort indicators: ChevronUp/Down (16px)
- Actions menu: EllipsisVertical (20px)
- Row actions: 20px icons (edit, delete, etc.)

#### Custom Icon Guidelines

**When to Create Custom:**
- ESG-specific concepts not in standard libraries
- Brand-unique elements
- Data visualization symbols

**Design Specifications:**
- Match Hero Icons outline style (2px stroke weight)
- 24x24px artboard with 20x20px visible content (2px padding)
- Align to pixel grid
- Use consistent stroke caps (rounded)
- Export as SVG, optimize for web

**Naming Convention:**
- Descriptive, lowercase with hyphens
- Example: `energy-meter`, `ghg-emissions`, `water-usage`

#### Icon QA Checklist

**Visual:**
- âœ“ Correct size (16px, 20px, 24px, 32px, 48px)
- âœ“ Proper stroke weight (2px for outlines)
- âœ“ Aligned to pixel grid (no blurry edges)
- âœ“ Consistent style (outline vs solid usage)
- âœ“ Appropriate color (matches context)

**Technical:**
- âœ“ SVG optimized (remove unnecessary markup)
- âœ“ Proper import path
- âœ“ Correct icon component used (Hero vs Lucide)
- âœ“ Aria-label present (if icon-only)
- âœ“ currentColor used (inherits text color)

**Accessibility:**
- âœ“ Text alternative provided for icon-only buttons
- âœ“ Decorative icons marked aria-hidden="true"
- âœ“ Sufficient contrast (3:1 minimum for UI icons)
- âœ“ Touch target size (44x44px minimum for interactive icons)

---

## 2. Components

### Component Library Overview

All components follow these principles:
- Accessible by default (WCAG AA minimum)
- Responsive across breakpoints
- Support light theme (dark theme TBD)
- Consistent spacing using 4px base unit
- Clear interaction states (default, hover, active, disabled, error, focus)

### 2.1 Accordion
**Purpose:** Expandable/collapsible content sections
**States:** Collapsed, Expanded
**Variants:** Single open, Multiple open allowed
**Accessibility:** Keyboard navigable, ARIA expanded states

### 2.2 Banner
**Purpose:** System-wide notifications, announcements
**Types:** Info, Warning, Error, Success
**Placement:** Top of page or section
**Dismissible:** Optional close button

### 2.3 Breadcrumbs
**Purpose:** Navigation hierarchy, current location
**Format:** Home > Section > Current Page
**Interaction:** Links to parent pages
**Max Depth:** 4 levels recommended

### 2.4 Button
**Variants:**
- Primary (Sky 500 background, white text)
- Secondary (Grey outline, Grey 600 text)
- Tertiary (Text only, no background)
- Destructive (Red 600 background)

**Sizes:**
- Small: 32px height, 12px padding
- Medium: 40px height, 16px padding
- Large: 48px height, 20px padding

**States:**
- Default
- Hover (darker shade)
- Active (pressed state)
- Disabled (50% opacity, no pointer)
- Focus (blue outline ring)
- Loading (spinner + disabled state)

**Icon Support:**
- Leading icon
- Trailing icon
- Icon only

### 2.5 Button Group
**Purpose:** Related actions grouped together
**Layout:** Horizontal or vertical
**Variants:**
- Attached (no gap)
- Separated (8px gap)
- Segmented control (radio behavior)

### 2.6 Card
**Purpose:** Content container, grouping related information
**Structure:**
- Header (optional)
- Body (required)
- Footer (optional)
- Actions (optional)

**Variants:**
- Flat (no shadow)
- Elevated (Level 2 shadow)
- Interactive (hover state)

**Spacing:**
- Internal padding: 16px (small), 24px (medium), 32px (large)

### 2.7 Controls
**Components:**
- Checkbox
- Radio button
- Toggle/Switch
- Slider

**States:** Default, Hover, Active, Disabled, Error, Focus
**Labels:** Always paired with descriptive text
**Error States:** Red border + error message below

### 2.8 Data Points
**Purpose:** Display key metrics, statistics
**Structure:**
- Label (descriptive text)
- Value (large, prominent)
- Change indicator (optional, % or absolute)
- Trend visualization (optional sparkline)

**Color Coding:**
- Positive: Success green
- Negative: Error red
- Neutral: Grey

### 2.9 Date Selector
**Types:**
- Single date picker
- Date range picker
- Month/Year selector

**Format:** YYYY-MM-DD (ISO 8601)
**Interaction:** Calendar popup, keyboard input
**Validation:** Real-time validation, error states

### 2.10 Dropdown
**Purpose:** Select from list of options
**Variants:**
- Single select
- Multi-select (with checkboxes)
- Searchable (with filter input)
- Grouped options

**States:**
- Closed (default)
- Open (expanded list)
- Selected (highlighted option)
- Disabled
- Error (red border)

**Max Height:** 240px (scrollable if more options)

### 2.11 Indicator
**Purpose:** Status display, notification badges
**Types:**
- Dot (small, color-coded)
- Badge (with count)
- Status label (text + color)

**Colors:**
- Success: Green
- Warning: Orange/Yellow
- Error: Red
- Info: Blue
- Neutral: Grey

### 2.12 Input Fields
**Types:**
- Text input
- Number input
- Email input
- Password input
- Textarea
- Search input

**Structure:**
- Label (above input)
- Input field
- Helper text (optional, below)
- Error message (replaces helper text)

**States:**
- Default
- Focus (blue border)
- Filled
- Disabled (greyed out)
- Error (red border + message)
- Success (green border)

**Icons:**
- Leading icon (left side)
- Trailing icon (right side, often for clear/visibility toggle)

### 2.13 Tag
**Purpose:** Labels, categories, filters
**Variants:**
- Default (grey)
- Colored (aspect/semantic colors)
- Removable (with X icon)
- Interactive (clickable)

**Sizes:**
- Small: 20px height
- Medium: 24px height
- Large: 28px height

### 2.14 Table
**Structure:**
- Header row (sticky on scroll)
- Data rows
- Optional footer
- Column sorting
- Row selection (checkboxes)

**Features:**
- Sortable columns (asc/desc)
- Filterable
- Pagination controls
- Row actions (hover menu)
- Empty states

**Cell Types:**
- Text
- Number (right-aligned)
- Date
- Status indicator
- Actions (icon buttons)

**Row States:**
- Default
- Hover (light grey background)
- Selected (Sky 50 background)
- Disabled (reduced opacity)

### 2.15 Tabs
**Variants:**
- Line tabs (underline indicator)
- Pill tabs (rounded background)
- Vertical tabs (sidebar)

**Interaction:**
- Click to switch
- Keyboard navigation (arrow keys)
- Active tab indicator

**States:**
- Active (bold, colored)
- Inactive (grey, normal weight)
- Hover (subtle background)
- Disabled (greyed out, no interaction)

### 2.16 Toast
**Purpose:** Temporary notifications, system feedback
**Position:** Top-right corner (default), configurable
**Auto-dismiss:** 3-5 seconds, closeable manually
**Types:**
- Success (green)
- Error (red)
- Warning (orange)
- Info (blue)

**Structure:**
- Icon (type-specific)
- Title (bold)
- Message (optional description)
- Close button

### 2.17 Tooltip
**Purpose:** Additional context on hover
**Trigger:** Hover (desktop), tap (mobile)
**Position:** Auto-calculated (above, below, left, right)
**Max Width:** 240px
**Content:** Short text only (no complex formatting)

### 2.18 Loading States
**Types:**
- Spinner (circular)
- Progress bar (determinate)
- Skeleton screens (content placeholders)
- Shimmer effect (animated)

**Usage:**
- Spinner: Indeterminate loading, button loading states
- Progress: File uploads, multi-step processes
- Skeleton: Page/component loading, preserves layout
- Shimmer: Subtle loading within existing content

### 2.19 Modal
**Purpose:** Focused tasks, confirmations, complex forms
**Sizes:**
- Small: 400px width
- Medium: 600px width
- Large: 800px width
- Full: 90% viewport width

**Structure:**
- Header (title + close button)
- Body (scrollable if needed)
- Footer (actions, typically right-aligned)

**Backdrop:** Semi-transparent grey overlay (blocks interaction)
**Behavior:**
- Escape key closes
- Click outside closes (optional)
- Focus trap (keyboard navigation stays within)

**Variants:**
- Standard modal
- Confirmation dialog (Yes/No)
- Alert (OK only)
- Form modal (with validation)

### 2.20 Navigation
**Types:**
- Top navigation (horizontal)
- Side navigation (vertical, collapsible)
- Tabs (sub-navigation)
- Breadcrumbs (hierarchy)

**Top Nav:**
- Logo (left)
- Primary links (center)
- User menu (right)
- Height: 64px

**Side Nav:**
- Collapsed: 64px width (icons only)
- Expanded: 240px width (icons + labels)
- Sections with dividers
- Active indicator (colored background)

### 2.21 Progress Steps
**Purpose:** Multi-step processes, wizards
**Variants:**
- Horizontal (linear progress)
- Vertical (detailed steps)

**States:**
- Completed (checkmark)
- Active (highlighted)
- Upcoming (greyed)
- Error (red indicator)

**Interaction:**
- Click to jump to completed steps
- Disabled for upcoming steps

### 2.22 Slider
**Purpose:** Numeric input via drag
**Types:**
- Single value
- Range (min/max)

**Features:**
- Tick marks (optional)
- Value label (above thumb)
- Min/Max labels
- Step increments

**Accessibility:**
- Keyboard controls (arrow keys)
- Screen reader value announcements

### 2.23 Skeleton
**Purpose:** Loading placeholder, layout preservation
**Usage:** During initial page load or content updates
**Animation:** Subtle shimmer (left to right)
**Duration:** Until real content loads

**Elements:**
- Text lines (varying widths)
- Circular avatars
- Rectangular blocks (images, cards)

### 2.24 Headers
**Types:**
- Page header (H1 + description + actions)
- Section header (H2 + optional actions)
- Card header (title + optional menu)

**Structure:**
- Title (left)
- Actions (right, button group)
- Description (below title, optional)
- Divider (below header, optional)

---

## 3. Patterns

### 3.1 Drag and Drop
**Use Cases:**
- File uploads
- Reordering lists
- Moving items between containers

**Interaction:**
- Hover state (highlight drop zone)
- Drag preview (semi-transparent copy)
- Drop indicator (line or highlight)

**Feedback:**
- "Drop here" text
- Checkmark on successful drop
- Error message if invalid drop

### 3.2 Toast Notifications
**Timing:**
- Success: 3 seconds
- Info: 4 seconds
- Warning: 5 seconds
- Error: Persistent until dismissed

**Stacking:** Max 3 toasts, queue additional
**Position:** Top-right (default), configurable

### 3.3 Loading States
**Page Load:**
- Skeleton screens for main content
- Preserve layout structure
- Progressive loading (above fold first)

**Action Loading:**
- Button: Spinner + disabled state
- Inline: Small spinner next to content
- Overlay: Semi-transparent with centered spinner

**Empty States:**
- Illustration + message
- Primary action button
- Helper text

### 3.4 Form Patterns
**Structure:**
- Group related fields
- Logical order (top to bottom, left to right)
- Clear section headers

**Validation:**
- Real-time validation (on blur)
- Inline error messages (below field)
- Success indicators (green checkmark)
- Required field indicators (asterisk)

**Actions:**
- Primary action (right, prominent)
- Secondary action (left, less prominent)
- Cancel (least prominent, left-most)

**Error Handling:**
- Scroll to first error
- Focus first error field
- Summarize errors at top (if multiple)

### 3.5 Page Frame
**Structure:**
- Top navigation (fixed)
- Side navigation (fixed or scrollable)
- Main content area (scrollable)
- Optional right sidebar

**Responsive:**
- Mobile: Hamburger menu, collapsible nav
- Tablet: Icons-only side nav
- Desktop: Full expanded nav

### 3.6 Filtering
**Components:**
- Filter chips (active filters)
- Dropdown filters (multi-select)
- Search input
- Date range picker
- Clear all button

**Behavior:**
- Apply filters on selection (real-time)
- Show count of results
- Persist filters in URL (deep linking)
- Save filter presets

### 3.7 Upload Pattern
**Types:**
- Drag and drop zone
- File browser (click to upload)
- Multiple file support

**File Preview:**
- Thumbnail (images)
- Icon + filename (documents)
- Progress indicator (during upload)
- Remove button

**Validation:**
- File type restrictions
- File size limits
- Error messages (inline)

**States:**
- Empty (dashed border, upload icon)
- Hover (highlighted)
- Uploading (progress bar)
- Complete (checkmark, preview)
- Error (red border, error message)

### 3.8 Mini Dashboard
**Purpose:** Quick metrics overview, snapshot view
**Components:**
- Data point cards (2-4 metrics)
- Small charts (sparklines, donuts)
- Status indicators
- Quick actions

**Layout:**
- Grid (2x2 or 3x1)
- Consistent card sizes
- Spacing: 16px gaps

---

## 4. Design Tokens (CSS Variables)

All colors are available as CSS variables:

```css
/* Brand */
--brand-sky-50: #eef8ff;
--brand-sky-500: #2295ff;
--brand-emerald-300: #43f9c2;

/* Primary */
--primitive-blue-600: #1258f8;

/* Neutrals */
--primitive-grey-0: #ffffff;
--primitive-grey-50: #f7f8f8;
--primitive-grey-600: #505867;
--primitive-grey-950: #111827;

/* Semantic */
--primitive-red-400: #f87171; /* Error */
--primitive-orange-400: #fb7d3c; /* Warning */
--primitive-yellow-400: #fac215; /* Missing Info */
--primitive-green-500: #22c55e; /* Success */
--ai-purpe-500: #653fff; /* AI */
```

---

## 5. Accessibility Standards

### 5.1 Color Contrast
- Normal text: 4.5:1 minimum
- Large text (18pt+/14pt bold+): 3:1 minimum
- Target: WCAG AAA where feasible

### 5.2 Keyboard Navigation
- All interactive elements keyboard accessible
- Visible focus indicators (blue ring)
- Logical tab order
- Skip links for main content

### 5.3 Screen Readers
- Semantic HTML (headings, lists, tables)
- ARIA labels where needed
- Alternative text for images
- Status announcements (live regions)

### 5.4 Motion Sensitivity
- Respect prefers-reduced-motion
- Disable animations if user preference set
- Provide static alternatives

---

## 6. Usage Guidelines

### 6.1 When to Use Components

**Buttons vs Links:**
- Button: Actions (submit, save, delete)
- Link: Navigation (go to page)

**Modal vs Toast:**
- Modal: Requires user action, complex content
- Toast: Informational, auto-dismisses

**Dropdown vs Radio:**
- Dropdown: 5+ options, space-constrained
- Radio: 2-4 options, all visible

**Table vs Cards:**
- Table: Data comparison, sorting, filtering
- Cards: Visual content, varying item types

### 6.2 Color Usage

**Brand Colors:**
- Sky: Primary actions, links, focus states
- Emerald: Success, positive indicators

**Aspect Colors:**
- Use consistently per data category
- Energy: Always red spectrum
- GHG: Always orange spectrum
- Water: Always cyan spectrum
- Etc.

**Semantic Colors:**
- Error: Only for errors, destructive actions
- Warning: Cautions, non-critical issues
- Success: Confirmations, completions
- Info: Neutral system messages

### 6.3 Typography Hierarchy

**Page Structure:**
- H1: Page title (one per page)
- H2: Section titles
- H3: Subsections
- Paragraph Medium: Body text default

**Emphasis:**
- Bold: Important information
- Color: Links, interactive text
- Avoid: Italics, underlines, all caps

---

## 7. QA Checklist Rules

### 7.1 Visual Accuracy

**Color Validation:**
- âœ“ Brand colors match tokens exactly (no approximations)
- âœ“ Semantic colors used correctly (error=red, success=green, etc.)
- âœ“ Aspect colors match assigned categories
- âœ“ Contrast ratios meet WCAG standards

**Typography Validation:**
- âœ“ Font: Manrope used throughout
- âœ“ Headings: Correct sizes (28px, 24px, 20px)
- âœ“ Body text: Minimum 16px
- âœ“ Line height: 140% (headings), 145% (body)
- âœ“ Capitalization: Follows rules (Title case for nav, Sentence case for content)

**Spacing Validation:**
- âœ“ All spacing uses 4px base unit (no arbitrary values like 15px, 23px)
- âœ“ Component padding: 8px, 12px, 16px, 24px
- âœ“ Section gaps: 24px, 32px, 40px
- âœ“ Consistent spacing within component types

**Border Radius:**
- âœ“ Standard values only (2px, 4px, 6px, 8px, 12px, 16px)
- âœ“ Consistent per component type

**Icon Validation:**
- âœ“ Correct size (16px, 20px, 24px, 32px, 48px)
- âœ“ Proper library used (Hero Icons primary, Lucide secondary)
- âœ“ Consistent style (outline vs solid)
- âœ“ Correct color/inherits from parent
- âœ“ Proper spacing (8px gap from text)
- âœ“ Pixel-aligned (no blurry edges)
- âœ“ Aria-label present for icon-only buttons

### 7.2 Component Compliance

**Button Validation:**
- âœ“ Correct variant (primary/secondary/tertiary)
- âœ“ Proper size (32px, 40px, 48px heights)
- âœ“ Icon alignment (if present)
- âœ“ Disabled state styling (when applicable)
- âœ“ Loading state implementation

**Input Validation:**
- âœ“ Label present and positioned correctly
- âœ“ Error state shows red border + message
- âœ“ Helper text present (if needed)
- âœ“ Focus state (blue ring)
- âœ“ Proper input type (text/email/number/etc.)

**Card Validation:**
- âœ“ Correct padding (16px, 24px, 32px)
- âœ“ Shadow level appropriate (flat or elevated)
- âœ“ Border radius: 6px or 8px
- âœ“ Structure: Header/body/footer as needed

**Table Validation:**
- âœ“ Header row sticky
- âœ“ Sortable columns indicated
- âœ“ Row hover state (grey background)
- âœ“ Selected row state (sky background)
- âœ“ Proper cell alignment (numbers right-aligned)
- âœ“ Empty state message

### 7.3 Interaction States

**All Interactive Elements:**
- âœ“ Default state
- âœ“ Hover state (visual feedback)
- âœ“ Active/pressed state
- âœ“ Focus state (keyboard navigation indicator)
- âœ“ Disabled state (when applicable)
- âœ“ Error state (when applicable)

### 7.4 Responsive Behavior

**Breakpoint Checks:**
- âœ“ Mobile (375px - 767px): Single column, stacked content
- âœ“ Tablet (768px - 1023px): Appropriate grid, collapsible nav
- âœ“ Desktop (1024px+): Full layout, all features visible
- âœ“ Navigation: Hamburger on mobile, full nav on desktop

**Component Adaptation:**
- âœ“ Tables: Horizontal scroll or card view on mobile
- âœ“ Forms: Full-width inputs on mobile
- âœ“ Buttons: Full-width or appropriately sized
- âœ“ Modals: Full-screen on mobile, centered on desktop

### 7.5 Accessibility Compliance

**Keyboard Navigation:**
- âœ“ All interactive elements keyboard accessible
- âœ“ Tab order logical
- âœ“ Focus indicators visible (blue ring, 2px)
- âœ“ Escape closes modals/dropdowns

**Screen Reader Support:**
- âœ“ Semantic HTML used (headings, lists, tables)
- âœ“ ARIA labels present where needed
- âœ“ Alternative text for images
- âœ“ Form labels properly associated

**Color & Contrast:**
- âœ“ No information conveyed by color alone
- âœ“ Contrast ratios validated (4.5:1 minimum)
- âœ“ Focus indicators meet contrast requirements

### 7.6 Content & Microcopy

**Text Validation:**
- âœ“ Capitalization follows rules
- âœ“ No unnecessary acronyms
- âœ“ Error messages clear and actionable
- âœ“ Helper text present where needed
- âœ“ Button labels descriptive (not just "Submit")

### 7.7 Performance & Loading

**Loading States:**
- âœ“ Skeleton screens for page loads
- âœ“ Button loading spinners for actions
- âœ“ Progress indicators for long operations
- âœ“ Empty states with clear messaging

### 7.8 Edge Cases

**Data Validation:**
- âœ“ Empty states designed and implemented
- âœ“ Error states tested
- âœ“ Long text handling (truncation, wrapping)
- âœ“ Overflow behavior defined
- âœ“ Very long/short content tested

---

## 8. Implementation Notes

### 8.1 CSS Architecture

**Naming Convention:**
- BEM methodology (Block__Element--Modifier)
- Example: `.button`, `.button--primary`, `.button__icon`

**CSS Variables:**
- Use design tokens for all colors, spacing
- Example: `color: var(--brand-sky-500);`

**Utility Classes:**
- Tailwind CSS compatible
- Custom utilities for spacing, typography

### 8.2 Component Development

**File Structure:**
```
/components
  /Button
    Button.tsx
    Button.module.css
    Button.stories.tsx
    Button.test.tsx
```

**Props Pattern:**
- Variant props for visual variations
- Size props for different scales
- State props (disabled, loading, error)
- Event handlers (onClick, onChange, etc.)

**Icon Implementation:**
```tsx
// Import icons
import { CheckIcon } from '@heroicons/react/24/outline'
import { Check } from 'lucide-react'

// Button with icon
<Button variant="primary" icon={<CheckIcon />}>
  Save Changes
</Button>

// Icon sizing
<CheckIcon className="w-5 h-5" /> // 20px
<CheckIcon className="w-6 h-6" /> // 24px
```

### 8.3 Storybook Documentation

**Required Stories:**
- Default state
- All variants
- All sizes
- All states (hover, active, disabled, error)
- With icons (if applicable)
- Responsive behavior

**Story Structure:**
```tsx
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
```

---

## 9. Quick Reference

### Color Quick Picks
- Primary Action: `--brand-sky-500` (#2295FF)
- Body Text: `--primitive-grey-600` (#505867)
- Background: `--primitive-grey-50` (#F7F8F8)
- Error: `--primitive-red-400` (#F87171)
- Success: `--primitive-green-500` (#22C55E)

### Typography Quick Picks
- Page Title: H1, 28px, Bold
- Section Title: H2, 24px, SemiBold
- Body Text: Paragraph Medium, 16px, Regular
- Small Text: Paragraph Small, 14px, Regular

### Spacing Quick Picks
- Component padding: 16px
- Section gap: 32px
- Button height: 40px (medium)
- Input height: 40px
- Card padding: 24px

### Icon Quick Picks
- Default size: 24px (base)
- Button icons: 20px
- Inline text icons: 16px
- Default style: Outline (Hero Icons)
- Primary library: Hero Icons (check first)
- Secondary library: Lucide (if not in Hero)
- Icon-text gap: 8px

### Component Quick Picks
- Primary action: Button (primary variant)
- Form input: Input Field (with label)
- Data display: Card or Table
- Notification: Toast (success/error)
- Confirmation: Modal (small size)

---

## 10. Design System Maintenance

### Version Control
- Document version: 1.0
- Last updated: December 2025
- Breaking changes: None

### Contribution Guidelines
- Propose changes via design review
- Test new components in Storybook
- Update documentation when adding/modifying components
- Validate accessibility before merging

### Future Roadmap
- Dark mode support
- Additional data visualization components
- Enhanced animation library
- Design token automation

---

## 11. Support & Resources

**Figma File:**
https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system

**Icon Libraries:**
- Hero Icons: https://heroicons.com/
- Lucide Icons: https://lucide.dev/icons/
- Custom Icons (Figma): https://www.figma.com/design/7Wh29fsgcz1zbr5ZWIB4Uj/Design-system?node-id=42-13267

**Storybook:**
[Link to Storybook documentation]

**Code Repository:**
[Link to component library repo]

**Contact:**
Nina or Tamara

---

*This design system is a living document and will evolve as the product grows. All changes should be reviewed and approved by the design team before implementation.*