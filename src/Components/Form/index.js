import { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Modal.css";

export const Form = ({ openModal, setOpenModal,action,type,noteEdit }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [tags, setTags] = useState([]);

useEffect(()=>{
  
  if(noteEdit){
    if(JSON.stringify(noteEdit) !== '{}'){
    
      setInputTitleValue(noteEdit.title)
      setTextAreaValue(noteEdit.content)
      setTags(noteEdit.categories)
    }
    
  }
},[noteEdit])

  const handlerKeyDown = (event) => {
    if (event.key !== "Enter") return;
    const value = event.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    event.target.value = "";
    setIsKeyDown(true);
  };
  const handlerModal = () =>{
    setInputTitleValue("");
    setTextAreaValue("");
    setTags([])
    setOpenModal(false);
  } 
  
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
    console.log(noteEdit)
    let value = {}
    if(noteEdit){
      value = {
        title: inputTitleValue,
        content: textAreaValue,
        categories: tags,
        archived: false,
        id : noteEdit.id ,
        date: noteEdit.date
  
      }
    }
    else{
      value = {
        title: inputTitleValue,
        content: textAreaValue,
        categories: tags,
        archived: false
      }

    }
    action(value);
    setInputTitleValue("");
    setTextAreaValue("");
    setOpenModal(false);
    setTags([])
  };

  const removeTag = (index) =>{
    setTags(tags.filter((tag,i)=> i !== index ))
  }

  return (
    <Modal size="lg" show={openModal} onHide={handlerModal} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{type} Note</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <label>Title</label>
          <input
            type="text"
            placeholder="Titler"
            onChange={onChangeInput}
            value={inputTitleValue}
          ></input>
          <label>Content</label>
          <textarea
            value={textAreaValue}
            onChange={onChangeTextArea}
            placeholder="Cortar la cebolla para el almuerzo"
          />
          <label>Categories</label>
          <div className="tags-input-container">
            { tags.length >= 1 &&  tags.map((tag, index) => (
              <div key={index} className="tag-item">
                <span className="text"> {tag}</span>
                <span className="close" onClick={()=> removeTag(index)}> &times;</span>
              </div>
            ))}
            <input
              type="text"
              className="tag-input"
              placeholder="type Categorie..."
              onKeyDown={handlerKeyDown}
            />
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
      </form>
    </Modal>
  );
};
