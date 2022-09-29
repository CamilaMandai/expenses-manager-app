import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input
            name="value"
            type="text"
            data-testid="value-input"
            placeholder="Valor"
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição da despesa"
            name="description"
          />
          <select data-testid="currency-input" name="currency">
            {/* {
              currencies.map((element, index) => {
                if (element.codein !== 'BRLT') {
                  return (
                    <option key={ index } value={ element.code }>
                      { element.code }
                    </option>
                  );
                }
                return null;
              })
            } */}
            {currencies.map((element, index) => (
              <option key={ index } value={ element }>
                {element}
              </option>
            ))}
          </select>
          <select data-testid="method-input" name="method">
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
          <select data-testid="tag-input" name="tag">
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
