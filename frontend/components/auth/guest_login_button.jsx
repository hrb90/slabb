import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

const guestUser = { username: "guest", password: "bemyguest" };

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login(guestUser))
});

const GuestLoginButton = props => (
  <button className="guest-login"
    onclick={ props.login }>Guest Login</button>
);

export default connect(null, mapDispatchToProps)(GuestLoginButton);
