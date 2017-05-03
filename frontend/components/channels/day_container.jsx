import React from 'react';
import { connect } from 'react-redux';
import { updateMessage,
  deleteMessage,
  beginEditMessage,
  endEditMessage } from '../../actions/message_actions';
import Message from './messages/message';
import MessageForm from './message_form';

const MAX_GROUP_TIME_DIFF = 30 * 60 * 1000; // 30 minutes in milliseconds

const mapStateToProps = ({ session }) => ({
  currentUserId: session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  updateMessage: message => dispatch(updateMessage(message)),
  beginEditMessage: messageId => () => dispatch(beginEditMessage(messageId)),
  endEditMessage: messageId => () => dispatch(endEditMessage(messageId)),
  deleteMessage: messageId => () => dispatch(deleteMessage(messageId))
});

const DayContainer = props => {
  const editCallback = message => (
    props.updateMessage(message)
      .then(props.endEditMessage(message.id))
  )

  let messages = props.messages.slice(0).reverse();
  let firstMsgIds = [];
  if (messages.length > 0) {
    firstMsgIds.push(messages[0].id);
    let currentAuthorId = messages[0].author.id;
    let currentCreatedDate = new Date(messages[0].created_at);
    messages.forEach(message => {
      let msgDate = new Date(message.created_at);
      if (message.author.id !== currentAuthorId ||
          msgDate - currentCreatedDate > MAX_GROUP_TIME_DIFF) {
        firstMsgIds.push(message.id);
        currentAuthorId = message.author.id;
        currentCreatedDate = msgDate;
      }
    });
  }

  const pickFormOrMessage = msg => {
    if (msg.isEditing) {
      return (
        <MessageForm key={ "edit" + msg.id }
          messageId={ msg.id }
          content={ msg.content }
          submitCallback={ this.editCallback }
          blurCallback={ this.props.endEditMessage(msg.id) }
          focusOnMount={ true }/>
      );
    } else {
        return (
          <Message message={ msg }
          key={ "message" + msg.id }
          isFirst={ firstMsgIds.includes(msg.id) }
          currentUserId={ this.props.currentUserId }
          beginEditMessage={ this.props.beginEditMessage(msg.id) }
          deleteMessage={ this.props.deleteMessage(msg.id) } />
        );
      }
    };
  }

  // remember, this is flex-reversed, so the header comes at the end (:
  return (
    <div className="day-container">
      { this.props.messages.map(this.pickFormOrMessage(firstMsgIds)) }
      <span className="day-header">{ this.props.date }</span>
    </div>
  );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer);
