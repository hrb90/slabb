import React from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel, unsubscribeFromChannel } from '../../actions/channel_actions';
import { fixDMName } from '../../util/channel_util';

const mapStateToProps = ({currentChannel, session}) => ({
  id: currentChannel.id,
  name: (currentChannel.channel_type !== "dm") ? currentChannel.name : fixDMName(currentChannel.name, session.currentUser.username),
  topic: currentChannel.topic
});

const mapDispatchToProps = dispatch => ({
  unsubscribe: id => () => dispatch(unsubscribeFromChannel(id)),
  subscribe: id => () => dispatch(subscribeToChannel(id))
})

const Channel = (props) => (
  <div>
    <span>{ props.name }</span>
    <span>{ props.topic }</span>
    <button onClick={ props.subscribe(props.id) }>Subscribe</button>
    <button onClick={ props.unsubscribe(props.id) }>Unsubscribe</button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
