import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const initialState = { currentUser: null };

const sessionReducer = (state = initialState, action) => {
  Object.freeze(initialState);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user };
    default:
      return state;
  }
};

export default sessionReducer;
