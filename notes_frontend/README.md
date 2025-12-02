# Notes Frontend – Ocean Professional

A lightweight single-page React app for creating, viewing, editing, and deleting notes. Notes are persisted in localStorage and work fully offline. The UI follows the "Ocean Professional" theme.

## Features
- Sidebar with search and a list of notes
- Create, duplicate, edit, and delete notes
- Autosave on edit; Cmd/Ctrl+S shortcut (prevent default) and Cmd/Ctrl+N for new note
- Search filters by title and body content
- Responsive layout with toggleable sidebar on small screens
- Accessible controls with labels and keyboard navigation
- Local persistence with localStorage

## Theming
Colors and layout styles are in `src/theme.css`:
- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

## Persistence
- Notes are stored in localStorage under a configurable key.
- Default key: `nk.notes` (see `src/utils/storage.js`).

Environment variable (optional):
- `REACT_APP_LOCAL_STORAGE_KEY` – override the storage key used by the app.

Data shape:
```json
[
  { "id": "string", "title": "string", "body": "string", "createdAt": 1700000000000, "updatedAt": 1700000000000 }
]
```

## Development
- `npm start` – runs on http://localhost:3000
- `npm test` – CRA test runner
- `npm run build` – production build

## Components
- `Header` – top bar with brand and sidebar toggle
- `Sidebar` – search, create button, and list of notes
- `NoteListItem` – single item in the notes list
- `Editor` – title and body editor, delete and duplicate actions

## Error handling and validation
- Title length is capped at 200 characters.
- All storage operations are try/catch wrapped to avoid throwing on restricted environments.

No backend calls are required; the app is offline-first and stores data locally.
