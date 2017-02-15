import { RECEIVE_CHANNEL } from '../actions/channel_actions';

const initialState = {};

const currChannelReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CHANNEL:
      return action.channel;
    default:
      return state;
  }
};

export default currChannelReducer;
