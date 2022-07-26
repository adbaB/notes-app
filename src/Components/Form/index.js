import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.css";
import { useState } from "react";

export const Form = ({ openModal, setOpenModal, action }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };
  const onChangeTextArea = (event) => {
    setTextAreaValue(event.target.value);
  };
  const handlerModal = () => setOpenModal(false);
  const onSubmit = (e) => {
    e.preventDefault();
    action({
      title: inputValue,
      content: textAreaValue,
      categories: ['github','example'],
      archived: false
    });
    setInputValue("")
    setTextAreaValue("")
    setOpenModal(false);
  };
  return (
    <Modal show={openModal} onHide={handlerModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create new Note</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <label>Title</label>
          <input
            type="text"
            placeholder="Titler"
            onChange={onChangeInput}
            value={inputValue}
          ></input>
          <label>Content</label>
          <textarea
            value={textAreaValue}
            onChange={onChangeTextArea}
            placeholder="Cortar la cebolla para el almuerzo"
          />
          <label>Categories</label>
          <div>Categories</div>
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
