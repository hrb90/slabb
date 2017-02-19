import React from 'react';
import Message from './messages/message';

class ChannelMessages extends React.Component {
  firstMsgIds(messages) {
    let firstMsgIds = [];
    if (messages.length > 0) {
      firstMsgIds.push(messages[0].id);
      let currentAuthorId = messages[0].author.id;
      messages.forEach(message => {
        if (message.author.id !== currentAuthorId) {
          firstMsgIds.push(message.id);
          currentAuthorId = message.author.id;
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
            isFirst = { firstMsgIds.includes(msg.id) }/>))}
      </div>
    );
  }
}

export default ChannelMessages;
