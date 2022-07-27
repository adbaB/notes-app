import React from 'react';

import Badge from 'react-bootstrap/Badge';

import { BiArchiveIn,BiArchiveOut,BiX,BiEditAlt,BiNote } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './NoteItem.css';


function NoteItem({note,onDelete,onArchive,onEdit}) {
  return (
    <li >
    <Card  bg ="ligth" style={{ height: '300px', width : '265px' }}>
      <Card.Body >
        <Card.Title> <BiNote/> {note.title}</Card.Title>
        <Card.Text>
         {note.content}
        </Card.Text>
        <div>
          {note.categories.map((categorie,index) => {
            return (
            <Badge key= {index} pill bg="light" text="dark">
            {categorie}
          </Badge>)
          })}
        </div>
          <div className='card-footer'>
          <p>last Edi: 2022/05/05</p>
       <Button variant="light" onClick={onArchive}>
        {note.archived ? <BiArchiveOut/> : <BiArchiveIn/> }
       </Button>

       <Button variant="light" onClick={onEdit}><BiEditAlt/></Button>
       <Button variant="light" onClick={onDelete}><BiX/></Button>
          </div>
      </Card.Body>
    </Card>
    </li>
  );
}

export { NoteItem };
