import * as ReactionAPIUtil from '../util/reaction_api_util';

export const RECEIVE_REACTION = "RECEIVE_REACTION";
export const REMOVE_REACTION = "REMOVE_REACTION";

export const receiveReaction = reaction => ({
  reaction,
  type: RECEIVE_REACTION
});

export const removeReaction = reaction => ({
  reaction,
  type: REMOVE_REACTION
});

export const createReaction = message_id => emoji_name => dispatch => {
  return ReactionAPIUtil.createReaction(message_id)(emoji_name)
    .then(reaction => dispatch(receiveReaction(reaction)));
};

export const deleteReaction = id => dispatch => {
  return ReactionAPIUtil.deleteReaction(id)
    .then(reaction => dispatch(removeReaction(reaction)));
};
