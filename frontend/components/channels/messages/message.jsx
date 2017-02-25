import React from 'react';
import EmojiBar from './emoji_bar';
import EmojiButton from './emoji_button';

const Message = ({message,
                  isFirst,
                  currentUserId,
                  beginEditMessage,
                  deleteMessage}) => {
  let basicTimeString = new Date(message.created_at).toLocaleTimeString();
  let shortTimeString = basicTimeString.split(":").slice(0, 2).join(":");
  let longTimeString = shortTimeString + " " + basicTimeString.slice(-2);
  let buttons = [(<EmojiButton key="emoji" messageId={ message.id }/>)];
  if (message.author.id === currentUserId) {
    buttons = buttons.concat([(<i key="edit" className="fa fa-pencil-square-o"
                   onClick={ beginEditMessage }
                   aria-hidden="true"></i>),
                (<i key="delete" className="fa fa-trash-o"
                    onClick={ deleteMessage }
                    aria-hidden="true"></i>)]);
  }
  if (isFirst) {
    return (
      <div className="message first">
        <div className="message-main-container">
          <div className="message-gutter">
            <img className="avatar"
            src={ message.author.avatar_url }></img>
          </div>
          <div className="message-container">
            <p className="message-header">
              <strong className="author-name">{ message.author.username }</strong>
              { longTimeString }
            </p>
            <p className="msg-content">
              { message.content }
            </p>
          </div>
        </div>
        <div className="msg-buttons-container">
          { buttons }
        </div>
        <EmojiBar reactions={ message.reactions }/>
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
              { message.content }
            </p>
          </div>
        </div>
        <div className="msg-buttons-container">
          { buttons }
        </div>
        <EmojiBar reactions={ message.reactions }/>
      </div>
    )
  }
}

export default Message;
