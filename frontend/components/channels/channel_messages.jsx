import React from 'react';
import Message from './messages/message';

const MAX_GROUP_TIME_DIFF = 30 * 60 * 1000; // 30 minutes in milliseconds

class ChannelMessages extends React.Component {
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

  render() {
    let firstMsgIds = this.firstMsgIds(this.props.messages);
    return (
      <div className="msgs-container">
        { this.props.messages.map(msg =>
          (<Message author={ msg.author }
            key={ msg.id }
            content={ msg.content }
            isFirst={ firstMsgIds.includes(msg.id)}
            timestamp={ msg.created_at } />))}
      </div>
    );
  }
}

export default ChannelMessages;
