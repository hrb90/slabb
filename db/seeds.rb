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
  {name: "sportsball", description: "for discussion of the most important topic of all: grown men playing childrens' games", channel_type: "channel", topic: "don't let this web app distract you from the fact the warriors blew a 3-1 lead"},
  {name: "science", description: "she blinded me", channel_type: "channel"},
  {name: "tv", description: "talk about tv shows here", topic: "\"Truly it was a game... of thrones\" -- some character probably", channel_type: "channel"}])
# Create users
jeff = User.create({username: "jwu", password: "jeffwutangclan"})
guest = User.create({username: "guest", password: "bemyguest"})
harrison = User.create({username: "harrison", password: "notmyrealpassword"})
michael = User.create({username: "mkaroli", password: "yoodooright"})
holger = User.create({username: "czukay", password: "halleluhwah"})
irmin = User.create({username: "irmin", password: "bringmecoffeeortea"})
jaki = User.create({username: "liebezeit", password: "lovetime"})
damo = User.create({username: "dsuzuki", password: "mushroomhead"})


can = [michael, holger, irmin, jaki, damo]

users = can.concat([jeff])

lyrics = "When I saw – mushroom head
I was born and I was dead
I'm gonna give my despair
When I saw – skies are red
Hitori de soko ni suwatteru
Atama no ikareta yatsu
Niji no ue kara shoben
Warera ga himo to yobu
LSD no machi kara
Hanere, gaki wo osore
Asa ga mada konai no wo
Saiwai na koto ni
Did anybody see the snowman standing on winter road
With broken guitar in his hand, onion peeling sleepy eye?
It's my recording station man but I record in his head
Knowing that too big mouth, oh, ice can flow away, one knows
Moon shadow coming down
While it's all stormy, stormy night
Oh, the sound went all about
Spinning there, hold me tight
My powers strike me out
Did I slip this thing on their life?
And my god buying out
Oh, it gets me in star light
Searching for my black dope, yes I am
Oh, they're all alone there, let me in
Oh, she asked me the first day for my name
So she wasn't going where I was singing
Mushroom head, Oh yeah, Paperhouse
I wonder ... what I should do
(It was a game after this)"

can_emoji = [":musical_keyboard:", ":notes:", ":mushroom:", ":microphone:", ":guitar:"]

30.times do
  msg = Message.create({
    author_id: can.sample.id,
    channel_id: channels.sample.id,
    content: lyrics.split("\n").sample
    })
  [0, 0, 0, 1, 3].sample.times do
    Reaction.create({
      message_id: msg.id,
      user_id: users.sample.id,
      emoji_name: can_emoji.sample
    })
  end
end
