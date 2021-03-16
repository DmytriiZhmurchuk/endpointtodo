import React from 'react'
import { useSelector } from 'react-redux'
import TodoListItem from './TodoListItem'
import LoadIndicator from './../loadIndicator'
import statusLoading from './../../const/loading'
import styles from './styles/TodoList.module.scss'

import { selectIds } from './todoSlice'

const TodoList = () => {
  const todoItems = useSelector(selectIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  if (loadingStatus === statusLoading.LOADING) {
    return <LoadIndicator status={loadingStatus} />
  }

  const renderedListItems = todoItems.map((id) => {
    return <TodoListItem key={id} id={id} />
  })

  return (
    <div className={styles.todoList}>
      <h2 className={styles.caption}>Todo list application</h2>
      <ul className={styles.todoListItemsContainer}>{renderedListItems}</ul>
      <LoadIndicator />
    </div>
  )
}

export default TodoList
