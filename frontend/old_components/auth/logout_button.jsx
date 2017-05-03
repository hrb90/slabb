import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

const doNothing = () => {};

const mapStateToProps = (state, ownProps) => ({
  beforeLogoutCallback: ownProps.beforeLogoutCallback || doNothing
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const LogoutButton = ({logout, beforeLogoutCallback}) => {
  function _handleSubmit(e) {
    e.preventDefault();
    beforeLogoutCallback();
    logout().then(() => hashHistory.push("/login"));
  }
  return (
    <form onSubmit={ _handleSubmit }>
      <input type="submit" className="logout-button" value="Sign out"></input>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
