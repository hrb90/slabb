import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { nullUser } from '../util/session_util';

const initialState = { currentUser: nullUser };

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user };
    default:
      return state;
  }
};

export default sessionReducer;
