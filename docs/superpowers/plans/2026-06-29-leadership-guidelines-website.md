# Leadership Guidelines Brochure Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished single-page brochure website for the four-book *Leadership Guidelines* series by Paul Alfred Elling, delivered as a structured folder of plain HTML, CSS, and JS files.

**Architecture:** A single `index.html` holds all six sections (splash + four book sections + author profile) linked by `#anchor` IDs. `styles.css` owns all layout, typography, colors (via CSS custom properties), and animation state classes. `script.js` drives IntersectionObserver scroll-triggered animations, active nav highlighting, navbar shadow, and mobile hamburger menu.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (ES6+, IntersectionObserver API), Google Fonts (Playfair Display + Lato), PyMuPDF (one-time PDF→PNG conversion).

## Global Constraints

- No npm, no build step, no frameworks — plain static files only
- Output directory: `D:/AI/LeadershipGuidelines/LeadershipGuidelines-site/`
- Source assets live at: `D:/AI/LeadershipGuidelines/` (docx, pdf, jpg)
- All site assets under: `LeadershipGuidelines-site/assets/`
- Color tokens (CSS custom properties on `:root`):
  - `--color-bg: #0d1b2a`
  - `--color-surface: #162033`
  - `--color-gold: #c9a84c`
  - `--color-text: #f0e6d3`
  - `--color-muted: #8a9bb0`
- Fonts: Playfair Display (headings), Lato (body/labels) — Google Fonts
- Animation: `opacity 0→1` + `translateY 40px→0`, `600ms ease-out`, triggered when 15% of element is in viewport
- Contact email: `paulelling@yahoo.com`
- Author photo: `assets/PaulElling2023.jpg`
- Book cover image: `assets/bookcover.png` (converted from `Book cover .pdf`)

---

### Task 1: Project scaffold and asset preparation

**Files:**
- Create: `LeadershipGuidelines-site/` directory
- Create: `LeadershipGuidelines-site/assets/` directory
- Create: `LeadershipGuidelines-site/index.html` (empty)
- Create: `LeadershipGuidelines-site/styles.css` (empty)
- Create: `LeadershipGuidelines-site/script.js` (empty)
- Copy: `PaulElling2023.jpg` → `LeadershipGuidelines-site/assets/PaulElling2023.jpg`
- Create: `LeadershipGuidelines-site/assets/bookcover.png` (converted from PDF)

**Interfaces:**
- Produces: directory structure and assets ready for all subsequent tasks

- [ ] **Step 1: Create directory structure**

Run from `D:/AI/LeadershipGuidelines/`:
```bash
mkdir -p LeadershipGuidelines-site/assets
touch LeadershipGuidelines-site/index.html
touch LeadershipGuidelines-site/styles.css
touch LeadershipGuidelines-site/script.js
```

- [ ] **Step 2: Copy author photo**

```bash
cp "PaulElling2023.jpg" "LeadershipGuidelines-site/assets/PaulElling2023.jpg"
```

- [ ] **Step 3: Convert PDF book cover to PNG**

Run this Python script from `D:/AI/LeadershipGuidelines/`:
```python
import fitz  # PyMuPDF — install with: pip install pymupdf

doc = fitz.open("Book cover .pdf")
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("LeadershipGuidelines-site/assets/bookcover.png")
print("Saved bookcover.png")
```

If PyMuPDF is not available, install it: `pip install pymupdf`

- [ ] **Step 4: Verify assets exist**

```bash
ls LeadershipGuidelines-site/assets/
```
Expected output: `bookcover.png  PaulElling2023.jpg`

---

### Task 2: CSS foundation

**Files:**
- Write: `LeadershipGuidelines-site/styles.css`

**Interfaces:**
- Produces: CSS custom properties, reset, base section layout, `.animate-on-scroll` + `.animate-on-scroll.visible` classes used by all subsequent tasks and by `script.js`

- [ ] **Step 1: Write styles.css**

```css
/* ── Google Fonts loaded via <link> in HTML ── */

/* ── Custom properties ── */
:root {
  --color-bg: #0d1b2a;
  --color-surface: #162033;
  --color-gold: #c9a84c;
  --color-text: #f0e6d3;
  --color-muted: #8a9bb0;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', system-ui, sans-serif;
  --nav-height: 64px;
  --transition-main: 600ms ease-out;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
ul { list-style: none; }

/* ── Base section ── */
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: calc(var(--nav-height) + 60px) 5vw 60px;
}
.section__inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Scroll animation ── */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity var(--transition-main), transform var(--transition-main);
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
.animate-on-scroll.delay-1 { transition-delay: 150ms; }
.animate-on-scroll.delay-2 { transition-delay: 300ms; }

/* ── Gold rule ── */
.gold-rule {
  width: 80px;
  height: 1px;
  background: var(--color-gold);
  margin: 20px 0;
}

/* ── Labels (PART I, etc.) ── */
.label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold);
}

/* ── CTA button ── */
.cta-btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  border: 1px solid var(--color-gold);
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: background 0.25s, color 0.25s;
}
.cta-btn:hover {
  background: var(--color-gold);
  color: var(--color-bg);
}
```

- [ ] **Step 2: Verify**

Open `LeadershipGuidelines-site/styles.css` in a browser via a temp HTML file that imports it — no visual output yet, but no parse errors should appear in the browser DevTools console.

---

### Task 3: Navigation bar

**Files:**
- Write (partial): `LeadershipGuidelines-site/index.html` — full `<head>` + `<nav>` markup
- Append: `LeadershipGuidelines-site/styles.css` — nav styles

**Interfaces:**
- Produces: `#navbar` element; `.nav-link` elements with `href="#home"`, `"#book1"`, `"#book2"`, `"#book3"`, `"#book4"`, `"#author"` — consumed by `script.js`
- Produces: `.navbar--scrolled` class applied by `script.js` on scroll

- [ ] **Step 1: Write full index.html skeleton with nav**

Replace `LeadershipGuidelines-site/index.html` with:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leadership Guidelines — Paul Alfred Elling</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <nav id="navbar" aria-label="Site navigation">
    <div class="nav__inner">
      <a class="nav__brand nav-link" href="#home">Leadership Guidelines</a>
      <button id="hamburger" class="nav__hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul id="nav-menu" class="nav__menu">
        <li><a class="nav-link" href="#home">Home</a></li>
        <li><a class="nav-link" href="#book1">Book I</a></li>
        <li><a class="nav-link" href="#book2">Book II</a></li>
        <li><a class="nav-link" href="#book3">Book III</a></li>
        <li><a class="nav-link" href="#book4">Book IV</a></li>
        <li><a class="nav-link" href="#author">Author</a></li>
      </ul>
    </div>
  </nav>

  <main>
    <!-- sections added in Tasks 4–8 -->
  </main>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Add nav styles to styles.css**

Append to `styles.css`:
```css
/* ── Navigation ── */
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: var(--color-bg);
  z-index: 1000;
  transition: box-shadow 0.3s;
}
#navbar.scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 5vw;
  max-width: 1400px;
  margin: 0 auto;
}
.nav__brand {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--color-gold);
  letter-spacing: 0.05em;
}
.nav__menu {
  display: flex;
  gap: 2rem;
}
.nav__menu .nav-link {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
  transition: color 0.2s;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
}
.nav__menu .nav-link:hover,
.nav__menu .nav-link.active {
  color: var(--color-gold);
  border-bottom-color: var(--color-gold);
}
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-gold);
  transition: 0.3s;
}

/* ── Mobile nav ── */
@media (max-width: 767px) {
  .nav__hamburger { display: flex; }
  .nav__menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--color-surface);
    padding: 1.5rem 5vw;
    gap: 1.25rem;
    border-top: 1px solid rgba(201,168,76,0.2);
  }
  .nav__menu.open { display: flex; }
  .nav__menu .nav-link { font-size: 0.85rem; }
}
```

- [ ] **Step 3: Verify**

Open `LeadershipGuidelines-site/index.html` in a browser. Expected: dark navy navbar with "Leadership Guidelines" in gold on the left, six nav links on the right. At mobile width (<768px) nav links should hide and a hamburger icon should appear.

---

### Task 4: Splash / Hero section

**Files:**
- Modify: `LeadershipGuidelines-site/index.html` — add splash section inside `<main>`
- Append: `LeadershipGuidelines-site/styles.css` — splash styles

**Interfaces:**
- Produces: `<section id="home">` — consumed by `script.js` nav observer
- Produces: `.animate-on-scroll` elements — consumed by `script.js` scroll observer

- [ ] **Step 1: Add splash section to index.html**

Replace `<!-- sections added in Tasks 4–8 -->` with:
```html
    <!-- ── Splash ── -->
    <section id="home" class="section section--hero">
      <div class="section__inner hero__inner">

        <div class="hero__title-block animate-on-scroll">
          <p class="label">Paul Alfred Elling</p>
          <h1 class="hero__title">Leadership<br>Guidelines</h1>
          <div class="gold-rule"></div>
          <p class="hero__subtitle">A Four-Part Series on the Art and Science of Leadership</p>
          <p class="hero__desc">Not enough education is provided about the subject of leadership — an art and science practiced across every culture and era. This series offers guidelines that anyone, in any organization, can learn and put into practice.</p>
        </div>

        <div class="hero__books animate-on-scroll delay-1">
          <a href="#book1" class="book-card">
            <span class="label">Part I</span>
            <span class="book-card__title">Fundamentals</span>
          </a>
          <a href="#book2" class="book-card">
            <span class="label">Part II</span>
            <span class="book-card__title">Essential Qualities</span>
          </a>
          <a href="#book3" class="book-card">
            <span class="label">Part III</span>
            <span class="book-card__title">The Guiding Light</span>
          </a>
          <a href="#book4" class="book-card">
            <span class="label">Part IV</span>
            <span class="book-card__title">Strategy</span>
          </a>
        </div>

        <a href="#book1" class="hero__chevron animate-on-scroll delay-2" aria-label="Scroll to Book I">&#8964;</a>

      </div>
    </section>
```

- [ ] **Step 2: Add splash styles to styles.css**

Append to `styles.css`:
```css
/* ── Hero / Splash ── */
.section--hero {
  text-align: center;
  justify-content: center;
}
.hero__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}
.hero__title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1.05;
  letter-spacing: 0.04em;
  margin-top: 0.5rem;
}
.hero__subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  font-style: italic;
  color: var(--color-muted);
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
}
.hero__desc {
  max-width: 560px;
  margin: 1rem auto 0;
  color: var(--color-text);
  font-size: 0.95rem;
  opacity: 0.85;
}
.hero__title-block .gold-rule { margin: 20px auto; }

/* ── Book card grid ── */
.hero__books {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
  max-width: 680px;
}
.book-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.5rem 1.75rem;
  background: var(--color-surface);
  border: 1px solid rgba(201,168,76,0.15);
  transition: border-color 0.25s, transform 0.25s;
}
.book-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}
.book-card__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-text);
}

/* ── Chevron bounce ── */
.hero__chevron {
  font-size: 2rem;
  color: var(--color-gold);
  opacity: 0.6;
  animation: bounce 1.8s ease-in-out infinite;
  display: block;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
```

- [ ] **Step 3: Verify**

Open `index.html` in browser. Expected: full-viewport hero with gold "Leadership Guidelines" heading, muted italic subtitle, series description paragraph, 2×2 grid of dark book cards with gold border on hover, and a gently bouncing chevron below.

---

### Task 5: Book I section (Fundamentals)

**Files:**
- Modify: `LeadershipGuidelines-site/index.html` — add `#book1` section
- Append: `LeadershipGuidelines-site/styles.css` — book section styles (shared by all four books)

**Interfaces:**
- Produces: `<section id="book1">` — consumed by `script.js`
- Produces: `.section--book`, `.book-cols`, `.book-col--content`, `.book-col--visual` CSS classes — reused in Tasks 6 and 7

- [ ] **Step 1: Add Book I section to index.html** (insert after the closing `</section>` of `#home`)

```html
    <!-- ── Book I: Fundamentals ── -->
    <section id="book1" class="section section--book">
      <div class="section__inner book-cols">

        <div class="book-col--content animate-on-scroll">
          <p class="label">Part I</p>
          <h2 class="book-title">Fundamentals</h2>
          <div class="gold-rule"></div>
          <p class="book-desc">The first volume lays the essential groundwork of leadership — what it means to prepare yourself, take ownership, and lead with courage, ethics, and discipline. Drawing on figures from Aristotle and George Washington to Michael Jordan, it shows that leadership is available to anyone who is willing to cultivate it.</p>
          <ul class="chapter-list">
            <li>Preparation</li>
            <li>Taking Ownership</li>
            <li>Courage</li>
            <li>Strive for Level 5 Leadership</li>
            <li>Ethics</li>
            <li>Character</li>
            <li>Conviction</li>
            <li>Discipline</li>
            <li>Communication</li>
          </ul>
          <a href="mailto:paulelling@yahoo.com?subject=Leadership Guidelines - Part I" class="cta-btn">→ Contact to Order</a>
        </div>

        <div class="book-col--visual animate-on-scroll delay-1">
          <div class="book-cover-frame">
            <img src="assets/bookcover.png" alt="Leadership Guidelines Part I — Fundamentals book cover">
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Add book section styles to styles.css**

Append to `styles.css`:
```css
/* ── Book sections (shared) ── */
.section--book { background: var(--color-bg); }
.section--book:nth-child(even) { background: var(--color-surface); }

.book-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.book-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  margin-top: 0.5rem;
}
.book-desc {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.85;
  margin-bottom: 1.5rem;
}
.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.chapter-list li {
  font-size: 0.9rem;
  color: var(--color-text);
  padding-left: 1.25rem;
  position: relative;
}
.chapter-list li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-size: 1.2rem;
  line-height: 1.4;
}

/* ── Book cover frame ── */
.book-cover-frame {
  display: inline-block;
  border: 1px solid rgba(201,168,76,0.4);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  max-width: 360px;
  margin: 0 auto;
}
.book-cover-frame img {
  width: 100%;
  display: block;
}

/* ── Responsive book sections ── */
@media (max-width: 1023px) {
  .book-cols { gap: 2.5rem; }
}
@media (max-width: 767px) {
  .book-cols {
    grid-template-columns: 1fr;
  }
  .book-col--visual { order: -1; }
  .book-cover-frame { max-width: 280px; }
}
```

- [ ] **Step 3: Verify**

Open `index.html` and scroll to Book I. Expected: two-column layout — left shows "PART I", "Fundamentals" heading, gold rule, description, chapter list with gold bullets, gold-outline button. Right shows book cover image with gold border and shadow.

---

### Task 6: Book II, III, and IV sections

**Files:**
- Modify: `LeadershipGuidelines-site/index.html` — add `#book2`, `#book3`, `#book4` sections
- Append: `LeadershipGuidelines-site/styles.css` — typographic panel styles

**Interfaces:**
- Consumes: `.section--book`, `.book-cols`, `.book-col--content`, `.book-col--visual`, `.chapter-list`, `.cta-btn` (all from Task 5)
- Produces: `<section id="book2">`, `<section id="book3">`, `<section id="book4">` — consumed by `script.js`

- [ ] **Step 1: Add Book II, III, IV sections to index.html** (insert after Book I's closing `</section>`)

```html
    <!-- ── Book II: Essential Qualities ── -->
    <section id="book2" class="section section--book">
      <div class="section__inner book-cols">

        <div class="book-col--content animate-on-scroll">
          <p class="label">Part II</p>
          <h2 class="book-title">Essential Qualities</h2>
          <div class="gold-rule"></div>
          <p class="book-desc">The second volume examines the qualities that distinguish great leaders — from the willpower of Charles de Gaulle and Steve Jobs to the unifying vision of Moses and Andrew Carnegie. These are not traits you are born with; they are capacities to be developed through study and practice.</p>
          <ul class="chapter-list">
            <li>Willpower</li>
            <li>Influence</li>
            <li>Inspiration</li>
            <li>Teamwork</li>
            <li>Conflict Resolution</li>
            <li>Stability</li>
            <li>Organization</li>
            <li>Vision</li>
          </ul>
          <a href="mailto:paulelling@yahoo.com?subject=Leadership Guidelines - Part II" class="cta-btn">→ Contact to Order</a>
        </div>

        <div class="book-col--visual animate-on-scroll delay-1">
          <div class="typo-panel">
            <span class="typo-panel__bg">QUALITY</span>
            <div class="typo-panel__themes">
              <span>Willpower</span>
              <span class="typo-panel__dot">·</span>
              <span>Vision</span>
              <span class="typo-panel__dot">·</span>
              <span>Teamwork</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Book III: The Guiding Light ── -->
    <section id="book3" class="section section--book">
      <div class="section__inner book-cols">

        <div class="book-col--content animate-on-scroll">
          <p class="label">Part III</p>
          <h2 class="book-title">The Guiding Light</h2>
          <div class="gold-rule"></div>
          <p class="book-desc">The third volume turns to the leader as a guiding force — exploring adaptability, diplomacy, servant leadership, and transformational change. From Mother Teresa and Volodymyr Zelensky to Genghis Khan and Angela Merkel, it shows how the most consequential leaders redirect the course of organizations and nations.</p>
          <ul class="chapter-list">
            <li>Adaptability</li>
            <li>Management</li>
            <li>Diplomacy</li>
            <li>Servant Leader</li>
            <li>Transformational Leadership</li>
            <li>Perseverance</li>
            <li>Prudence</li>
          </ul>
          <a href="mailto:paulelling@yahoo.com?subject=Leadership Guidelines - Part III" class="cta-btn">→ Contact to Order</a>
        </div>

        <div class="book-col--visual animate-on-scroll delay-1">
          <div class="typo-panel">
            <span class="typo-panel__bg">LIGHT</span>
            <div class="typo-panel__themes">
              <span>Adaptability</span>
              <span class="typo-panel__dot">·</span>
              <span>Service</span>
              <span class="typo-panel__dot">·</span>
              <span>Perseverance</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Book IV: Strategy ── -->
    <section id="book4" class="section section--book">
      <div class="section__inner book-cols">

        <div class="book-col--content animate-on-scroll">
          <p class="label">Part IV</p>
          <h2 class="book-title">Strategy</h2>
          <div class="gold-rule"></div>
          <p class="book-desc">The fourth volume surveys strategic leadership through history — from King David, Pericles, and Julius Caesar through the Founding Fathers, the Civil War, and two World Wars to the modern era. Strategy is leadership in its most consequential form: decisions made under pressure that shape the fate of organizations, nations, and civilizations.</p>
          <ul class="chapter-list">
            <li>The History of Strategy</li>
            <li>Before Christ — King David, Pericles, Alexander, Caesar</li>
            <li>Medieval Times — Charlemagne, Alfred, Henry V</li>
            <li>The Founding Fathers</li>
            <li>The Civil War — Lincoln, Lee, Grant</li>
            <li>World War I</li>
            <li>World War II — Churchill, Roosevelt, Patton, Eisenhower</li>
            <li>The Modern Era — Powell, Mattis</li>
          </ul>
          <a href="mailto:paulelling@yahoo.com?subject=Leadership Guidelines - Part IV" class="cta-btn">→ Contact to Order</a>
        </div>

        <div class="book-col--visual animate-on-scroll delay-1">
          <div class="typo-panel">
            <span class="typo-panel__bg">STRATEGY</span>
            <div class="typo-panel__themes">
              <span>History</span>
              <span class="typo-panel__dot">·</span>
              <span>Courage</span>
              <span class="typo-panel__dot">·</span>
              <span>Victory</span>
            </div>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Add typographic panel styles to styles.css**

Append to `styles.css`:
```css
/* ── Typographic panel (Books II–IV) ── */
.typo-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  overflow: hidden;
}
.typo-panel__bg {
  position: absolute;
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 700;
  color: rgba(201,168,76,0.07);
  letter-spacing: 0.05em;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
.typo-panel__themes {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}
.typo-panel__themes span {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-text);
  opacity: 0.75;
  font-style: italic;
}
.typo-panel__dot {
  color: var(--color-gold) !important;
  opacity: 1 !important;
  font-style: normal !important;
}
```

- [ ] **Step 3: Verify**

Scroll through Books II, III, and IV. Expected: same two-column layout as Book I, alternating background colors between sections (`--color-bg` and `--color-surface`). Right columns show the faint large background word with the three theme words centered in front of it.

---

### Task 7: Author section

**Files:**
- Modify: `LeadershipGuidelines-site/index.html` — add `#author` section
- Append: `LeadershipGuidelines-site/styles.css` — author section styles

**Interfaces:**
- Produces: `<section id="author">` — consumed by `script.js`

- [ ] **Step 1: Add Author section to index.html** (insert after Book IV's closing `</section>`, before `</main>`)

```html
    <!-- ── Author ── -->
    <section id="author" class="section section--author">
      <div class="section__inner author-cols">

        <div class="author-col--photo animate-on-scroll">
          <div class="author-photo-frame">
            <img src="assets/PaulElling2023.jpg" alt="Paul Alfred Elling, author of Leadership Guidelines">
          </div>
        </div>

        <div class="author-col--bio animate-on-scroll delay-1">
          <p class="label">About the Author</p>
          <h2 class="author-name">Paul Alfred Elling</h2>
          <div class="gold-rule"></div>
          <p class="author-bio">Paul Alfred Elling holds an MBA in Strategic Leadership and has spent more than a decade as a senior software engineer, leading teams and building complex systems in high-pressure environments. Raised in a military family — his father served twenty years in the United States Navy, retiring as a Senior Chief Petty Officer — Paul developed an early appreciation for the discipline, honor, and human complexity that leadership demands. The <em>Leadership Guidelines</em> series is the product of a lifelong study of leadership across history, culture, psychology, and organizations, written to make that knowledge accessible to anyone willing to learn it.</p>
          <div class="author-contact">
            <a href="mailto:paulelling@yahoo.com" class="author-email">
              <svg class="email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
              paulelling@yahoo.com
            </a>
            <p class="author-cta-note">Interested in the series? Reach out directly.</p>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Add author section styles to styles.css**

Append to `styles.css`:
```css
/* ── Author section ── */
.section--author { background: var(--color-surface); }
.author-cols {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: center;
}
.author-photo-frame {
  border: 1px solid rgba(201,168,76,0.4);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  overflow: hidden;
  max-width: 380px;
  margin: 0 auto;
}
.author-photo-frame img {
  width: 100%;
  display: block;
}
.author-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-gold);
  margin-top: 0.5rem;
  line-height: 1.1;
}
.author-bio {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.85;
  margin-bottom: 1.75rem;
}
.author-bio em { color: var(--color-gold); font-style: normal; }
.author-contact { display: flex; flex-direction: column; gap: 0.5rem; }
.author-email {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: opacity 0.2s;
}
.author-email:hover { opacity: 0.75; }
.email-icon {
  width: 18px;
  height: 18px;
  color: var(--color-gold);
  flex-shrink: 0;
}
.author-cta-note {
  font-size: 0.85rem;
  color: var(--color-muted);
  font-style: italic;
}

/* ── Responsive author ── */
@media (max-width: 767px) {
  .author-cols {
    grid-template-columns: 1fr;
  }
  .author-photo-frame { max-width: 280px; }
}
```

- [ ] **Step 3: Verify**

Scroll to the Author section. Expected: author photo in a gold-bordered frame on the left; right column shows "ABOUT THE AUTHOR" label, "Paul Alfred Elling" in gold Playfair Display, gold rule, bio paragraph, gold email link with envelope icon, muted italic note below.

---

### Task 8: JavaScript — animations, nav, and hamburger

**Files:**
- Write: `LeadershipGuidelines-site/script.js`

**Interfaces:**
- Consumes: `#navbar` (with `.scrolled` class), `.nav-link` (with `.active` class), `#hamburger`, `#nav-menu` (with `.open` class), `.animate-on-scroll` (with `.visible` class), `section[id]` elements — all defined in prior tasks

- [ ] **Step 1: Write script.js**

```javascript
(function () {
  'use strict';

  // ── Scroll-triggered fade-in animations ──
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach((el) => fadeObserver.observe(el));

  // ── Active nav link highlighting ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-link[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const id = entry.target.getAttribute('id');
          const active = document.querySelector(`#navbar .nav-link[href="#${id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.5 }
  );
  sections.forEach((s) => navObserver.observe(s));

  // ── Navbar shadow on scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

})();
```

- [ ] **Step 2: Verify animations**

Open `index.html` in a browser. Scroll slowly from top to bottom. Expected:
- Each section's content starts invisible (opacity 0, 40px down), then fades in and slides up when it enters the viewport.
- Left column animates first; right column follows 150ms later (`.delay-1` class).

- [ ] **Step 3: Verify active nav**

Scroll to each section. Expected: the corresponding nav link turns gold and gains an underline. When scrolling back up, "Home" becomes active again.

- [ ] **Step 4: Verify navbar shadow**

Scroll past the hero. Expected: a subtle drop shadow appears under the nav bar.

- [ ] **Step 5: Verify mobile hamburger** (resize browser to <768px)

Expected: hamburger icon visible. Click it → nav links slide down. Click a link → menu closes and page smooth-scrolls to section.

---

### Task 9: Final polish, responsive QA, and file verification

**Files:**
- Append: `LeadershipGuidelines-site/styles.css` — footer + final responsive fixes

**Interfaces:**
- No new interfaces — this is polish and verification only.

- [ ] **Step 1: Add a minimal footer and final responsive fixes to styles.css**

Append to `styles.css`:
```css
/* ── Footer ── */
body::after {
  content: '© Paul Alfred Elling · Leadership Guidelines · paulelling@yahoo.com';
  display: block;
  text-align: center;
  padding: 2rem 5vw;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  background: var(--color-bg);
  border-top: 1px solid rgba(201,168,76,0.1);
}

/* ── Tablet adjustments ── */
@media (max-width: 1023px) {
  .hero__title { font-size: clamp(2.5rem, 7vw, 4.5rem); }
  .book-title  { font-size: clamp(2rem, 5vw, 3rem); }
}

/* ── Small mobile adjustments ── */
@media (max-width: 480px) {
  .hero__books { grid-template-columns: 1fr; max-width: 320px; }
  .book-card   { padding: 1.25rem; }
  .typo-panel  { min-height: 200px; }
}
```

- [ ] **Step 2: Full cross-section visual QA**

Open `index.html` and verify each section in sequence:

| Section | Check |
|---------|-------|
| Nav | Sticky, gold brand, small-caps links, shadow on scroll |
| Splash | Full-height, gold heading, book card grid, bouncing chevron |
| Book I | Two columns, book cover with gold border, chapter list with gold bullets, mailto CTA |
| Book II | Alternating bg, typographic panel (QUALITY), mailto CTA |
| Book III | Typographic panel (LIGHT), mailto CTA |
| Book IV | Typographic panel (STRATEGY), mailto CTA |
| Author | Photo with gold border, bio, gold email link |
| Footer | Muted copyright bar |
| Animations | All sections fade in on scroll |
| Mobile | Hamburger works, all sections stack single-column |

- [ ] **Step 3: Verify file structure**

```bash
find LeadershipGuidelines-site/ -type f | sort
```

Expected output:
```
LeadershipGuidelines-site/assets/PaulElling2023.jpg
LeadershipGuidelines-site/assets/bookcover.png
LeadershipGuidelines-site/index.html
LeadershipGuidelines-site/script.js
LeadershipGuidelines-site/styles.css
```

- [ ] **Step 4: Check all mailto links open correctly**

Click each "→ Contact to Order" button and the email link in the Author section. Each should open the user's default email client addressed to `paulelling@yahoo.com` with a relevant subject line.

---

## Self-Review Notes

**Spec coverage:**
- ✅ Splash page with series overview
- ✅ One page per book (as sections within single-page site)
- ✅ Book I shows book cover (bookcover.png converted from PDF)
- ✅ Author profile page with email contact
- ✅ Executive/authoritative dark navy + gold aesthetic
- ✅ Single-page with animated section transitions
- ✅ Contact-to-purchase via mailto
- ✅ Structured folder output (index.html + styles.css + script.js + assets/)
- ✅ Responsive / mobile-ready

**No placeholders found.**

**Type/name consistency:**
- `.animate-on-scroll` / `.visible` defined in Task 2, used in Tasks 3–7, consumed by script.js in Task 8 ✅
- `.nav-link` / `.active` / `#navbar` / `#hamburger` / `#nav-menu` / `.open` / `.scrolled` defined in Task 3, consumed in Task 8 ✅
- `.section--book` / `.book-cols` / `.chapter-list` / `.cta-btn` defined in Task 5, reused in Task 6 ✅
- `section[id]` anchors: `home`, `book1`, `book2`, `book3`, `book4`, `author` — consistent across HTML and JS ✅
