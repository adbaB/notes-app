import {useState} from 'react'

import { Login } from '../login'
import Main from '../Main/Main'

export const App = () => {

  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      {(username === 'admin' && password === '123') ? <Main/> :<Login setUsername= {setUsername} setPassword = {setPassword}/>}
      
    </>
  )
}
