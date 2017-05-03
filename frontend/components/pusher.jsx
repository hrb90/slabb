import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';
import { receiveChannel, receiveSubscriber,
  removeSubscriber, receiveTopic } from '../actions/channel_actions';
import { receiveNewMessage, receiveOldMessage,
  removeMessage } from '../actions/message_actions';
import { receiveCurrentUser } from '../actions/session_actions';
import { receiveReaction, removeReaction } from '../actions/reaction_actions';
import { subscribeToChannelNoRedirect,
  receiveMessageSubscribedChannel } from '../actions/channel_actions';

const mapStateToProps = ({currentChannel, session, subscriptions}) => ({
  channelName: currentChannel.name,
  currentChannelId: currentChannel.id,
  isSubscribed: currentChannel.id in subscriptions,
  currentUser: session.currentUser,
  subIds: values(subscriptions).map(sub => sub.id)
});

const mapDispatchToProps = dispatch => ({
  receiveNewMessage: message => dispatch(receiveNewMessage(message)),
  receiveOldMessage: message => dispatch(receiveOldMessage(message)),
  removeMessage: id => dispatch(removeMessage(id)),
  receiveChannel: channel => dispatch(receiveChannel(channel)),
  receiveCurrentUser: user => dispatch(receiveCurrentUser(user)),
  receiveSubscriber: user => dispatch(receiveSubscriber(user)),
  removeSubscriber: user => dispatch(removeSubscriber(user)),
  receiveTopic: topic => dispatch(receiveTopic(topic)),
  receiveReaction: reaction => dispatch(receiveReaction(reaction)),
  removeReaction: reaction => dispatch(removeReaction(reaction)),
  receiveMessageSubscribedChannel: id => dispatch(receiveMessageSubscribedChannel(id)),
  subscribeToChannelNoRedirect: id => dispatch(subscribeToChannelNoRedirect(id)),
});


class PusherListener extends React.Component {
  constructor(props) {
    super(props);
  }

  bindCurrentChannelListener() {
    this.currentChannelListener.bind('new_message', data => {
      this.props.receiveNewMessage(data.message);
    });
    this.currentChannelListener.bind('edit_message', data => {
      this.props.receiveOldMessage(data.message);
    });
    this.currentChannelListener.bind('delete_message', data => {
      this.props.removeMessage(data.id);
    });
    this.currentChannelListener.bind('update_topic', data => {
      this.props.receiveTopic(data.topic);
    });
    this.currentChannelListener.bind('receive_subscriber', data => {
      this.props.receiveSubscriber(data.user);
    });
    this.currentChannelListener.bind('remove_subscriber', data => {
      this.props.removeSubscriber(data.user);
    });
    this.currentChannelListener.bind('receive_reaction', data => {
      this.props.receiveReaction(data.reaction);
    });
    this.currentChannelListener.bind('remove_reaction', data => {
      this.props.removeReaction(data.reaction);
    });
  }

  componentWillMount() {
    this.pusher = new Pusher('dd38d591c7efa0a63140', {
      encrypted: true
    });
    this.currentChannelListener = this.pusher.subscribe('channel_' + this.props.currentChannelId);
    this.bindCurrentChannelListener();
    this.newDMListener = this.pusher.subscribe('dm_alert_' + this.props.username);
    this.newDMListener.bind('new_dm_alert', this.handleNewDM);
    this.newMessageListener = this.pusher.subscribe('new_messages');
    this.newMessageListener.bind('new_message', this.handleNewMessage);
  }

  componentWillUpdate(nextProps) {
    if (this.props.currentChannelId !== nextProps.currentChannelId && nextProps.currentChannelId) {
      this.pusher.unsubscribe('channel_' + this.props.currentChannelId);
      this.currentChannelListener = this.pusher.subscribe('channel_' + nextProps.currentChannelId);
      this.bindCurrentChannelListener();
    }
  }

  handleNewDM(data) {
    let subIds = this.props.subIds;
    if (this.props.subIds.includes((+data.channelId))) {
      this.props.receiveMessageSubscribedChannel(data.channelId);
    } else {
      this.props.subscribeToChannelNoRedirect(data.channelId)
        .then(() => this.props.receiveMessageSubscribedChannel(data.channelId));
    }
  }

  handleNewMessage(data) {
    if ((+data.channelId) !== this.props.currentChannelId) {
      this.props.receiveMessageSubscribedChannel(data.channelId);
    }
  }

  render() {
    return (<div className="hidden"></div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PusherListener);
