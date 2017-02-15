# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
jeff = User.create({username: "jwu", password: "jeffwutangclan"})
Channel.destroy_all
channels = Channel.create([{name: "general", description: "Team-wide announcements and discussion", channel_type: "channel"},
  {name: "random", description: "Off-topic discussion and silliness", channel_type: "channel"}])
jeff_self_dm = Channel.create({name: "Jeff Self DM", channel_type: "dm", dm_user_ids: [jeff.id]})
