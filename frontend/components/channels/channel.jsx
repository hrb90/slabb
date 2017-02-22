import React from 'react';
import { connect } from 'react-redux';
import { receiveChannel, clearNewMessages } from '../../actions/channel_actions';
import { receiveNewMessage, receiveOldMessage, removeMessage } from '../../actions/message_actions';
import { receiveCurrentUser } from '../../actions/session_actions';
import { updateUser } from '../../actions/user_actions';
import ChannelHeader from './header/channel_header';
import ChannelMessages from './channel_messages';
import NewMessageForm from './new_message_form';

const mapStateToProps = ({currentChannel, session, subscriptions}) => ({
  channelId: currentChannel.id,
  isSubscribed: currentChannel.id in subscriptions,
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  receiveNewMessage: message => dispatch(receiveNewMessage(message)),
  receiveOldMessage: message => dispatch(receiveOldMessage(message)),
  removeMessage: id => dispatch(removeMessage(id)),
  clearNewMessages: channelId => dispatch(clearNewMessages(channelId)),
  receiveChannel: channel => dispatch(receiveChannel(channel)),
  updateUser: user => dispatch(updateUser(user)),
  receiveCurrentUser: user => dispatch(receiveCurrentUser(user))
})


class Channel extends React.Component {
  bindPusherChannel() {
    this.currentPusherChannel.bind('new_message', data => {
      this.props.receiveNewMessage(data.message);
    });
    this.currentPusherChannel.bind('edit_message', data => {
      this.props.receiveOldMessage(data.message);
    });
    this.currentPusherChannel.bind('delete_message', data => {
      this.props.removeMessage(data.id);
    });
    this.currentPusherChannel.bind('update_channel', data => {
      this.props.receiveChannel(data.channel);
    });
  }

  componentWillMount() {
    this.pusher = new Pusher('dd38d591c7efa0a63140', {
      encrypted: true
    });
    this.currentPusherChannel = this.pusher.subscribe('channel_' + this.props.channelId);
    this.bindPusherChannel();
  }

  componentWillUpdate(nextProps) {
    if (this.props.channelId !== nextProps.channelId) {
      let updatedUser = Object.assign(this.props.currentUser, {last_channel_id: nextProps.channelId});
      this.props.updateUser(updatedUser).then(this.props.receiveCurrentUser);
      this.pusher.unsubscribe('channel_' + this.props.channelId);
      this.currentPusherChannel = this.pusher.subscribe('channel_' + nextProps.channelId);
      this.props.clearNewMessages(this.props.channelId);
      this.bindPusherChannel();
    }
  }

  render() {
    return (<div className="display-channel">
    <ChannelHeader channelId={ this.props.channelId }
      isSubscribed={ this.props.isSubscribed } />
    <ChannelMessages />
    <NewMessageForm channelId={ this.props.channelId }
      isSubscribed={ this.props.isSubscribed } />
  </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
