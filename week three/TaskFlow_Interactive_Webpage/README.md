# TaskFlow: Interactive Task Manager

A responsive static webpage enhanced with plain JavaScript. No framework, build process, or third-party JavaScript library is required.

## Files
- `index.html` — semantic page structure and interactive controls
- `styles.css` — responsive layout, theme styles, focus states, and motion
- `script.js` — DOM updates, event handlers, validation, filtering, progress, and notifications
- `TaskFlow_Technical_Report.docx` — technical implementation report

## Run the project
1. Download and extract the ZIP file.
2. Keep all three source files in the same folder.
3. Open `index.html` in a modern browser. For a local server, use VS Code Live Server if available.
4. Try adding, completing, searching, filtering, deleting, and clearing tasks. Use the moon/sun button to switch themes.

## Implemented features
- Add tasks with low, medium, or high priority
- Reject blank and duplicate task names
- Mark tasks complete or active
- Delete tasks and clear all completed tasks
- Filter by all, active, or completed
- Search task titles as the user types
- Update summary counters and completion progress
- Toggle light/dark theme
- Toast feedback, keyboard focus states, responsive layout, and reduced-motion support

## Notes
Tasks are held in JavaScript memory and reset when the page reloads. This is intentional for a self-contained static-page assignment. Browser storage or a backend could be added later if persistence is required.
