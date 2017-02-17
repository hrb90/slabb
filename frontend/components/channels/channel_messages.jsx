import React from 'react';
import Message from './messages/message';
import { range } from 'lodash';

class ChannelMessages extends React.Component {
  render() {
    return (
      <div className="msgs-container">
        { range(100).map((i) => (<Message key={ i } content={ i } />))}
      </div>
    );
  }
}

export default ChannelMessages;
