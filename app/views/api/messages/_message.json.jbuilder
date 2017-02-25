json.extract! message, :id, :channel_id, :content, :created_at
json.author do
  json.partial! "api/users/user", user: message.author
end
json.reactions do
  json.array! message.reactions, partial: "api/reactions/reaction", as: :reaction
end
json.isEditing false
