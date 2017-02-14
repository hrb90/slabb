import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorReducer from './errors/error_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  errors: errorReducer
});

export default rootReducer;
