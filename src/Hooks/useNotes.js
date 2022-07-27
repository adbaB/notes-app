import {useEffect, useState} from 'react';
import uuid from 'react-uuid';
import { useLocalStorage } from './useLocalStorage';



export function useNotes() {
  const {
    item: notes,
    saveItem: saveNote,
    loading,
    error,
  } = useLocalStorage('NOTES', []);
  const {
    item: categorie,
    saveItem: saveCategorie
  } = useLocalStorage('CATEGORIES', []);
  const [searchValue, setSearchValue] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeArchive,setActiveArchive] = useState(false);
  const [optionFilter, setOptionFilter] = useState([])
  const [noteEdit, setNoteEdit] = useState({})
  const [idDelete, setIdDelete] = useState("")

  
  useEffect(() => {

    setOptionFilter(categorie)
  
  }, [categorie])
  
  let filterNotes = [];
  if (activeArchive){
    filterNotes = notes.filter(note => !!note.archived ) 
  }
  else {
    filterNotes = notes.filter(note => !note.archived )
  }
  if (searchValue) {
    console.log(searchValue)
    filterNotes = filterNotes.filter(notes => {
      return notes.categories.includes(searchValue)
    });
  } 
  const addTagFilter = (categories) => {
    const newArray = [...optionFilter]
    categories.forEach(categorie => { 
      if (!newArray.includes(categorie.toLowerCase())){
        newArray.push(categorie.toLowerCase())
        console.log(newArray)
      }
      setOptionFilter(newArray)
    
      saveCategorie(newArray)  
    });
  }
  const addNote = (newNote) => {
    newNote.id = uuid()
    newNote.date = new Date()
   
    const newNotes = [...notes];
    newNotes.push(newNote);
    addTagFilter(newNote.categories)
    saveNote(newNotes);
  };

  const updateNote = (editNote) => {
    const noteIndex = notes.findIndex(note => note.id === editNote.id);
    const newNote = [...notes];
    console.log(editNote)
    
    newNote.splice(noteIndex, 1, editNote);
    console.log(newNote[noteIndex])
    addTagFilter(editNote.categories)
    saveNote(newNote);
  };

  const deleteNote = (id) => {
    
    const noteIndex = notes.findIndex(note => note.id === id);
    const newNotes = [...notes];
    newNotes.splice(noteIndex, 1);
    saveNote(newNotes);
    setOpenDeleteModal(false)
  };

  const ArchiveNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    const newNote = [...notes];
    newNote[noteIndex].archived = !newNote[noteIndex].archived ;
  
    saveNote(newNote);
  }

  const handlerEditNote = (note) => {
    setNoteEdit(note)
    setOpenUpdateModal(true)
  }
 const handlerDeleteNote = (id) =>{
    setIdDelete(id)
    setOpenDeleteModal(true)
 }
  
  return ({
      loading,
      error,
      filterNotes,
      deleteNote,
      openCreateModal,
      setOpenCreateModal,
      openUpdateModal,
      setOpenUpdateModal,
      addNote,
      updateNote,
      ArchiveNote,
      handlerEditNote,
      noteEdit,
      openDeleteModal,
      setOpenDeleteModal,
      idDelete,
      handlerDeleteNote,
      setActiveArchive,
      activeArchive,
      optionFilter,
      setSearchValue,
    });
}


