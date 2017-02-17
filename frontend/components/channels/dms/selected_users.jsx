import React from 'react';

const SelectedUsers = ({selectedUsers, removeUser}) => (
  <div className="selected-users">
    { selectedUsers.map(user => (
      <div key={ user.id } className="selected-user-tab" onClick={ removeUser(user.id) }>
        <p>{ user.username }</p>
      </div>
    ))}
  </div>
);

export default SelectedUsers;
