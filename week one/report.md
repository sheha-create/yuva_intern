# Week 1 Report: Wireframe to Static Web Page

**Project:** Lamplight Study Hub, a landing page for a free evening tutoring centre
**Files:** `index.html`, `styles.css`

## 1. Wireframe analysis

No wireframe was supplied with the task, so I drew a standard landing-page wireframe and built from it. I chose a content-rich subject so each section has a real job.

```
+--------------------------------------------------+
| [logo]            Subjects Schedule Students [CTA]|  header + nav
+--------------------------------------------------+
| Headline + intro + 2 buttons |  "This week" card  |  hero
+--------------------------------------------------+
| [Maths]        [Science]        [English]         |  3 cards
+--------------------------------------------------+
| Weekly schedule table                             |  table
+--------------------------------------------------+
| Student quote                                     |  figure
+--------------------------------------------------+
| Text                 |  Booking form              |  call to action
+--------------------------------------------------+
| About        | Explore links     | Visit          |  footer
+--------------------------------------------------+
```

## 2. Semantic HTML decisions

- Landmarks: `header`, `nav`, `main`, `section`, `aside`, `footer`, and `address` for the contact details.
- One `h1`, then `h2` per section and `h3` for card titles, so the outline reads correctly without CSS.
- Each `section` is linked to its heading with `aria-labelledby`.
- The schedule is a real `table` with `thead`, `th scope="col"` and `th scope="row"`, because the content is tabular.
- The quote uses `figure`, `blockquote` and `figcaption`.
- Every form control has a `label` linked by `for`/`id`.
- A skip link lets keyboard users jump past the navigation.

## 3. CSS organization

The stylesheet is split into numbered sections (tokens, reset, base, layout, components, utilities, breakpoints). Colours, fonts, type sizes and spacing are CSS custom properties in `:root`, so changing the theme means editing one block. Class names describe the component (`.week-card`, `.card`, `.form`), and I avoided deep selectors to keep specificity low and prevent rules overriding each other.

## 4. Design choices

- **Colour:** deep navy for trust and structure, with a lamp-amber accent used only on things that matter (logo, card edges, the main form button). Text and background pairs keep strong contrast.
- **Type:** Bricolage Grotesque for headings gives the page character; Source Sans 3 keeps body text readable. Fallback stacks keep the layout stable if the fonts fail to load. Body text is limited to about 62 characters per line.
- **Hero:** instead of a stock image, the hero shows a "This week" card with the real sessions, which tells visitors what the page offers immediately and avoids needing image files.

## 5. Responsive strategy

I used a mobile-first approach with `min-width` queries:

| Width | Layout |
|---|---|
| Under 640px | Single column, wrapped nav, stacked footer |
| 640px and up | Three-column subject cards, three-part footer |
| 960px and up | Two-column hero and booking section |
| 480px and under | Full-width hero buttons, stacked card rows |

Fluid sizing with `clamp()` scales headings smoothly between breakpoints. I tested by resizing the browser and using DevTools device mode at 360, 480, 768, 1024 and 1440px.

## 6. Challenges and solutions

1. **Table overflow on phones.** The table forced the page to scroll sideways. I wrapped it in a container with `overflow-x: auto`, a `min-width` on the table, and `tabindex="0"` so keyboard users can scroll it.
2. **Sticky header hiding anchor targets.** Clicking a nav link placed headings under the header. `scroll-padding-top` on `html` fixed it.
3. **Navigation on small screens.** Rather than adding JavaScript for a menu, I let the nav list wrap, keeping the page static and accessible.
4. **Spacing rules conflicting.** Section padding was being overridden by later rules. Using a single `.section` class and changing its value inside media queries removed the conflict.
5. **Contrast on the dark form section.** The form sits on a white card inside the navy section so labels and inputs keep full contrast.

## 7. What I would improve next

Add real images with `srcset`, a working form handler, and a small script-free mobile menu using `<details>`.
