import { RECEIVE_REACTION, REMOVE_REACTION } from '../../actions/reaction_actions';

const reactionReducer = (state, action) => {
  Object.freeze(state);
  let newState = state.slice(0);
  switch(action.type) {
    case RECEIVE_REACTION:
      if (!newState.map(rxn => rxn.id).includes(action.reaction.id)) {
        newState.push(action.reaction);
      }
      return newState;
    case REMOVE_REACTION:
      newState = newState.filter(rxn => (rxn.id !== action.reaction.id));
      return newState;
    default:
      return state;
  }
};

export default reactionReducer;
