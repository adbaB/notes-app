import React from 'react';
import uuid from 'react-uuid';
import { useLocalStorage } from './useLocalStorage';



export function useNotes() {
  const {
    item: notes,
    saveItem: saveNote,
    loading,
    error,
  } = useLocalStorage('NOTES', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const archivedNote = notes.filter(note => !!note.archived).length;
  const totalNotes = notes.length;

  let searchedNotes = [];

  if (!searchValue.length >= 1) {
    searchedNotes = notes;
  } else {
    searchedNotes = notes.filter(notes => {
      const notesText = notes.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return notesText.includes(searchText);
    });
  }

  const addNote = (newNote) => {
    newNote.id = uuid()
    console.log(newNote)
    const newNotes = [...notes];
    newNotes.push(newNote);
    saveNote(newNotes);
  };

  const updateNote = (editNote) => {
    const noteIndex = notes.findIndex(note => note.id === editNote.id);
    const newNote = [...notes];
    newNote[noteIndex] = editNote;
    saveNote(newNote);
  };

  const deleteNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    const newNotes = [...notes];
    newNotes.splice(noteIndex, 1);
    saveNote(newNotes);
  };
  
  return ({
      loading,
      error,
      totalNotes,
      archivedNote,
      searchValue,
      setSearchValue,
      searchedNotes,
      addNote,
      updateNote,
      deleteNote,
      openModal,
      setOpenModal,
    });
}


