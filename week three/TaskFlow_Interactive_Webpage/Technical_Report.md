# TaskFlow: Interactive Static Webpage
## Technical Implementation Report

**Project type:** Responsive static webpage with interactive task management  
**Technologies:** HTML5, CSS3, Vanilla JavaScript  
**Deliverables:** `index.html`, `styles.css`, `script.js`, `README.md`, this report

## 1. Introduction
The objective is to enhance a static webpage with interactive behavior using plain JavaScript. TaskFlow demonstrates DOM manipulation, event handling, form validation, dynamic rendering, and user-interface feedback without a JavaScript framework or build tool.

## 2. Objectives
- Build a clean responsive interface using semantic HTML and CSS.
- Handle user actions with JavaScript event listeners.
- Add, complete, delete, search, and filter tasks.
- Validate blank and duplicate task names.
- Update summary counts and progress dynamically.
- Provide light/dark themes and accessible controls.

## 3. Features
- Add task with low, medium, or high priority.
- Reject blank and duplicate task names with inline feedback.
- Toggle completion state and delete tasks.
- Filter All, Active, and Completed tasks.
- Search task titles as the user types.
- Update total, completed, remaining, and percentage-complete statistics.
- Clear completed tasks.
- Toggle light/dark theme and show toast notifications.
- Responsive layout, focus indicators, ARIA labels, and reduced-motion support.

## 4. Code Structure
- `index.html`: semantic page structure and controls.
- `styles.css`: design tokens, component styles, responsive breakpoints, themes, and animations.
- `script.js`: task state, event listeners, validation, rendering, search/filter logic, and statistics.
- `README.md`: setup instructions and feature list.

## 5. Implementation
Tasks are stored in an array of objects containing `id`, `title`, `priority`, and `completed`. `renderTasks()` rebuilds the visible list and recalculates the statistics after each action. Event listeners handle form submission, filtering, searching, completion, deletion, clearing completed tasks, and theme switching.

The form uses `preventDefault()` to avoid reloading the page. The task name is trimmed and checked for blank or duplicate input. User-provided task titles are inserted using `textContent`, not `innerHTML`, to avoid treating text as markup. The CSS uses Grid and Flexbox for layout and media queries for mobile adaptation.

## 6. Testing
| Test | Expected result |
|---|---|
| Add valid task | Task appears and counters update |
| Empty input | Inline validation is shown |
| Duplicate title | Duplicate is rejected |
| Complete task | Status and progress update |
| Filter/search | Only matching tasks appear |
| Delete/clear completed | Tasks are removed and counters update |
| Toggle theme | Light/dark appearance changes |
| Narrow viewport | Layout adapts to mobile width |

Manually test these cases in a browser before final submission.

## 7. Challenges and Solutions
- **UI synchronization:** central `renderTasks()` keeps list and statistics consistent.
- **Input errors:** inline validation gives immediate feedback.
- **Search plus filters:** both conditions are applied when deriving visible tasks.
- **Safe DOM updates:** task titles use `textContent`.
- **Responsive behavior:** CSS breakpoints simplify the layout on small screens.
- **Accessibility:** descriptive button labels, pressed states, focus indicators, and live status regions are included.

## 8. Limitations and Future Work
Tasks are stored in memory and reset on page refresh. Future improvements could add `localStorage`, due dates, task editing, sorting, automated tests, and a backend API.

## 9. How to Run
1. Extract the ZIP.
2. Keep the three source files in one folder.
3. Open `index.html` in a modern browser, or use VS Code Live Server.
4. Test all interactive controls.

## 10. Conclusion
TaskFlow demonstrates how HTML, CSS, and vanilla JavaScript can turn a static page into a usable interactive interface. It covers event handling, DOM manipulation, validation, dynamic state updates, responsive design, and accessibility-conscious interaction.
