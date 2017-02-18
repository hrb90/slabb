import React from 'react';

const Message = ({author, content}) => (
  <div className="message">
    <strong>{ author }</strong>: <p>{ content }</p>
  </div>
);

export default Message;
