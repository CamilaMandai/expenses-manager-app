import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import store from '../redux/store';

// function renderWithRouter(component) {
//   const history = createMemoryHistory();
//   const obj = render(
//     <Router history={ history }>
//       {component}
//     </Router>,
//   );
//   return ({ history, ...obj });
// }

// // export default renderWithRouter;
const emailInputStr = 'email-input';
const passwordInputStr = 'password-input';

describe('Teste da página de Login', () => {
  it('1- verifica campo de input de email', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    expect(emailInput).toBeDefined();
  });
  it('2- verifica campo de input de Senha', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByTestId(passwordInputStr);
    expect(passwordInput).toBeDefined();
  });
  it('3- verifica o botão de "Entrar" e se ele está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const btn = screen.getByText(/entrar/i);
    expect(btn).toBeDefined();
    expect(btn).toBeDisabled();
  });
  it('4- verifica se é possível digitar nos campos de input e habilitar o botão', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailInputStr);
    const passwordInput = screen.getByTestId(passwordInputStr);
    userEvent.type(emailInput, 'user@gmail.com');
    userEvent.type(passwordInput, '512847');
    const btn = screen.getByText(/entrar/i);
    expect(btn).not.toBeDisabled();
  });
  it('5 - verifica se ao clicar no botão a página é redirecionada para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailInputStr);
    const passwordInput = screen.getByTestId(passwordInputStr);
    userEvent.type(emailInput, 'user@gmail.com');
    userEvent.type(passwordInput, '512847');
    const btn = screen.getByText(/entrar/i);
    userEvent.click(btn);
    expect(history.location.pathname).toBe('/carteira');
    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeDefined();
    // const emailHeader = screen.getByTestId('email-field');
    // expect(emailHeader).toBeDefined();
    // console.log(history);
  });
});
