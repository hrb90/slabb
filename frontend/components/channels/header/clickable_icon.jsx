import React from 'react';

const ClickableIcon = ({ faName, altText, afterText, onClick}) => (
    <i className={`fa ${faName}`}
    alt={ altText }
    onClick={ onClick }
    aria-hidden="true">{ afterText }</i>
);

export default ClickableIcon;
