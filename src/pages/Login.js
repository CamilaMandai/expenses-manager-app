import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import { SAVE_PASSWORD, SAVE_EMAIL } from '../redux/actions';
import { saveEmailAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledBtn: true,
  };

  // Solucao retirada da mentoria Summer com a Danielle Gazarine e a Hellen Ribas no dia 29 de setembro
  checkDisableBtn = () => {
    const { email, password } = this.state;
    const MIN_PASS_LEN = 5;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyPass = password.length > MIN_PASS_LEN;
    this.setState({ disabledBtn: !(verifyEmail && verifyPass) });
    // if (email.includes('@') && password.length > MIN_PASS_LEN) {
    // this.setState({ disabledBtn: false });
    // } else {
    // this.setState({ disabledBtn: true });
    // }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkDisableBtn());
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    // dispatch({ type: SAVE_EMAIL, payload: email });
    // dispatch({ type: SAVE_PASSWORD, payload: password });
    dispatch(saveEmailAction(email));
    // dispatch(savePasswordAction(password));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabledBtn } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ password }
          />
        </form>
        <button
          type="button"
          onClick={ this.handleClick }
          // disabled={ !(email.includes('@') && password.length > MIN_PASS_LEN) }
          disabled={ disabledBtn }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
