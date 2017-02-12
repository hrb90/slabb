All tables have id and timestamp columns.

Users
  string username, null: false, uniqueness: true
  string password_digest, null: false
  string session_token, null: false
  string avatar_url

Channels
  string name, null: false, uniqueness: true
  string description
  string topic
  string dm_hash <!-- only for DMs; ensures uniqueness of a DM channel for a given group -->
  integer channel_type_id, null: false

ChannelTypes
  string type, null: false

Messages
  integer author_id, null: false
  integer channel_id, null: false
  text content, null: false

Subscriptions
  integer user_id, null: false
  integer channel_id, null: false
