import React from 'react';

const Message = ({author, content, timestamp, isFirst}) => {
  let timeString = new Date(timestamp).toLocaleTimeString()
                          .split(":").slice(0, 2).join(":");
  if (isFirst) {
    return (
      <div className="message first">
        <img className="avatar message-gutter"
          src="http://appacademy.github.io/css-friends/shared/img/cat.jpg"></img>
        <div className="message-container">
          <p className="message-header">
            <strong className="author-name">{ author.username }</strong>
            { timeString }
          </p>
          <p className="msg-content">{ content }</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="message">
        <div className="message-gutter">
          { timeString }
        </div>
        <div className="message-container">
          <p className="msg-content">{ content }</p>
        </div>
      </div>
    )
  }
}

export default Message;
