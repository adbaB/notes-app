import React from 'react';

import './TodoCounter.css';

function TodoCounter({ totalTodos}) {

  
  return (
    <h2 className="TodoCounter"> My Notes {totalTodos} </h2>
  );
}

export { TodoCounter };
