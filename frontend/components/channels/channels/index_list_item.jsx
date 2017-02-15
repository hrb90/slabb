import React from 'react';

const IndexListItem = ({name, description, clickHandler}) => (
  <li className="index-li" onClick = { clickHandler }>
   <p className="channel-name">{ name }</p>
   <p className="channel-description">{ description }</p> 
  </li>
);

export default IndexListItem;
