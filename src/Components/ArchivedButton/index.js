import React from 'react'
import { BiArchive } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import './index.css'
export const ArchivedButton = ({setActiveArchive,activeArchive}) => {
  const handlerClick = () => {
    setActiveArchive(!activeArchive)
  }
  return (
    <Button  className='archive' onClick={handlerClick}>
      <BiArchive/>
    </Button>
  )
}
