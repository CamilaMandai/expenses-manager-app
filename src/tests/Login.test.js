import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

describe('Teste da página de Login', () => {
  it('1- verifica campo de input de email', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeDefined();
  });
  it('2- verifica campo de input de Senha', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeDefined();
  });
  it('3- verifica o botão de "Entrar"', () => {
    renderWithRouterAndRedux(<Login />);
    const btn = screen.getByText(/entrar/i);
    expect(btn).toBeDefined();
  });
  it('4- verifica se é possível digitar nos campos de input', () => {
    renderWithRouterAndRedux(<Login />, ['/']);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'user@gmail.com');
    userEvent.type(passwordInput, '512847');
    // const btn = screen.getByText(/entrar/i);
    // userEvent.click(btn);
    // expect(history.location.pathname).toBe('/carteira');
    // const emailHeader = screen.getByTestId('email-field');
    // expect(emailHeader).toBeDefined();
    // // console.log(history);
    // history.history.push("/carteira");
    // const emailHeader = screen.getByTestId('email-field');
    // expect(emailHeader).toBeDefined();
  });
});

describe('Teste da página da rota /carteira', () => {
  it('5- verifica se existe um header com o email do user', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const emailHeader = screen.getByTestId('email-field');
    const totalField = screen.getByTestId('total-field');
    expect(emailHeader).toBeDefined();
    expect(totalField.innerHTML).toBe('0');
  });
  it('6- verifica se WalletForm é renderizado certinho', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
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
  it('7- verifica se em WalletForm é possível digitar em campos de input', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Almoço');
    userEvent.type(inputValue, '123');
  });
  it('8- verifica se em WalletForm tem campos do tipo select', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const currencyInput = screen.getByRole('option', { name: 'Alimentação' });
    expect(currencyInput).toBeDefined();
  });
});

describe('Teste do componente Table', () => {
  it('9- verifica se Table é renderizado certinho', () => {
    renderWithRouterAndRedux(<Table />);
    const titleElement = screen.getByText('Table');
    const tableElement = screen.getByRole('table');
    expect(titleElement).toBeDefined();
    expect(tableElement).toBeDefined();
  });
});
