const compare = (A, B) => {
  if (!A.isExpired && !A.isComplete && B.isExpired && !B.isComplete) {
    return 1
  }
  if (A.isExpired && !A.isComplete && !B.isExpired && !B.isComplete) {
    return -1
  }
  if (A.isExpired && !A.isComplete && B.isExpired && !B.isComplete) {
    return new Date(A.dueDate) - new Date(B.dueDate)
  }
  if (!A.isComplete && B.isComplete) {
    return -1
  }
  if (A.isComplete && !B.isComplete) {
    return 1
  }
  if (A.isComplete && B.isComplete) {
    return new Date(A.dueDate) - new Date(B.dueDate)
  }

  return 0
}

export default compare

export const normalizeTodos = (todos) => {
  const now = new Date().getTime()
  return todos.map((todo) => {
    const { dueDate } = todo
    if (dueDate && new Date(dueDate).getTime() < now) {
      return { ...todo, isExpired: true }
    }

    return { ...todo, isExpired: false }
  })
}
