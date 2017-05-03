import React from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel } from '../../actions/channel_actions';
import { createMessage } from '../../actions/message_actions';
import MessageForm from './message_form';

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMessage: message => {
    return dispatch(createMessage(ownProps.channelId)(message))
      .then(ownProps.returnCallback);
  },
  subscribe: () => dispatch(subscribeToChannel(ownProps.channelId))
});

const NewMessageForm = props => {
  if (props.isSubscribed) {
    return (
      <div className="new-message-form">
        <MessageForm submitCallback={ props.sendMessage }
          resetOnChange={ props.channelId }
          placeholder={ `Message \#${props.channelName}` } />
      </div>
    );
  } else {
    return (
      <div className="new-message-form">
        <div className="prompt-subscribe">
          <p>You are viewing a preview of this channel.</p>
          <button onClick={ props.subscribe }>Subscribe</button>
        </div>
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(NewMessageForm);
