import React from "react";
import NoteListItem from "./NoteListItem";

/**
 * Sidebar: search, new note button, and list of notes
 * PUBLIC_INTERFACE
 */
export default function Sidebar({
  notes,
  activeId,
  onSelect,
  onCreate,
  onDelete,
  search,
  setSearch,
}) {
  return (
    <aside className="sidebar" aria-label="Notes list">
      <div className="sidebar-header">
        <input
          className="search-input"
          placeholder="Search notes…"
          aria-label="Search notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={onCreate} aria-label="Create new note">
          + New
        </button>
      </div>
      <div className="note-list">
        {notes.length === 0 ? (
          <div className="empty" role="status">
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>No notes</div>
              <div>Create your first note with the “New” button</div>
            </div>
          </div>
        ) : (
          notes.map((n) => (
            <NoteListItem
              key={n.id}
              note={n}
              active={n.id === activeId}
              onClick={() => onSelect(n.id)}
              onDelete={() => onDelete(n.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
