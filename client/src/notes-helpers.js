export function findFolder(folders = [], folder_id) {
  return folders.find(folder => folder.id === folder_id)
}

export function findNote(notes = [], noteId) {
  const output = notes.find(note => note.id == noteId)
  return output;
}

export function getNotesForFolder(notes = [], folder_id) {
  if (!folder_id) return notes;
  else return notes.filter(note => note.folder_id == folder_id)
}

export function countNotesForFolder(notes = [], folder_id) {
  return notes.filter(note => note.folder_id === folder_id).length
}