import React from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel, unsubscribeFromChannel, updateChannel, clearNewMessages } from '../../actions/channel_actions';
import { createMessage,
  updateMessage,
  deleteMessage,
  beginEditMessage,
  endEditMessage,
  receiveNewMessage,
  receiveOldMessage,
  removeMessage } from '../../actions/message_actions';
import { fixDMName } from '../../util/channel_util';
import ChannelHeader from './header/channel_header';
import ChannelMessages from './channel_messages';
import NewMessageForm from './new_message_form';
import { merge } from 'lodash';

const mapStateToProps = ({currentChannel, session, subscriptions}) => ({
  channelId: currentChannel.id,
  name: (currentChannel.channel_type !== "dm") ? currentChannel.name : fixDMName(currentChannel.name, session.currentUser.username),
  topic: currentChannel.topic,
  type: currentChannel.channel_type,
  isSubscribed: currentChannel.id in subscriptions,
  messages: currentChannel.messages,
  currentUserId: session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  update: id => channel => dispatch(updateChannel(merge({}, channel, {id}))),
  unsubscribe: id => () => dispatch(unsubscribeFromChannel(id)),
  subscribe: id => () => dispatch(subscribeToChannel(id)),
  createMessage: channelId => message => dispatch(createMessage(channelId)(message)),
  updateMessage: message => dispatch(updateMessage(message)),
  beginEditMessage: messageId => () => dispatch(beginEditMessage(messageId)),
  endEditMessage: messageId => dispatch(endEditMessage(messageId)),
  deleteMessage: messageId => () => dispatch(deleteMessage(messageId)),
  receiveNewMessage: message => dispatch(receiveNewMessage(message)),
  receiveOldMessage: message => dispatch(receiveOldMessage(message)),
  removeMessage: id => dispatch(removeMessage(id)),
  clearNewMessages: channelId => dispatch(clearNewMessages(channelId))
})


const Channel = props => (
  <div className="display-channel">
    <ChannelHeader channelName={ props.name }
      topic={ props.topic }
      isSubscribed={ props.isSubscribed }
      update={ props.update(props.channelId) }
      unsubscribe={ props.unsubscribe(props.channelId) }
      type={ props.type } />
    <ChannelMessages messages={ props.messages }
       updateMessage={ props.updateMessage }
       beginEditMessage={ props.beginEditMessage }
       currentUserId={ props.currentUserId }
       endEditMessage={ props.endEditMessage }
       deleteMessage={ props.deleteMessage }
       receiveNewMessage={ props.receiveNewMessage }
       receiveOldMessage={ props.receiveOldMessage }
       removeMessage={ props.removeMessage }
       clearNewMessages={ props.clearNewMessages }
       channelId={ props.channelId }/>
    <NewMessageForm isSubscribed={ props.isSubscribed }
      sendMessage={ props.createMessage(props.channelId) }
      subscribe={ props.subscribe(props.channelId) }/>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
