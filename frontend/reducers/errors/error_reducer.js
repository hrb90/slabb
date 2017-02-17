import { combineReducers } from 'redux';
import sessionErrorReducer from './session_error_reducer';
import channelErrorReducer from './channel_error_reducer';

export default combineReducers({
  session: sessionErrorReducer,
  channel: channelErrorReducer
});
