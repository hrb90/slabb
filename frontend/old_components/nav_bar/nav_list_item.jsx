import React from 'react';

const channelClass = props => {
  let className = "nb-channel";
  if (props.channel.id === props.currentChannelId) {
    className += " current-nb-channel";
  }
  if (props.channel.newMessages) {
    className += " nb-channel-bold";
  }
  return className;
};

const channelText = props => {
  if (props.channel.channel_type === "dm") {
    return props.fixDMName(props.channel.name);
  } else {
    return "#" + props.channel.name;
  }
};

const NavListItem = props => (
  <li className={ channelClass(props) }
    onClick={ props.fetchChannel(props.channel.id) }>
    { channelText(props) }
  </li>
);

export default NavListItem;
