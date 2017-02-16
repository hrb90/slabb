export const fixDMName = (channelName, currentUserName) => {
  let dm_users = channelName.split(",");
  return dm_users.sort()
    .filter(name => (name !== currentUserName))
    .join(", ");
};
