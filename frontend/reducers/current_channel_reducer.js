import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import { RECEIVE_NEW_MESSAGE, RECEIVE_OLD_MESSAGE, REMOVE_MESSAGE } from '../actions/message_actions';
import messageReducer from './message_reducer';
import { merge } from 'lodash';

const initialState = { messages: [] };

const currChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      return action.channel;
    case RECEIVE_NEW_MESSAGE:
    case RECEIVE_OLD_MESSAGE:
    case REMOVE_MESSAGE:
      return merge({}, state, { messages: messageReducer(state.messages, action) });
    default:
      return state;
  }
};

export default currChannelReducer;
