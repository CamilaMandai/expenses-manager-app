import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import reducer from '../../redux/reducers/index';
import mockData from './mockData';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component, options = {}) {
  const {
    initialState = {
      user: {
        email: 'user@gmail.com', // string que armazena o email da pessoa usuária
      },
      wallet: {
        currencies: ['USD', 'CAD'], // array de string
        expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
        editor: false, // valor booleano que indica de uma despesa está sendo editada
        idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
        loading: null,
        rawCurrencies: mockData,
      },
      total: 0,
    },
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
