# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

jokes = [
  "Yo momma so fat she doesn't need the internet, because she's already world wide",
  "Yo momma so ugly when she tried to join an ugly contest they said, \"Sorry, no professionals.\"",
  "Yo momma so stupid, she put two quarters in her ears and thought she was listening to 50 Cent."
]

Message.destroy_all
Subscription.destroy_all
User.destroy_all
Channel.destroy_all
# Create users
jeff = User.create({username: "jwu", password: "jeffwutangclan"})
guest = User.create({username: "guest", password: "bemyguest"})
harrison = User.create({username: "harrison", password: "notmyrealpassword"})
# Create channels
channels = Channel.create([{name: "general", description: "Team-wide announcements and discussion", channel_type: "channel"},
  {name: "random", description: "Off-topic discussion and silliness", channel_type: "channel"},
  {name: "sportsball", description: "for discussion of the most important topic of all: grown men playing childrens' games", channel_type: "channel", topic: "Kyrie thinks the world is flat"},
  {name: "science", description: "she blinded me", channel_type: "channel"}])
extra_channels = Channel.create([{name: "tv", description: "talk about tv shows here", topic: "just how much of the electric kartvelian do you let your kids watch?", channel_type: "channel"}, {name: "dozens", description: "Yo momma so ugly...", topic: jokes.sample, channel_type: "channel"}])
jeff_self_dm = Channel.create({name: "jwu", channel_type: "dm", dm_user_ids: [jeff.id]})
guest_harrison_dm = Channel.create({name:"guest,harrison", channel_type: "dm", dm_user_ids: [guest.id, harrison.id]})
[jeff, guest, harrison].each do |user|
  channels.each do |channel|
    Subscription.create({user_id: user.id, channel_id: channel.id})
  end
end
Subscription.create({user_id: jeff.id, channel_id: jeff_self_dm.id})
Subscription.create([{user_id: guest.id, channel_id: guest_harrison_dm.id}, {user_id: harrison.id, channel_id: guest_harrison_dm.id}])
