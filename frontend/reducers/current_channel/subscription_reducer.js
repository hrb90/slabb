import { RECEIVE_SUBSCRIBER, REMOVE_SUBSCRIBER } from '../../actions/channel_actions';

const initialState = [];

const subscriptionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = state.slice(0);
  switch(action.type) {
    case RECEIVE_SUBSCRIBER:
      if (!newState.map(user => user.id).includes(action.subscriber.id)) {
        newState.push(action.subscriber);
      }
      return newState;
    case REMOVE_SUBSCRIBER:
      newState = newState.filter(user => (user.id !== action.subscriber.id));
      return newState;
    default:
      return newState;
  }
};

export default subscriptionReducer;
