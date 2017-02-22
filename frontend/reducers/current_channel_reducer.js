import { LOG_OUT } from '../actions/session_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import messageReducer from './current_channel/message_reducer';
import subscriptionReducer from './current_channel/subscription_reducer';
import { merge } from 'lodash';

const initialState = { messages: [] };

const currChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      return action.channel;
    case LOG_OUT:
      return initialState;
    default:
      let newState = merge({}, state);
      newState.messages = messageReducer(state.messages, action);
      newState.subscribers = subscriptionReducer(state.subscribers, action);
      return newState;
  }
};

export default currChannelReducer;
