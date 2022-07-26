import React from 'react';
import './CreateTodoButton.css';
import Button from 'react-bootstrap/Button'
function CreateNoteButton({setOpenModal}) {
  const onClickButton = () => {
    setOpenModal(true);
  };

  return (
    <Button
      variant = "primary"
      onClick={onClickButton}
    >
     Create +
    </Button>
  );
}

export { CreateNoteButton };
