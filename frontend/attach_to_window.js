import { fetchChannels, createChannel } from './util/channel_api_util';

export const attachAll = () => {
  window.logError = (err) => console.log(err.responseText);
  window.fetchChannels = fetchChannels;
  window.createChannel = createChannel;
};
