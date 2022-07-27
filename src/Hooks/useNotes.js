import {useState} from 'react';
import uuid from 'react-uuid';
import { useLocalStorage } from './useLocalStorage';



export function useNotes() {
  const {
    item: notes,
    saveItem: saveNote,
    loading,
    error,
  } = useLocalStorage('NOTES', []);
  const [searchValue, setSearchValue] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeArchive,setActiveArchive] = useState(false);
  const [optionFilter, setOptionFilter] = useState([])
  const [noteEdit, setNoteEdit] = useState({})
  const [idDelete, setIdDelete] = useState("")

  const archivedNoteList = notes.filter(note => !!note.archived).length;
  const totalNotes = notes.length;

  let filterNotes = [];
  if (activeArchive){
    filterNotes = notes.filter(note => !!note.archived ) 
  }
  else {
    filterNotes = notes.filter(note => !note.archived )
  }
  if (searchValue.length >= 1) {
    filterNotes = notes.filter(notes => {
      const notesText = notes.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return notesText.includes(searchText);
    });
  } 
  const addTagFilter = (categories) => {
    categories.forEach(categorie => {
      console.log(categorie)
      const newArray = [...optionFilter]
      if (!newArray.includes(categorie.toLowerCase())){
        newArray.push(categorie.toLowerCase())
      }
      setOptionFilter(newArray)
      
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
      totalNotes,
      archivedNoteList,
      searchValue,
      setSearchValue,
      filterNotes,
      addNote,
      updateNote,
      deleteNote,
      openCreateModal,
      setOpenCreateModal,
      openUpdateModal,
      setOpenUpdateModal,
      ArchiveNote,
      handlerEditNote,
      noteEdit,
      openDeleteModal,
      setOpenDeleteModal,
      idDelete,
      handlerDeleteNote,
      setActiveArchive,
      activeArchive,
      optionFilter
    });
}


