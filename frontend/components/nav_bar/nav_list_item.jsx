import React from 'react';

const NavListItem = props => {
  let className = "nb-channel";
  let channel_name_and_decorator;
  if (props.channel.id === props.currentChannelId) {
    className += " current-nb-channel";
  }
  if (props.channel.newMessages) {
    className += " nb-channel-bold";
  }
  if (props.channel.channel_type === "dm") {
    channel_name_and_decorator = props.fixDMName(props.channel.name);
  } else {
    channel_name_and_decorator = "#" + props.channel.name;
  }
  return (
    <li className={ className }
      onClick={ props.fetchChannel(props.channel.id) }>
      { channel_name_and_decorator }
    </li>
  );
};

export default NavListItem;
