import React from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel, unsubscribeFromChannel, updateChannel } from '../../actions/channel_actions';
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
  isSubscribed: currentChannel.id in subscriptions
});

const mapDispatchToProps = dispatch => ({
  update: id => channel => dispatch(updateChannel(merge({}, channel, {id}))),
  unsubscribe: id => () => dispatch(unsubscribeFromChannel(id)),
  subscribe: id => () => dispatch(subscribeToChannel(id))
})

const temporaryNewMessageBlocker = e => {
  e.preventDefault();
}

const Channel = props => (
  <div className="display-channel">
    <ChannelHeader channelName={ props.name }
      topic={ props.topic }
      isSubscribed={ props.isSubscribed }
      update={ props.update(props.channelId) }
      unsubscribe={ props.unsubscribe(props.channelId) }
      type={ props.type } />
    <ChannelMessages />
    <NewMessageForm isSubscribed={ props.isSubscribed }
      sendMessage={ temporaryNewMessageBlocker }
      subscribe={ props.subscribe(props.channelId) }/>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
