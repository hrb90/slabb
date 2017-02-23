import React from 'react';
import UserList from './dms/user_list';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannel }) => ({
  description: currentChannel.description,
  subscribers: currentChannel.subscribers
});

const ChannelSidebar = ({description, subscribers}) => (
  <aside id="channel-sidebar">
    <p>{ description }</p>
    <UserList users={ subscribers } selectUser={ () => {} } />
  </aside>
)

export default connect(mapStateToProps)(ChannelSidebar);
