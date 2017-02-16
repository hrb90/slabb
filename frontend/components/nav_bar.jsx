import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { fetchChannel, fetchSubscriptions } from '../actions/channel_actions';
import { makeArrayFromObject } from '../util/selectors';
import LogoutButton from './auth/logout_button';
import DMIndex from './channels/dms/dm_index';
import ChannelIndex from './channels/channels/channel_index';

const mapStateToProps = ({subscriptions, currentChannel}) => {
  let subArray = makeArrayFromObject(subscriptions);
  let dms = subArray.filter((channel) => (channel.channel_type === "dm"));
  let channels = subArray.filter((channel) => (channel.channel_type === "channel"));
  return {
    plainChannels: channels,
    dmChannels: dms,
    currentChannelId: currentChannel.id
  };
};

const mapDispatchToProps = dispatch => ({
  fetchChannel: id => () => dispatch(fetchChannel(id)),
  fetchSubscriptions: () => dispatch(fetchSubscriptions())
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelsIsOpen: false,
      dmsIsOpen: false
    };
    this.closeChannels = this.closeChannels.bind(this);
    this.closeDMs = this.closeDMs.bind(this);
    this.openChannels = this.openChannels.bind(this);
    this.openDMs = this.openDMs.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
    this.props.fetchSubscriptions();
  }

  closeChannels() {
    this.setState({channelsIsOpen: false});
  }

  closeDMs() {
    this.setState({dmsIsOpen: false});
  }

  openChannels() {
    this.setState({channelsIsOpen: true});
  }

  openDMs() {
    this.setState({dmsIsOpen: true});
  }

  render() {
    return (
      <aside className="nav-bar">
        <LogoutButton />
        <span onClick={ this.openChannels }>Channels</span>
        <Modal
          isOpen={ this.state.channelsIsOpen }
          onRequestClose={ this.closeChannels }
          contentLabel="Channel">
            <ChannelIndex closeModal={ this.closeChannels } />
        </Modal>
        <ul>
          { this.props.plainChannels.map(channel => (
            <li key={ channel.id }
              className={
                (channel.id === this.props.currentChannelId) ? "nb-channel current-nb-channel" : "nb-channel"
              }
              onClick={ this.props.fetchChannel( channel.id ) }>
              { channel.name }
            </li>
          ))}
        </ul>
        <span onClick={ this.openDMs }>Direct messages</span>
        <Modal
          isOpen={ this.state.dmsIsOpen }
          onRequestClose={ this.closeDMs }
          contentLabel="Direct Messages">
            <DMIndex closeModal={ this.closeDMs } />
        </Modal>
        <ul>
          { this.props.dmChannels.map(channel => (
            <li key={ channel.id }
              className={
                (channel.id === this.props.currentChannelId) ? "nb-channel current-nb-channel" : "nb-channel"
              }
              onClick={ this.props.fetchChannel( channel.id ) }>
              { channel.name }
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
