import * as APIUtil from '../util/users_api_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_NEW_AVATAR = "RECEIVE_NEW_AVATAR";

export const receiveUsers = users => ({
  users,
  type: RECEIVE_USERS
});

export const receiveNewAvatar = user => ({
  id: user.id,
  avatar_url: user.avatar_url,
  type: RECEIVE_NEW_AVATAR
});

export const fetchUsers = () => dispatch => {
  return APIUtil.fetchUsers()
    .then(users => dispatch(receiveUsers(users)));
};

export const updateUser = user => dispatch => {
  return APIUtil.updateUser(user);
};

export const updateUserAvatar = (id, formData) => dispatch => {
  return APIUtil.updateUserAvatar(id, formData)
    .then(user => dispatch(receiveNewAvatar(user)));
};
