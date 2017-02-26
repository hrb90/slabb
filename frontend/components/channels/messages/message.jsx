import React from 'react';
import EmojiBar from './emoji_bar';
import EmojiButton from './emoji_button';
import ClickableIcon from '../header/clickable_icon';

const timestampToText = (timestamp, hasAmPm = false) => {
  let basicTimeString = new Date(timestamp).toLocaleTimeString();
  let shortTimeString = basicTimeString.split(":").slice(0, 2).join(":");
  let longTimeString = shortTimeString + " " + basicTimeString.slice(-2);
  return (hasAmPm ? longTimeString : shortTimeString);
};

const Header = ({message}) => (
  <p className="message-header">
    <strong className="author-name">{ message.author.username}</strong>
    { timestampToText(message.created_at, true) }
  </p>);

const Gutter = ({message, isFirst}) => {
  let gutterContent;
  if (isFirst) {
    gutterContent = (<img className="avatar"
    src={ message.author.avatar_url }>
    </img>);
  } else {
    gutterContent = (<p className="timestamp">
    { timestampToText(message.created_at)}
    </p>);
  }
  return (<div className="message-gutter">
      { gutterContent }
    </div>);
};

const Message = ({
  message,
  isFirst,
  currentUserId,
  beginEditMessage,
  deleteMessage}) => {
  // make buttons
  let buttons = [(<EmojiButton key="emoji" messageId={ message.id }/>)];
  if (message.author.id === currentUserId) {
    buttons = buttons.concat([
      (<ClickableIcon key="edit" faName="fa-pencil-square-o" onClick={ beginEditMessage} />),
      (<ClickableIcon key="delete" faName="fa-trash-o" onClick={ deleteMessage } />)
    ]);
  }
  let header = (isFirst ? (<Header message={ message }/>) : null);
  let className = "message" + (isFirst ? " first" : "");
  return (
    <div className={ className }>
      <Gutter message={ message } isFirst={ isFirst } />
      <div className="message-main-container">
        <div className="message-norxn-container">
          <div className="message-container">
            { header }
            <p className="message-content">{ message.content }</p>
          </div>
          <div className="msg-buttons-container">
            { buttons }
          </div>
        </div>
        <EmojiBar reactions={ message.reactions } messageId={ message.id }/>
      </div>
    </div>
  )
};

export default Message;
