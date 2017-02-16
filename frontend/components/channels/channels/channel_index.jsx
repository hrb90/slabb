import React from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchChannel } from '../../../actions/channel_actions';
import SearchBar from './search_bar';
import ChannelList from './channel_list';

const mapStateToProps = ({channels}) => ({channels});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchChannel: id => () => {
    dispatch(fetchChannel(id));
    ownProps.closeModal();
  }
});

class ChannelIndex extends React.Component{
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.filter = this.filter.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
  }

  filter(channels) {
    return channels.filter(channel => {
      return channel.name.includes(this.state.query)
    });
  }

  render() {
    return (
      <div className="channel-index">
        <div className="modal-close-button" onClick={ this.props.closeModal }>X</div>
        <div className="search-bar">
          <SearchBar query={ this.state.query } updateQuery={ this.updateQuery }
            placeholder="Search Channels" />
        </div>
        <ChannelList channels={ this.filter(this.props.channels)}
          fetchChannel={ this.props.fetchChannel } />
      </div>
    );
  }

  updateQuery(newValue) {
    this.setState({query: newValue});
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex);
