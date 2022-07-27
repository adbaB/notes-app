import React from 'react'
import { BiArchive } from "react-icons/bi";
import Button from "react-bootstrap/Button";
export const ArchivedButton = ({setActiveArchive,activeArchive}) => {
  const handlerClick = () => {
    setActiveArchive(!activeArchive)
  }
  return (
    <Button variant='ligth' onClick={handlerClick}>
      <BiArchive/>
    </Button>
  )
}
