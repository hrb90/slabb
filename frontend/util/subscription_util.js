export const extractChannelInfo = channel => {
  return {
    [channel.id]: {
      id: channel.id,
      name: channel.name,
      channel_type: channel.channel_type
    }
  };
};
