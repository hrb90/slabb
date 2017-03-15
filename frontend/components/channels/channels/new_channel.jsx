import React from 'react';
import { connect } from 'react-redux';
import { createChannel, receiveChannelErrors } from '../../../actions/channel_actions';
import ErrorList from '../../errors/error_list';

const mapStateToProps = ({errors}) => ({
  errors: errors.channel
});

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(receiveChannelErrors([])),
  createChannel: channel => dispatch(createChannel(channel))
});

class NewChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", channel_type: "channel"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(this.props.closeModal);
  }

  render() {
    return (
      <div className="modal-index-container">
        <form className="new-channel-form" onSubmit={ this.handleSubmit }>
          <h1>Create new channel</h1>
          <input type="text"
            value={ this.state.name }
            onChange={ this.update("name") }
            placeholder="Name"></input>
          <textarea onChange={ this.update("description") }
            value={ this.state.description }
            placeholder="Description"></textarea>
          <input type="submit" value="Add Channel"></input>
          <ErrorList errors={ this.props.errors } />
        </form>
      </div>
    );
  }

  update(fieldName) {
    return e => {
      this.setState({[fieldName]: e.currentTarget.value});
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannel);
