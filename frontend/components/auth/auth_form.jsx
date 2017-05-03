import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import styled from 'styled-components';
import { signup, login, receiveAuthErrors } from '../../actions/session_actions';
import ErrorList from '../errors/error_list';
import { Button, FlexColumn, FlexEndContainer,
  CenteredHeader, CenteredParagraph } from '../primitives/styled_primitives';

// Styles

const AuthContainer = styled(FlexColumn)`
  justify-content: space-between;
  font-family: sans-serif;
  height: 100vh;
`;

const GuestButton = styled.button`
  border: 3px solid black;
  background-color: inherit;
  cursor: pointer;
  height: 50px;
  font-size: 16px;
  margin: 30px 10px;
`;

const FormBorder = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  border-bottom: 1px solid grey;
  color: #555555;
  margin: auto;
  max-width: 500px;
  padding: 10px 30px 30px 30px;
  width: 80%;
`;

const FormDiv = styled(FlexColumn)`
  align-items: center;
`;

const Input = styled.input`
  margin: 4px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  height: 20px;
  padding: 10px;
  font-size: 18px;
  width: 50%;
`;

const AuthLink = styled(Link)`
  text-align: center;
  display: block;
  font-size: 12px;
  color: inherit;
  text-decoration: none;
`;

// Redux

const GUEST_CREDS = { username: "guest", password: "bemyguest" };

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
    clearErrors: () => dispatch(receiveAuthErrors([])),
    loginGuest: () => dispatch(login(GUEST_CREDS))
                        .then(() => hashHistory.push("/"))
  };
};

// Component

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
      <AuthContainer>
        <FlexEndContainer>
          <GuestButton onClick={ this.props.loginGuest }>
            Guest Login
          </GuestButton>
        </FlexEndContainer>
        <FormBorder>
          <CenteredHeader>{ this.props.formName }</CenteredHeader>
          <FormDiv>
            <CenteredParagraph>
              Enter your username and password.
            </CenteredParagraph>
            <Input type="text" id="username"
              value={ this.state.username }
              onChange={ this.update("username") }
              placeholder="Username" />
            <Input type="password" id="password"
              value={ this.state.password }
              onChange={ this.update("password") }
              placeholder="Password" />
            <Button fontSize="18px" width="50%"
              onClick={ this.handleSubmit }>
              { this.props.formName }
            </Button>
          </FormDiv>
          <ErrorList errors={ this.props.errors } />
          <AuthLink to={ this.props.otherRoute }>
            { this.props.otherName }
          </AuthLink>
        </FormBorder>
      </AuthContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
