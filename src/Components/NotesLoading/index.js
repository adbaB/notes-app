import React from 'react';
import './NotesLoading.css';

function NotesLoading() {
  return (
    <div className="LoadingNote-container">
      <span className="LoadingNote-completeIcon"></span>
      <p className="LoadingNote-text">Cargando Notes...</p>
      <span className="LoadingNote-deleteIcon"></span>
    </div>
  );
}

export { NotesLoading };
