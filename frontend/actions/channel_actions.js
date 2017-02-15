import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const receiveAllChannels = (channels) => ({
  channels,
  type: RECEIVE_ALL_CHANNELS
});

export const receiveChannel = (channel) => ({
  channel,
  type: RECEIVE_CHANNEL
});


export const removeChannel = (channelId) => ({
  channelId,
  type: REMOVE_CHANNEL
});

export const fetchChannels = () => dispatch => {
  return ChannelAPIUtil.fetchChannels()
    .then(channels => dispatch(receiveAllChannels(channel)));
};

export const fetchChannel = id => dispatch => {
  return ChannelAPIUtil.fetchChannel(id)
    .then(channel => dispatch(receiveChannel(channel)));
};

export const createChannel = channel => dispatch => {
  return ChannelAPIUtil.createChannel(channel)
    .then(retChannel => dispatch(receiveChannel(retChannel)));
};

export const updateChannel = channel => dispatch => {
  return ChannelAPIUtil.updateChannel(channel)
    .then(retChannel => dispatch(receiveChannel(retChannel)));
};

export const deleteChannel = id => dispatch => {
  return ChannelAPIUtil.fetchChannel(id)
    .then(() => dispatch(removeChannel(id)));
};
