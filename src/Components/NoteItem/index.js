import React from 'react';

import Badge from 'react-bootstrap/Badge';
import { BsFillStickyFill,BsPencilFill,BsX,BsFillArchiveFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './NoteItem.css';


function NoteItem({note,onDelete}) {
  return (
    <li className="NoteItem">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title> <BsFillStickyFill/> {note.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
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
       <Button variant="light"><BsFillArchiveFill/></Button>

       <Button variant="light"><BsPencilFill/></Button>
       <Button variant="light" onClick={onDelete}><BsX/></Button>
      </Card.Body>
    </Card>
    </li>
  );
}

export { NoteItem };
