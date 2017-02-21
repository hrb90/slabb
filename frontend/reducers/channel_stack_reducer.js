import { LOG_OUT } from '../actions/session_actions';
import { RECEIVE_CHANNEL, RECEIVE_UNSUB } from '../actions/channel_actions';

const initialState = [];

const channelStackReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CHANNEL:
      newState = state.filter(id => (id !== action.channel.id));
      newState.push(action.channel.id);
      return newState;
    case RECEIVE_UNSUB:
      newState = state.filter(id => (id !== (+action.channelId)));
      return newState;
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default channelStackReducer;
