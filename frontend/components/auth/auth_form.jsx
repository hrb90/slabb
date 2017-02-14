import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { signup, login } from '../../actions/session_actions';
import { merge } from 'lodash';
import ErrorList from '../errors/error_list';

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
    action: user => dispatch(action(user))
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
      this.setState(merge({}, this.state, {[field]: e.currentTarget.value}));
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
      .then(() => hashHistory.push("/"));
  }

  render() {
    return (
      <div className="auth-form">
        <ErrorList errors={ this.props.errors } />
        <form onSubmit={ this.handleSubmit }>
          <input type="text" id="username"
            value={ this.state.username }
            onChange= { this.update("username") }
            placeholder="Username" />
          <input type="password" id="password"
            value={ this.state.password }
            onChange= { this.update("password") }
            placeholder="Password" />
          <input type="submit" value={ this.props.formName } />
        </form>
        <Link to={ this.props.otherRoute }>{ this.props.otherName }</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
