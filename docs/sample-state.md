```javascript
{
  session:
    {
      currentUser: {
        id: 1,
        username: "hrb90"
      }
    },
  subscriptions:
    {
      channels:
        [
          {
            id: 1,
            name: "general",
            newMessages: false
          },
          {
            id: 3,
            name: "random",
            newMessages: true
          }
        ],
      dms:
        [
          {
            id: 54,
            name: "atom",
            newMessages: 0,
            status: "online"
          },
          {
            id: 72,
            name: "atom,mc962",
            newMessages: 2,
            status: "2"
          }
        ]
    },
  currentChannel:
    {
      id: 1,
      name: "general",
      type: "channel"
      subscribers: [
        {
          id: 1,
          name: "hrb90",
          avatar_url: "assets/whatever_else.png"
        },
        {
          id: 2,
          name: "atom",
          avatar_url: "assets/whatever.png"
        },
        {
          id: 3,
          name: "mc962",
          avatar_url: "assets/mc-avatar.png"
        }
      ]
      topic: "General discussion",
      messages: [
        {
          id: 546,
          author: {
            id: 2,
            name: "atom",
            avatar_url: "/assets/whatever.png"
          },
          created_at: "2017-02-11 20:00:30",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
          isEditing: false
        },
        {
          id: 672,
          author: {
            id: 1,
            name: "hrb90",
            avatar_url: "assets/whatever_else.png"
          },
          created_at: "2017-02-11 20:02:24",
          content: "lol latin",
          isEditing: false
        }
      ]
    },
  channels:
    [
      {
        id: 1,
        name: "general",
        description: "Team-wide messages and announcements"
      },
      {
        id: 2,
        name: "sports",
        description: "sports discussion goes here"
      },
      {
        id: 3,
        name: "random",
        description: "random lol"
      }
    ],
  users:
    [
      {
        id: 1,
        name: "hrb90",
        avatar_url: "assets/whatever_else.png"
      },
      {
        id: 2,
        name: "atom",
        avatar_url: "/assets/whatever.png"
      },
      {
        id: 3,
        name: "mc962",
        avatar_url: "assets/mc-avatar.png"
      }
    ]
}
```
