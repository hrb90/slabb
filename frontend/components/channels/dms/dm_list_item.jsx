import React from 'react';

const DMListItem = ({name, clickHandler}) => (
  <li onClick = { clickHandler }> { name } </li>
);

export default DMListItem;
