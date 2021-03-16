import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import TodoList from './TodoList';
import store from './../../store';
import { Provider } from 'react-redux'
import { fetchTodos } from './todoSlice';
import fetchMock from 'fetch-mock';
import modelUrl from './../../const/todo'

const response = [
  {
    "id": "1",
    "description": "File 2020 Taxes",
    "isComplete": true,
    "dueDate": "2020-03-10T17:50:44.673Z"
  },
  {
    "id": "2",
    "description": "Fold laundry",
    "isComplete": true,
    "dueDate": null
  },
  {
    "id": "3",
    "description": "Call Mom",
    "isComplete": false,
    "dueDate": "2020-06-26T19:00:00.000Z"
  },
  {
    "id": "4",
    "description": "Walk the dog",
    "isComplete": false,
    "dueDate": null
  },
  {
    "id": "5",
    "description": "Feed the cat",
    "isComplete": false,
    "dueDate": "2020-06-24T15:45:00.000Z"
  },
  {
    "id": "6",
    "description": "Run LA marathon",
    "isComplete": false,
    "dueDate": "2021-03-21T13:30:00.000Z"
  }
];
let container = null;

beforeEach(() => {
  fetchMock.restore();
  fetchMock.mock(modelUrl, JSON.stringify(response));
  store.dispatch(fetchTodos())
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders list with todos', async () => {
  act(() => {
   ReactDOM.render( <Provider store={store}>
    <TodoList />
  </Provider>, container);
  });
  expect(container.getElementsByClassName('todoListItem').length).toBe(6);
});