import { RECEIVE_ALL_SUBS, RECEIVE_SUB, RECEIVE_UNSUB } from '../actions/channel_actions';
import { merge } from 'lodash';
import { extractChannelInfo } from '../util/subscription_util';

const initialState = {};

const subsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_SUBS:
      let channelInfo = action.channels.map(extractChannelInfo);
      return merge({}, ...channelInfo);
    case RECEIVE_SUB:
      let newChannel = action.channel;
      return merge({}, state, extractChannelInfo(newChannel));
    case RECEIVE_UNSUB:
      let newState = merge({}, state);
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};

export default subsReducer;
