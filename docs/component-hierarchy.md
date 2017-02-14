## Component Hierarchy (with Pusher notes)

**SignUp**, **SignIn**
  - AuthForm
    * ErrorsList

**Home**
  - NavBarContainer
    * NavBar
      * SignOut
      * ChannelNavList, DMNavList
        * BaseNavList
          * (subscribed to `channel_:channel_id` for every channel in the list)
          * (if DM list, subscribed to `dm_alert_:current_user_id`)
  - ChannelContainer
    * Channel
      * (subscribed to `channel_:channel_id`)
      * ChannelHeader
      * SearchBar(?)
      * ChannelMessagesContainer
        * ChannelMessages
          * MessageGroup
            * Message
            * EditMessageFormContainer
              * EditMessageForm
      * NewMessageFormContainer
        * NewMessageForm
          * ErrorsList

**ChannelIndex, UserIndex**
  * BaseIndexContainer
    * BaseIndex

**NewChannelContainer**
  - **NewChannel**
    * ErrorsList
