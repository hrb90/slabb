import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorReducer from './errors/error_reducer';
import usersReducer from './users_reducer';
import currChannelReducer from './current_channel_reducer';
import channelsReducer from './channels_reducer';
import subsReducer from './subs_reducer';
import channelStackReducer from './channel_stack_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  users: usersReducer,
  currentChannel: currChannelReducer,
  channels: channelsReducer,
  subscriptions: subsReducer,
  channelStack: channelStackReducer
});

export default rootReducer;
