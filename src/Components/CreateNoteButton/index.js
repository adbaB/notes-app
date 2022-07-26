import React from 'react';
import Button from 'react-bootstrap/Button'
import './CreateNoteButton.css';
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
