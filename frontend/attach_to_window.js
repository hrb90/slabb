import { signup, login, logout } from './util/session_api_util';

export const attachAll = () => {
  window.logError = (err) => console.log(err.responseText);
  window.signup = signup;
  window.login = login;
  window.logout = logout;
};
