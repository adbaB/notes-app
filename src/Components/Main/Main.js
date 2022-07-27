import React from "react";
import { NoteCounter } from "../NoteCounter";
import { NoteList } from "../NoteList";
import { NoteItem } from "../NoteItem";
import { NotesError } from "../NotesError";
import { NotesLoading } from "../NotesLoading";
import { EmptyNotes } from "../EmptyNotes";
import {ArchivedButton} from "../ArchivedButton"
import { CreateNoteButton } from "../CreateNoteButton";
import { FormNote } from "../FormNote";
import { Header } from "../Header";
import { useNotes } from "../../Hooks/useNotes";
import { AlertDelete } from "../AlertDelete";
import { FilterNote } from "../FilterNote";

function Main() {
  const {
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
    setSearchValue
  } = useNotes();

  return (
    <div className="main">
      <Header>
        <div className="title-container">
        <NoteCounter  activeArchive = {activeArchive} />
        <ArchivedButton setActiveArchive ={setActiveArchive} activeArchive = {activeArchive} />
        </div>
        <FilterNote optionFilter = {optionFilter} setSearchValue = {setSearchValue} />
      </Header>

      <NoteList>
        {error && <NotesError />}
        {loading && <NotesLoading />}
          <CreateNoteButton setOpenModal={setOpenCreateModal} />
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

      <FormNote
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        action={addNote}
        type="Create"
      />
      <FormNote
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
    </div>
  );
}

export default Main;
