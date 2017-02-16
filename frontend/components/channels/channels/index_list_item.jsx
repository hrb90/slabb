import React from 'react';

const IndexListItem = ({name, description, clickHandler}) => (
  <li className="index-li" onClick = { clickHandler }>
    <span className="channel-name">{ name }</span>
    <p className="channel-description">{ description }</p>
  </li>
);

export default IndexListItem;
