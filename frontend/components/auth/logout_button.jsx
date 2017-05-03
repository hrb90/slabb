import React from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { Button } from '../primitives/styled_primitives';

const doNothing = () => {};

const mapStateToProps = (state, ownProps) => ({
  beforeLogoutCallback: ownProps.beforeLogoutCallback || doNothing
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logout())
});

const LogoutButton = ({logOut, beforeLogoutCallback}) => {
  function _handleSubmit(e) {
    e.preventDefault();
    beforeLogoutCallback();
    logOut().then(() => hashHistory.push("/login"));
  }
  return (
    <Button onClick={ _handleSubmit }>
      Sign out
    </Button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
