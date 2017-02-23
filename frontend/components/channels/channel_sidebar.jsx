import React from 'react';
import UserList from './dms/user_list';
import { connect } from 'react-redux';

const mapStateToProps = ({ currentChannel }) => ({ currentChannel });

const ChannelSidebar = ({ currentChannel }) => (
  <aside id="channel-sidebar" className="hidden">
    <h2>About { currentChannel.name }</h2>
    <h3>Description</h3>
    <p>{ currentChannel.description }</p>
    <h3>Subscribers</h3>
    <UserList users={ currentChannel.subscribers } selectUser={ () => {} } />
  </aside>
)

export default connect(mapStateToProps)(ChannelSidebar);
