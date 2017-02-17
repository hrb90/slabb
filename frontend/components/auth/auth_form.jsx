import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { signup, login, receiveAuthErrors } from '../../actions/session_actions';
import ErrorList from '../errors/error_list';
import GuestLoginButton from './guest_login_button';

const mapStateToProps = ({errors}, ownProps) => {
  let formName, otherName, otherRoute;
  if (ownProps.formType === "signup") {
    formName = "Sign Up";
    otherName = "Log In Instead";
    otherRoute = "/login";
  } else {
    formName = "Log In";
    otherName = "Sign Up Instead";
    otherRoute = "/signup";
  }
  return {
    errors: errors.session,
    formName,
    otherName,
    otherRoute
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let action = (ownProps.formType === "signup") ? signup : login;
  return {
    action: user => dispatch(action(user)),
    clearErrors: () => dispatch(receiveAuthErrors([]))
  };
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div id="auth-container">
        <GuestLoginButton />
        <div id="auth-form">
          <h1>{ this.props.formName }</h1>
          <form onSubmit={ this.handleSubmit }>
            <p>Enter your <strong>username</strong> and <strong>password</strong>.</p>
            <input type="text" id="username"
              value={ this.state.username }
              onChange= { this.update("username") }
              placeholder="username" />
            <input type="password" id="password"
              value={ this.state.password }
              onChange= { this.update("password") }
              placeholder="password" />
            <input type="submit" value={ this.props.formName } />
          </form>
          <ErrorList errors={ this.props.errors } />
          <Link to={ this.props.otherRoute }>{ this.props.otherName }</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
