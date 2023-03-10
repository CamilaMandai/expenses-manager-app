import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchAPI, saveExpenses, deleteExpense, EDIT_EXPENSE } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handClick = async () => {
    // console.log(this.state.tag);
    const { dispatch, expenses, rawCurrencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // const exchangeRates = await secondaryFetchAPI();
    dispatch(fetchAPI());
    // const convertedToReal = Number(exchangeRates[currency].ask) * Number(value);
    const convertedToReal = Number(rawCurrencies[currency].ask) * Number(value);
    const expensesLocal = {
      value,
      currency,
      method,
      tag,
      description,
      id: expenses.length,
      exchangeRates: { ...rawCurrencies },
      // convertedToReal,
    };
    this.setState({ value: '', description: '' });
    await dispatch(saveExpenses([expensesLocal, convertedToReal]));
    // dispatch(getTotal(expenses.map((element) => element.convertedToReal)));
  };

  handleEdit = () => {
    const { edit: { index } } = this.props;
    const { dispatch, expenses, rawCurrencies, total } = this.props;
    const expenseTobeEdited = expenses[index];
    const oldChangeRate = Number(rawCurrencies[expenseTobeEdited.currency].ask);
    const oldValue = Number(expenseTobeEdited.value);
    const { value, description, currency, method, tag } = this.state;
    const UpdatedConvertedToReal = Number(rawCurrencies[currency].ask) * Number(value);
    const oldConvertedToReal = (oldChangeRate * oldValue);
    const expensesLocal = {
      value,
      currency,
      method,
      tag,
      description,
      id: expenseTobeEdited.id,
      exchangeRates: { ...rawCurrencies },
      // convertedToReal,
    };
    const updatedExpenses = expenses.map((element, indexMap) => {
      if (indexMap === index) {
        return expensesLocal;
      } return element;
    });
    const updatedTotal = total - oldConvertedToReal + UpdatedConvertedToReal;
    dispatch(deleteExpense({ updatedExpenses, updatedTotal }));
    dispatch({
      type: EDIT_EXPENSE,
      payload: index,
    });
  };

  render() {
    const { currencies, edit: { isEditing: edit } } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form>
          <input
            name="value"
            value={ value }
            type="number"
            data-testid="value-input"
            placeholder="Valor"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            value={ description }
            data-testid="description-input"
            placeholder="Descrição da despesa"
            name="description"
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
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
              // element.code !== 'USD'
              //   ?
              //   <option key={ index } value={ element }>
              //     {' '}
              //     {element}
              //     {' '}
              // </option>
              // :
              <option key={ index } value={ element }>
                {element}
              </option>
            ))}
          </select>
          <select data-testid="method-input" name="method" onChange={ this.handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

        </form>
        {
          edit ? <button type="button" onClick={ this.handleEdit }>Editar despesa</button>
            : <button type="button" onClick={ this.handClick }>Adicionar despesa</button>
        }

      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
  expenses: PropTypes.array,
  edit: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  rawCurrencies: state.wallet.rawCurrencies,
  edit: state.edit,
  total: state.total,
});

export default connect(mapStateToProps)(WalletForm);
