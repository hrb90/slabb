import * as APIUtil from './util/message_api_util';

export const attachAll = () => {
  window.logError = (err) => console.log(err.responseText);
  window.APIUtil = APIUtil;
};
