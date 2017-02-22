import * as ChannelActions from './actions/channel_actions';

export const attachAll = () => {
  window.logError = (err) => console.log(err.responseText);
  window.ChannelActions = ChannelActions;
};
