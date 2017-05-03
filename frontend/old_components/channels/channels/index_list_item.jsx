import React from 'react';

const IndexListItem = ({name, description, timestamp, clickHandler, imageUrl}) => {
  let image = (<img className="hidden" />);
  let lines = [(<span key="name" className="channel-name">{ name }</span>)];
  if (imageUrl) {
    image = (<img className="index-item-img" src={ imageUrl } />);
  }
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
    { image }
    <div className="index-item-main">
      { lines }
    </div>
  </li>
)};

export default IndexListItem;
