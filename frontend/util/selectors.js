export const makeArrayFromObject = obj => {
  return Object.keys(obj).map(id => obj[id]);
};
