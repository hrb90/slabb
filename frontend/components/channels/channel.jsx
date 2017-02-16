import React from 'react';
import { connect } from 'react-redux';
import { unsubscribeFromChannel } from '../../actions/channel_actions';

const mapStateToProps = ({currentChannel}) => ({
  id: currentChannel.id,
  name: currentChannel.name,
  topic: currentChannel.topic
});

const mapDispatchToProps = dispatch => ({
  unsubscribe: id => () => dispatch(unsubscribeFromChannel(id))
})

const Channel = (props) => (
  <div>
    <span>{ props.name }</span>
    <span>{ props.topic }</span>
    <button onClick={ props.unsubscribe(props.id) }>Unsubscribe</button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
