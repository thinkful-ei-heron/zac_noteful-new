export function findFolder(folders = [], folderId) {
  return folders.find(folder => folder.id === folderId)
}

export function findNote(notes = [], noteId) {
  console.log(notes);
  console.log(noteId);
  const output = notes.find(note => note.id == noteId);
  console.log(output);
  return output;
}

export function getNotesForFolder(notes = [], folderId) {
  let output;
  (!folderId) ? output = notes : output = notes.filter(note => note.folderId === folderId)
  return output;
}

export function countNotesForFolder(notes = [], folderId) {
  return notes.filter(note => note.folderId === folderId).length
}