import { GET_CURRENCY,
  REQUEST_CURRENCY,
  SAVE_EMAIL,
  SAVE_EXPENSES,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    loading: null,
    rawCurrencies: [],
  },
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      wallet: {
        ...state.wallet,
        loading: true,
      },
    };
  // case GET_CURRENCY:
  //   return {
  //     ...state,
  //     wallet: { ...state.wallet,
  //       currencies: action.payload,
  //       loading: false,
  //     },
  //   };
  case GET_CURRENCY:
    return {
      ...state,
      wallet: { ...state.wallet,
        currencies: action.payload.filtered,
        rawCurrencies: action.payload.raw,
        loading: false,
      },
    };
  case SAVE_EMAIL:
    return {
      ...state,
      user: { email: action.payload },
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      wallet: { ...state.wallet,
        expenses: [...state.wallet.expenses, action.payload[0]],
      },
      total: Number(state.total) + Number(action.payload[1]),
    };
  // case GET_TOTAL:
  //   return {
  //     ...state,
  //     total: action.payload,
  //     // state.wallet.expenses.reduce((acc, curr) => acc + curr.convertedToReal, 0)
  //   };
  default:
    return state;
  }
};

export default walletReducer;
