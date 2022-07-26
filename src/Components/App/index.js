import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';

import { CreateNoteButton } from '../CreateNoteButton';
import { Form } from '../Form';
import { Header } from '../Header';
import { useNotes } from '../../Hooks/useNotes';

function App() {
  
    const {
      error,
      loading,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
      addTodo,
      totalTodos    
    } = useNotes();
     
    return (
      <>
      <Header>
        <TodoCounter totalTodos = {totalTodos}/>
        <CreateNoteButton
          setOpenModal={setOpenModal}
        />
      </Header>
  
        <TodoList>
          {error && <TodosError />}
          {loading && <TodosLoading />}
          {(!loading && !searchedTodos.length) && <EmptyTodos />}
          
          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
  
       
          <Form 
          openModal = {openModal} 
          setOpenModal = {setOpenModal} addTodo = {addTodo} />
          
       
      
  
      
      </>
    );

}

export default App;
