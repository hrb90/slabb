import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import messageReducer from './message_reducer';
import { merge } from 'lodash';

const initialState = { messages: [] };

const currChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      return action.channel;
    default:
      let newState = merge({}, state);
      newState.messages = messageReducer(state.messages, action);
      return newState;
  }
};

export default currChannelReducer;
