import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  // componentDidMount(){
  //   this.calculateTotal();
  // };

  // componentDidUpdate(){
  //   this.calculateTotal();
  // }

  // calculateTotal = () => {
  //   const { expenses } = this.props;
  //   const rateChange = expenses.map(
  //     (element) => Number(element.exchangeRates[element.currency].ask),
  //   );
  //   const total = rateChange.reduce((acc, curr) => acc + curr, 0);
  //   console.log(total);
  //   this.setState({ total });
  // // const valoresReais = expenses.map((element, index) => element.value * rateChange[index]);
  // };

  render() {
    const { email, total } = this.props;
    // const rmLeadingZero = Number(total).toFixed(2);
    // let rmLeadingZero = total.toFixed(2);
    // if (rmLeadingZero.toString()[0] === '0' && total !== 0) {
    //   rmLeadingZero = rmLeadingZero.slice(-(rmLeadingZero.length - 1));
    const totalLocal = Math.round((total + Number.EPSILON) * 100) / 100;
    // }
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        {/* <p data-testid="total-field">0</p> */}
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{totalLocal}</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  // email: state.userReducer.email,
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.total,
});

export default connect(mapStateToProps)(Header);
