import React from 'react';
import ReactDOM from 'react-dom';
import statusLoading  from '../../const/loading'
import LoadIndicator from './index.js';
import { Provider } from 'react-redux'
import store from './../../store';
import { act } from 'react-dom/test-utils';
import styles  from './styles/style.module.scss'

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders LoadIndicators', () => {
  act(() => {
    ReactDOM.render(<Provider store={store}>
      <LoadIndicator status={statusLoading.LOADING} />
      </Provider>, container);
  });
  expect(container.getElementsByClassName(styles.loader).length).toBe(1);
});