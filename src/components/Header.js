import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        {/* <p data-testid="total-field">0</p> */}
        <p data-testid="header-currency-field">BRL</p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
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
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.total,
});

export default connect(mapStateToProps)(Header);
