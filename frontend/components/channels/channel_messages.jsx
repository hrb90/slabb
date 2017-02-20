import React from 'react';
import Message from './messages/message';
import MessageForm from './message_form';

const MAX_GROUP_TIME_DIFF = 30 * 60 * 1000; // 30 minutes in milliseconds

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);
    this.editCallback = this.editCallback.bind(this);
    this.pickFormOrMessage = this.pickFormOrMessage.bind(this);
  }

  editCallback(message) {
    this.props.updateMessage(message)
      .then(() => this.props.endEditMessage(message.id));
  }

  firstMsgIds(messages) {
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
    return firstMsgIds;
  }

  pickFormOrMessage(firstMsgIds) {
    return (msg) => {
      if (msg.isEditing) {
        return (
          <MessageForm key={ msg.id }
            messageId={ msg.id }
            content={ msg.content }
            submitCallback={ this.editCallback }
            blurCallback={ () => this.props.endEditMessage(msg.id) }
            focusOnMount={ true }/>);
      } else {
          return (<Message author={ msg.author }
            key={ msg.id }
            content={ msg.content }
            isFirst={ firstMsgIds.includes(msg.id) }
            timestamp={ msg.created_at }
            currentUserId={ this.props.currentUserId }
            beginEditMessage={ this.props.beginEditMessage(msg.id) }
            deleteMessage={ this.props.deleteMessage(msg.id) } />);
      }
    };
  }

  render() {
    let firstMsgIds = this.firstMsgIds(this.props.messages);
    return (
      <div className="msgs-container">
        { this.props.messages.map(this.pickFormOrMessage(firstMsgIds)) }
      </div>
    );
  }
}

export default ChannelMessages;
