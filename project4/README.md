# Task-4-Manasvi_shrivastava

# WildTrek 🏔️

### Wilderness Expeditions Booking — Form Design & Advanced Client-Side Validation

> **Project 4** >
> A high-fidelity, accessible, and responsive form interface built to demonstrate mastery over client-side data parsing, validation lifecycle management, and assistive UX patterns.

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
* [Form Architecture Sections](https://www.google.com/search?q=%23form-architecture-sections)
* [Key Core Validation Concepts Used](https://www.google.com/search?q=%23key-core-validation-concepts-used)

---

## Overview

WildTrek is a **Wilderness Expedition Booking** portal engineered as Project 4 of the DecodeLabs Frontend Development track. The primary objective of this project is to implement an advanced, foolproof asynchronous client-side validation system that completely eliminates invalid web payloads, manages complex business rules in real time, and ensures a seamless experience for users with assistive technologies.

The application adopts an **Editorial/Raw Expedition Journal** aesthetic with hand-tailored vector background layouts. Behind the interface lies a strict data parsing core managing RegEx inspection matrices, dynamic cryptographic strength evaluation, text field limits, and native ARIA relationships.

---

## Project Requirements

As defined in the Project 4 brief:

| Requirement | Status |
| --- | --- |
| Complete Client-Side HTML Form Shielding | ✅ |
| Asynchronous Event-Driven Real-Time Validation | ✅ |
| Complete Cross-Field Dependency Check Rules | ✅ |
| Strict RegEx Evaluation Ecosystem | ✅ |
| Interactive Password Strength Meter Mechanics | ✅ |
| Live Interactive Characters Sub-System Counter | ✅ |
| Explicit Target Field Visibility Overrides | ✅ |
| Native Screen-Reader Coordination via ARIA Tethers | ✅ |
| Multi-Breakpoint Matrix Responsiveness | ✅ |

---

## File Structure

```text
wildtrek-booking/
│
├── index.html       # Structural layouts, entry components, and semantic forms
├── style.css        # Typography, editorial tokens, visual status flags, and layouts
└── script.js        # Form validation pipelines, regex cores, and state management

```

---

## Features

* **The Submit Shield (`preventDefault`)** — Blocks the browser's default payload delivery actions, preventing unnecessary page reloads and ensuring absolute state persistence.
* **Real-Time Blur & Recover Validation** — Evaluates data constraints when a user shifts focus away from a field (`blur`) to avoid spamming screen readers. It transitions immediately to active input listening once an error state is flagged, clearing visual errors the moment the user inputs valid data.
* **Cryptographic Strength Meter** — Dynamically updates a multi-tiered strength visualization bar and live descriptive text array as users type, using a score metric based on uppercase, lowercase, numerical, and special symbol criteria.
* **Cross-Field Validation Synchronization** — Implements validation links across distinct interface components, re-evaluating field dependencies (like password confirmation fields) on the fly whenever the master password input is updated.
* **Accessibility Infrastructure Integration** — Tethers entry elements natively to screen-reader frameworks using `aria-required`, `aria-describedby`, and active `aria-invalid` property alterations.
* **Dynamic Context Constraint Adjustments** — Leverages modular execution routines to automatically map functional range bounds (such as minimum and maximum historical timeline boundaries) directly onto native date selection frames.
* **Editorial Design Elements** — Uses an asymmetric grid layout built with modular CSS Flexbox and Grid. This is accented by custom grain overlays, interactive background blobs, fluid fonts (`clamp()`), custom selection arrow matrices, and unique checkboxes.

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Structural landmarks, accessibility descriptors, & semantic input tags |
| CSS3 | Core design system token sets, editorial treatments, & animation states |
| JavaScript (ES6+) | Form lifecycle handling, data validation cores, & responsive UI layers |
| RegExp | High-performance textual structural constraint inspection engines |
| CSS Grid | Asymmetric layout grid tracking |
| Flexbox | Micro-component block configuration |
| Google Fonts | Bebas Neue, DM Serif Display, and Epilogue configuration |

---

## Responsive Breakpoints

The design uses liquid styling logic by default, applying progressive multi-column structural expansions across key display thresholds:

| Breakpoint | Width | Changes |
| --- | --- | --- |
| **Mobile** (base) | 0px+ | Single-column form row layouts, block-stacked side indicators, full-width fluid fields. |
| **Tablet** | `min-width: 768px` | Core form entry grids expand to standard dual-column configurations. |
| **Desktop** | `min-width: 1024px` | The layout transitions to an advanced asymmetric side-by-side grid, making the informational hero panel sticky. |

---

## Implementation Checklist

Directly maps to the **Project 4 Implementation Checklist** from the training kit:

* [x] **Submission Shield:** Complete containment of page reloads using execution interruption locks.
* [x] **RegEx Verification:** Exact evaluation rules applied across names, structural emails, and mobile formats.
* [x] **UX Timing Integrity:** Initial field checking isolated to user exit markers to preserve screen-reader focus flow.
* [x] **ARIA Lifecycle Mapping:** Automatic tracking of structural error shifts via programmatic accessibility bindings.
* [x] **Cross-Component Evaluation:** Interlinked field synchronization routines to verify duplicate entry constraints.
* [x] **Dynamic Context Boundaries:** Live range configurations injected at runtime to enforce selection window rules.

---

## How to Run

No compilation workflows, build-tool steps, or third-party packages required.

**Option 1 — Direct Local Invocation:**

```text
Double-click index.html

```

**Option 2 — Development Server Execution (Recommended):**

Using VS Code Live Server:

1. Load the active code directory inside VS Code.
2. Click the **"Go Live"** anchor switch in the lower-right status bar.

Using Python:

```bash
python -m http.server 8000

```

Using Node.js:

```bash
npx serve .

```

---

## Form Architecture Sections

| Component Panel | Architectural Role & Elements |
| --- | --- |
| **Informational Hub (Left Aside)** | Displays project contextual tokens, typographic titles, custom vector perks, and dynamic descriptive category chips. |
| **Data Processing Core (Right Card)** | Houses the form processing card, status banners, field elements, and validation blocks. |
| **Sub-Components** | Modular layouts for name/email tracking, phone inputs, future date calculations, select wrappers, password meters, live character counters, and semantic checkbox toggles. |

---

## Key Core Validation Concepts Used

### 1. Form Submission Interruption Shield

```javascript
form.addEventListener('submit', function (event) {
  event.preventDefault();  // Stops browser navigation and keeps JS memory state intact
  validateForm();          // Triggers master application validation processing
});

```

### 2. Dual-Phase Asynchronous Field Verification

```javascript
// Phase A: Evaluates validation states when a user shifts focus away from an element
fields.fullname.addEventListener('blur', validateFullname);

// Phase B: Monitors active input updates to instantly drop errors once the criteria are met
fields.fullname.addEventListener('input', function () {
  if (this.classList.contains('is-error')) validateFullname();
});

```

### 3. Native Form Group Coordination via ARIA Bindings

```html
<input
  type="text"
  id="fullname"
  aria-required="true"
  aria-describedby="fullname-error"
  aria-invalid="false"
/>
<span id="fullname-error" class="error-msg" role="alert" aria-live="polite"></span>

```

### 4. Mathematical Regular Expression Parsing

```javascript
const PATTERNS = {
  // Enforces valid, structured character spacing boundaries
  fullname: /^[A-Za-z\s'-]{2,60}$/,
  // Standardizes semantic syntax checking across entry parameters
  email:    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  // Restricts phone updates to standard Indian mobile network specifications
  phone:    /^[6-9]\d{9}$/
};

```

---
