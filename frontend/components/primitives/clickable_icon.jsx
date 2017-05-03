import React from 'react';
import ReactTooltip from 'react-tooltip';

const ClickableIcon = ({ faName, altText, afterText, onClick}) => (
  <div className="clickable-icon"
    data-tip={ altText }
    onClick={ onClick }>
    <i className={`fa ${faName}`}
      aria-hidden="true"></i>
    { afterText }
  </div>
);

export default ClickableIcon;
