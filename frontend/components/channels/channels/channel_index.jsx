import React from 'react';
import { connect } from 'react-redux';
import { fetchChannels, fetchChannel } from '../../../actions/channel_actions';

const mapStateToProps = ({channels}) => ({channels});

const mapDispatchToProps = ({
  fetchChannels: () => dispatch(fetchChannels()),
  fetchChannel: id => dispatch(fetchChannel(id))
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

  }

  updateQuery(newValue) {
    this.setState({query: newValue});
  }
}
