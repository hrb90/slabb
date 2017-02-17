import React from 'react';
import MessageForm from './message_form';

const NewMessageForm = props => {
  if (props.isSubscribed) {
    return (
      <div className="new-message-form">
        <MessageForm handleSubmit={ props.sendMessage } />
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

export default NewMessageForm;
