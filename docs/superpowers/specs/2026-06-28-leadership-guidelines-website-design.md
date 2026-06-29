# Leadership Guidelines — Brochure Website Design Spec
Date: 2026-06-28

## Overview

A single-page brochure website for the four-book *Leadership Guidelines* series by Paul Alfred Elling. The site introduces the series, gives each book its own section, and provides an author profile with contact capability. There are no e-commerce features; readers interested in purchasing email the author directly.

---

## Author & Content

**Author:** Paul Alfred Elling
- MBA in Strategic Leadership
- Senior software engineer (10+ years)
- Grew up in a military family (father served 20 years in the US Navy, retired as Senior Chief Petty Officer)
- Contact: paulelling@yahoo.com

**Books:**

| # | Subtitle | Core themes |
|---|----------|-------------|
| I | Fundamentals | Preparation, Courage, Ethics, Character, Conviction, Discipline, Communication |
| II | Essential Qualities | Willpower, Influence, Inspiration, Teamwork, Conflict Resolution, Stability, Vision |
| III | The Guiding Light | Adaptability, Management, Diplomacy, Servant Leadership, Transformational Leadership, Perseverance, Prudence |
| IV | Strategy | Leadership through history — Ancient world, Medieval, Founding Fathers, Civil War, WWI, WWII, Modern Era |

**Assets:**
- `Book cover .pdf` — cover art for Book I (converted to `assets/bookcover.png` during build)
- `PaulElling2023.jpg` — author photo

---

## Tone & Aesthetic

Executive and authoritative. Dark navy background with warm gold accents and serif typography. Feels like a high-end publisher's catalogue — dignified, credible, content-led.

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0d1b2a` | Page background (deep navy) |
| `--color-surface` | `#162033` | Cards, panels |
| `--color-gold` | `#c9a84c` | Headings, accents, borders, CTAs |
| `--color-text` | `#f0e6d3` | Primary body text (warm off-white) |
| `--color-muted` | `#8a9bb0` | Secondary text, subtitles |

---

## Typography

| Role | Font | Source |
|------|------|--------|
| Display / headings | Playfair Display | Google Fonts |
| Body / nav / labels | Lato | Google Fonts |
| Chapter labels | Lato, small-caps, letter-spaced, gold | — |

---

## File Structure

```
/LeadershipGuidelines-site/
  index.html          — single-page markup, all 6 sections
  styles.css          — all styling, CSS custom properties, responsive
  script.js           — IntersectionObserver animations, smooth scroll, nav highlighting
  assets/
    PaulElling2023.jpg
    bookcover.png     — converted from "Book cover .pdf" via Python/pdf2image
```

---

## Navigation Bar

- Position: sticky top, full-width, `z-index` above sections
- Left: `Leadership Guidelines` in Playfair Display, gold, links to `#home`
- Right: `HOME · BOOK I · BOOK II · BOOK III · BOOK IV · AUTHOR` in Lato small-caps, letter-spaced
- Active section: gold color + underline (updated by IntersectionObserver)
- On scroll past 10px: subtle `box-shadow` appears beneath the bar
- Mobile: hamburger menu collapses links into a dropdown

---

## Sections

### 1. Splash / Hero (`#home`)
- Full viewport height (`100vh`)
- Centered vertically and horizontally
- Content (top to bottom):
  - `LEADERSHIP GUIDELINES` — Playfair Display, ~72px, gold
  - Thin horizontal gold rule (80px wide)
  - *"A Four-Part Series on the Art and Science of Leadership"* — Lato, muted, italic
  - `Paul Alfred Elling` — Lato small-caps, letter-spaced, off-white
  - Two-sentence series overview: *"Not enough education is provided about the subject of leadership. This series offers guidelines that can be learned and practiced by anyone, in any organization."*
  - 2×2 grid of book cards: each shows `PART I` in small gold caps + subtitle in Playfair; gold border appears on hover
  - Animated chevron (`›` rotated) at bottom center, subtle bounce, links to `#book1`

### 2–5. Book Sections (`#book1` – `#book4`)

Each section: full viewport height, vertically centered, two-column layout (50/50) on desktop, stacked on mobile.

**Left column (all four books):**
- `PART I` / `PART II` / etc. — Lato small-caps, gold, letter-spaced
- Subtitle (e.g., `Fundamentals`) — Playfair Display, ~56px, off-white
- Gold horizontal rule
- 2–3 sentence description from each book's preface
- Chapter list: gold bullet `·` + chapter name in off-white Lato; chapter titles pulled from each book's table of contents
- `→ Contact to Order` — gold outline button, `mailto:paulelling@yahoo.com`, bottom of column

**Right column:**
- **Book I only:** `bookcover.png` displayed as a styled image with a thin gold border and subtle drop shadow
- **Books II–IV:** Decorative typographic panel — the book's thematic word in enormous (~200px) Playfair Display, color `rgba(201,168,76,0.08)` (near-invisible gold), serving as a visual texture behind a centered smaller display of 3 key chapter themes

**Book themes for right-column panels:**
| Book | Thematic word | 3 key themes shown |
|------|--------------|-------------------|
| II | QUALITY | Willpower · Vision · Teamwork |
| III | LIGHT | Adaptability · Service · Perseverance |
| IV | STRATEGY | History · Courage · Victory |

### 6. Author Section (`#author`)
- Full viewport height, vertically centered, two-column layout
- **Left column:** `PaulElling2023.jpg` in an elegant rectangular frame, thin gold border, subtle shadow
- **Right column:**
  - `PAUL ALFRED ELLING` — Playfair Display, ~48px, gold
  - Gold horizontal rule
  - Author bio (3–4 sentences): MBA in Strategic Leadership, senior software engineering career, raised in a military family, lifelong student of leadership across history, culture, and organizations
  - `✉ paulelling@yahoo.com` — styled mailto anchor with a small gold envelope icon
  - Secondary line: *"Interested in the series? Reach out directly."*

---

## Animations

- **Trigger:** IntersectionObserver, threshold `0.15` (fires when 15% of section is visible)
- **Effect:** opacity `0 → 1` + translateY `40px → 0` over `600ms ease-out`
- **Stagger:** Left and right columns animate 150ms apart (left first)
- **Nav scroll:** `scroll-behavior: smooth` on `<html>`; nav links use `#anchor` hrefs
- **Nav highlighting:** IntersectionObserver on each section updates the active nav link in real time
- **Chevron:** CSS `@keyframes` bounce, 1.5s loop

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Two-column layouts, full typography sizes |
| 768–1023px | Two-column layouts, slightly reduced font sizes |
| <768px | Single-column stacked, hamburger nav, book cover full-width |

---

## Book Cover PDF Handling

During build, `Book cover .pdf` is converted to `assets/bookcover.png` using Python:
```python
import fitz  # PyMuPDF
doc = fitz.open("Book cover .pdf")
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("assets/bookcover.png")
```
If PyMuPDF is unavailable, fall back to embedding: `<object data="Book cover .pdf" type="application/pdf">`.

---

## Out of Scope

- No purchase/payment flow
- No CMS or dynamic content
- No analytics or tracking
- No social media feeds
- No dark/light mode toggle
