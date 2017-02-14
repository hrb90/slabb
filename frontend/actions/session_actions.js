import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_AUTH_ERRORS = "RECEIVE_AUTH_ERRORS";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveAuthErrors = errors => ({
  type: RECEIVE_AUTH_ERRORS,
  errors
});

export const login = user => dispatch => {
  return APIUtil.login(user)
    .then((currentUser) => dispatch(receiveCurrentUser(currentUser)))
    .fail(err => dispatch(receiveAuthErrors(err.responseJSON)));
};

export const signup = user => dispatch => {
  return APIUtil.signup(user)
    .then((currentUser) => dispatch(receiveCurrentUser(currentUser)))
    .fail(err => dispatch(receiveAuthErrors(err.responseJSON)));
};

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(() => dispatch(receiveCurrentUser(null)));
};
