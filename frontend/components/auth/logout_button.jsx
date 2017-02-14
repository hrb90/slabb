import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const LogoutButton = ({logout}) => {
  function _logoutAndRedirect() {
    logout().then(() => hashHistory.push("/login"));
  }
  return (
    <button onClick={ _logoutAndRedirect }>Log out</button>
  );
};

export default connect(null, mapDispatchToProps)(LogoutButton);
