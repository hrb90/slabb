import React from 'react';

const Message = ({author,
  content,
  timestamp,
  isFirst,
  currentUserId,
  beginEditMessage,
  deleteMessage}) => {
  let basicTimeString = new Date(timestamp).toLocaleTimeString();
  let shortTimeString = basicTimeString.split(":").slice(0, 2).join(":");
  let longTimeString = shortTimeString + " " + basicTimeString.slice(-2);
  let buttons = [];
  if (author.id === currentUserId) {
    buttons = [(<i key="edit" className="fa fa-pencil-square-o"
                   onClick={ beginEditMessage }
                   aria-hidden="true"></i>),
                (<i key="delete" className="fa fa-trash-o"
                    onClick={ deleteMessage }
                    aria-hidden="true"></i>)];
  }
  if (isFirst) {
    return (
      <div className="message first">
        <div className="message-main-container">
          <div className="message-gutter">
            <img className="avatar"
            src={ author.avatar_url }></img>
          </div>
          <div className="message-container">
            <p className="message-header">
              <strong className="author-name">{ author.username }</strong>
              { longTimeString }
            </p>
            <p className="msg-content">
              { content }
            </p>
          </div>
        </div>
        <div className="msg-buttons-container">
          { buttons }
        </div>
      </div>
    )
  } else {
    return (
      <div className="message">
        <div className="message-main-container">
          <div className="message-gutter">
            <p className="timestamp">{ shortTimeString }</p>
          </div>
          <div className="message-container">
            <p className="msg-content">
              { content }
            </p>
          </div>
        </div>
        <div className="msg-buttons-container">
          { buttons }
        </div>
      </div>
    )
  }
}

export default Message;
