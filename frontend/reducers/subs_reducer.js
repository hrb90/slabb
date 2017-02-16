import { RECEIVE_ALL_SUBS, RECEIVE_SUB, RECEIVE_UNSUB } from '../actions/channel_actions';
import { merge } from 'lodash';

const initialState = {};

const extractChannelInfo = channel => {
  return {
    [channel.id]: {
      id: channel.id,
      name: channel.name,
      channel_type: channel.channel_type
    }
  };
};

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
