// Coloque aqui suas actions
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const savePasswordAction = (password) => ({
  type: SAVE_PASSWORD,
  payload: password,
});

// Actions assincronas

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_RAW_CURRENCY = 'GET_RAW_CURRENCY';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const requestAPI = () => ({ type: REQUEST_CURRENCY });

export const getAPI = (data) => ({ type: GET_CURRENCY, payload: data });

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

// export function fetchAPI() {
//   // Desenvolva aqui o código da action assíncrona
//   return async (dispatch) => {
//     dispatch(requestAPI());
//     const req = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const res = await req.json();
//     const data = Object.keys(res).map((key) => res[key]);
//     // const dataMap = data.map((element) => element.code);
//     const dataFilter = data.filter((element) => element.codein !== 'BRLT');
//     const dataMap = dataFilter.map((element) => element.code);
//     // return dispatch(getAPI(dataMap));
//     return dispatch(getAPI({ filtered: dataMap, raw: res }));
//   };
// }

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((res) => {
        const data = Object.keys(res).map((key) => res[key]);
        const dataFilter = data.filter((element) => element.codein !== 'BRLT');
        const dataMap = dataFilter.map((element) => element.code);
        return dispatch(getAPI({ filtered: dataMap, raw: res }));
      })
      .catch((error) => dispatch(failedRequest(error)));
  };
}

// actions de salvar expenses

export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
// export const GET_TOTAL = 'GET_TOTAL';

// export const getTotal = (array) => ({
//   type: GET_TOTAL,
//   payload: array.reduce((acc, curr) => acc + curr, 0),
// });

export const saveExpenses = (array) => ({
  type: SAVE_EXPENSES,
  payload: array,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});
