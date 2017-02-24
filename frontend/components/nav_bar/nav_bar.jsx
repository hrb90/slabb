import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { merge } from 'lodash';
import { fetchChannel,
  fetchSubscriptions,
  subscribeToChannelNoRedirect,
  receiveMessageSubscribedChannel } from '../../actions/channel_actions';
import { makeArrayFromObject } from '../../util/selectors';
import { extractChannelInfo } from '../../util/subscription_util';
import NavListItem from './nav_list_item';
import UserDropdown from './user_dropdown';
import ChannelIndex from '../channels/channels/channel_index';
import NewChannel from '../channels/channels/new_channel';
import DMIndex from '../channels/dms/dm_index';
import { fixDMName } from '../../util/channel_util';

const curriedFixDMName = username => channelName => fixDMName(channelName, username);

const mapStateToProps = ({session, subscriptions, currentChannel}) => {
  let nbSubs = merge({}, subscriptions, extractChannelInfo(currentChannel))
  let subArray = makeArrayFromObject(nbSubs);
  let dms = subArray.filter((channel) => (channel.channel_type === "dm"));
  let channels = subArray.filter((channel) => (channel.channel_type === "channel"));
  return {
    lastChannelId: session.currentUser.last_channel_id,
    username: session.currentUser.username,
    plainChannels: channels,
    dmChannels: dms,
    currentChannelId: currentChannel.id
  };
};

const mapDispatchToProps = dispatch => ({
  fetchChannel: id => () => dispatch(fetchChannel(id)),
  fetchSubscriptions: () => dispatch(fetchSubscriptions()),
  receiveMessageSubscribedChannel: id => dispatch(receiveMessageSubscribedChannel(id)),
  subscribeToChannelNoRedirect: id => dispatch(subscribeToChannelNoRedirect(id))
});

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: false,
      dms: false,
      newChannel: false,
      settings: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleNewDM = this.handleNewDM.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.pusher = new Pusher('dd38d591c7efa0a63140', {
      encrypted: true
    });
    this.newDMChannel = this.pusher.subscribe('dm_alert_' + this.props.username);
    this.newDMChannel.bind('new_dm_alert', this.handleNewDM);
    this.newMessageChannel = this.pusher.subscribe('new_messages');
    this.newMessageChannel.bind('new_message', this.handleNewMessage);
  }

  componentWillMount(){
    Modal.setAppElement('body');
    this.props.fetchSubscriptions();
    if (this.props.lastChannelId) {
      this.props.fetchChannel(this.props.lastChannelId)();
    }
  }

  closeModal(name) {
    return () => this.setState({[name]: false});
  }

  handleNewDM(data) {
    let subDmIds = this.props.dmChannels.map(channel => channel.id);
    if (subDmIds.includes((+data.channelId))) {
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

  openModal(name) {
    return () => this.setState({[name]: true});
  }

  render() {
    return (
      <aside className="nav-bar">
        <div onClick={ this.openModal("settings") } className="user-settings nb-modal-link">
          <h1>
            Slabb &nbsp;
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </h1>
          <p>
            { this.props.username }
          </p>
        </div>
        <Modal
          isOpen={ this.state.settings }
          onRequestClose={ this.closeModal("settings") }
          contentLabel="Settings">
            <UserDropdown closeModal={ this.closeModal("settings") } />
        </Modal>
        <span>
          <p className="nb-index-link nb-modal-link" onClick={ this.openModal("channels") }>Channels</p>
          <i className="fa fa-plus-circle nb-modal-link" onClick={ this.openModal("newChannel") }></i>
        </span>
        <Modal
          isOpen={ this.state.channels }
          onRequestClose={ this.closeModal("channels") }
          contentLabel="Channel">
            <ChannelIndex closeModal={ this.closeModal("channels") } />
        </Modal>
        <Modal
          isOpen={ this.state.newChannel }
          onRequestClose={ this.closeModal("newChannel") }
          contentLabel="New Channel">
            <NewChannel closeModal={ this.closeModal("newChannel") } />
        </Modal>
        <ul>
          { this.props.plainChannels.map(channel =>
            (<NavListItem key={ channel.id }
              channel={ channel }
              fetchChannel={ this.props.fetchChannel }
              fixDMName={ curriedFixDMName(this.props.username) }
              currentChannelId={ this.props.currentChannelId} />))}
        </ul>
        <span className="nb-index-link nb-modal-link" onClick={ this.openModal("dms") }>Direct messages</span>
        <Modal
          isOpen={ this.state.dms }
          onRequestClose={ this.closeModal("dms") }
          contentLabel="Direct Messages">
            <DMIndex closeModal={ this.closeModal("dms") } />
        </Modal>
        <ul>
          { this.props.dmChannels.map(channel =>
            (<NavListItem key={ channel.id }
              channel={ channel }
              fetchChannel={ this.props.fetchChannel }
              fixDMName={ curriedFixDMName(this.props.username) }
              currentChannelId={ this.props.currentChannelId} />))}
        </ul>
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
