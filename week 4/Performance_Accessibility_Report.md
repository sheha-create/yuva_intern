# TaskFlow: Performance and Accessibility Optimization Report

## 1. Project overview
**Objective:** improve a static-style task manager page by making its markup more semantic, its CSS leaner, its interactions keyboard-friendly, and its runtime lightweight.

**Deliverables:** `index.html`, `styles.css`, `script.js`, this report in Markdown, a PDF copy, and a README.

## 2. Baseline review
The project was reviewed against common web-performance and accessibility risks. This is a code-level review, not a claim that a browser audit has already produced numeric scores.

| Area | Common risk | Improvement in this version |
|---|---|---|
| Loading | Large frameworks, remote fonts, third-party requests | Plain HTML/CSS/JavaScript; system font stack; no external libraries or assets |
| Rendering | Blocking scripts | JavaScript uses `defer` |
| HTML structure | Generic containers without landmarks | `header`, `main`, `section`, `article`, `form`, `footer`, headings and lists |
| Navigation | Keyboard users must tab through the whole page | Visible-on-focus “Skip to main content” link |
| Form errors | Errors may be unclear to assistive technology | Labels, helper text, `aria-describedby`, `aria-invalid`, and an alert region |
| Dynamic updates | Screen readers may miss task count changes | A concise `aria-live="polite"` result summary |
| Controls | Icon-only actions lack names | Buttons have readable text or explicit accessible names |
| Motion and display | Animation or color modes can create barriers | Reduced-motion stylesheet and forced-colors support |
| Responsive layout | Small screens cause cramped controls | Responsive grid breakpoints and fluid sizing |

## 3. Performance improvements
1. **No framework or third-party runtime.** The page avoids a large dependency bundle and does not make network requests for fonts, icons, images, or JavaScript packages.
2. **Deferred JavaScript.** `script.js` is loaded with `defer`, so HTML parsing is not blocked by script execution.
3. **Small, separated assets.** Structure, presentation, and behavior live in separate files, making them easier to audit and cache when hosted.
4. **System fonts and CSS-drawn decoration.** The design does not download a custom font or decorative image. There are no raster images to compress in this version.
5. **Reusable CSS tokens.** Shared colors and surfaces use custom properties. Repeated component styles are centralized instead of duplicated.
6. **Efficient selectors.** Most rules use classes, IDs, and simple element selectors rather than expensive broad descendant chains.
7. **No unnecessary DOM work.** Rendering replaces the task list with the currently visible task nodes and updates summary values together.
8. **Production minification.** Source files are kept readable for assessment. For deployment, minify HTML/CSS/JS with a build tool or online minifier and compare the output. Minification is a deployment step, not falsely reported as already applied here.
9. **Caching and compression.** When deployed, enable Brotli or gzip and long-lived cache headers for versioned static assets at the host/CDN. These are server settings and cannot be verified from local source files.

## 4. Accessibility features
- Declares the document language with `lang="en"` and includes responsive viewport metadata.
- Uses landmarks and a logical heading hierarchy.
- Provides a skip link and visible `:focus-visible` outlines.
- Every form control has an associated label. Helper text and validation errors are programmatically associated with the task input.
- Validation errors are exposed through `role="alert"`; task result updates use a polite live region.
- Filter buttons expose state with `aria-pressed`.
- The progress indicator exposes `role="progressbar"`, minimum, maximum, and current value.
- Task checkboxes and delete buttons receive accessible names that include the task title.
- Color is not the only way to communicate task state: text labels such as “Completed” and “High priority” remain present.
- The stylesheet supports `prefers-reduced-motion` and `forced-colors`.
- Controls have comfortable target sizes and the layout adapts to narrow screens.
- No images are used, so no decorative or informative image needs alt text. If images are added later, informative images must receive concise contextual alt text and decorative images should use `alt=""`.

## 5. Testing plan
The following are recommended verification steps. **No Lighthouse, WebPageTest, WAVE, or axe scores are claimed in this report**, because those tools were not run as part of generating these source files.

### Performance
1. Open the page in Chrome.
2. Open DevTools → Lighthouse and run a report for **Mobile** and **Desktop**.
3. Record Performance, Accessibility, Best Practices, and SEO scores; save the report or screenshots.
4. In DevTools → Network, reload with cache disabled and inspect total requests, transferred bytes, and render-blocking resources.
5. Optionally run WebPageTest against the deployed URL and record LCP, CLS, TBT/INP where available, and total bytes.
6. After minifying for production, rerun the same test under comparable conditions.

### Accessibility
1. Navigate the full page with `Tab`, `Shift+Tab`, `Enter`, and `Space`; verify visible focus and that every control can be used without a mouse.
2. Submit the form empty and try a duplicate task; verify the error is announced and focus returns to the input.
3. Test task creation, completion, deletion, filters, search, and clearing completed tasks.
4. Run the WAVE browser extension and axe DevTools; inspect and resolve reported issues rather than treating automated checks as proof of full compliance.
5. Test with browser zoom at 200%, a narrow viewport, reduced motion, and high-contrast/forced-colors settings.
6. If possible, manually test with a screen reader such as NVDA on Windows or VoiceOver on Apple devices.

## 6. Known limitations
- Tasks are stored in memory only and reset on refresh. Persistence was omitted to keep this assignment focused on performance and accessibility.
- This project has not been independently audited in a browser, and no numeric score or WCAG conformance claim is made.
- Automated tools cannot detect every usability issue; keyboard and assistive-technology checks are still necessary.
- The task list is client-side only and is not sent to a server.

## 7. Learning outcomes
This exercise demonstrates that performance is not only about minifying files. Avoiding unnecessary dependencies, reducing requests, deferring scripts, and keeping styles maintainable are meaningful improvements. Accessibility is part of the structure and behavior of the interface: semantic landmarks, descriptive labels, live feedback, keyboard access, contrast, and motion preferences help more people use the same page.

## 8. Submission checklist
- [ ] `index.html` opens and links to `styles.css` and `script.js`.
- [ ] Add, complete, delete, filter, search, and clear-completed controls work.
- [ ] All controls can be reached and operated using a keyboard.
- [ ] Empty and duplicate form submissions show a useful error.
- [ ] Run and attach actual Lighthouse and WAVE/axe results before final submission if required by the instructor.
