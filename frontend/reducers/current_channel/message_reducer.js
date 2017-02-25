import { RECEIVE_NEW_MESSAGE,
  RECEIVE_OLD_MESSAGE,
  REMOVE_MESSAGE,
  BEGIN_EDIT_MESSAGE,
  END_EDIT_MESSAGE } from '../../actions/message_actions';
import { RECEIVE_NEW_AVATAR } from '../../actions/user_actions';
import { RECEIVE_REACTION, REMOVE_REACTION } from '../../actions/reaction_actions';
import reactionReducer from './reaction_reducer';

const initialState = [];

const messageReducer = (state = initialState, action) => {
  Object.freeze(state);
  let idx;
  let newState = state.slice(0);
  switch(action.type) {
    case RECEIVE_NEW_MESSAGE:
      if (!newState.map(msg => msg.id).includes(action.message.id)) {
        newState.unshift(action.message);
      }
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
      newState = newState.filter(msg => (msg.id !== action.id));
      return newState;
    case BEGIN_EDIT_MESSAGE:
      idx = newState.findIndex(msg => msg.id === action.id);
      newState[idx].isEditing = true;
      return newState;
    case END_EDIT_MESSAGE:
      idx = newState.findIndex(msg => msg.id === action.id);
      newState[idx].isEditing = false;
      return newState;
    case RECEIVE_NEW_AVATAR:
      newState = newState.map(msg => {
        if (msg.author.id === action.id) {
          msg.author.avatar_url = action.avatar_url;
        }
        return msg;
      });
      return newState;
    case RECEIVE_REACTION:
    case REMOVE_REACTION:
      idx = newState.findIndex(msg => msg.id === action.reaction.message_id);
      if (idx > 0)
        newState[idx].reactions = reactionReducer(newState[idx].reactions, action);
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
