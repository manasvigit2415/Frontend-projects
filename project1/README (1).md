# NEXUS — Tech & Science Magazine
### Static Webpage Design · Project 1 · DecodeLabs Industrial Training Kit · Batch 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [How to Run the Project](#3-how-to-run-the-project)
4. [Page Sections Explained](#4-page-sections-explained)
5. [HTML Architecture](#5-html-architecture)
6. [CSS Architecture](#6-css-architecture)
7. [Design System & Tokens](#7-design-system--tokens)
8. [Layout System](#8-layout-system)
9. [BEM Naming Convention](#9-bem-naming-convention)
10. [Images & Assets Guide](#10-images--assets-guide)
11. [Accessibility (A11Y) Standards](#11-accessibility-a11y-standards)
12. [DecodeLabs Flight Checklist](#12-decodelabs-flight-checklist)
13. [Quality Gate — Validation Steps](#13-quality-gate--validation-steps)
14. [Responsive Design Breakpoints](#14-responsive-design-breakpoints)
15. [Common Mistakes to Avoid](#15-common-mistakes-to-avoid)
16. [Learning Resources](#16-learning-resources)

---

## 1. Project Overview

**Project Name:** NEXUS — Tech & Science Magazine  
**Type:** Static Webpage (HTML + CSS only — no JavaScript)  
**Topic:** Technology & Science editorial magazine  
**Track:** DecodeLabs Frontend Development · Internal Engineering Track: Phase I  

### Goal

Build a clean, readable, and accessible static webpage using only HTML and CSS. This project demonstrates mastery of semantic structure, external stylesheet management, layout systems, and image handling — all foundational skills required before advancing to dynamic, data-driven applications.

### What the Website Covers

NEXUS is a fictional tech and science magazine featuring:

- A hero section with the magazine's identity and top story teasers
- A featured article with image and body text
- A 6-topic category grid (AI, Space, Quantum, Biotech, Climate, Robotics)
- A recent articles section with images, excerpts, and metadata
- A statistics section with data highlights
- A full footer with brand info, navigation, and contact details

---

## 2. Project Structure

```
project-1/
│
├── index.html        ← Main HTML file (semantic structure)
├── master.css        ← Single external stylesheet (all styles live here)
└── README.md         ← This documentation file
```

### The Law: Separation of Concerns

```
index.html  →  STRUCTURE only   (what the content is)
master.css  →  APPEARANCE only  (how the content looks)
```

These two responsibilities must **never be mixed**. No `style=""` attributes exist anywhere in the HTML. This is the core rule of CSS Engineering.

---

## 3. How to Run the Project

### Option A — Open Directly in Browser (Simplest)

1. Download both `index.html` and `master.css` into the **same folder**
2. Double-click `index.html`
3. It opens in your default browser — no server needed

> **Important:** Both files must be in the same directory. If `master.css` is missing or in a different folder, the page will render with no styling (unstyled HTML only).

### Option B — VS Code with Live Server (Recommended for Development)

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension by Ritwick Dey
3. Open the project folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. The browser auto-refreshes every time you save a file

---

## 4. Page Sections Explained

The page follows the blueprint layout from the DecodeLabs PDF: **Header → Hero → Content Sections → Footer**.

### 4.1 Header (`<header>`)

- **Height:** 80px
- **Width:** 100vw (full viewport width)
- **Behavior:** `position: sticky` — stays visible as you scroll
- **Contains:** Logo on the left, main navigation on the right
- **Navigation rule:** Exactly 4 links — under the 5-item maximum (DecodeLabs rule)

```html
<header class="header" id="header-nav">
  <!-- Logo + Nav -->
</header>
```

### 4.2 Hero Section (`<section class="hero">`)

- **Min-height:** 100vh — fills the full screen on load
- **Padding:** 120px top, as per blueprint spec
- **Content width:** 1200px (controlled by `.container`)
- **Layout:** CSS Grid, 2 columns — title block on left, cover story cards on right
- **Contains:** Eyebrow label, `<h1>` title, subtitle, CTA buttons, 3 story preview cards

The `<h1>` lives here. **There is only one `<h1>` on the entire page** — this is the zero point of the document outline hierarchy.

### 4.3 Featured Story (`<section class="featured">`)

- **Layout:** CSS Grid, 2 columns — image on left, article text on right
- **Contains:** One large image in a `<figure>` element, article heading (`<h3>`), two paragraphs of body text, a CTA button
- **Purpose:** Showcases the editor's pick article in an editorial layout

### 4.4 Topics Grid (`<section class="topics">`)

- **Layout:** CSS Grid — `auto-fill`, module width **278px**, gutter **24px**, row margin **60px** (exact blueprint specs)
- **Contains:** 6 `<article>` cards — one per topic category
- **Each card has:** A category icon, `<h3>` heading, description paragraph, and article count

### 4.5 Articles Grid (`<section class="articles">`)

- **Layout:** CSS Grid — same `auto-fill`, 278px module width
- **Contains:** 4 `<article>` cards with images
- **Each card has:** A `<figure>` with `<img>`, category badge, `<h3>` title, excerpt, `<footer>` with `<time>` and read time
- **All images** have explicit `width`, `height`, `alt` text, and `loading="lazy"`

### 4.6 Stats Section (`<section class="stats">`)

- **Layout:** CSS Grid, `auto-fit`, 4 equal columns
- **Contains:** 4 stat cards with a large number and label
- **Purpose:** Data highlights from the science/tech world in 2026

### 4.7 Footer (`<footer>`)

- **Min-height:** 400px (blueprint spec)
- **Layout:** CSS Grid, 3 columns — Brand · Topics Nav · Contact
- **Contains:** Logo, tagline, about text, topic links, contact details (email, website, location)
- **Uses `<address>`** for contact info — correct semantic HTML for contact data

---

## 5. HTML Architecture

### The Semantic DOM — No Div Soup

Every structural element uses the correct semantic HTML5 tag instead of a generic `<div>`.

| Element | Purpose in this project |
|---|---|
| `<header>` | Site-wide navigation and logo |
| `<nav>` | Navigation menus (header and footer) |
| `<main>` | All primary page content |
| `<section>` | Thematic content zones (hero, featured, topics, etc.) |
| `<article>` | Self-contained content cards (topic cards, article cards) |
| `<figure>` | Image containers with captions |
| `<figcaption>` | Descriptive captions under images |
| `<aside>` | Supplementary content (cover story previews in hero) |
| `<footer>` | Site-wide footer with contact and nav |
| `<address>` | Contact information |
| `<time>` | Publication dates with machine-readable `datetime` attribute |

### Document Outline Hierarchy

The heading levels follow a strict staircase — levels are **never skipped**:

```
<h1>  — "Explore the Future of Technology"   (one per page — zero point)
  <h2>  — "Featured Story"
  <h2>  — "Topics We Cover"
    <h3>  — "Artificial Intelligence"         (topic cards)
    <h3>  — "Space Exploration"
    ...
  <h2>  — "Recent Articles"
    <h3>  — Each article card title
  <h2>  — "Science by the Numbers"
  <h2>  — "NEXUS" (footer brand heading)
    <h3>  — "Topics", "Contact"               (footer sub-sections)
```

> **Rule:** Screen readers navigate by jumping between headings. Skipping from `<h2>` to `<h4>` breaks this navigation for visually impaired users.

### Linking the Stylesheet

```html
<head>
  <link rel="stylesheet" href="master.css" />
</head>
```

This single line in `<head>` is the only connection between HTML and CSS. There are no `style=""` attributes and no `<style>` blocks anywhere in the HTML.

---

## 6. CSS Architecture

The `master.css` file is organized into **14 clearly labeled sections**, each with a comment header:

```
── 1.  DESIGN TOKENS        (CSS custom properties — colors, fonts, spacing)
── 2.  RESET & BASE         (universal box-sizing, body defaults, link styles)
── 3.  LAYOUT UTILITY       (.container, .section)
── 4.  TYPOGRAPHY           (.section__title, .section__eyebrow, .section__intro)
── 5.  BUTTONS              (.btn, .btn--primary, .btn--outline, .btn--sm)
── 6.  HEADER               (.header, .header__inner, .nav__list)
── 7.  HERO                 (.hero, .hero__inner, .hero__title, .cover__card)
── 8.  FEATURED STORY       (.featured__layout, .featured__image)
── 9.  ARTICLE CATEGORY     (.article__cat and all modifiers)
── 10. TOPICS GRID          (.topics__grid, .topic-card and modifiers)
── 11. ARTICLES GRID        (.articles__grid, .article-card)
── 12. STATS SECTION        (.stats__grid, .stat-card)
── 13. FOOTER               (.footer, .footer__inner, .footer__contact)
── 14. RESPONSIVE           (@media queries for 900px and 640px)
```

---

## 7. Design System & Tokens

All visual values are defined as **CSS Custom Properties** at the top of `master.css` inside `:root {}`. This means changing a color or font in one place updates the entire website.

### Color Palette

```css
:root {
  --color-bg:          #08090d;   /* Page background — deep dark */
  --color-surface:     #0f111a;   /* Card backgrounds */
  --color-surface-2:   #161924;   /* Code backgrounds */
  --color-border:      #1e2235;   /* All borders */
  --color-accent:      #e63946;   /* Red — primary accent, CTA buttons */
  --color-accent-2:    #4361ee;   /* Blue — links, secondary */
  --color-accent-3:    #06d6a0;   /* Green — biotech/climate */
  --color-gold:        #f4a261;   /* Amber — space/quantum */
  --color-text:        #e8eaf0;   /* Primary body text */
  --color-text-muted:  #7a8099;   /* Secondary / caption text */
  --color-white:       #ffffff;   /* Headings, high-contrast text */
}
```

### Category Colors

Each topic category has its own accent color, applied via BEM modifier classes:

```css
--cat-ai:      #4361ee;   /* Blue */
--cat-space:   #f4a261;   /* Amber */
--cat-quantum: #9b5de5;   /* Purple */
--cat-bio:     #06d6a0;   /* Green */
--cat-climate: #2ec4b6;   /* Teal */
```

### Typography

```css
--font-display: 'Playfair Display', Georgia, serif;   /* Headlines, titles */
--font-body:    'Inter', system-ui, sans-serif;        /* Body text, UI */
--font-mono:    'Space Mono', monospace;               /* Labels, code, eyebrows */
```

### Spacing Scale

```css
--space-xs:  0.25rem;   /*  4px */
--space-sm:  0.5rem;    /*  8px */
--space-md:  1rem;      /* 16px */
--space-lg:  1.5rem;    /* 24px */
--space-xl:  2.5rem;    /* 40px */
--space-2xl: 4rem;      /* 64px */
--space-3xl: 6rem;      /* 96px */
```

Using a spacing scale ensures visual rhythm and consistency. Never use random pixel values — always pick from this scale.

---

## 8. Layout System

The DecodeLabs blueprint specifies exactly which layout tool to use and when:

| Situation | Tool | Reason |
|---|---|---|
| Page-level sections, card grids, image layouts | **CSS Grid** | 2-dimensional — controls both rows and columns |
| Navigation bar, button contents, flex rows | **Flexbox** | 1-dimensional — aligns items in a single axis |

### CSS Grid — Macro Structure Examples

```css
/* Hero: 2-column layout */
.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
}

/* Topics grid: blueprint specs — 278px modules, 24px gutter */
.topics__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(278px, 1fr));
  gap: 24px;
  row-gap: 60px;
}

/* Footer: 3-column layout */
.footer__inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: var(--space-2xl);
}
```

### Flexbox — Micro Alignment Examples

```css
/* Header: logo left, nav right */
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Nav: horizontal link row */
.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

/* Hero CTA buttons: side by side */
.hero__actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}
```

---

## 9. BEM Naming Convention

BEM stands for **Block — Element — Modifier**. It is the naming system used for all CSS classes in this project. It enforces the DRY principle — define a component once, reuse it everywhere.

### Structure

```
.block                  ← The standalone component
.block__element         ← A part of the block (double underscore)
.block--modifier        ← A variation of the block (double dash)
.block__element--modifier  ← A variation of an element
```

### Examples from this project

```css
/* Block */
.article-card { }

/* Elements */
.article-card__image  { }   /* The image part */
.article-card__body   { }   /* The text part */
.article-card__title  { }   /* The heading */
.article-card__meta   { }   /* Date/read time row */

/* Block — reused button component */
.btn            { }          /* Base button — shared styles */
.btn--primary   { }          /* Modifier: red filled */
.btn--outline   { }          /* Modifier: transparent with border */
.btn--sm        { }          /* Modifier: smaller size */

/* Category badge — same element, different modifiers */
.article__cat            { }   /* Base badge */
.article__cat--ai        { }   /* Blue */
.article__cat--space     { }   /* Amber */
.article__cat--quantum   { }   /* Purple */
```

### Why BEM?

Without BEM, styling tends to become:

```css
/* Bad — not reusable, breaks easily */
.content div h3 { color: white; }

/* Good — explicit, portable, maintainable */
.article-card__title { color: var(--color-white); }
```

---

## 10. Images & Assets Guide

Every image in this project follows the **Assets as Data Objects** rule from the blueprint.

### Required Attributes on Every `<img>`

```html
<img
  src="photo.webp"
  alt="Descriptive text explaining what the image shows"
  width="560"
  height="320"
  loading="lazy"
/>
```

| Attribute | Why it's required |
|---|---|
| `src` | The image file path or URL |
| `alt` | Accessibility — screen readers read this. Also used by search engines. Empty `alt=""` only for decorative images |
| `width` | Prevents Cumulative Layout Shift (CLS) — browser reserves space before image loads |
| `height` | Same as above — both dimensions required together |
| `loading="lazy"` | Performance — images only download when they enter the viewport |

### Recommended Image Formats (Priority Order)

```
AVIF   →  Best compression, HDR support  (use where supported)
WebP   →  Universal fallback             (most common choice)
JPEG   →  Legacy safety net              (always works)
PNG    →  For graphics with transparency
```

### Using `<picture>` for Format Switching

For production projects, use `<picture>` to serve the best format each browser supports:

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" width="800" height="500" loading="lazy" />
</picture>
```

### Wrapping Images in `<figure>`

When an image has a caption, always use `<figure>` + `<figcaption>`:

```html
<figure class="article-card__image">
  <img src="photo.webp" alt="..." width="560" height="320" loading="lazy" />
  <figcaption class="gallery__caption">Caption text here</figcaption>
</figure>
```

---

## 11. Accessibility (A11Y) Standards

Accessibility is non-negotiable. The web must be perceivable by all users, including those using screen readers, keyboard-only navigation, or low-vision assistive tools.

### Standards Applied in This Project

#### Alt Text on All Images
Every `<img>` has a descriptive `alt` attribute. The description explains the **content and context** of the image, not just its appearance.

```html
<!-- Bad alt text -->
<img alt="image" />
<img alt="photo" />

<!-- Good alt text -->
<img alt="A glowing quantum computer chip with blue and gold circuit patterns in a dark lab" />
```

#### ARIA Labels on Navigation
Every `<nav>` element has an `aria-label` to distinguish it for screen readers:

```html
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>
```

#### Section Labelling with `aria-labelledby`
Every `<section>` is linked to its heading via `aria-labelledby`:

```html
<section aria-labelledby="topics-heading">
  <h2 id="topics-heading">Topics We Cover</h2>
  ...
</section>
```

#### Keyboard Focus Styles
All interactive elements show a visible focus ring when navigated via keyboard (Tab key):

```css
a:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius);
}
```

#### Color Contrast
All text colors meet or exceed the **WCAG AA minimum contrast ratio of 4.5:1** against their backgrounds.

#### Semantic `<time>` for Dates
Article publication dates use the `<time>` element with a machine-readable `datetime` attribute:

```html
<time datetime="2026-04-12" class="meta__date">Apr 12, 2026</time>
```

---

## 12. DecodeLabs Flight Checklist

This project passes all 6 quality gates from the PDF:

| # | Gate | Requirement | Status |
|---|---|---|---|
| 1 | **IA** | Logical sitemap defined before coding | ✅ |
| 2 | **HTML** | Semantic tags only. One `<h1>`. No div soup | ✅ |
| 3 | **CSS** | External `master.css` only. DRY. No IDs for styling | ✅ |
| 4 | **LAYOUT** | CSS Grid for macro page. Flexbox for micro components | ✅ |
| 5 | **ASSETS** | All images have `alt`, `width`, `height`, `loading="lazy"` | ✅ |
| 6 | **VALIDATION** | Ready to pass W3C Validator and Lighthouse Audit | ✅ |

---

## 13. Quality Gate — Validation Steps

Before submitting or deploying, run these three audits:

### Step 1 — W3C HTML Validation
**Tool:** [validator.w3.org](https://validator.w3.org)  
**Goal:** Zero errors, zero warnings  
**How:** Paste the URL or upload `index.html` directly  

Common errors to check for:
- Missing `alt` attributes on images
- Duplicate `id` attributes
- Skipped heading levels
- Unclosed tags

### Step 2 — W3C CSS Validation
**Tool:** [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)  
**Goal:** Zero errors in `master.css`  
**How:** Upload the CSS file or paste the URL  

### Step 3 — Lighthouse Audit
**Tool:** Chrome DevTools → Lighthouse tab  
**Goal:** Score 90+ in all four categories  

| Category | What it checks |
|---|---|
| **Performance** | Page load speed, image optimization, CLS |
| **Accessibility** | A11Y compliance, contrast, ARIA labels |
| **Best Practices** | HTTPS, valid HTML, no deprecated APIs |
| **SEO** | Meta tags, heading structure, crawlability |

**How to run:**
1. Open `index.html` in Chrome
2. Press `F12` → Lighthouse tab
3. Click **Analyze page load**

### Step 4 — Semantic Audit (Manual)
1. Open DevTools → Elements panel
2. Search for `style=` → **should return zero results**
3. Check the heading hierarchy is correct (h1 → h2 → h3, never skipped)
4. Verify `<header>`, `<main>`, `<footer>`, `<nav>` landmarks are present

---

## 14. Responsive Design Breakpoints

The page adapts to all screen sizes using `@media` queries at the bottom of `master.css`.

```css
/* Tablet — 900px and below */
@media (max-width: 900px) {
  .hero__inner          { grid-template-columns: 1fr; }     /* Stack hero columns */
  .featured__layout     { grid-template-columns: 1fr; }     /* Stack featured layout */
  .footer__inner        { grid-template-columns: 1fr 1fr; } /* 2-col footer */
}

/* Mobile — 640px and below */
@media (max-width: 640px) {
  .topics__grid         { grid-template-columns: 1fr; }     /* Single column */
  .articles__grid       { grid-template-columns: 1fr; }     /* Single column */
  .stats__grid          { grid-template-columns: 1fr 1fr; } /* 2 stats per row */
  .footer__inner        { grid-template-columns: 1fr; }     /* Single column */
}
```

### Fluid Typography with `clamp()`

Headlines resize fluidly between screen sizes without media queries:

```css
.hero__title {
  font-size: clamp(3.2rem, 8vw, 6rem);
  /* Min: 3.2rem | Fluid: 8% of viewport width | Max: 6rem */
}

.section__title {
  font-size: clamp(2rem, 4.5vw, 3rem);
}
```

---

## 15. Common Mistakes to Avoid

These are the most frequent errors beginners make — all avoided in this project:

### ❌ Inline Styles
```html
<!-- WRONG — violates Separation of Concerns -->
<h1 style="color: red; font-size: 48px;">Title</h1>

<!-- CORRECT — use a class in master.css -->
<h1 class="hero__title">Title</h1>
```

### ❌ Using IDs for Styling
```css
/* WRONG — IDs have high specificity and break DRY */
#hero-title { color: white; }

/* CORRECT — use classes only */
.hero__title { color: var(--color-white); }
```

### ❌ Skipping Heading Levels
```html
<!-- WRONG — jumps from h2 to h4 -->
<h2>Section</h2>
  <h4>Subsection</h4>

<!-- CORRECT — h3 follows h2 -->
<h2>Section</h2>
  <h3>Subsection</h3>
```

### ❌ Images Without Alt Text
```html
<!-- WRONG — screen readers can't describe this -->
<img src="photo.jpg" />

<!-- CORRECT -->
<img src="photo.jpg" alt="Astronaut floating above Earth during a spacewalk" width="560" height="320" loading="lazy" />
```

### ❌ Div Soup
```html
<!-- WRONG — no semantic meaning -->
<div class="nav-wrapper">
  <div class="nav-inner">
    <div class="nav-link">Home</div>
  </div>
</div>

<!-- CORRECT — semantic and accessible -->
<nav aria-label="Main navigation">
  <ul class="nav__list">
    <li class="nav__item"><a href="#" class="nav__link">Home</a></li>
  </ul>
</nav>
```

### ❌ Multiple `<h1>` Tags
```html
<!-- WRONG — only one zero point per page -->
<h1>Main Title</h1>
<h1>Another Section</h1>

<!-- CORRECT — second heading becomes h2 -->
<h1>Main Title</h1>
<h2>Another Section</h2>
```

### ❌ Using Tables or Floats for Layout
```css
/* WRONG — tables are for tabular data, not page structure */
.layout { display: table; }
.column { float: left; }

/* CORRECT — use Grid for 2D, Flexbox for 1D */
.layout { display: grid; grid-template-columns: 1fr 1fr; }
```

---

## 16. Learning Resources

### Semantic HTML
- [MDN: HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [W3C HTML Validator](https://validator.w3.org/)

### CSS Fundamentals
- [MDN: CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [CSS Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### BEM Methodology
- [BEM Official Documentation](https://en.bem.info/methodology/)
- [CSS Tricks: BEM 101](https://css-tricks.com/bem-101/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Performance & Audit
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Project Info

| Field | Detail |
|---|---|
| **Project** | Project 1 — Static Webpage Design |
| **Training Program** | DecodeLabs Industrial Training Kit, Batch 2026 |
| **Track** | Frontend Development — Internal Engineering Track: Phase I |
| **Technologies** | HTML5, CSS3 (no JavaScript, no frameworks) |
| **Fonts** | Playfair Display · Inter · Space Mono (Google Fonts) |


---

