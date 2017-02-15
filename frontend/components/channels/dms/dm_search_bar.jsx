import React from 'react';

const DMSearchBar = ({selectedUsers, query, updateQuery, createChannel, currentUser, removeUser}) => {
  const changeHandler = e => {
    updateQuery(e.currentTarget.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    const dm_users = selectedUsers.concat([currentUser]);
    createChannel({
      name: dm_users.map(user => user.username).join(","),
      channel_type: "dm",
      dm_user_ids: dm_users.map(user => user.id)
    });
  }

  return (
    <form onSubmit={ submitHandler }>
      <div>
        { selectedUsers.map(user =>
          (<div key={ user.id }
            onClick={ removeUser(user.id) }>
            { user.username }
            </div>)) }
        <input type="text" value={ query } onChange={ changeHandler }></input>
        <input type="submit" value="Go"></input>
      </div>
    </form>
  );
}


export default DMSearchBar;
