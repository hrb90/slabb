import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_ALL_SUBS = "RECEIVE_ALL_SUBS";
export const RECEIVE_SUB = "RECEIVE_SUB";
export const RECEIVE_UNSUB = "RECEIVE_UNSUB";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
export const RECEIVE_MESSAGE_SUBSCRIBED_CHANNEL = "RCV_MSG_SUB_CHANNEL";

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

export const receiveAllSubs = (channels) => ({
  channels,
  type: RECEIVE_ALL_SUBS
});

export const receiveSub = (channel) => ({
  channel,
  type: RECEIVE_SUB
});

export const receiveMessageSubscribedChannel = id => ({
  id,
  type: RECEIVE_MESSAGE_SUBSCRIBED_CHANNEL
});

export const receiveUnsub = (channelId) => ({
  channelId,
  type: RECEIVE_UNSUB
});

export const receiveChannelErrors = errors => ({
  errors,
  type: RECEIVE_CHANNEL_ERRORS
});

export const fetchChannels = () => dispatch => {
  return ChannelAPIUtil.fetchChannels()
    .then(channels => dispatch(receiveAllChannels(channels)));
};

export const fetchChannel = id => dispatch => {
  return ChannelAPIUtil.fetchChannel(id)
    .then(channel => dispatch(receiveChannel(channel)));
};

export const createChannel = channel => dispatch => {
  return ChannelAPIUtil.createChannel(channel)
    .then(retChannel => dispatch(receiveChannel(retChannel)))
    .fail(err => dispatch(receiveChannelErrors(err.responseJSON)));
};

export const updateChannel = channel => dispatch => {
  return ChannelAPIUtil.updateChannel(channel)
    .then(retChannel => dispatch(receiveChannel(retChannel)));
};

export const deleteChannel = id => dispatch => {
  return ChannelAPIUtil.fetchChannel(id)
    .then(() => dispatch(removeChannel(id)));
};

export const subscribeToChannel = id => dispatch => {
  return ChannelAPIUtil.subscribeToChannel(id)
    .then(channel => {
      dispatch(receiveSub(channel));
      dispatch(receiveChannel(channel));
    });
};

export const unsubscribeFromChannel = id => dispatch => {
  return ChannelAPIUtil.unsubscribeFromChannel(id)
    .then(sub => dispatch(receiveUnsub(sub.channel_id)));
};

export const fetchSubscriptions = () => dispatch => {
  return ChannelAPIUtil.fetchSubscriptions()
    .then(channels => dispatch(receiveAllSubs(channels)));
};
