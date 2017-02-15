import React from 'react';
import IndexListItem from '../channels/index_list_item';

const DMList = ({conversations, selectUser}) => {
  return (
    <ul>
      { conversations.map(convo => (
        <IndexListItem name={ convo.name }
          description=""
          key={ convo.key }
          clickHandler={ selectUser(convo.user) } />
      )) }
    </ul>
  );
}
 export default DMList;
