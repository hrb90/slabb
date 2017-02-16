import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import LogoutButton from './auth/logout_button';
import DMIndex from './channels/dms/dm_index';
import ChannelIndex from './channels/channels/channel_index';

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
        <span onClick={ this.openDMs }>Direct messages</span>
        <Modal
          isOpen={ this.state.dmsIsOpen }
          onRequestClose={ this.closeDMs }
          contentLabel="Direct Messages">
            <DMIndex closeModal={ this.closeDMs } />
        </Modal>
      </aside>
    );
  }
}

export default NavBar;
