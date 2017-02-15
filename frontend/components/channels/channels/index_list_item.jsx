import React from 'react';

const IndexListItem = ({name, description, clickHandler}) => (
  <li onClick = { clickHandler }> { name } { description } </li>
);

export default IndexListItem;
