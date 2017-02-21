export const fixDMName = (channelName, currentUserName) => {
  let dm_users = channelName.split(",");
  if (dm_users.length === 1) {
    return currentUserName;
  } else {    
    return dm_users.sort()
    .filter(name => (name !== currentUserName))
    .join(", ");
  }
};
