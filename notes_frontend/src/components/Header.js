import React from "react";

/**
 * Simple header with brand and sidebar toggle for mobile
 * PUBLIC_INTERFACE
 */
export default function Header({ onToggleSidebar, sidebarVisible }) {
  /** This is a public component. */
  return (
    <div className="header" role="banner">
      <div className="brand" aria-label="Note Keeper">
        <span className="brand-badge" aria-hidden="true" />
        <span>Note Keeper</span>
      </div>
      <button
        className="btn ghost"
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        onClick={onToggleSidebar}
      >
        {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
      </button>
    </div>
  );
}
