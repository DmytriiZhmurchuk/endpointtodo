
import React from 'react'
import statusLoading  from '../../const/loading'
import { useSelector } from 'react-redux'
import styles  from './styles/style.module.scss'

const LoadIndicator = ({status}) => {
  const loadingUpdateStatus = useSelector((state) => state.todos.updateStatus)
  if (status === statusLoading.LOADING || loadingUpdateStatus === statusLoading.LOADING) {
    return (
      <div className={styles.todoListLoaderIndicator}>
        <div className={styles.loader} />
      </div>
    )
  }
  return null
}

export default LoadIndicator;