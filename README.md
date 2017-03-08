# Slabb

[Slabb][slabb] is a full-stack live chat web application inspired by Slack. On the backend, I used Ruby on Rails with a PostgreSQL database; the frontend was built with React.js and Redux.

## Features

### Channels and DMs

Both regular and direct message channels are stored in a `channels` table in the database, with a `channel_type` column to distinguish between the two types. We ensure that there is a unique DM channel for any group of users by hashing the groups' user ids and storing the hash in a `dm_hash` column with a uniqueness constraint:

```ruby
def dm_user_ids=(dms)
  @dm_user_ids = dms
  self.dm_hash = Digest::SHA256.base64digest(dms.sort.join(','))
end
```

On the frontend, the current channel, along with its messages, those messages' reactions, and various other data, is held in a slice of the Redux global state. Another slice of state holds (much less data about) the current user's subscribed channels.

### Live Chat

Messages are stored in a `messages` table, with `author_id`, `channel_id` and `content` columns.

The live chat functionality is built using the [Pusher][pusher] API. The backend Rails controllers publish events corresponding to various user actions (for instance, creating, editing, deleting, or reacting to a message, or changing the channel topic), and Pusher listeners on the frontend subscribe to these events and dispatch actions as necessary to keep the Redux global state up-to-date.

### Avatars

Avatars are hosted on Amazon Web Services; links to the AWS urls are stored in an `avatar_url` column in the `users` table in the database.

### Reactions

Reactions are stored in a `reactions` table, with `message_id`, `user_id`, and `emoji_name` columns. We enforce a uniqueness constraint on those three columns together to prevent a user reacting multiple times to the same message with the same reaction. Frontend components for the reactions, including the reaction bar and the emoji picker, were built using [react-emoji][react-emoji] by banyan and [react-emoji-picker][picker] by chadoh.

## Libraries

### Slabb uses:
- [React.js](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [BCrypt](https://github.com/codahale/bcrypt-ruby) for authorization
- [FontAwesome](http://fontawesome.io/) for icons
- [React Modal](https://github.com/reactjs/react-modal) for channel and DM search, channel creation, and user detail modals.
- [React Emoji](https://github.com/banyan/react-emoji) and [React Emoji Picker][picker] for emoji reactions
- [Paperclip](https://github.com/thoughtbot/paperclip) to store avatar images, using Amazon Web Services
- [Figaro](https://github.com/laserlemon/figaro) to store AWS keys

## Next Steps

### Message pagination

Currently all messages (and their necessary associations) are loaded on channel change. For scalability, it would be better to load them in small batches as a user scrolls up.

### Online Status

Currently there is no way to know whether a given Slabb user is online or not. There should be small icons indicating the online status of users in various places where users are listed.

[slabb]: http://slabb.herokuapp.com/
[pusher]: https://pusher.com/
[react-emoji]: https://github.com/banyan/react-emoji
[picker]: https://github.com/chadoh/react-emoji-picker
