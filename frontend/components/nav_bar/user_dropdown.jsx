import React from 'react';
import LogoutButton from '../auth/logout_button';
import ModalCloseButton from '../channels/channels/modal_close_button';
import FileUploadForm from './file_upload_form';

const UserDropdown = props => (
  <div className="modal-index-container user-dropdown">
    <ModalCloseButton closeModal={ props.closeModal } />
    <LogoutButton beforeLogoutCallback={ props.closeModal } />
    <FileUploadForm />
    <div className="temporary-placeholder"></div>
  </div>
);

export default UserDropdown;
