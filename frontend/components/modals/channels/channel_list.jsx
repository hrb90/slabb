import React from 'react';
import IndexListItem from '../index_list_item';

const ChannelList = ({channels, fetchChannel}) => (
  <ul>
    { channels.map(channel => (
      <IndexListItem key={ channel.id } name={ channel.name }
        timestamp={ channel.created_at }
        description={ channel.description }
        clickHandler={ fetchChannel(channel.id) } />
    )) }
  </ul>
);

export default ChannelList;
