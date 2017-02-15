import React from 'react';
import DMListItem from './dm_list_item';

const DMList = ({conversations, selectUser}) => {
  return (
    <ul>
      { conversations.map(convo => (
        <DMListItem name={ convo.name }
          key={ convo.key }
          clickHandler={ selectUser(convo.user) } />
      )) }
    </ul>
  );
}
 export default DMList;
