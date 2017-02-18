import { RECEIVE_NEW_MESSAGE, RECEIVE_OLD_MESSAGE, REMOVE_MESSAGE } from '../actions/message_actions';

const initialState = [];

const messageReducer = (state = initialState, action) => {
  Object.freeze(state);
  let idx;
  let newState = state.slice(0);
  switch(action.type) {
    case RECEIVE_NEW_MESSAGE:
      newState.push(action.message);
      return newState;
    case RECEIVE_OLD_MESSAGE:
      idx = newState.findIndex(msg => msg.id === action.message.id);
      if (idx > -1) {
        newState[idx] = action.message;
        return newState;
      } else {
        return state;
      }
      break;
    case REMOVE_MESSAGE:
      idx = state.findIndex(msg => msg.id === action.message.id);
      if (idx > -1) {
        return state.slice(0, idx).concat(state.slice(idx + 1));
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};

export default messageReducer;
