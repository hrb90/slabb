import { RECEIVE_CURRENT_USER, RECEIVE_AUTH_ERRORS } from '../../actions/session_actions';

const sessionErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_AUTH_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return state;
  }
};

export default sessionErrorReducer;
