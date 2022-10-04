import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import reducer from '../../redux/reducers/index';
import mockData from './mockData';
import store from '../../redux/store';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store1 = store) {
  return (
    <Provider store={ store1 }>
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
      edit: {
        isEditing: false,
        index: -1,
      },
    },
    store1 = createStore(reducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store1)),
    store1,
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

// export const renderWithRouterAndRedux = (component, {
//   initialState = {},
//   store = createStore(reducer, initialState, applyMiddleware(thunk)),
//   initialEntries = ['/'],
//   history = createMemoryHistory({ initialEntries }),
// } = {}) => ({
//   ...render(
//     <Router history={ history }>
//       <Provider store={ store }>
//         {component}
//       </Provider>
//     </Router>
//   ),
//   history,
//   store,
// });
