import React from 'react';
import { BiNote,BiBox } from "react-icons/bi";
import './NoteCounter.css';

function NoteCounter({ activeArchive}) {

  
  return (
    <h2 className="NoteCounter"> {!activeArchive ?<> <BiNote/> My Notes</>   : <> <BiBox/> Archived Notes</>}  </h2>
  );
}

export { NoteCounter };
