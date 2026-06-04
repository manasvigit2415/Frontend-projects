# WildFrame 🌿
### Nature & Wildlife Photography — Responsive Web Layout

> **DecodeLabs Industrial Training · Batch 2026 · Project 2**  
> A fully responsive, mobile-first webpage built to demonstrate mastery of CSS layout techniques.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Requirements](#project-requirements)
- [File Structure](#file-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Implementation Checklist](#implementation-checklist)
- [How to Run](#how-to-run)
- [Sections](#sections)
- [Key CSS Concepts Used](#key-css-concepts-used)

---

## Overview

WildFrame is a **Nature & Wildlife Photography** showcase website built as Project 2 of the DecodeLabs Frontend Development training programme. The goal of this project is to demonstrate **responsive web design** — a layout that adapts gracefully from mobile phones to large desktop monitors using CSS Media Queries, Flexbox, CSS Grid, and fluid units.

The site features illustrated SVG artwork, a hamburger navigation using the native HTML **Popover API** (no JavaScript required), scroll-reveal animations, and fully accessible touch targets throughout.

---

## Project Requirements

As defined in the Project 2 brief:

| Requirement | Status |
|---|---|
| Use CSS Media Queries | ✅ |
| Responsive Navigation | ✅ |
| Proper Spacing and Alignment | ✅ |
| Mobile-First Base CSS | ✅ |
| CSS Grid (Macro Layout) | ✅ |
| Flexbox (Micro/Components) | ✅ |
| Fluid Units (`%`, `rem`, `vw`, `clamp()`) | ✅ |
| Hamburger / Popover Navigation | ✅ |
| Accessible Touch Targets (min 44×44px) | ✅ |
| Viewport Meta Tag | ✅ |
| Separate CSS File | ✅ |

---

## File Structure

```
wildframe/
│
├── index.html       # Main HTML structure (markup only, no inline styles)
├── style.css        # All styles, variables, and media queries
└── README.md        # Project documentation
```

---

## Features

- **Mobile-First Design** — base styles target small screens; larger layouts are added progressively via `min-width` media queries.
- **Responsive Navigation** — full horizontal nav on desktop; collapses to a hamburger menu on mobile using the HTML Popover API (zero JavaScript).
- **CSS Grid Layouts** — hero mosaic, gallery grid (`repeat(auto-fit, minmax(260px, 1fr))`), featured section, and tips grid all use CSS Grid.
- **Flexbox Components** — navigation bar, CTA buttons, stats strip, card internals, newsletter form, and footer use Flexbox.
- **Fluid Typography** — all font sizes use `clamp(min, fluid, max)` so text scales smoothly between breakpoints without stepping.
- **Fluid Spacing** — padding and gaps use `clamp()` with `vw` units for seamless scaling.
- **SVG Illustrations** — all imagery is hand-crafted inline SVG; no external image files required.
- **Scroll Reveal Animations** — elements fade and slide into view using `IntersectionObserver`.
- **Accessible Touch Targets** — every interactive element meets the WCAG 2.5.5 minimum of 44×44px.
- **WCAG-aware** — semantic HTML5 landmarks (`<nav>`, `<section>`, `<article>`, `<footer>`), `aria-label` attributes, and no `user-scalable=no` restriction.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, layout, animations |
| CSS Grid | Macro page layout |
| Flexbox | Component-level layout |
| CSS Custom Properties | Consistent theming via variables |
| HTML Popover API | Mobile navigation (no JS) |
| JavaScript (minimal) | Scroll-reveal via `IntersectionObserver` |
| Google Fonts | Playfair Display + DM Sans |
| Inline SVG | All illustrations |

---

## Responsive Breakpoints

The site follows a **mobile-first** approach. Styles are written for mobile by default, with enhancements added at each breakpoint:

| Breakpoint | Width | Changes |
|---|---|---|
| **Mobile** (base) | 0px+ | Single-column layout, hamburger nav visible |
| **Tablet** | `min-width: 768px` | Hero splits to 2 columns, featured and tips go 2-column |
| **Desktop** | `min-width: 1024px` | Full nav links shown, hamburger hidden, gallery 3-column, tips 3-column |
| **Large Desktop** | `min-width: 1280px` | Gallery expands to 4 columns, hero content max-width increased |

---

## Implementation Checklist

Directly maps to the **Project 2 Implementation Checklist** from the training kit:

- [x] **Meta Tag:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [x] **Mobile-First Base CSS** — all base rules target mobile; complexity increases with screen size
- [x] **Layout: Grid (Macro) & Flexbox (Micro)** — Grid for sections, Flexbox for components
- [x] **Fluid Units (%, rem, vw)** — `clamp()` used throughout for typography and spacing
- [x] **Hamburger / Popover Navigation** — HTML Popover API with `popovertarget` attribute
- [x] **Accessible Touch Targets & Zoom** — all interactive elements ≥ 44×44px; no zoom restriction

---

## How to Run

No build tools, no dependencies, no installation required.

**Option 1 — Open directly in browser:**
```
Double-click index.html
```

**Option 2 — Local dev server (recommended for accurate behaviour):**

Using VS Code Live Server:
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

Using Python:
```bash
# Python 3
python -m http.server 8000
# Then open http://localhost:8000
```

Using Node.js:
```bash
npx serve .
```

> ⚠️ Opening `index.html` directly via `file://` will work, but a local server is recommended to ensure fonts and relative paths load correctly.

---

## Sections

| Section | Description |
|---|---|
| **Navigation** | Fixed top bar with logo, desktop links, and mobile hamburger/popover |
| **Hero** | Full-height grid with headline, CTA buttons, and illustrated SVG mosaic |
| **Stats Strip** | Four key statistics displayed in a flex row |
| **Gallery** | Six wildlife cards in a responsive auto-fit CSS Grid |
| **Featured** | Two-column editorial layout with quote and essay link |
| **Field Tips** | Six tips in a 1→2→3 column responsive grid |
| **Newsletter** | Email subscription form with accessible input and button |
| **Footer** | Logo, nav links, and copyright in a flex row |

---

## Key CSS Concepts Used

### Mobile-First Media Queries
```css
/* Base: mobile */
.tips-grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .tips-grid { grid-template-columns: 1fr 1fr; }
}

/* Desktop */
@media (min-width: 1024px) {
  .tips-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Fluid Typography with `clamp()`
```css
.hero__title {
  font-size: clamp(2.2rem, 6vw, 4.8rem);
}
```

### CSS Grid with `auto-fit` and `minmax()`
```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(0.75rem, 2vw, 1.25rem);
}
```

### HTML Popover API (No JS Navigation)
```html
<button popovertarget="mobile-menu">☰</button>
<div id="mobile-menu" popover>...</div>
```

### CSS Custom Properties
```css
:root {
  --deep-sage:    #4a6741;
  --gold:         #c49a3c;
  --font-display: 'Playfair Display', Georgia, serif;
}
```

---

## Author

**DecodeLabs Intern — Batch 2026**  
Frontend Development Track  
📍 Greater Lucknow, India  
🌐 [www.decodelabs.tech](https://www.decodelabs.tech)

---

*Built with pure HTML & CSS as part of the DecodeLabs Industrial Training Programme.*
