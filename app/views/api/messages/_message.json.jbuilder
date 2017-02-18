json.extract! message, :id, :channel_id, :content, :created_at
json.author do
  json.partial! "api/users/user", user: message.author
end
