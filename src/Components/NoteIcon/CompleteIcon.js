import React from 'react';
import { NoteIcon } from '.';

function CompleteIcon({ completed, onComplete }) {
  return (
    <NoteIcon
      type="check"
      color={completed ? '#4caf50' : 'gray'}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };
