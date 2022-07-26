import React from 'react';
import { NoteIcon } from '.';

function DeleteIcon({ onDelete }) {
  return (
    <NoteIcon
      type="delete"
      onClick={onDelete}
    />
  );
}

export { DeleteIcon };
