import React from 'react';
import TodoList from './features/todos/TodoList'
import appStyle from './App.module.scss';


const App = () => {
  return (
    <div className={appStyle.appContainer}>
      <TodoList/>
    </div>
  )
}

export default App;