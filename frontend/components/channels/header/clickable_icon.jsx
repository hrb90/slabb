import React from 'react';

const ClickableIcon = ({ faName, altText, onClick}) => (
  <i className={`fa ${faName}`}
  alt={ altText }
  onClick={ onClick }
  aria-hidden="true"></i>
);

export default ClickableIcon;
