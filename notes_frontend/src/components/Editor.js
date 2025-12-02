import React, { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Editor for a single note (title + body)
 */
export default function Editor({
  note,
  onChange,
  onCreate,
  onDelete,
  onDuplicate,
}) {
  // Keyboard shortcuts: Cmd/Ctrl+S to "save" (noop but we prevent default), Cmd/Ctrl+N to new
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        // autosave already occurs onChange; provide subtle feedback using title flicker
        const el = document.getElementById("title-input");
        if (el) {
          el.style.boxShadow = "0 0 0 6px rgba(37,99,235,0.25)";
          setTimeout(() => (el.style.boxShadow = ""), 240);
        }
      }
      if (mod && e.key.toLowerCase() === "n") {
        e.preventDefault();
        onCreate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCreate]);

  if (!note) {
    return (
      <div className="empty" role="status">
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            No note selected
          </div>
          <div>
            Create a new note with <kbd>New</kbd> or use <kbd>Ctrl/Cmd + N</kbd>
          </div>
        </div>
      </div>
    );
  }

  const onTitle = (e) =>
    onChange({
      ...note,
      title: e.target.value,
    });

  const onBody = (e) =>
    onChange({
      ...note,
      body: e.target.value,
    });

  return (
    <div className="main">
      <div className="main-toolbar" role="toolbar" aria-label="Editor actions">
        <input
          id="title-input"
          className="title-input"
          placeholder="Note title"
          aria-label="Note title"
          value={note.title}
          onChange={onTitle}
        />
        <button className="btn secondary" onClick={onDuplicate} aria-label="Duplicate note">
          Duplicate
        </button>
        <button
          className="btn danger"
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
        >
          Delete
        </button>
      </div>
      <div className="editor">
        <textarea
          className="textarea"
          placeholder="Start typing your note here…"
          aria-label="Note content"
          value={note.body}
          onChange={onBody}
        />
      </div>
    </div>
  );
}
