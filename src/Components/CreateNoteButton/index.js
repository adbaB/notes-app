import React from 'react';
import Button from 'react-bootstrap/Button'
import {FiPlus} from 'react-icons/fi'
import './CreateNoteButton.css';
function CreateNoteButton({setOpenModal}) {
  const onClickButton = () => {
    setOpenModal(true);
  };

  return (
    <li className='add-box'>
    <Button className='icon'
    
      onClick={onClickButton}
    >
     <FiPlus/>
    </Button>
    <p>Add new Note</p>
    </li>
  );
}

export { CreateNoteButton };
