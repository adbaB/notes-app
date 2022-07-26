import React from 'react';
import { NoteCounter } from '../NoteCounter';
import { NoteList } from '../NoteList';
import { NoteItem } from '../NoteItem';
import { NotesError } from '../NotesError';
import { NotesLoading } from '../NotesLoading';
import { EmptyNotes } from '../EmptyNotes';

import { CreateNoteButton } from '../CreateNoteButton';
import { Form } from '../Form';
import { Header } from '../Header';
import { useNotes } from '../../Hooks/useNotes';

function App() {
  
    const {
      error,
      loading,
      searchedNotes,
      deleteNote,
      openModal,
      setOpenModal,
      addNote,
      totalNotes    
    } = useNotes();
     
    return (
      <>
      <Header>
        <NoteCounter totalNotes = {totalNotes} />
        <CreateNoteButton
          setOpenModal={setOpenModal}
        />
      </Header>
  
        <NoteList>
          {error && <NotesError />}
          {loading && <NotesLoading />}
          {(!loading && !searchedNotes.length) && <EmptyNotes />}
          
          {searchedNotes.map((note) => (
            <NoteItem
              key={note.id}
              note ={note}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </NoteList>
  
       
          <Form 
          openModal = {openModal} 
          setOpenModal = {setOpenModal} action = {addNote} />
          
       
      
  
      
      </>
    );

}

export default App;
