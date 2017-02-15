import React from 'react';

const DMSelectedUsers = ({selectedUsers, removeUser}) => (
  <div className="selected-users">
    { selectedUsers.map(user => (
      <div className="selected-user-tab" onClick={ removeUser(user.id) }>
        <p>{ user.username }</p>
      </div>
    ))}
  </div>
);

export default DMSelectedUsers;
