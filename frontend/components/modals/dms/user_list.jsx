import React from 'react';
import IndexListItem from '../index_list_item';

const UserList = ({users, selectUser}) => {
  return (
    <ul>
      { users.map(user => (
        <IndexListItem name={ user.username }
          imageUrl={ user.avatar_url }
          description=""
          key={ user.id }
          clickHandler={ selectUser(user) } />
      )) }
    </ul>
  );
}
 export default UserList;
