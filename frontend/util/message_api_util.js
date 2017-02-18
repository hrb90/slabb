export const fetchChannelMessages = channelId => (
  $.ajax({
    method: "GET",
    url: `api/channels/${channelId}/messages`
  })
);

export const createMessage = channelId => message => (
  $.ajax({
    method: "POST",
    url: `api/channels/${channelId}/messages`,
    data: { message }
  })
);

export const updateMessage = message => (
  $.ajax({
    method: "PATCH",
    url: `api/messages/${message.id}`,
    data: { message }
  })
);

export const deleteMessage = id => (
  $.ajax({
    method: "DELETE",
    url: `api/messages/${id}`
  })
);
