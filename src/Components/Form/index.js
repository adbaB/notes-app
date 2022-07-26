import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.css";
import { useState } from "react";

export const Form = ({
  openModal,
  setOpenModal,
  addTodo,
  children,
}) => {
  const [newTodoValue, setNewTodoValue] = useState("");

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };
  const handlerModal = () => setOpenModal(false);
  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} onHide={handlerModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create new Note</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <textarea
            value={newTodoValue}
            onChange={onChange}
            placeholder="Cortar la cebolla oara el almuerzo"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
