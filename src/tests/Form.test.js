import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import WalletForm from '../components/WalletForm';
import mockFetch from './helpers/fetch';
import Wallet from '../pages/Wallet';

const valueInputStr = 'value-input';
const descriptionInputStr = 'description-input';

describe('Teste da página da rota /carteira', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('1- verifica se existe um header com o email do user', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const emailHeader = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    expect(emailHeader).toBeDefined();
    expect(totalField.innerHTML).toBe('0.00');
  });
  it('2- verifica se WalletForm é renderizado certinho', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const inputValue = screen.getByTestId(valueInputStr);
    const descriptionInput = screen.getByTestId(descriptionInputStr);
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const btn = screen.getByRole('button');
    expect(inputValue).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(currencyInput).toBeDefined();
    expect(methodInput).toBeDefined();
    expect(tagInput).toBeDefined();
    expect(btn).toBeDefined();
  });
  it('3- verifica se em WalletForm é possível digitar em campos de input', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const inputValue = screen.getByTestId(valueInputStr);
    const descriptionInput = screen.getByTestId(descriptionInputStr);
    userEvent.type(descriptionInput, 'Almoço');
    userEvent.type(inputValue, '123');
  });
  it('4- verifica se em WalletForm tem campos do tipo select', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);

    const currencyInput = screen.getByRole('option', { name: 'Alimentação' });
    expect(currencyInput).toBeDefined();
  });
  it('5 - verifica se ao inserir um gasto de 10 clicar no botão, o valor no estado fica 10', () => {
    const { store1 } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);

    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '10');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'jantar');
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(store1.getState().wallet.expenses[0].value).toBe('10');
    expect(store1.getState().wallet.expenses[0].tag).toBe('Alimentação');
    expect(store1.getState().wallet.expenses[0].description).toBe('jantar');
  });
  it('6- verifica se a funcao fetch é chamada 1 vez quando wallet é renderizado', () => {
    global.fetch = jest.fn(mockFetch);
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    expect(fetch).toBeCalledTimes(1);
    global.fetch.mockClear();
  });
  it('7- verifica se a funcao fetch é chamada 2 vezes ao adicionar um gasto', () => {
    // global.fetch = jest.fn(mockFetch);
    // console.log(fetch());
    // expect(fetch).toBeCalled();
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(fetch).toBeCalledTimes(2);
    // global.fetch.mockClear();
  });
});
