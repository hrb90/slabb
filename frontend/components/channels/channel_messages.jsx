import React from 'react';
import Message from './messages/message';
import { range } from 'lodash';

class ChannelMessages extends React.Component {
  render() {
    return (
      <div className="msgs-container">
        { this.props.messages.map(msg =>
          (<Message author={ msg.author.username }
            key={ msg.id }
            content={ msg.content } />))}
      </div>
    );
  }
}

export default ChannelMessages;
