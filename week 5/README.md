# TaskFlow SPA Demo

A small Single Page Application simulation built with plain HTML, CSS, and JavaScript.

## Structure
- `index.html` - persistent app shell and navigation
- `css/styles.css` - styling, responsive layout, transitions and themes
- `js/app.js` - hash router, dynamic views, shared task state
- `docs/Technical_Report.md` - architecture, challenges and test steps
- `docs/Technical_Report.pdf` - PDF report
- `docs/Technical_Report.docx` - editable report

## Run
Open `index.html` in a modern browser. If local-file restrictions occur, run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

Routes: `#/dashboard`, `#/tasks`, `#/insights`, `#/about`.

Task data is kept in memory and resets after a full browser refresh. No dependencies or build tools are required.
