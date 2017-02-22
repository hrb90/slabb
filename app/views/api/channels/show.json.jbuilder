json.partial! "api/channels/channel", channel: @channel
json.messages do
  json.array! @channel.messages, partial: "api/messages/message", as: :message
end
json.subscribers do
  json.array! @channel.subscribers, partial: "api/users/user", as: :user
end
