import React from "react";

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

/**
 * PUBLIC_INTERFACE
 * List item representing a single note
 */
export default function NoteListItem({ note, active, onClick, onDelete }) {
  const title = note.title?.trim() || "Untitled";
  const preview =
    (note.body || "").replace(/\s+/g, " ").trim().slice(0, 80) ||
    "No content yet…";

  return (
    <div
      className={`note-item ${active ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-pressed={active}
      aria-label={`Open note ${title}`}
    >
      <div>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
        <div style={{ color: "#6B7280", fontSize: 13 }}>{preview}</div>
        <div className="note-meta">
          <span>Updated</span>
          <span aria-label="Last updated">{formatTime(note.updatedAt)}</span>
        </div>
      </div>
      <div>
        <button
          className="btn danger"
          aria-label={`Delete note ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete note"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
