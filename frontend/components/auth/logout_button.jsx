import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const doNothing = () => {};

const mapStateToProps = (store, ownProps) => ({
  beforeLogoutCallback: ownProps.beforeLogoutCallback || doNothing
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const LogoutButton = ({logout, beforeLogoutCallback}) => {
  function _logoutAndRedirect() {
    beforeLogoutCallback();
    logout().then(() => hashHistory.push("/login"));
  }
  return (
    <button onClick={ _logoutAndRedirect }>Log out</button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
