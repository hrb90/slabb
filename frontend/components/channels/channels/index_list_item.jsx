import React from 'react';

const IndexListItem = ({name, description, timestamp, clickHandler}) => {
  let lines = [(<span key="name" className="channel-name">{ name }</span>)];
  if (timestamp) {
    let dateString = new Date(timestamp).toDateString();
    lines.push((<span key="date" className="channel-timestamp">
      Created on { dateString }
      </span>));
  }
  if (description) {
    lines.push((<p key="desc" className="channel-description">{ description }</p>))
  }
  return (
  <li className="index-li" onClick = { clickHandler }>
    { lines }
  </li>
)};

export default IndexListItem;
