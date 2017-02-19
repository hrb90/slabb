import React from 'react';

const Message = ({author, content, timestamp, isFirst}) => {
  if (isFirst) {
    return (
      <div className="message first">
        <img className="avatar"
          src="http://appacademy.github.io/css-friends/shared/img/cat.jpg"></img>
        <div className="message-container">
          <p className="author-name">{ author.username }</p>
          <p className="msg-content">{ content }</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="message">
        <p className="msg-content">{ content }</p>
      </div>
    )
  }
}

export default Message;
