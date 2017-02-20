import { RECEIVE_ALL_SUBS,
  RECEIVE_SUB,
  RECEIVE_UNSUB,
  RECEIVE_MESSAGE_SUBSCRIBED_CHANNEL,
  CLEAR_NEW_MESSAGES } from '../actions/channel_actions';
import { merge } from 'lodash';
import { extractChannelInfo } from '../util/subscription_util';

const initialState = {};

const subsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_SUBS:
      let channelInfo = action.channels.map(extractChannelInfo);
      return merge({}, ...channelInfo);
    case RECEIVE_SUB:
      let newChannel = action.channel;
      return merge({}, state, extractChannelInfo(newChannel));
    case RECEIVE_UNSUB:
      delete newState[action.channelId];
      return newState;
    case RECEIVE_MESSAGE_SUBSCRIBED_CHANNEL:
      if (action.id in newState) {
        newState[action.id].newMessages = true;
      }
      return newState;
    case CLEAR_NEW_MESSAGES:
      if (action.id in newState) {
        newState[action.id].newMessages = false;
      }
      return newState;
    default:
      return state;
  }
};

export default subsReducer;
