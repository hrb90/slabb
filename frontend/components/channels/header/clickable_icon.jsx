import React from 'react';

const ClickableIcon = ({ faName, altText, afterText, onClick}) => (
  <div className="clickable-icon"
    onClick={ onClick }>
    <i className={`fa ${faName}`}
      alt={ altText }
      aria-hidden="true"></i>
    { afterText }
  </div>
);

export default ClickableIcon;
