import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";

export const FormNote = ({
  openModal,
  setOpenModal,
  action,
  type,
  noteEdit,
  findCategory,
}) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (noteEdit) {
      if (JSON.stringify(noteEdit) !== "{}") {
        setInputTitleValue(noteEdit.title);
        setTextAreaValue(noteEdit.description);
        setTags(noteEdit.categories);
      }
    }
  }, [noteEdit]);

  const handlerKeyDown = (event) => {
    if (event.key !== "Enter") return;
    let value = event.target.value;
    if (!value.trim()) return;
    value = value.toLowerCase();
    const id = findCategory(value);
    setTags([...tags, { id: id, description: value }]);
    event.target.value = "";
    setIsKeyDown(true);
  };
  const handlerModal = () => {
    setInputTitleValue("");
    setTextAreaValue("");
    setTags([]);
    setOpenModal(false);
  };

  const onChangeInput = (event) => {
    setInputTitleValue(event.target.value);
  };

  const onChangeTextArea = (event) => {
    setTextAreaValue(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isKeyDown) {
      setIsKeyDown(false);
      return;
    }

    let value = {};
    if (noteEdit) {
      value = {
        title: inputTitleValue,
        description: textAreaValue,
        categories: tags,
        archived: false,
        id: noteEdit.id,
      };
    } else {
      value = {
        title: inputTitleValue,
        description: textAreaValue,
        categories: tags,
        archived: false,
      };
    }
    action(value);
    setInputTitleValue("");
    setTextAreaValue("");
    setOpenModal(false);
    setTags([]);
  };

  const removeTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Modal size="lg" show={openModal} onHide={handlerModal} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{type} Note</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body className="body-container">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={onChangeInput}
              value={inputTitleValue}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={textAreaValue}
              onChange={onChangeTextArea}
              placeholder="Write your text here..."
            />
          </Form.Group>
          <div>
            <label>Categories</label>
            <div className="tags-input-container">
              {tags.length >= 1 &&
                tags.map((tag, index) => (
                  <div key={tag.id} className="tag-item">
                    <span className="text"> {tag.description}</span>
                    <span className="close" onClick={() => removeTag(tag.id)}>
                      {" "}
                      &times;
                    </span>
                  </div>
                ))}
              <input
                type="text"
                className="tag-input"
                placeholder="type Categorie..."
                onKeyDown={handlerKeyDown}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
