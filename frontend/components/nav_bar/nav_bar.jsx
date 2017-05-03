import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { merge, values } from 'lodash';
import { fetchChannel,
  fetchSubscriptions } from '../../actions/channel_actions';
import { extractChannelInfo } from '../../util/subscription_util';
import NavListItem from './nav_list_item';
import UserDropdown from '../modals/user_dropdown';
import ChannelIndex from '../modals/channels/channel_index';
import NewChannel from '../modals/channels/new_channel';
import DMIndex from '../modals/dms/dm_index';
import ClickableIcon from '../primitives/clickable_icon';
import { fixDMName } from '../../util/channel_util';

const curriedFixDMName = username => channelName => fixDMName(channelName, username);

const mapStateToProps = ({session, subscriptions, currentChannel}) => {
  let nbSubs = merge({}, subscriptions, extractChannelInfo(currentChannel))
  let subArray = values(nbSubs);
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
    this.openModal = this.openModal.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
    let needChannel = true;
    if (this.props.lastChannelId) {
      needChannel = false;
      this.props.fetchChannel(this.props.lastChannelId)();
    }
    this.props.fetchSubscriptions()
      .then(channels => {
        if (needChannel && channels.length > 0) {
          this.props.fetchChannel(channels[0].id)();
        }
      });
  }

  closeModal(name) {
    return () => this.setState({[name]: false});
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
        <div className="channel-nav">
          <span>
          <p className="nb-index-link nb-modal-link" onClick={ this.openModal("channels") }>Channels</p>
          <ClickableIcon faName="fa-plus-circle nb-modal-link"
            altText="Create channel" onClick={ this.openModal("newChannel") } />
          </span>
          <ul>
          { this.props.plainChannels.map(channel =>
            (<NavListItem key={ channel.id }
              channel={ channel }
              fetchChannel={ this.props.fetchChannel }
              fixDMName={ curriedFixDMName(this.props.username) }
              currentChannelId={ this.props.currentChannelId}
            />))
          }
          </ul>
          <span className="nb-index-link nb-modal-link" onClick={ this.openModal("dms") }>Direct messages</span>
          <ul>
          { this.props.dmChannels.map(channel =>
            (<NavListItem key={ channel.id }
              channel={ channel }
              fetchChannel={ this.props.fetchChannel }
              fixDMName={ curriedFixDMName(this.props.username) }
              currentChannelId={ this.props.currentChannelId}
            />))
          }
          </ul>
        </div>
        <Modal
        isOpen={ this.state.settings }
        onRequestClose={ this.closeModal("settings") }
        contentLabel="Settings">
          <UserDropdown closeModal={ this.closeModal("settings") } />
        </Modal>
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
        <Modal
        isOpen={ this.state.dms }
        onRequestClose={ this.closeModal("dms") }
        contentLabel="Direct Messages">
          <DMIndex closeModal={ this.closeModal("dms") } />
        </Modal>
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
