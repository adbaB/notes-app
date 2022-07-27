import React from "react";
import { NoteCounter } from "../NoteCounter";
import { NoteList } from "../NoteList";
import { NoteItem } from "../NoteItem";
import { NotesError } from "../NotesError";
import { NotesLoading } from "../NotesLoading";
import { EmptyNotes } from "../EmptyNotes";
import {ArchivedButton} from "../ArchivedButton"
import { CreateNoteButton } from "../CreateNoteButton";
import { Form } from "../Form";
import { Header } from "../Header";
import { useNotes } from "../../Hooks/useNotes";
import { AlertDelete } from "../AlertDelete";

function App() {
  const {
    error,
    loading,
    filterNotes,
    deleteNote,
    openCreateModal,
    setOpenCreateModal,
    openUpdateModal,
    setOpenUpdateModal,
    addNote,
    updateNote,
    totalNotes,
    archivedNoteList,
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
  } = useNotes();

  return (
    <>
      <Header>
        <NoteCounter totalNotes={totalNotes} />
        <div>
        <CreateNoteButton setOpenModal={setOpenCreateModal} />
        <ArchivedButton setActiveArchive ={setActiveArchive} activeArchive = {activeArchive} optionFilter = {optionFilter}/>
        </div>
      </Header>

      <NoteList>
        {error && <NotesError />}
        {loading && <NotesLoading />}
        {!loading && !filterNotes.length && <EmptyNotes />}

        {filterNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={() => handlerDeleteNote(note.id)}
            onArchive={() => ArchiveNote(note.id)}
            onEdit={() => handlerEditNote(note)}
          />
        ))}
      </NoteList>

      <Form
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        action={addNote}
        type="Create"
      />
      <Form
        openModal={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        action={updateNote}
        type="Edit"
        noteEdit={noteEdit}
      />
      <AlertDelete
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
       
        onDelete={()=>deleteNote(idDelete)}
      />
    </>
  );
}

export default App;
