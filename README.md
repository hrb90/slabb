# Slabb

Slabb is a full-stack live chat web application inspired by Slack. It was built with a Ruby on Rails backend utilizing a PostgreSQL database, and React/Redux on the frontend.

## Features & Implementation

### Channels and DMs

Both regular and direct message channels are stored in a `channels` table in the database, with a `channel_type` column to distinguish between the two types. We ensure that there is a unique DM channel for any group of users by hashing the groups' user ids and storing the hash in a `dm_hash` column with a uniqueness constraint.

The current channel, along with its messages, those messages' reactions, and various other data, is held in a slice of the Redux global state. Another slice of state holds (much less data about) the current user's subscribed channels.

### Live Chat

Messages are stored in a `messages` table, with `author_id`, `channel_id` and `content` columns.

The live chat functionality is built using the [Pusher][pusher] API. The backend Rails controllers publish events corresponding to various user actions (for instance, writing, editing, or deleting a message, or changing the channel topic), and Pusher listeners on the frontend subscribe to these events and dispatch actions as necessary to keep the Redux global state up-to-date.

### Avatars

Avatars are hosted on Amazon Web Services; links to the AWS urls are stored in an `avatar_url` column in the `users` table in the database.

### Reactions

Reactions were built using [react-emoji][react-emoji] by banyan and [react-emoji-picker][picker] by chadoh.

## Future Directions

### Search

### Online Status

[pusher]: https://pusher.com/
[react-emoji]: https://github.com/banyan/react-emoji
[picker]: https://github.com/chadoh/react-emoji-picker
