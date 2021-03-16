import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectById, updateTodo } from './todoSlice'

import styles from './styles/TodoListItem.module.scss'

const TodoListItem = memo(({ id }) => {
  console.log('render', id)
  const todo = useSelector((state) => selectById(state, id))
  const { description, isComplete, dueDate, isExpired } = todo
  const dispatch = useDispatch()
  const handleCompletedChanged = (e) => {
    dispatch(updateTodo({ id: todo.id, completed: e.target.checked }))
  }

  const getClassName = () => {
    const arr = [styles.todoListItem]
    if (isComplete) {
      arr.push(styles.completed)
    } else if (isExpired) {
      arr.push(styles.expired)
    }
    return arr.join(' ')
  }

  return (
    <li className={getClassName()}>
      <div className={styles.todorow}>
        <div className={styles.completeControl}>
          <input
            type="checkbox"
            checked={isComplete}
            onChange={handleCompletedChanged}
          />
        </div>
        <div className={styles.todoDescription}>{description}</div>
        <div className={styles.todoDueDate}>
          {dueDate ? new Date(dueDate).toLocaleDateString() : 'none'}
        </div>
      </div>
    </li>
  )
})
TodoListItem.propTypes = {
  id: PropTypes.string,
}

export default TodoListItem
