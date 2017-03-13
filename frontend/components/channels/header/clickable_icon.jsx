import React from 'react';
import ReactTooltip from 'react-tooltip';

const ClickableIcon = ({ faName, altText, afterText, onClick}) => (
  <div className="clickable-icon"
    onClick={ onClick }>
    <i className={`fa ${faName}`}
      data-tip={ altText }
      aria-hidden="true"></i>
    { afterText }
  </div>
);

export default ClickableIcon;
