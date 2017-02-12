## Component Hierarchy

TBD: Figure out which of these components need to be connected (many of them probably)

**SignUp**, **SignIn**
  - AuthForm
    * ErrorsList

**Home**
  - NavBar
    * SignOut
    * ChannelList
    * DMList
  - Channel
    * ChannelHeader
    * SearchBar(?)
    * ChannelMessages
      * MessageGroup
        * Message
        * EditMessageForm
    * NewMessageForm

**ChannelIndex, UserIndex**
  - BaseIndex

**NewChannel**
  - ErrorsList
