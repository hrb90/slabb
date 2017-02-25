import * as ChannelActions from './actions/channel_actions';
import * as ReactionActions from './actions/reaction_actions';

export const attachAll = () => {
  window.logError = (err) => console.log(err.responseText);
  window.ChannelActions = ChannelActions;
  window.ReactionActions = ReactionActions;
};
