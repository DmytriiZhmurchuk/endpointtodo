import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import modelUrl from '../../const/todo'
import statusLoading from '../../const/loading'
import doFetch, { doPost } from '../../utils/client'
import doSort, { normalizeTodos } from '../../utils/sort'

const todosAdapter = createEntityAdapter({
  sortComparer: doSort,
})

const initialState = todosAdapter.getInitialState({
  status: statusLoading.IDLE,
  updateStatus: statusLoading.IDLE,
})

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await (await doFetch(modelUrl.getToDoList)).json()
  return normalizeTodos(response)
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data) => {
  await (
    await doPost(modelUrl.update(data.id), { isComplete: data.completed })
  ).json()
  return { id: data.id, changes: { isComplete: data.completed } }
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = statusLoading.LOADING
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.updateStatus = statusLoading.LOADING
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = statusLoading.IDLE
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        todosAdapter.updateOne(state, action.payload)
        state.updateStatus = statusLoading.IDLE
      })
  },
})

const { selectById, selectIds } = todosAdapter.getSelectors(
  (state) => state.todos,
)

export { selectById, selectIds }

export default todosSlice.reducer
