import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export function useNotes() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [activeArchive, setActiveArchive] = useState(false);
  const [optionFilter, setOptionFilter] = useState([]);
  const [noteEdit, setNoteEdit] = useState({});
  const [idDelete, setIdDelete] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then((categories) => {
      setOptionFilter(categories.data.categories);
    });
  }, [API_URL]);
  useEffect(() => {
    try {
      setLoading(true);
      if (!searchValue) {
        axios
          .get(`${API_URL}/notes/?archived=${activeArchive}`)
          .then((response) => {
            setNotes(response.data.notes);
          });
      } else {
        axios
          .get(
            `${API_URL}/notes/?archived=${activeArchive}&categoryId=${searchValue}`
          )
          .then((response) => {
            setNotes(response.data.notes);
          });
      }

      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [activeArchive, API_URL, searchValue]);
  const addTagFilter = async (categories) => {
    const newArray = [...optionFilter];
    categories.forEach((categorie) => {
      if (!newArray.some((item) => item.id === categories.id)) {
        axios
          .post(`${API_URL}/categories`, {
            id: categorie.id,
            description: categorie.description.toLowerCase(),
          })
          .then((response) => {
            newArray.push({
              id: response.data.newCategory.id,
              description: categorie.description.toLowerCase(),
            });
          });
      }
      setOptionFilter(newArray);
    });
  };
  //pendiente
  const addNote = async (newNote) => {
    newNote.id = uuid();

    let categorieArray = Array.from(newNote.categories, (item) => item.id);

    await addTagFilter(newNote.categories);

    await axios.post(`${API_URL}/notes`, {
      id: newNote.id,
      title: newNote.title,
      description: newNote.description,
      archived: newNote.archived,
      categoriesIds: categorieArray,
    });
    const newNotes = [...notes];
    newNotes.push(newNote);
    setNotes(newNotes);
  };

  const findCategory = (category) => {
    if (
      optionFilter.some(
        (item) => item.description.toLowerCase() === category.toLowerCase()
      )
    ) {
      const id = optionFilter.find(
        (item) => item.description.toLowerCase() === category.toLowerCase()
      ).id;
      return id;
    }
    return uuid();
  };
  //pendiente
  const updateNote = (editNote) => {
    const noteIndex = notes.findIndex((note) => note.id === editNote.id);
    const newNote = [...notes];
    let categorieArray = Array.from(editNote.categories, (item) => item.id);
    const updateSchema = {
      title: editNote.title,
      description: editNote.description,
      archived: editNote.archived,
      categoriesIds: categorieArray,
    };

    axios
      .put(`${API_URL}/notes/${editNote.id}`, updateSchema)
      .then((response) => {});
    newNote.splice(noteIndex, 1, editNote);

    addTagFilter(editNote.categories);

    setNotes(newNote);
  };

  const deleteNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    const newNotes = [...notes];
    newNotes.splice(noteIndex, 1);
    axios.delete(`${API_URL}/notes/${id}`);
    setNotes(newNotes);
    setOpenDeleteModal(false);
  };

  const ArchiveNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    const newNote = [...notes];
    axios
      .put(`${API_URL}/notes/${id}`, { archived: !newNote[noteIndex].archived })
      .then((response) => {});
    newNote[noteIndex].archived = !newNote[noteIndex].archived;
    setNotes(newNote);
  };

  const handlerEditNote = (note) => {
    setNoteEdit(note);
    setOpenUpdateModal(true);
  };
  const handlerDeleteNote = (id) => {
    setIdDelete(id);
    setOpenDeleteModal(true);
  };

  return {
    loading,
    error,
    filterNotes: notes,
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
    findCategory,
  };
}
