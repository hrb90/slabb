export const fetchChannels = () => (
  $.ajax({
    method: "GET",
    url: "api/channels"
  })
);

export const fetchChannel = id => (
  $.ajax({
    method: "GET",
    url: `api/channels/${id}`
  })
);

export const createChannel = channel => (
  $.ajax({
    method: "POST",
    url: "api/channels",
    data: { channel }
  })
);

export const updateChannel = channel => (
  $.ajax({
    method: "PATCH",
    url: `api/channels/${channel.id}`,
    data: { channel }
  })
);

export const deleteChannel = id => (
  $.ajax({
    method: "DELETE",
    url: `api/channels/${id}`
  })
);

export const subscribeToChannel = id => (
  $.ajax({
    method: "GET",
    url: `api/channels/${id}/subscribe`
  })
);

export const unsubscribeFromChannel = id => (
  $.ajax({
    method: "GET",
    url: `api/channels/${id}/unsubscribe`
  })
);

export const fetchSubscriptions = () => (
  $.ajax({
    method: "GET",
    url: `api/subscriptions`
  })
);
