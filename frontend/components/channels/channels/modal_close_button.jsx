import React from 'react';

const ModalCloseButton = ({closeModal}) => (
  <div className="modal-close-button" onClick={ closeModal }>
    <i className="fa fa-times fa-2x" aria-hidden="true"></i>
  </div>
);

export default ModalCloseButton;
