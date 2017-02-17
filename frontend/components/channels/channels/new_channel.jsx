import React from 'react';
import { connect } from 'react-redux';
import { createChannel } from '../../../actions/channel_actions';
import ModalCloseButton from './modal_close_button';
import ErrorList from '../../errors/error_list';

const mapDispatchToProps = dispatch => ({
  createChannel: channel => dispatch(createChannel(channel))
});

class NewChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", channel_type: "channel"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state);
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal-index-container">
        <ModalCloseButton closeModal={ this.props.closeModal } />
        <h1>Create new channel</h1>
        <form className="new-channel-form" onSubmit={ this.handleSubmit }>
          <input type="text"
            value={ this.state.name }
            onChange={ this.update("name") }
            placeholder="Name"></input>
          <textarea onChange={ this.update("description") }
            placeholder="Description">{ this.state.description }</textarea>
          <input type="submit" value="Add Channel"></input>
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

export default connect(null, mapDispatchToProps)(NewChannel);
