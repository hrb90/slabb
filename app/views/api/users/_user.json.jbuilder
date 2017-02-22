json.extract! user, :id, :username, :last_channel_id
json.avatar_url asset_path(user.avatar.url)
