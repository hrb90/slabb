# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.destroy_all
Subscription.destroy_all
User.destroy_all
Channel.destroy_all
# Create channels
channels = Channel.create([{name: "general", description: "Team-wide announcements and discussion", channel_type: "channel", autosubscribe: true},
  {name: "random", description: "Off-topic discussion and silliness", channel_type: "channel", autosubscribe: true},
  {name: "sportsball", description: "for discussion of the most important topic of all: grown men playing childrens' games", channel_type: "channel", topic: "Kyrie thinks the world is flat"},
  {name: "science", description: "she blinded me", channel_type: "channel"},
  {name: "tv", description: "talk about tv shows here", topic: "\"Truly it was a game... of thrones\" -- some character probably", channel_type: "channel"}, ])
# Create users
jeff = User.create({username: "jwu", password: "jeffwutangclan"})
guest = User.create({username: "guest", password: "bemyguest"})
harrison = User.create({username: "harrison", password: "notmyrealpassword"})
