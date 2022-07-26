import React from 'react';

import './NoteCounter.css';

function NoteCounter({ totalNotes}) {

  
  return (
    <h2 className="NoteCounter"> My Notes {totalNotes} </h2>
  );
}

export { NoteCounter };
