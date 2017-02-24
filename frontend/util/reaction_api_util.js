export const createReaction = messageId => emoji_name => (
  $.ajax({
    method: "POST",
    url: `api/messages/${messageId}/reactions`,
    data: { reaction: { emoji_name} }
  })
);

export const deleteReaction = id => (
  $.ajax({
    method: "DELETE",
    url: `api/reactions/${id}`
  })
);
