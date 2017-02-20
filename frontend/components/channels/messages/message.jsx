import React from 'react';

const Message = ({author,
  content,
  timestamp,
  isFirst,
  currentUserId,
  beginEditMessage,
  deleteMessage}) => {
  let basicTimeString = new Date(timestamp).toLocaleTimeString();
  let timeString = basicTimeString.split(":").slice(0, 2).join(":")
    + " "
    + basicTimeString.slice(-2);
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
          <img className="avatar message-gutter"
            src="http://appacademy.github.io/css-friends/shared/img/cat.jpg"></img>
          <div className="message-container">
            <p className="message-header">
              <strong className="author-name">{ author.username }</strong>
              { timeString }
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
            { timeString }
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
