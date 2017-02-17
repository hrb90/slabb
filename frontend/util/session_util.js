export const loggedIn = state => {
  return !!state.session.currentUser.id;
};

export const nullUser = { username: null, id: null };
