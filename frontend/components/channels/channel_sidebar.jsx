import React from 'react';
import UserList from './dms/user_list';
import { connect } from 'react-redux';
import { createChannel } from '../../actions/channel_actions';

const mapStateToProps = ({ currentChannel, session }) => ({
  currentUserId: session.currentUser.id,
  currentUsername: session.currentUser.username,
  name: currentChannel.name,
  description: currentChannel.description,
  subscribers: currentChannel.subscribers
});

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel))
})

const mergeProps = (stateProps, { createChannel }) => {
  let fetchCreateDM = user => () => {
    let dm_channel;
    if (user.id !== stateProps.currentUserId) {
      dm_channel = { name: `${user.username},${stateProps.currentUsername}`,
        dm_user_ids: [user.id, stateProps.currentUserId],
        channel_type: "dm"
      };
    } else {
      dm_channel = { name: `${user.username}`, dm_user_ids: [user.id],
        channel_type: "dm"};
    }
    createChannel(dm_channel);
  }
  return Object.assign({ fetchCreateDM }, stateProps);
}

class ChannelSidebar extends React.Component {
  render() {
    return (
      <aside ref={ aside => this.sidebar = aside }
        id="channel-sidebar"
        className="hidden">
        <section>
          <i className  ="fa fa-times close-button"
            onClick={ () => {
              this.sidebar.className="hidden";
            }}></i>
          <h2>About { this.props.name }</h2>
        </section>
        <section>
          <h3>Description</h3>
          <p>{ this.props.description }</p>
        </section>
        <section>
          <h3>Subscribers</h3>
          <UserList users={ this.props.subscribers }
            selectUser={ this.props.fetchCreateDM } />
        </section>
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChannelSidebar);
