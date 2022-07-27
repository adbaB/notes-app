import React from 'react';
import './NoteList.css'

function NoteList(props) {
  return (
    <section>
      <ul className='wrapper'>
        {props.children}
      </ul>
    </section>
  );
}

export { NoteList };
