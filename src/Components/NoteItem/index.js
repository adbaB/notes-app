import React from 'react';

import Badge from 'react-bootstrap/Badge';

import { BiArchiveIn,BiArchiveOut,BiX,BiEditAlt,BiNote } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './NoteItem.css';


function NoteItem({note,onDelete,onArchive,onEdit}) {
  return (
    <li className="NoteItem">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title> <BiNote/> {note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">last Edi: 2022/05/05</Card.Subtitle>
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
        <p>{note.id}</p>
       <Button variant="light" onClick={onArchive}>
        {note.archived ? <BiArchiveOut/> : <BiArchiveIn/> }
       </Button>

       <Button variant="light" onClick={onEdit}><BiEditAlt/></Button>
       <Button variant="light" onClick={onDelete}><BiX/></Button>
      </Card.Body>
    </Card>
    </li>
  );
}

export { NoteItem };
