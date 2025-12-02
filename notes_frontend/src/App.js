import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./theme.css";
import "./index.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { loadNotes, saveNotes } from "./utils/storage";

/**
 * Generate a simple id
 */
function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/**
 * PUBLIC_INTERFACE
 * App renders the full note-keeper UI.
 * - Sidebar with search and list
 * - Main editor area
 * - Notes persist in localStorage under configurable key
 */
function App() {
  const [notes, setNotes] = useState(() => {
    const initial = loadNotes();
    return initial.map((n) => ({
      id: n.id || uid(),
      title: n.title || "",
      body: n.body || "",
      createdAt: n.createdAt || Date.now(),
      updatedAt: n.updatedAt || Date.now(),
    }));
  });
  const [activeId, setActiveId] = useState(() => notes[0]?.id || null);
  const [search, setSearch] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Persist notes on change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Filter and sort by updatedAt desc
  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.body.toLowerCase().includes(q)
        )
      : notes.slice();
    return arr.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }, [notes, search]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) || null,
    [notes, activeId]
  );

  // PUBLIC_INTERFACE
  const createNote = useCallback(() => {
    const n = {
      id: uid(),
      title: "Untitled",
      body: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((prev) => [n, ...prev]);
    setActiveId(n.id);
    // Show sidebar on small screens when creating
    setSidebarVisible(false);
  }, []);

  // PUBLIC_INTERFACE
  const duplicateNote = useCallback(() => {
    if (!activeNote) return;
    const clone = {
      ...activeNote,
      id: uid(),
      title: `${activeNote.title || "Untitled"} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes((prev) => [clone, ...prev]);
    setActiveId(clone.id);
  }, [activeNote]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(
    (id) => {
      const note = notes.find((n) => n.id === id);
      const title = note?.title?.trim() || "this note";
      if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
      const next = notes.filter((n) => n.id !== id);
      setNotes(next);
      if (activeId === id) {
        setActiveId(next[0]?.id || null);
      }
    },
    [notes, activeId]
  );

  // PUBLIC_INTERFACE
  const updateNote = useCallback(
    (draft) => {
      const cleaned = {
        ...draft,
        title: (draft.title || "").slice(0, 200),
        body: draft.body || "",
        updatedAt: Date.now(),
      };
      setNotes((prev) => prev.map((n) => (n.id === draft.id ? cleaned : n)));
    },
    [setNotes]
  );

  // Toggle sidebar for small screens
  const onToggleSidebar = () => setSidebarVisible((v) => !v);

  // Responsive behavior: hide sidebar by default on small screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setSidebarVisible(!mq.matches ? true : false);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Header onToggleSidebar={onToggleSidebar} sidebarVisible={sidebarVisible} />
      <div className="app-shell" role="application" aria-label="Note Keeper">
        {sidebarVisible && (
          <Sidebar
            notes={filteredNotes}
            activeId={activeId}
            onSelect={setActiveId}
            onCreate={createNote}
            onDelete={deleteNote}
            search={search}
            setSearch={setSearch}
          />
        )}
        <main>
          <Editor
            note={activeNote}
            onChange={updateNote}
            onCreate={createNote}
            onDelete={deleteNote}
            onDuplicate={duplicateNote}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
