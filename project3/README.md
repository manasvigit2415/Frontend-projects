# Task-3-Manasvi_shrivastava

# COSMOS 🌌

### Science Quiz — High-Performance Responsive Web Layout

> **Project 3**
> A fully responsive web-based science quiz application built strictly following the IPO (Input-Process-Output) Loop architecture.

---

## 📋 Table of Contents

* [Overview](https://www.google.com/search?q=%23overview)
* [Project Requirements](https://www.google.com/search?q=%23project-requirements)
* [File Structure](https://www.google.com/search?q=%23file-structure)
* [Features](https://www.google.com/search?q=%23features)
* [Tech Stack](https://www.google.com/search?q=%23tech-stack)
* [Responsive Breakpoints](https://www.google.com/search?q=%23responsive-breakpoints)
* [Implementation Checklist](https://www.google.com/search?q=%23implementation-checklist)
* [How to Run](https://www.google.com/search?q=%23how-to-run)
* [Screens](https://www.google.com/search?q=%23screens)
* [Key Core Concepts Used](https://www.google.com/search?q=%23key-core-concepts-used)

---

## Overview

COSMOS is an interactive **Science Quiz** application built as Project 3 of the DecodeLabs Frontend Development training programme. The application demonstrates high-performance web engineering by strictly adhering to a clean unidirectional state machine workflow: processing events into internal states and reflecting changes exclusively through optimized DOM modifications.

The site features multiple semantic quiz screens, a custom Fisher-Yates randomization engine, an SVG-driven vector vector countdown timer, live score tracking, and real-time interface themes.

---

## Project Requirements

As defined in the Project 3 brief:

| Requirement | Status |
| --- | --- |
| Use CSS Custom Properties (Theming) | ✅ |
| Separate Script and Style files | ✅ |
| Mobile-First Layout Enhancements | ✅ |
| Strict variable scoping (`const` & `let`) | ✅ |
| Safe DOM Injection via `textContent` | ✅ |
| `js-` Behavioral Hook Selectors | ✅ |
| `is-` Visual State Handles | ✅ |
| Dynamic Node Creation (`createElement`) | ✅ |
| Interactive Form Elements/Toggles | ✅ |
| Zero usage of legacy `var` keyword | ✅ |

---

## File Structure

```
cosmos-quiz/
│
├── index.html       # Semantic page structure and layout screens
├── style.css        # Typography, tokens, themes, and design layouts
└── app.js           # IPO loop, state engine, and event handlers

```

---

## Features

* **IPO (Input-Process-Output) Loop Architecture** — Unidirectional flow where event listeners accept input, functions update state logic, and safe DOM mutations render outputs.
* **State Separation** — DOM tracking handles remain frozen under `const`, while operational metrics use reactive `let` data models.
* **CSS Separation of Concerns** — Script architecture never updates inline layout properties directly; presentation adjustments are offloaded to style layers by toggles.
* **Safe DOM Injection** — Completely avoids `innerHTML` methods for incoming data streams to block cross-site scripting (XSS) risks.
* **Dynamic Fisher-Yates Randomization** — Custom utility engines shuffle category pools, selecting precise 10-question runs dynamically.
* **SVG Vector Countdown Circle** — A continuous 30-second countdown calculation mapping visual time metrics to physical stroke-dash arc offsets.
* **Adaptive Theme Engine** — Instant root tokens swap light or dark color values directly through reactive root document variables.
* **Accessible Design Landmarks** — Integrates semantic HTML5 milestones, `aria-live` announcement updates, and proper interactive aria flags.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic markup layouts & screens |
| CSS3 | Structural styles, states, & animations |
| JavaScript (ES6+) | IPO control loop & state engineering |
| SVG Graphics | Vector timer ring components |
| CSS Grid | Matrix structure definitions |
| Flexbox | Components & content positioning |
| Google Fonts | Syne + JetBrains Mono integration |

---

## Responsive Breakpoints

The site utilizes fluid variables by default, applying structured responsive overrides at specific width changes:

| Breakpoint | Width | Changes |
| --- | --- | --- |
| **Mobile** (base) | 0px+ | Single-column option sets, stacked vertical blocks, compact layouts. |
| **Tablet / Desktop** | `min-width: 640px` | Navigation layouts go inline, options split into custom 2x2 grids, card items expand. |

---

## Implementation Checklist

Directly maps to the **Project 3 Implementation Checklist** from the training kit:

* [x] **State Integrity:** All parameters strictly controlled via `const` or `let`; `var` prohibited.
* [x] **Behavior Isolation:** Distinct segregation using clear `js-` target anchors.
* [x] **Visual Separation:** Presentation configurations triggered via active `is-` identifier updates.
* [x] **Safe Generation:** Runtime structural elements built securely using browser `createElement` steps.
* [x] **Theming Infrastructure:** Core interface options completely linked through root variable sets.

---

## How to Run

No specialized packages, dependencies, or installation frameworks required.

**Option 1 — Open directly via local filesystem:**

```text
Double-click index.html

```

**Option 2 — Local development server (Recommended for consistent performance):**

Using VS Code Live Server:

1. Open the project folder in VS Code.
2. Click the **"Go Live"** panel located on the bottom status rail.

Using Python:

```bash
python -m http.server 8000

```

Using Node.js:

```bash
npx serve .

```

---

## Screens

| Screen | Description |
| --- | --- |
| **Screen 1: Welcome** | Displays orbital components, rules, metadata chips, and category selectors. |
| **Screen 2: Quiz** | Renders live tracking, countdown indicators, safe question content, and interactive choice items. |
| **Screen 3: Results** | Generates final grading indicators, score metrics, dynamic breakdowns, and operation resets. |

---

## Key Core Concepts Used

### The IPO Loop Pattern

```javascript
// INPUT: Event listener registers choice click
btn.addEventListener('click', handleAnswerClick);

// PROCESS: Calculate logic state parameters 
let isCorrect = selectedIndex === correctIndex;

// OUTPUT: Safe target text rendering mutation
feedbackExplanation.textContent = explanation;

```

### Mobile-First Custom Breakpoints

```css
/* Base: Mobile single-column configuration */
.options-grid { grid-template-columns: 1fr; }

/* Responsive grid upgrade for larger displays */
@media (max-width: 640px) {
  /* Retains stacked layout rules below boundary metrics */
}

```

### Dynamic SVG Vector Calculation

```javascript
// Stroke dashoffset mappings calculate remaining arcs via script
const circumference = 138; // 2π × r (r=22)
const offset = circumference - (timeLeft / 30) * circumference;
timerCircle.style.strokeDashoffset = offset;

```

### Interface Theming with Variable Tokens

```css
/* Custom properties enable universal visual re-mapping at root */
body.theme-light {
  --bg:         #f0f2fa;
  --surface:    #ffffff;
  --text:       #1a1d35;
}

```

---
