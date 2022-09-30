import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

describe('Teste da página de Login', () => {
  it('verifica campo de input de email', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeDefined();
  });
  it('verifica campo de input de Senha', () => {
    renderWithRouterAndRedux(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeDefined();
  });
  it('verifica o botão de "Entrar"', () => {
    renderWithRouterAndRedux(<Login />);
    const btn = screen.getByText(/entrar/i);
    expect(btn).toBeDefined();
  });
  it('verifica se é possível digitar nos campos de input', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'user@gmail.com');
    userEvent.type(passwordInput, '512847');
  });
});

describe('Teste da página da rota /carteira', () => {
  it('verifica se existe um header com o email do user', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeDefined();
  });
  it('verifica se WalletForm é renderizado certinho', () => {
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
  it('verifica se em WalletForm é possível digitar em campos de input', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValue = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Almoço');
    userEvent.type(inputValue, '123');
  });
  it('verifica se em WalletForm tem campos do tipo select', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const currencyInput = screen.getByRole('option', { name: 'Alimentação' });
    expect(currencyInput).toBeDefined();
  });
});

describe('Teste do componente Table', () => {
  it('verifica se Table é renderizado certinho', () => {
    renderWithRouterAndRedux(<Table />);
    const titleElement = screen.getByText('Table');
    expect(titleElement).toBeDefined();
  });
});
