import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearNewMessages } from '../../actions/channel_actions';
import { updateUser } from '../../actions/user_actions';
import { FlexRow } from '../primitives/styled_primitives';
import ChannelHeader from './header/channel_header';
import ChannelMessages from './messages/channel_messages';
import NewMessageForm from './messages/new_message_form';
import ChannelSidebar from './sidebar/channel_sidebar';


// Styles
const MainChannel = styled.div`
  background-color: white;
  width: 100%;
`;

// Redux

const mapStateToProps = ({currentChannel, session}) => ({
  channelId: currentChannel.id,
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  clearNewMessages: channelId => dispatch(clearNewMessages(channelId)),
});

// Component

class Channel extends React.Component {
  constructor(props){
    super(props);

    this.state = { showSidebar: false };
    this.closeSidebar = this.closeSidebar.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.channelId !== nextProps.channelId && nextProps.channelId) {
      let updatedUser = Object.assign(this.props.currentUser, {last_channel_id: nextProps.channelId});
      this.props.updateUser(updatedUser).then(this.props.receiveCurrentUser);
      this.props.clearNewMessages(this.props.channelId);
      this.closeSidebar();
    }
  }


  closeSidebar() {
    this.setState({ showSidebar: false });
  }

  openSidebar() {
    this.setState({showSidebar: true});
  }

  render() {
    return (
      <FlexRow alignItems="stretch" width="100vw">
        <MainChannel>
          <ChannelHeader openSidebar={ this.openSidebar } />
          <ChannelMessages ref={ cm => this.msgsContainer = cm } />
          <NewMessageForm returnCallback={ this.scrollToEnd } />
        </MainChannel>
        <ChannelSidebar hidden={ !this.state.showSidebar }
          closeSidebar={ this.closeSidebar } />
      </FlexRow>
    );
  }

  scrollToEnd() {
    this.msgsContainer.scrollTop = this.msgsContainer.scrollHeight;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
