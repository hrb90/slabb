import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorReducer from './errors/error_reducer';
import usersReducer from './users_reducer';
import currChannelReducer from './current_channel_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer,
  users: usersReducer,
  currentChannel: currChannelReducer
});

export default rootReducer;
