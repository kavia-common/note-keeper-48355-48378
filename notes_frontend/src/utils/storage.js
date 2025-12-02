//
// Local storage utility for persisting notes
//
// PUBLIC_INTERFACE
export const STORAGE_KEY =
  process.env.REACT_APP_LOCAL_STORAGE_KEY?.trim() || "nk.notes";

/**
 * PUBLIC_INTERFACE
 * Load notes array from localStorage
 * @returns {Array<{id:string,title:string,body:string,updatedAt:number,createdAt:number}>}
 */
export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Save notes array to localStorage
 * @param {Array} notes
 */
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // noop: storage may be full or blocked
  }
}
