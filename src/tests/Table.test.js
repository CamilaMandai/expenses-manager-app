import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import Wallet from '../pages/Wallet';

const valueInputStr = 'value-input';

describe('Teste do componente Table', () => {
  it('1- verifica se Table é renderizado certinho', () => {
    renderWithRouterAndRedux(<Table />);
    const titleElement = screen.getByText('Table');
    const tableElement = screen.getByRole('table');
    expect(titleElement).toBeDefined();
    expect(tableElement).toBeDefined();
  });
  it('2 - verifica se o cabeçalho da tabela está presente', () => {
    renderWithRouterAndRedux(<Table />);
    const descriptionCol = screen.getByText('Descrição');
    expect(descriptionCol).toBeDefined();
  });
  it('3 - verifica se ao adicionar um gasto, ele é renderizado na tabela', () => {
    renderWithRouterAndRedux(<Wallet />, ['/carteira']);

    const inputValue = screen.getByTestId(valueInputStr);
    userEvent.type(inputValue, '10');
    // const descriptionInput = screen.getByTestId('description-input');

    const btn = screen.getByRole('button');
    userEvent.click(btn);
    const valueText = screen.getByText('10.00');
    expect(valueText).toBeDefined();
    // expect(store1.getState().wallet.expenses[0].value).toBe('10');
    const btnEdit = screen.getByRole('button', {
      name: /editar/i,
    });
    expect(btnEdit).toBeDefined();
  });
  it('4 - verifica se ao clicar em delete, a linha some', () => {
    const { store1 } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);

    const inputValue = screen.getByTestId(valueInputStr);
    userEvent.type(inputValue, '10');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'jantar');
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(btnAdd);
    expect(store1.getState().wallet.expenses.length).toBe(1);
    const descriptionText = screen.getByRole('cell', {
      name: /jantar/i,
    });
    const tagText = screen.getByRole('cell', {
      name: /alimentação/i,
    });
    const methodText = screen.getByRole('cell', {
      name: /dinheiro/i,
    });
    const valueText = screen.getByRole('cell', {
      name: /10\.00/i,
    });
    const currencyText = screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    // const moedaText = screen.getByRole('cell', {
    //   name: /Real/i,
    // });
    expect(descriptionText).toBeDefined();
    expect(valueText).toBeDefined();
    expect(methodText).toBeDefined();
    expect(currencyText).toBeDefined();
    expect(tagText).toBeDefined();
    // expect(moedaText).toBeDefined();

    const btnDelete = screen.getByTestId('delete-btn');
    const btnEdit = screen.getByTestId('edit-btn');
    expect(btnDelete).toBeDefined();
    expect(btnEdit).toBeDefined();
    userEvent.click(btnEdit);
    expect(store1.getState().edit.isEditing).toBeTruthy();
    userEvent.click(btnEdit);
    expect(store1.getState().edit.isEditing).toBeFalsy();
    userEvent.click(btnDelete);
    // console.log(store1.getState().wallet.expenses.length);
    expect(store1.getState().wallet.expenses.length).toBe(0);
    expect(store1.getState().total).toBe(0);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    const btnDelete1 = screen.getAllByTestId('delete-btn')[0];
    userEvent.click(btnDelete1);
    const trElements = screen.getAllByRole('cell');
    expect(trElements.length).toBe(9);
  });
  it('verifica se ao atualizar os campos, o estado muda', () => {
    const { store1 } = renderWithRouterAndRedux(<Wallet />, ['/carteira']);
    const inputValue = screen.getByTestId(valueInputStr);
    userEvent.type(inputValue, '10');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'jantar');
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(btnAdd);
    const btnEdit = screen.getByTestId('edit-btn');
    userEvent.click(btnEdit);
    const editBtnForm = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    // const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Almoço');
    userEvent.click(editBtnForm);
    expect(store1.getState().wallet.expenses[0].description).toBe('Almoço');
  });
});
