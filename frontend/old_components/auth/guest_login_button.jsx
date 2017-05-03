import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { hashHistory } from 'react-router';

const guestUser = { username: "guest", password: "bemyguest" };

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

const GuestLoginButton = props => {
  const _handleSubmit = e => {
    e.preventDefault();
    props.login(guestUser)
      .then(() => hashHistory.push("/"));
  };
  return (
    <form id="guest-login" onSubmit={ _handleSubmit }>
      <input type="submit" id="guest-login-button" value="Guest Login"></input>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(GuestLoginButton);
