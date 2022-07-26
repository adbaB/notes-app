import React from 'react';
import './NoteList.css'

function NoteList(props) {
  return (
    <section>
      <ul>
        {props.children}
      </ul>
    </section>
  );
}

export { NoteList };
