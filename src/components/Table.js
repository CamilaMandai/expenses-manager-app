import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  rmExpense = (expense) => {
    const { dispatch, expenses, total, rawCurrencies } = this.props;
    const updatedExpenses = expenses.filter((element) => element.id !== expense.id);
    const changeRate = Number(rawCurrencies[expense.currency].ask);
    const convertedValue = changeRate * Number(expense.value);
    const updatedTotal = expenses.length === 1 ? 0 : total - convertedValue;
    dispatch(deleteExpense({ updatedExpenses, updatedTotal }));
  };

  render() {
    const { expenses, rawCurrencies } = this.props;
    return (
      <div>
        <h3>Table</h3>
        <table role="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{rawCurrencies[element.currency].name}</td>
                <td>{Number(rawCurrencies[element.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    Number(
                      Number(rawCurrencies[element.currency].ask) * Number(element.value),
                    ).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.rmExpense(element) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  rawCurrencies: PropTypes.object,
  expenses: PropTypes.array,
  total: PropTypes.Number,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  rawCurrencies: state.wallet.rawCurrencies,
  total: state.total,
});

export default connect(mapStateToProps)(Table);
